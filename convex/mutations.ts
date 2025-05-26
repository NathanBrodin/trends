import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addIncome = mutation({
  args: {
    grossAmount: v.number(),
    taxAmount: v.number(),
    currency: v.string(),
    source: v.string(),
    description: v.optional(v.string()),
    incomeDate: v.number(),
    payPeriod: v.string(),
    isRecurring: v.boolean(),
    taxYear: v.number(),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Calculate net amount
    const netAmount = args.grossAmount - args.taxAmount;

    // Validate inputs
    if (args.grossAmount <= 0) {
      throw new Error("Gross amount must be positive");
    }
    if (args.taxAmount < 0) {
      throw new Error("Tax amount cannot be negative");
    }
    if (args.taxAmount > args.grossAmount) {
      throw new Error("Tax amount cannot exceed gross amount");
    }

    // Insert the income record
    const incomeId = await ctx.db.insert("incomes", {
      userId: identity.subject, // Clerk user ID
      grossAmount: args.grossAmount,
      taxAmount: args.taxAmount,
      netAmount: netAmount,
      currency: args.currency,
      source: args.source,
      description: args.description,
      incomeDate: args.incomeDate,
      payPeriod: args.payPeriod,
      isRecurring: args.isRecurring,
      taxYear: args.taxYear,
      createdAt: Date.now(),
    });

    return incomeId;
  },
});

export const deleteIncome = mutation({
  args: {
    incomeId: v.id("incomes"),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // First, verify the income exists and belongs to the user
    const income = await ctx.db.get(args.incomeId);
    if (!income) {
      throw new Error("Income record not found");
    }

    if (income.userId !== identity.subject) {
      throw new Error("Not authorized to delete this income record");
    }

    // Delete the income record
    await ctx.db.delete(args.incomeId);

    return { success: true };
  },
});
