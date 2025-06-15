import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const savePlanToDatabase = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const currentActivePlans = await ctx.db
      .query("plans")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    for (const plan of currentActivePlans) {
      await ctx.db.patch(plan._id, { isActive: false });
    }
    const newPlanId = await ctx.db.insert("plans", args);
    return newPlanId;
  },
});
export const fetchUserPlans = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const userPlans = await ctx.db
      .query("plans")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    return userPlans;
  },
});
export const removePlan = mutation({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.planId);
  },
});
