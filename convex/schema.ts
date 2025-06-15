import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  plans: defineTable({
    userId: v.string(),
    name: v.string(),
    workoutPlan: v.optional(
      v.object({
        schedule: v.array(v.string()),
        exercises: v.array(
          v.object({
            day: v.string(),
            routines: v.array(
              v.object({
                name: v.string(),
                sets: v.union(v.float64(), v.string()),
                reps: v.union(v.float64(), v.string()),
                description: v.optional(v.string()),
              })
            ),
          })
        ),
      })
    ),
    dietPlan: v.optional(
      v.object({
        dailyCalories: v.number(),
        meals: v.array(
          v.object({
            name: v.string(),
            foods: v.array(v.string()),
          })
        ),
      })
    ),
    isActive: v.boolean(),
  })
    .index("by_user_id", ["userId"])
    .index("by_active", ["isActive"]),
  diary_entries: defineTable({
    userId: v.string(),
    date: v.string(),
    weight: v.number(),
    mood: v.optional(v.string()),
    energy: v.optional(v.string()),
    sleepHours: v.optional(v.number()),
    note: v.optional(v.string()),
  }).index("by_user", ["userId"]),
});
