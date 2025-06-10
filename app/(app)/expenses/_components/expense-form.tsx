"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode, useState } from "react";
import { AVAILABLE_CURRENCIES, Currency } from "@/lib/currencies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Doc } from "@/convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";

const expenseSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),

  currency: z.enum(AVAILABLE_CURRENCIES, {
    required_error: "Please select a currency",
  }),

  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name cannot be empty"),

  type: z.enum(["need", "want", "savings"], {
    required_error: "Please select an expense type",
  }),

  category: z.enum(
    [
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
    ],
    {
      required_error: "Please select a category",
    }
  ),

  notes: z.string().optional(),

  date: z
    .string({
      required_error: "Date is required",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),

  isRecurring: z.boolean(),

  dayOfMonth: z
    .number({
      invalid_type_error: "Day of month must be a number",
    })
    .min(1, "Day must be between 1 and 31")
    .max(31, "Day must be between 1 and 31")
    .optional(),

  source: z.enum(["manual", "imported", "bank"], {
    required_error: "Please select a source",
  }),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function ExpenseForm({
  dialogTrigger,
  expense,
}: {
  dialogTrigger: ReactNode;
  expense?: Doc<"expenses">;
}) {
  const [open, setOpen] = useState(false);
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const addExpense = useMutation(api.mutations.addExpense);
  const updateExpense = useMutation(api.mutations.updateExpense);

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: expense?.amount,
      currency: (expense?.currency as Currency) ?? "NOK",
      name: expense?.name ?? "",
      type: (expense?.type as ExpenseFormData["type"]) ?? "need",
      category: (expense?.category as ExpenseFormData["category"]) ?? "other",
      notes: expense?.notes,
      date: expense?.date ?? new Date().toISOString().split("T")[0],
      isRecurring: expense?.isRecurring ?? false,
      dayOfMonth: expense?.recurrence?.dayOfMonth ?? 1,
      source: (expense?.source as ExpenseFormData["source"]) ?? "manual",
    },
    mode: "onChange",
  });

  const isRecurring = form.watch("isRecurring");

  async function onSubmit(data: ExpenseFormData) {
    try {
      const expenseData = {
        amount: data.amount,
        currency: data.currency,
        name: data.name,
        type: data.type,
        category: data.category,
        notes: data.notes,
        date: data.date,
        isRecurring: data.isRecurring,
        recurrence: data.isRecurring && data.dayOfMonth
          ? {
              isRecurring: true as const,
              dayOfMonth: data.dayOfMonth,
            }
          : undefined,
        source: data.source,
      };

      if (expense?._id) {
        // Editing existing expense
        await updateExpense({
          expenseId: expense._id,
          ...expenseData,
        });
      } else {
        // Adding new expense
        await addExpense(expenseData);
      }
      form.reset();
      setOpen(false); // Close dialog on successful submission
    } catch (error) {
      console.error(
        `Failed to ${expense?._id ? "update" : "add"} expense:`,
        error
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="w-fit p-4">
        <DialogHeader>
          <DialogTitle>
            {expense?._id ? "Edit expense" : "Add a new expense"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amount"
                        {...field}
                        className="rounded-r-none"
                        type="number"
                        step="0.01"
                        onFocus={() => setIsAmountFocused(true)}
                        onBlur={() => setIsAmountFocused(false)}
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? 0 : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-transparent">
                      Currency{" "}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`rounded-l-none border-l-0 ${
                            isAmountFocused
                              ? "border-ring ring-ring/50 ring-[3px]"
                              : ""
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {AVAILABLE_CURRENCIES.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Spotify Premium, Rent, Groceries"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="need">Need</SelectItem>
                        <SelectItem value="want">Want</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="groceries">Groceries</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="subscriptions">Subscriptions</SelectItem>
                        <SelectItem value="eatingOut">Eating Out</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="loan">Loan</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Additional details about this expense"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Source</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="imported">Imported</SelectItem>
                        <SelectItem value="bank">Bank</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="isRecurring"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Recurring expense</FormLabel>
                      <FormDescription>
                        This expense occurs regularly (e.g., monthly subscription)
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isRecurring && (
              <FormField
                control={form.control}
                name="dayOfMonth"
                render={({ field }) => (
                  <FormItem className="max-w-[50%]">
                    <FormLabel>Day of Month</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Day (1-31)"
                        {...field}
                        type="number"
                        min="1"
                        max="31"
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? 1 : Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      The day of the month this expense occurs (1-31).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              className="hover:cursor-pointer sm:w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? expense?._id
                  ? "Updating..."
                  : "Submitting..."
                : expense?._id
                  ? "Update"
                  : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}