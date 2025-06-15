export const USER_PROGRAMS = [
  {
    id: 1,
    first_name: "Michael",
    profilePic: "https://randomuser.me/api/portraits/men/79.jpg",
    fitness_goal: "Weight Loss",
    height: "5'8\"",
    weight: "210 lbs",
    age: 34,
    workout_days: 4,
    injuries: "Hamstring Pain",
    fitness_level: "Beginner",
    equipment_access: "Home gym",
    dietary_restrictions: "Lactose intolerant",
    workout_plan: {
      title: "Beginner Weight Loss Program",
      weekly_schedule: [
        { day: "Monday", focus: "Full Body Cardio", duration: "30 min" },
        { day: "Wednesday", focus: "Core & Lower Body", duration: "30 min" },
        { day: "Friday", focus: "HIIT Training", duration: "20 min" },
        {
          day: "Saturday",
          focus: "Swimming - Active Recovery",
          duration: "40 min",
        },
      ],
      description:
        "This program focuses on building a consistent exercise habit with joint-friendly movements that protect your hamstring. The mix of cardio and strength training supports weight loss while preserving muscle mass.",
    },
    diet_plan: {
      title: "Balanced Nutrition Plan (Lactose-Free)",
      daily_calories: "1,600 calories",
      macros: { protein: "40%", carbs: "40%", fats: "20%" },
      meal_examples: [
        {
          meal: "Breakfast",
          example: "Oatmeal with almond milk, berries, and chia seeds",
        },
        {
          meal: "Lunch",
          example: "Grilled chicken salad with low calorie dressing",
        },
        {
          meal: "Dinner",
          example: "Baked salmon with quinoa and roasted potatoes",
        },
        {
          meal: "Snacks",
          example: "Apple with ricecake, dairy-free yogurt with nuts",
        },
      ],
      description:
        "This meal plan avoids dairy products while providing balanced nutrition to support weight loss goals. Focus is on whole foods with adequate protein to preserve muscle during weight loss.",
    },
  },
  {
    id: 2,
    first_name: "John",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    fitness_goal: "Muscle Gain",
    height: "5'10\"",
    weight: "160 lbs",
    age: 32,
    workout_days: 5,
    injuries: "None",
    fitness_level: "Intermediate",
    equipment_access: "Full gym",
    dietary_restrictions: "None",
    workout_plan: {
      title: "Hypertrophy-Focused Muscle Building",
      weekly_schedule: [
        { day: "Monday", focus: "Chest & Triceps", duration: "1 hr 20 min" },
        { day: "Tuesday", focus: "Back & Biceps", duration: "1 hr 15 min" },
        { day: "Wednesday", focus: "Recovery/Cardio", duration: "30 min" },
        { day: "Thursday", focus: "Shoulders & Abs", duration: "1 hr 10 min" },
        { day: "Friday", focus: "Legs", duration: "1 hr 30 min" },
      ],
      description:
        "This program implements a traditional workout split with emphasis on progressive overload. Each muscle group is trained with moderate volume and adequate recovery to maximize muscle growth.",
    },
    diet_plan: {
      title: "Muscle Building Nutrition Plan",
      daily_calories: "2,800 calories",
      macros: { protein: "45%", carbs: "40%", fats: "15%" },
      meal_examples: [
        {
          meal: "Breakfast",
          example: "Oatmeal with banana and whey protein",
        },
        {
          meal: "Lunch",
          example: "200g Chicken, 150g rice, and 100g veg",
        },
        {
          meal: "Dinner",
          example: "150g Steak with sweet potato and green vegetables",
        },
        {
          meal: "Snacks",
          example: "Protein shake with fruit, Greek yogurt with honey",
        },
      ],
      description:
        "This high-protein, calorie-surplus diet supports muscle growth while minimizing fat gain. Carbohydrates are timed around workouts for optimal performance and recovery.",
    },
  },
  {
    id: 3,
    first_name: "Elena",
    profilePic: "https://randomuser.me/api/portraits/women/94.jpg",
    fitness_goal: "General Fitness",
    height: "5'4\"",
    weight: "130 lbs",
    age: 45,
    workout_days: 3,
    injuries: "Knee pain",
    fitness_level: "Intermediate",
    equipment_access: "Bodyweight only",
    dietary_restrictions: "Vegetarian",
    workout_plan: {
      title: "Functional Fitness Program",
      weekly_schedule: [
        { day: "Monday", focus: "Bodyweight Strength", duration: "40 min" },
        { day: "Wednesday", focus: "Mobility & Balance", duration: "35 min" },
        { day: "Saturday", focus: "Cardio & Core", duration: "40 min" },
      ],
      description:
        "This program focuses on functional movement patterns that improve everyday performance while being gentle on the knees. Emphasis is on core strength, mobility, and cardiovascular health.",
    },
    diet_plan: {
      title: "Balanced Vegetarian Nutrition",
      daily_calories: "1,800 calories",
      macros: { protein: "25%", carbs: "50%", fats: "25%" },
      meal_examples: [
        {
          meal: "Breakfast",
          example: "Tofu scramble with vegetables and whole grain toast",
        },
        { meal: "Lunch", example: "Lentil soup with mixed green salad" },
        {
          meal: "Dinner",
          example: "Chickpea curry with brown rice and vegetables",
        },
        {
          meal: "Snacks",
          example: "Mixed nuts, hummus with vegetables, protein smoothie",
        },
      ],
      description:
        "This vegetarian meal plan ensures adequate protein intake from plant sources. It focuses on whole foods and supports your active lifestyle while accommodating knee issues with anti-inflammatory food choices.",
    },
  },
];
