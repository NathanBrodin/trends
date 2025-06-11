import { Doc } from "@/convex/_generated/dataModel";

type ExpenseCategory = Doc<"expenses">["category"];
export const categories = [
  "rent",
  "utilities",
  "groceries",
  "transport",
  "subscriptions",
  "eatingOut",
  "travel",
  "entertainment",
  "clothing",
  "loan",
  "savings",
  "other",
] as ExpenseCategory[];
