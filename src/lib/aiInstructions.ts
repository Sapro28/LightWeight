export const createNutritionPlan = (userRequest: string) => {
  const promptTemplate = `
You are a professional nutrition coach creating a personalized diet plan based on: "${userRequest}"

Consider:
- User's fitness goals (weight loss, muscle gain, maintenance)
- Any dietary preferences or restrictions mentioned
- Appropriate calorie intake for their goals
- Balanced macronutrient distribution
- Variety of nutritious foods

CRITICAL INSTRUCTIONS:
- Output MUST be valid JSON only
- NO markdown formatting (no \`\`\`json)
- NO additional text or explanations
- Use EXACTLY this structure with ONLY these fields:

{
  "dailyCalories": 2000,
  "meals": [
    {
      "name": "Breakfast",
      "foods": ["Oatmeal with berries", "Greek yogurt", "Coffee"]
    },
    {
      "name": "Lunch", 
      "foods": ["Grilled chicken salad", "Quinoa", "Fresh Juice"]
    },
    {
      "name": "Dinner",
      "foods": ["Baked salmon", "Roasted vegetables", "Brown rice"]
    },
    {
      "name": "Snack",
      "foods": ["Apple", "Handful of almonds"]
    }
  ]
}

Requirements:
- "dailyCalories" must be a number (not string)
- Include 3-4 meals/snacks appropriate for their goals
- Each meal needs a "name" and "foods" array
- Foods should be specific and realistic
- DO NOT add extra fields like "macros", "instructions", etc.
`;
  return promptTemplate;
};

export const buildWorkoutRoutine = (userRequest: string) => {
  const promptTemplate = `
You are an experienced fitness trainer creating a workout plan based on: "${userRequest}"

Consider:
- User's fitness level (beginner, intermediate, advanced)
- Their stated goals (strength, cardio, weight loss, muscle gain)
- Equipment availability mentioned
- Balanced muscle group targeting
- Appropriate rest periods

CRITICAL INSTRUCTIONS:
- Output MUST be valid JSON only
- NO markdown formatting (no \`\`\`json)
- NO additional text or explanations
- Use EXACTLY this structure with ONLY these fields:

{
  "schedule": ["Monday", "Wednesday", "Friday"],
  "exercises": [
    {
      "day": "Monday",
      "routines": [
        {
          "name": "Bench Press",
          "sets": 3,
          "reps": 10
        },
        {
          "name": "Dumbbell Curls", 
          "sets": 3,
          "reps": 12
        }
      ]
    },
    {
      "day": "Wednesday",
      "routines": [
        {
          "name": "Squats",
          "sets": 4,
          "reps": 8
        }
      ]
    }
  ]
}

Requirements:
- "sets" and "reps" MUST be numbers (not strings)
- MUST create workout plan for EXACTLY the number of training days specified by the user
- If user wants 7 days, create 7 workout days. If user wants 3 days, create 3 workout days
- Follow the user's specified training frequency EXACTLY - this is non-negotiable
- 4-6 exercises per day appropriate for their level
- Exercise names should be clear and specific
- The "schedule" array must contain the exact number of days the user requested
- DO NOT add extra fields like "restTime", "weight", "notes", etc.
`;
  return promptTemplate;
};
