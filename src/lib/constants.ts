export const APP_NAME = "LightWeight";
export const APP_VERSION = "1.0.0";
export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];
export const WORKOUT_TYPES = [
  { value: "strength", label: "Strength Training" },
  { value: "cardio", label: "Cardiovascular" },
  { value: "flexibility", label: "Flexibility & Mobility" },
  { value: "hiit", label: "HIIT" },
  { value: "crossfit", label: "CrossFit" },
];
export const DIET_TYPES = [
  { value: "balanced", label: "Balanced" },
  { value: "keto", label: "Ketogenic" },
  { value: "vegan", label: "Vegan" },
  { value: "paleo", label: "Paleo" },
  { value: "mediterranean", label: "Mediterranean" },
];
export const API_ENDPOINTS = {
  GENERATE_WORKOUT: "/api/generate-workout",
  GENERATE_DIET: "/api/generate-diet",
  USER_PROFILE: "/api/user-profile",
};
export const STORAGE_KEYS = {
  USER_PREFERENCES: "lightweight_user_prefs",
  THEME: "lightweight_theme",
  AUTH_TOKEN: "lightweight_auth_token",
};
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
};
export const CHART_COLORS = [
  "#18cef2",
  "#0891b2",
  "#6366f1",
  "#10b981",
  "#ef4444",
];
