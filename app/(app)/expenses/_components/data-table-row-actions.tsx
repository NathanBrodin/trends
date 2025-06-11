"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "@/convex/_generated/dataModel";
import { categories } from "../_data/data";
import ExpenseForm from "./expense-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const expense = row.original as Doc<"expenses">;
  const deleteExpense = useMutation(api.mutations.deleteExpense);
  const updateExpense = useMutation(api.mutations.updateExpense);

  async function handleDelete() {
    const promise = deleteExpense({ expenseId: expense._id });
    toast.promise(promise, {
      loading: "Loading...",
      success: "Expense has been deleted.",
      error: "Error",
    });
  }

  async function handleCategoryChange(
    newCategory: Doc<"expenses">["category"],
  ) {
    // Only update if the category actually changed
    if (newCategory === expense.category) {
      return;
    }

    const promise = updateExpense({
      expenseId: expense._id,
      amount: expense.amount,
      currency: expense.currency,
      name: expense.name,
      type: expense.type,
      category: newCategory,
      notes: expense.notes,
      date: expense.date,
      recurrence: expense.recurrence,
      isRecurring: expense.isRecurring,
      source: expense.source,
    });
    toast.promise(promise, {
      loading: "Updating category...",
      success: "Category has been updated.",
      error: "Failed to update category",
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex size-8! p-0"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={expense.category}>
              {categories.map((category) => (
                <DropdownMenuRadioItem
                  key={category}
                  value={category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <ExpenseForm
          dialogTrigger={<DropdownMenuItem>Edit</DropdownMenuItem>}
          expense={expense}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
