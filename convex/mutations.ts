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

export const updateIncome = mutation({
  args: {
    incomeId: v.id("incomes"),
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

    // First, verify the income exists and belongs to the user
    const income = await ctx.db.get(args.incomeId);
    if (!income) {
      throw new Error("Income record not found");
    }

    if (income.userId !== identity.subject) {
      throw new Error("Not authorized to update this income record");
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

    // Update the income record
    await ctx.db.patch(args.incomeId, {
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
      updatedAt: Date.now(),
    });

    return args.incomeId;
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

export const addExpense = mutation({
  args: {
    amount: v.number(),
    currency: v.string(),
    name: v.string(),
    type: v.union(v.literal("need"), v.literal("want"), v.literal("savings")),
    category: v.union(
      v.literal("rent"),
      v.literal("utilities"),
      v.literal("groceries"),
      v.literal("transport"),
      v.literal("subscriptions"),
      v.literal("eatingOut"),
      v.literal("travel"),
      v.literal("entertainment"),
      v.literal("clothing"),
      v.literal("loan"),
      v.literal("savings"),
      v.literal("other"),
    ),
    notes: v.optional(v.string()),
    date: v.string(),
    recurrence: v.optional(
      v.object({
        isRecurring: v.literal(true),
        dayOfMonth: v.number(),
      }),
    ),
    isRecurring: v.boolean(),
    source: v.union(
      v.literal("manual"),
      v.literal("imported"),
      v.literal("bank"),
    ),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Validate inputs
    if (args.amount <= 0) {
      throw new Error("Amount must be positive");
    }

    // Insert the expense record
    const expenseId = await ctx.db.insert("expenses", {
      userId: identity.subject, // Clerk user ID
      amount: args.amount,
      currency: args.currency,
      name: args.name,
      type: args.type,
      category: args.category,
      notes: args.notes,
      date: args.date,
      recurrence: args.recurrence,
      isRecurring: args.isRecurring,
      source: args.source,
      createdAt: Date.now(),
    });

    return expenseId;
  },
});

export const updateExpense = mutation({
  args: {
    expenseId: v.id("expenses"),
    amount: v.number(),
    currency: v.string(),
    name: v.string(),
    type: v.union(v.literal("need"), v.literal("want"), v.literal("savings")),
    category: v.union(
      v.literal("rent"),
      v.literal("utilities"),
      v.literal("groceries"),
      v.literal("transport"),
      v.literal("subscriptions"),
      v.literal("eatingOut"),
      v.literal("travel"),
      v.literal("entertainment"),
      v.literal("clothing"),
      v.literal("loan"),
      v.literal("savings"),
      v.literal("other"),
    ),
    notes: v.optional(v.string()),
    date: v.string(),
    recurrence: v.optional(
      v.object({
        isRecurring: v.literal(true),
        dayOfMonth: v.number(),
      }),
    ),
    isRecurring: v.boolean(),
    source: v.union(
      v.literal("manual"),
      v.literal("imported"),
      v.literal("bank"),
    ),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // First, verify the expense exists and belongs to the user
    const expense = await ctx.db.get(args.expenseId);
    if (!expense) {
      throw new Error("Expense record not found");
    }

    if (expense.userId !== identity.subject) {
      throw new Error("Not authorized to update this expense record");
    }

    // Validate inputs
    if (args.amount <= 0) {
      throw new Error("Amount must be positive");
    }

    // Update the expense record
    await ctx.db.patch(args.expenseId, {
      amount: args.amount,
      currency: args.currency,
      name: args.name,
      type: args.type,
      category: args.category,
      notes: args.notes,
      date: args.date,
      recurrence: args.recurrence,
      isRecurring: args.isRecurring,
      source: args.source,
      updatedAt: Date.now(),
    });

    return args.expenseId;
  },
});

export const deleteExpense = mutation({
  args: {
    expenseId: v.id("expenses"),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // First, verify the expense exists and belongs to the user
    const expense = await ctx.db.get(args.expenseId);
    if (!expense) {
      throw new Error("Expense record not found");
    }

    if (expense.userId !== identity.subject) {
      throw new Error("Not authorized to delete this expense record");
    }

    // Delete the expense record
    await ctx.db.delete(args.expenseId);

    return { success: true };
  },
});
