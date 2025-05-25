import { query } from "./_generated/server";

// Get all incomes for the authenticated user
export const getIncomes = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const incomes = await ctx.db
      .query("incomes")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return incomes;
  },
});
