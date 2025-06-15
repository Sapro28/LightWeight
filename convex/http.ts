import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const httpRoutes = httpRouter();
const aiModelClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
httpRoutes.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const secretKey = process.env.CLERK_WEBHOOK_SECRET;
    if (!secretKey) {
      throw new Error("Environment error: Missing webhook secret");
    }
    const headerSvixId = request.headers.get("svix-id");
    const headerSvixSignature = request.headers.get("svix-signature");
    const headerSvixTimestamp = request.headers.get("svix-timestamp");
    if (!headerSvixId || !headerSvixSignature || !headerSvixTimestamp) {
      return new Response("Missing required Svix headers", {
        status: 400,
      });
    }
    const requestBody = await request.json();
    const stringifiedBody = JSON.stringify(requestBody);
    const webhookVerifier = new Webhook(secretKey);
    let event: WebhookEvent;
    try {
      event = webhookVerifier.verify(stringifiedBody, {
        "svix-id": headerSvixId,
        "svix-timestamp": headerSvixTimestamp,
        "svix-signature": headerSvixSignature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Failed to verify webhook:", err);
      return new Response("Verification failed", { status: 400 });
    }
    const eventName = event.type;
    if (eventName === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } =
        event.data;
      const primaryEmail = email_addresses[0].email_address;
      const fullName = `${first_name || ""} ${last_name || ""}`.trim();
      try {
        await ctx.runMutation(api.users.createUserIfNotExists, {
          email: primaryEmail,
          name: fullName,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.log("Failed to create user:", error);
        return new Response("User creation failed", { status: 500 });
      }
    }
    if (eventName === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;
      const primaryEmail = email_addresses[0].email_address;
      const fullName = `${first_name || ""} ${last_name || ""}`.trim();
      try {
        await ctx.runMutation(api.users.modifyExistingUser, {
          clerkId: id,
          email: primaryEmail,
          name: fullName,
          image: image_url,
        });
      } catch (error) {
        console.log("Failed to update user:", error);
        return new Response("User update failed", { status: 500 });
      }
    }
    return new Response("Webhook processed successfully", { status: 200 });
  }),
});
function normalizeWorkoutPlan(rawPlan: any) {
  const normalizedPlan = {
    schedule: rawPlan.schedule,
    exercises: rawPlan.exercises.map((exercise: any) => ({
      day: exercise.day,
      routines: exercise.routines.map((routine: any) => ({
        name: routine.name,
        sets:
          typeof routine.sets === "number"
            ? routine.sets
            : parseInt(routine.sets) || 1,
        reps:
          typeof routine.reps === "number"
            ? routine.reps
            : parseInt(routine.reps) || 10,
      })),
    })),
  };
  return normalizedPlan;
}
function normalizeDietPlan(rawPlan: any) {
  const normalizedPlan = {
    dailyCalories: rawPlan.dailyCalories,
    meals: rawPlan.meals.map((meal: any) => ({
      name: meal.name,
      foods: meal.foods,
    })),
  };
  return normalizedPlan;
}
httpRoutes.route({
  path: "/vapi/create-workout-plan",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const requestData = await request.json();
      const {
        user_id,
        age,
        height,
        weight,
        injuries,
        workout_days,
        fitness_goal,
        fitness_level,
        dietary_restrictions,
      } = requestData;
      console.log("Processing fitness plan request:", requestData);
      const aiModel = aiModelClient.getGenerativeModel({
        model: "gemini-2.0-flash-001",
        generationConfig: {
          temperature: 0.4,
          topP: 0.9,
          responseMimeType: "application/json",
        },
      });
      const workoutInstructions = `You are an experienced fitness coach creating a personalized workout plan based on:
      Age: ${age}
      Height: ${height}
      Weight: ${weight}
      Injuries or limitations: ${injuries}
      Available days for workout: ${workout_days}
      Fitness goal: ${fitness_goal}
      Fitness level: ${fitness_level}
      As a professional coach:
      - Consider muscle group splits to avoid overtraining the same muscles on consecutive days
      - Design exercises that match the fitness level and account for any injuries
      - Structure the workouts to specifically target the user's fitness goal
      CRITICAL SCHEMA INSTRUCTIONS:
      - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
      - "sets" and "reps" MUST ALWAYS be NUMBERS, never strings
      - For example: "sets": 3, "reps": 10
      - Do NOT use text like "reps": "As many as possible" or "reps": "To failure"
      - Instead use specific numbers like "reps": 12 or "reps": 15
      - For cardio, use "sets": 1, "reps": 1 or another appropriate number
      - NEVER include strings for numerical fields
      - NEVER add extra fields not shown in the example below
      Return a JSON object with this EXACT structure:
      {
        "schedule": ["Monday", "Wednesday", "Friday"],
        "exercises": [
          {
            "day": "Monday",
            "routines": [
              {
                "name": "Exercise Name",
                "sets": 3,
                "reps": 10
              }
            ]
          }
        ]
      }
      DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;
      const workoutResponse =
        await aiModel.generateContent(workoutInstructions);
      const workoutPlanText = workoutResponse.response.text();
      let workoutPlan = JSON.parse(workoutPlanText);
      workoutPlan = normalizeWorkoutPlan(workoutPlan);
      const dietInstructions = `You are an experienced nutrition coach creating a personalized diet plan based on:
        Age: ${age}
        Height: ${height}
        Weight: ${weight}
        Fitness goal: ${fitness_goal}
        Dietary restrictions: ${dietary_restrictions}
        As a professional nutrition coach:
        - Calculate appropriate daily calorie intake based on the person's stats and goals
        - Create a balanced meal plan with proper macronutrient distribution
        - Include a variety of nutrient-dense foods while respecting dietary restrictions
        - Consider meal timing around workouts for optimal performance and recovery
        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
        - "dailyCalories" MUST be a NUMBER, not a string
        - DO NOT add fields like "supplements", "macros", "notes", or ANYTHING else
        - ONLY include the EXACT fields shown in the example below
        - Each meal should include ONLY a "name" and "foods" array
        Return a JSON object with this EXACT structure and no other fields:
        {
          "dailyCalories": 2000,
          "meals": [
            {
              "name": "Breakfast",
              "foods": ["Oatmeal with berries", "Greek yogurt", "Black coffee"]
            },
            {
              "name": "Lunch",
              "foods": ["Grilled chicken salad", "Whole grain bread", "Water"]
            }
          ]
        }
        DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;
      const dietResponse = await aiModel.generateContent(dietInstructions);
      const dietPlanText = dietResponse.response.text();
      let dietPlan = JSON.parse(dietPlanText);
      dietPlan = normalizeDietPlan(dietPlan);
      const planId = await ctx.runMutation(api.plans.savePlanToDatabase, {
        userId: user_id,
        dietPlan,
        isActive: true,
        workoutPlan,
        name: `${fitness_goal} Plan - ${new Date().toLocaleDateString()}`,
      });
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            planId,
            workoutPlan,
            dietPlan,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error generating fitness plan:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});
export default httpRoutes;
