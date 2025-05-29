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
import { Link } from "@/components/ui/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { AVAILABLE_CURRENCIES, Currency } from "@/lib/hooks/use-currency";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Doc } from "@/convex/_generated/dataModel";

const incomeSchema = z
  .object({
    grossAmount: z
      .number({
        required_error: "Gross amount is required",
        invalid_type_error: "Gross amount must be a number",
      })
      .positive("Gross amount must be positive")
      .min(0.01, "Gross amount must be at least 0.01"),

    taxAmount: z
      .number({
        required_error: "Tax amount is required",
        invalid_type_error: "Tax amount must be a number",
      })
      .min(0, "Tax amount cannot be negative"),

    currency: z.enum(AVAILABLE_CURRENCIES, {
      required_error: "Please select a currency",
    }),

    source: z.enum(
      ["salary", "freelance", "investment", "rental", "bonus", "other"],
      {
        required_error: "Please select an income source",
      },
    ),

    description: z.string().optional(),

    incomeDate: z
      .number({
        required_error: "Income date is required",
        invalid_type_error: "Income date must be a number",
      })
      .min(1, "Income date must be between 1 and 31")
      .max(31, "Income date must be between 1 and 31"),

    payPeriod: z.enum(["weekly", "monthly", "annual", "one-time"], {
      required_error: "Please select a pay period",
    }),

    isRecurring: z.boolean(),

    taxYear: z
      .number({
        required_error: "Tax year is required",
        invalid_type_error: "Tax year must be a number",
      })
      .min(2000, "Tax year must be 2000 or later")
      .max(
        new Date().getFullYear() + 1,
        "Tax year cannot be more than next year",
      ),
  })
  .refine((data) => data.taxAmount <= data.grossAmount, {
    message: "Tax amount cannot exceed gross amount",
    path: ["taxAmount"],
  });

type IncomeFormData = z.infer<typeof incomeSchema>;

export default function IncomeForm({
  dialogTrigger,
  income,
}: {
  dialogTrigger: ReactNode;
  income?: Doc<"incomes">;
}) {
  const addIncome = useMutation(api.mutations.addIncome);

  const form = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      grossAmount: income?.grossAmount,
      taxAmount: income?.taxAmount,
      currency: (income?.currency as Currency) ?? "NOK",
      source: (income?.source as IncomeFormData["source"]) ?? "salary",
      payPeriod:
        (income?.payPeriod as IncomeFormData["payPeriod"]) ?? "monthly",
      isRecurring: true,
      incomeDate: income?.incomeDate ?? 1,
      taxYear: income?.taxYear ?? new Date().getFullYear(),
    },
    mode: "onChange",
  });

  async function onSubmit(data: IncomeFormData) {
    try {
      await addIncome(data);
      form.reset();
    } catch (error) {
      console.error("Failed to add income:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="w-fit p-4">
        <DialogHeader>
          <DialogTitle>Add a new income</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="grossAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amount"
                        {...field}
                        className="rounded-r-none"
                        type="number"
                        step="0.01"
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
                        <SelectTrigger className="rounded-l-none border-l-0">
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
              name="taxAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amount"
                      {...field}
                      type="number"
                      step="0.01"
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? 0 : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="max-w-[95%]">
                    For Norway, refer to{" "}
                    <Link
                      variant="primary"
                      href="https://skattekalkulator.formueinntekt.skatt.skatteetaten.no/skattekalkulator/skatteplikt"
                    >
                      Skatteetaten tax calculator
                    </Link>{" "}
                    to calculate your expected tax.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Additional details about this income"
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
                name="incomeDate"
                render={({ field }) => (
                  <FormItem className="max-w-[50%]">
                    <FormLabel>Income Date</FormLabel>
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
                      The day of the month you receive your salary (1-31).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pay Period</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pay period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                        <SelectItem value="one-time">One-time</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="taxYear"
                render={({ field }) => (
                  <FormItem className="w-full max-w-[50%]">
                    <FormLabel>Tax Year</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Year"
                        {...field}
                        type="number"
                        min="2000"
                        max={new Date().getFullYear() + 1}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? new Date().getFullYear()
                              : Number(e.target.value);
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
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income Source</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select income source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="rental">Rental</SelectItem>
                        <SelectItem value="bonus">Bonus</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="hover:cursor-pointer sm:w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
