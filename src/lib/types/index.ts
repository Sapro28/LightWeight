export interface Message {
  content: string;
  role: string;
  turn: number;
}
export interface ExerciseRoutine {
  name: string;
  sets: number;
  reps: number;
  description?: string;
}
export interface DailyWorkout {
  day: string;
  routines: ExerciseRoutine[];
}
export interface ExerciseProgram {
  schedule: string[];
  exercises: DailyWorkout[];
}
export interface Meal {
  name: string;
  foods: string[];
}
export interface MealPlan {
  dailyCalories: number;
  meals: Meal[];
}
