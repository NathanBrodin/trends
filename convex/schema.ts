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
});
