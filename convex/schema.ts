import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  incomes: defineTable({
    // Core identification
    userId: v.string(), // Clerk user ID

    // Financial data
    grossAmount: v.number(),
    taxAmount: v.number(),
    netAmount: v.number(), // calculated: grossAmount - taxAmount
    currency: v.string(),

    // Categorization
    source: v.string(), // "salary", "freelance", "investment", "rental", "bonus", "other"
    description: v.optional(v.string()), // Custom description

    // Timing and frequency
    incomeDate: v.number(), // timestamp of when income was received
    payPeriod: v.string(), // "monthly", "bi-weekly", "weekly", "annual", "one-time"
    isRecurring: v.boolean(),

    // Tax and compliance
    taxYear: v.number(), // e.g., 2025

    // Metadata
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_user", ["userId"]),

  expenses: defineTable({
    // Core identification
    userId: v.string(), // Clerk user ID

    // Financial data
    amount: v.number(), // Always in minor units of the given currency (e.g. cents)
    currency: v.string(), // ISO 4217 currency code like "NOK", "EUR", "USD"

    // Categorization
    name: v.string(), // "Spotify Premium", "Rent", etc.
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

    // Timing and frequency
    date: v.string(), // ISO date string "2025-06-10"
    recurrence: v.optional(
      v.object({
        isRecurring: v.literal(true),
        dayOfMonth: v.number(), // e.g. 1–31
      }),
    ),
    isRecurring: v.boolean(), // mirrors recurrence field for easier querying

    source: v.union(
      v.literal("manual"),
      v.literal("imported"),
      v.literal("bank"),
    ),

    // Metadata
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_user", ["userId"]),
});
