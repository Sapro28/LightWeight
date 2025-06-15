import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addJournalEntry = mutation({
  args: {
    userId: v.string(),
    date: v.string(),
    weight: v.number(),
    mood: v.optional(v.string()),
    energy: v.optional(v.string()),
    sleepHours: v.optional(v.number()),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("diary_entries", args);
  },
});

export const fetchUserJournalEntries = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("diary_entries")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const removeJournalEntry = mutation({
  args: { entryId: v.id("diary_entries") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.entryId);
  },
});
