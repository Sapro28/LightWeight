import { mutation } from "./_generated/server";
import { v } from "convex/values";
export const createUserIfNotExists = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userExists = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
    if (userExists) return;
    return await ctx.db.insert("users", args);
  },
});
export const modifyExistingUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userRecord = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (!userRecord) return;
    return await ctx.db.patch(userRecord._id, args);
  },
});
