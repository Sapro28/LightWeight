"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { createNutritionPlan, buildWorkoutRoutine } from "@/lib/aiInstructions";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Send, ArrowLeft, ArrowRight } from "lucide-react";
interface WizardAnswers {
  age?: string;
  goal?: string;
  days?: string;
  height?: string;
  weight?: string;
  diet?: string;
}
interface Question {
  id: keyof WizardAnswers;
  text: string;
  placeholder: string;
}
interface WorkoutRoutine {
  name: string;
  reps: number | string;
  sets: number | string;
  description?: string;
}
interface WorkoutDay {
  day: string;
  routines: WorkoutRoutine[];
}
interface WorkoutPlan {
  exercises: WorkoutDay[];
  schedule: string[];
}
interface Meal {
  name: string;
  foods: string[];
}
interface DietPlan {
  dailyCalories: number;
  meals: Meal[];
}
interface PlanData {
  userId: string;
  name: string;
  dietPlan?: DietPlan;
  workoutPlan?: WorkoutPlan;
  isActive: boolean;
}
const extractJsonFromResponse = (response: string): any => {
  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Failed to parse JSON directly:", error);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (innerError) {
        console.error("Could not parse extracted JSON:", innerError);
      }
    }
    const arrayMatch = response.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      try {
        return JSON.parse(arrayMatch[0]);
      } catch (innerError) {
        console.error("Could not parse extracted array JSON:", innerError);
      }
    }
    throw new Error("No valid JSON found in response");
  }
};
const validateDietPlan = (plan: any): DietPlan => {
  if (!plan) {
    throw new Error("Diet plan is null or undefined");
  }
  if (Array.isArray(plan)) {
    plan = plan[0] || {};
  }
  const caloriesVal = parseInt(`${plan.dailyCalories ?? plan.calories ?? ""}`);
  const validatedPlan: DietPlan = {
    dailyCalories: isNaN(caloriesVal) ? 2000 : caloriesVal,
    meals: [],
  };
  if (plan.meals && Array.isArray(plan.meals)) {
    validatedPlan.meals = plan.meals.map((meal: any) => ({
      name: meal.name || "Meal",
      foods: Array.isArray(meal.foods)
        ? meal.foods.filter((f: any) => typeof f === "string" && f.trim())
        : [],
    }));
  } else {
    validatedPlan.meals = [
      { name: "Breakfast", foods: ["Oatmeal", "Banana", "Coffee"] },
      { name: "Lunch", foods: ["Chicken salad", "Mixed vegetables"] },
      { name: "Dinner", foods: ["Grilled fish", "Rice", "Broccoli"] },
    ];
  }
  return validatedPlan;
};
const validateWorkoutPlan = (plan: any): WorkoutPlan => {
  if (!plan) {
    throw new Error("Workout plan is null or undefined");
  }
  if (Array.isArray(plan)) {
    plan = plan[0] || {};
  }
  const validatedPlan: WorkoutPlan = {
    exercises: [],
    schedule: [],
  };
  if (plan.schedule && Array.isArray(plan.schedule)) {
    validatedPlan.schedule = plan.schedule;
  } else {
    validatedPlan.schedule = ["Monday", "Wednesday", "Friday"];
  }
  if (plan.exercises && Array.isArray(plan.exercises)) {
    validatedPlan.exercises = plan.exercises.map(
      (exercise: any, index: number) => ({
        day: exercise.day || `Day ${index + 1}`,
        routines: Array.isArray(exercise.routines)
          ? exercise.routines.map((routine: any) => ({
              name: routine.name || "Exercise",
              sets: routine.sets || 3,
              reps: routine.reps || 10,
              description: routine.description || "",
            }))
          : [],
      })
    );
  } else {
    validatedPlan.exercises = [
      {
        day: "Day 1",
        routines: [
          {
            name: "Push-ups",
            sets: 3,
            reps: 10,
            description: "Basic push-ups",
          },
          {
            name: "Squats",
            sets: 3,
            reps: 15,
            description: "Bodyweight squats",
          },
        ],
      },
    ];
  }
  return validatedPlan;
};
const validateAnswer = (questionNumber: number, input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return { isValid: false, message: "Please provide an answer" };
  switch (questionNumber) {
    case 1:
      const age = parseInt(trimmed);
      if (isNaN(age) || age < 13 || age > 100) {
        return { isValid: false, message: "Please enter a valid age (13-100)" };
      }
      break;
    case 2:
      if (trimmed.length < 3) {
        return { isValid: false, message: "Please describe your goal" };
      }
      break;
    case 3:
      const days = parseInt(trimmed);
      if (isNaN(days) || days < 1 || days > 7) {
        return { isValid: false, message: "Please enter 1-7 days" };
      }
      break;
    case 4:
      if (!trimmed.match(/\d/)) {
        return { isValid: false, message: "Please include a number" };
      }
      break;
    case 5:
      if (!trimmed.match(/\d/)) {
        return { isValid: false, message: "Please include a number" };
      }
      break;
  }
  return { isValid: true };
};
const CreateWorkoutPlan: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const storePlan = useMutation(api.plans.savePlanToDatabase);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showWizard, setShowWizard] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [currentInput, setCurrentInput] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const questions: Question[] = [
    { id: "age", text: "How old are you?", placeholder: "e.g., 25" },
    {
      id: "goal",
      text: "What is your fitness goal?",
      placeholder: "e.g., lose weight, build muscle...",
    },
    {
      id: "days",
      text: "How many days per week can you train?",
      placeholder: "e.g., 3",
    },
    {
      id: "height",
      text: "What is your height?",
      placeholder: "e.g., 5'8\" or 173cm",
    },
    {
      id: "weight",
      text: "What is your weight?",
      placeholder: "e.g., 150 lbs or 68 kg",
    },
    {
      id: "diet",
      text: "Do you have any dietary restrictions?",
      placeholder: "e.g., vegetarian, no restrictions...",
    },
  ];
  const handleSubmit = () => {
    const validation = validateAnswer(currentQuestionIndex + 1, currentInput);
    if (!validation.isValid) {
      setInputError(validation.message || "Invalid input");
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: currentInput.trim(),
    };
    setAnswers(newAnswers);
    setCurrentInput("");
    setInputError("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleWizardComplete(newAnswers);
    }
  };
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = questions[currentQuestionIndex - 1];
      setCurrentInput(answers[prevQuestion.id] || "");
      setInputError("");
    }
  };
  const handleSkip = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: "Skipped" };
    setAnswers(newAnswers);
    setCurrentInput("");
    setInputError("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleWizardComplete(newAnswers);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleWizardComplete = async (
    answers: WizardAnswers
  ): Promise<void> => {
    if (!user?.id) {
      setError("Please log in to save your plan.");
      return;
    }
    const userRequest = `
Age: ${answers.age || "Not provided"}
Goal: ${answers.goal || "General fitness"}
Training Days: ${answers.days || "3-4 days"}
Height: ${answers.height || "Not provided"}
Weight: ${answers.weight || "Not provided"}
Dietary Preferences: ${answers.diet || "No specific restrictions"}
`.trim();
    try {
      setIsGenerating(true);
      setError(null);
      console.log("Starting plan generation with user request:", userRequest);
      const [dietRes, workoutRes] = await Promise.all([
        fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: createNutritionPlan(userRequest),
            temperature: 0.7,
          }),
        }).catch((err) => {
          console.error("Diet API call failed:", err);
          throw new Error("Failed to call nutrition plan API");
        }),
        fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: buildWorkoutRoutine(userRequest),
            temperature: 0.7,
          }),
        }).catch((err) => {
          console.error("Workout API call failed:", err);
          throw new Error("Failed to call workout plan API");
        }),
      ]);
      if (!dietRes.ok) {
        const errorText = await dietRes.text();
        console.error("Diet API response error:", dietRes.status, errorText);
        throw new Error(`Nutrition API failed: ${dietRes.status} ${errorText}`);
      }
      if (!workoutRes.ok) {
        const errorText = await workoutRes.text();
        console.error(
          "Workout API response error:",
          workoutRes.status,
          errorText
        );
        throw new Error(
          `Workout API failed: ${workoutRes.status} ${errorText}`
        );
      }
      const dietData = await dietRes.json();
      const workoutData = await workoutRes.json();
      console.log("Raw diet response:", dietData);
      console.log("Raw workout response:", workoutData);
      let mealPlan: DietPlan, workoutPlan: WorkoutPlan;
      try {
        let dietResponse = dietData.response;
        if (typeof dietResponse === "string") {
          dietResponse = extractJsonFromResponse(dietResponse);
        }
        mealPlan = validateDietPlan(dietResponse);
        console.log("Validated meal plan:", mealPlan);
      } catch (e) {
        console.error("Diet plan parsing error:", e);
        console.error("Diet data that failed:", dietData);
        throw new Error(
          `Failed to parse nutrition plan: ${e instanceof Error ? e.message : "Unknown error"}`
        );
      }
      try {
        let workoutResponse = workoutData.response;
        if (typeof workoutResponse === "string") {
          workoutResponse = extractJsonFromResponse(workoutResponse);
        }
        workoutPlan = validateWorkoutPlan(workoutResponse);
        console.log("Validated workout plan:", workoutPlan);
      } catch (e) {
        console.error("Workout plan parsing error:", e);
        console.error("Workout data that failed:", workoutData);
        throw new Error(
          `Failed to parse workout plan: ${e instanceof Error ? e.message : "Unknown error"}`
        );
      }
      const planData: PlanData = {
        userId: user.id,
        name: `Fitness Plan - ${new Date().toLocaleDateString()}`,
        dietPlan: mealPlan,
        workoutPlan: workoutPlan,
        isActive: true,
      };
      console.log("Saving plan data:", planData);
      await storePlan(planData);
      router.push("/profile?newPlan=true");
    } catch (err) {
      console.error("Failed to generate plan:", err);
      setError(
        err instanceof Error
          ? `❌ ${err.message}`
          : "❌ Failed to generate your plan. Please try again."
      );
      setIsGenerating(false);
    }
  };
  const handleGetStarted = (): void => {
    if (!user) {
      setError("Please log in to create your fitness plan.");
      return;
    }
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentInput("");
    setInputError("");
    setError(null);
    setShowWizard(true);
  };
  const resetWizard = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentInput("");
    setInputError("");
    setShowWizard(false);
  };
  if (isGenerating) {
    return (
      <div className="flex flex-col min-h-screen text-foreground justify-center items-center">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <Sparkles className="mx-auto h-16 w-16 text-primary animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Creating Your Perfect Plan
          </h2>
          <LoadingSpinner text="Cal is working his magic..." />
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p>🧠 Analyzing your goals and preferences</p>
            <p>🍎 Crafting your personalized nutrition plan</p>
            <p>💪 Building your custom workout routine</p>
            <p>✨ Adding the finishing touches</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden py-6">
      <div className="container mx-auto px-4 lg:px-20 h-full max-w-6xl">
        {!showWizard ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-5xl lg:text-6xl font-bold font-mono mb-4">
                <span>Create Your </span>
                <span className="text-primary">Fitness Program</span>
              </h1>
              <p className="text-muted-foreground text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
                Answer a few quick questions to get your personalized fitness
                plan
              </p>
            </div>
            {error && (
              <div className="mb-6 max-w-xl mx-auto">
                <ErrorMessage message={error} onRetry={() => setError(null)} />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
                <div className="aspect-video flex flex-col items-center justify-center p-6">
                  <div className="relative size-32 mb-4">
                    <img
                      src="/AITrainer.jpg"
                      alt="AI Coach"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    Cal O' Rie
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your favorite personal trainer's personal trainer
                  </p>
                </div>
              </Card>
              <Card className="bg-card/90 backdrop-blur-sm border overflow-hidden relative">
                <div className="aspect-video flex flex-col items-center justify-center p-6">
                  <div className="relative size-32 mb-4">
                    <img
                      src={user?.imageUrl}
                      alt="User"
                      className="size-full object-cover rounded-full"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">You</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user
                      ? `${user.firstName} ${user.lastName || ""}`.trim()
                      : "Guest"}
                  </p>
                </div>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="text-lg px-12 py-6 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Fitness Journey
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Takes just 2-3 minutes • Completely personalized • Free to start
              </p>
            </div>
          </>
        ) : (
          <div>
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">
                <span className="text-primary">Let's Get Started!</span>
              </h1>
              <p className="text-muted-foreground">
                Answer a few questions to create your perfect plan
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
                <div className="aspect-video flex flex-col items-center justify-center p-6">
                  <div className="relative size-32 mb-4">
                    <img
                      src="/AITrainer.jpg"
                      alt="AI Coach"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    Cal O' Rie
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your favorite personal trainer's personal trainer
                  </p>
                </div>
              </Card>
              <Card className="bg-card/90 backdrop-blur-sm border overflow-hidden relative">
                <div className="aspect-video flex flex-col items-center justify-center p-6">
                  <div className="relative size-32 mb-4">
                    <img
                      src={user?.imageUrl}
                      alt="User"
                      className="size-full object-cover rounded-full"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">You</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user
                      ? `${user.firstName} ${user.lastName || ""}`.trim()
                      : "Guest"}
                  </p>
                </div>
              </Card>
            </div>
            <div className="max-w-2xl mx-auto">
              {}
              <div className="mb-8">
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: questions.length }, (_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-8 rounded-full transition-colors ${
                        i <= currentQuestionIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
              {}
              <Card className="p-8 mb-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">
                      {questions[currentQuestionIndex].text}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={currentInput}
                        onChange={(e) => {
                          setCurrentInput(e.target.value);
                          setInputError("");
                        }}
                        onKeyDown={handleKeyPress}
                        placeholder={
                          questions[currentQuestionIndex].placeholder
                        }
                        className={`w-full p-4 pr-16 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 text-lg transition-colors ${
                          inputError
                            ? "border-red-500 focus:ring-red-500"
                            : "border-border focus:ring-primary"
                        }`}
                        autoFocus
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={!currentInput.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
                        type="button"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                    {}
                    {inputError && (
                      <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                        {inputError}
                      </div>
                    )}
                    {}
                    <div className="flex justify-between">
                      <Button
                        variant="ghost"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        Previous
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={handleSkip}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Skip
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={!currentInput.trim()}
                          className="flex items-center gap-2"
                        >
                          {currentQuestionIndex === questions.length - 1
                            ? "Finish"
                            : "Next"}
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              {}
              {Object.keys(answers).length > 0 && (
                <Card className="p-4 mb-6 bg-muted/50">
                  <h3 className="text-sm font-medium mb-2">Your Answers:</h3>
                  <div className="space-y-1 text-sm">
                    {Object.entries(answers).map(([key, value]) => {
                      const question = questions.find((q) => q.id === key);
                      return (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">
                            {question?.text}:
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={resetWizard}
                  className="text-muted-foreground"
                >
                  ← Back to start
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateWorkoutPlan;
