import { SideLines } from "@/components/backgrounds/side-lines";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useCurrency } from "@/lib/hooks/use-currency";
import { cn, formatOrdinalDate } from "@/lib/utils";
import { useMutation } from "convex/react";
import { HandCoinsIcon, LandmarkIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import IncomeForm from "./income-form";

// Helper function to calculate different period amounts
function calculatePeriodAmounts(income: Doc<"incomes">) {
  const { grossAmount, netAmount } = income;

  // Calculate monthly amounts
  const monthlyGross = grossAmount / 12;
  const monthlyNet = netAmount / 12;

  // Calculate hourly amounts (assuming 37.5 hours/week, 52 weeks/year = 2080 hours)
  const hourlyGross = grossAmount / 1950;
  const hourlyNet = netAmount / 1950;

  return {
    annual: { gross: grossAmount, net: netAmount },
    monthly: { gross: monthlyGross, net: monthlyNet },
    hourly: { gross: hourlyGross, net: hourlyNet },
  };
}

export function IncomeCard({ income }: { income: Doc<"incomes"> }) {
  const { formatAmount } = useCurrency();
  const deleteIncome = useMutation(api.mutations.deleteIncome);
  const amounts = calculatePeriodAmounts(income);

  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const promise = deleteIncome({ incomeId: income._id });
    toast.promise(promise, {
      loading: "Loading...",
      success: "Income has been deleted.",
      error: "Error",
    });
    setIsDeleting(false);
  }

  return (
    <div
      className={cn(
        "default-border-color dark:bg-offgray-800/8 group transform-all relative h-fit w-full overflow-clip rounded-sm border bg-white/60 p-2 shadow-[6px_6px_0_hsla(219,_93%,_42%,_0.06)] duration-70 hover:border-blue-300 hover:bg-blue-50/15 hover:[box-shadow:_6px_6px_0_hsla(219,_100%,_40%,_0.06),-6px_-6px_0_hsla(219,_100%,_40%,_0.06)] dark:shadow-[5px_5px_0_hsla(219,_90%,_60%,_0.08)] dark:hover:border-blue-400/50 dark:hover:bg-blue-900/15 dark:hover:[box-shadow:_6px_6px_0_hsla(219,_93%,_60%,_0.08),-6px_-6px_0_hsla(219,_93%,_80%,_0.08)]",
        isDeleting &&
          "hover:border-destructive hover:!shadow-[6px_6px_0_color-mix(in_oklch,var(--destructive),transparent_54%),-6px_-6px_0_color-mix(in_oklch,var(--destructive),transparent_54%)]",
      )}
    >
      <SideLines />
      <div className="border-offgray-200 dark:bg-offgray-900/10 flex h-fit flex-col gap-2 overflow-clip rounded-[2px] border bg-white px-2.5 py-6 dark:border-gray-600/80">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-lora scroll-mt-24 text-lg font-medium text-pretty capitalize">
            {income.source}
          </h3>
          <p className="text-muted-foreground text-sm">{income.description}</p>
          {!income.description && <p className="h-5 w-40"></p>}
        </div>
        <table className="grid-border-color text-primary w-full table-auto rounded-xl border text-sm">
          <thead className="bg-blue-50 dark:bg-blue-900/20">
            <tr>
              <th className="px-3 py-1 text-left font-medium">Period</th>
              <th className="px-3 py-1 text-right font-medium">Gross</th>
              <th className="px-3 py-1 text-right font-medium">Net</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-200/30 dark:divide-blue-400/20">
            <tr>
              <td className="px-3 py-1 text-left">Annual</td>
              <td className="px-3 py-1 text-right">
                {formatAmount(amounts.annual.gross, income.currency)}
              </td>
              <td className="px-3 py-1 text-right">
                {formatAmount(amounts.annual.net, income.currency)}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-1 text-left">Monthly</td>
              <td className="px-3 py-1 text-right">
                {formatAmount(amounts.monthly.gross, income.currency)}
              </td>
              <td className="px-3 py-1 text-right">
                {formatAmount(amounts.monthly.net, income.currency)}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-1 text-left">Hourly</td>
              <td className="px-3 py-1 text-right">
                {formatAmount(amounts.hourly.gross, income.currency)}
              </td>
              <td className="px-3 py-1 text-right">
                {formatAmount(amounts.hourly.net, income.currency)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mb-4 flex flex-col gap-1 sm:mb-0">
          <p className="text-muted-foreground flex items-center gap-1 text-[.75rem]">
            <LandmarkIcon className="size-3" />
            Paying{" "}
            {(
              ((income.grossAmount - income.netAmount) / income.grossAmount) *
              100
            ).toFixed(2)}
            % of tax in {income.taxYear}.
          </p>
          <p className="text-muted-foreground flex items-center gap-1 text-[.75rem]">
            <HandCoinsIcon className="size-3" />
            Received {income.payPeriod} on the{" "}
            {formatOrdinalDate(income.incomeDate)}.
          </p>
        </div>
      </div>
      <div className="bg-cream-50 dark:bg-offgray-950 text-primary absolute right-0 bottom-0 left-0 z-2 flex transform items-center divide-x divide-blue-300 border-t border-blue-300 text-xs [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] transition-transform duration-200 group-hover:translate-y-0 sm:translate-y-full dark:divide-blue-400/50 dark:border-blue-400/50 dark:text-blue-100 dark:[box-shadow:hsl(218,_13%,_70%,_0.05)_0_-2px_0_0_inset]">
        {!isDeleting ? (
          <>
            <IncomeForm
              income={income}
              dialogTrigger={
                <button className="dark:bg-offgray-950 flex w-full cursor-pointer items-center justify-center gap-1.5 px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-950">
                  Edit
                </button>
              }
            />
            <button
              onClick={() => setIsDeleting(true)}
              className="dark:bg-offgray-950 flex w-full cursor-pointer items-center justify-center gap-1.5 px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsDeleting(false)}
              className="dark:bg-offgray-950 flex w-full cursor-pointer items-center justify-center gap-1.5 px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-destructive/50 hover:bg-destructive/40 flex w-full cursor-pointer items-center justify-center gap-1.5 px-3 py-2"
            >
              Yes, Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function LoadingIncomeCard() {
  const { formatAmount } = useCurrency();

  return (
    <div
      className={cn(
        "default-border-color dark:bg-offgray-800/8 group transform-all relative h-fit w-full overflow-clip rounded-sm border bg-white/60 p-2 shadow-[6px_6px_0_hsla(219,_93%,_42%,_0.06)] duration-70 hover:border-blue-300 hover:bg-blue-50/15 hover:[box-shadow:_6px_6px_0_hsla(219,_100%,_40%,_0.06),-6px_-6px_0_hsla(219,_100%,_40%,_0.06)] dark:shadow-[5px_5px_0_hsla(219,_90%,_60%,_0.08)] dark:hover:border-blue-400/50 dark:hover:bg-blue-900/15 dark:hover:[box-shadow:_6px_6px_0_hsla(219,_93%,_60%,_0.08),-6px_-6px_0_hsla(219,_93%,_80%,_0.08)]",
      )}
    >
      <SideLines />
      <div className="border-offgray-200 dark:bg-offgray-900/10 flex h-fit w-full flex-col gap-2 overflow-clip rounded-[2px] border bg-white px-2.5 py-6 dark:border-gray-600/80">
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-5 w-40" />
        </div>
        <table className="grid-border-color text-primary w-full table-auto rounded-xl border text-sm">
          <thead className="bg-blue-50 dark:bg-blue-900/20">
            <tr>
              <th className="px-3 py-1 text-left font-medium">Period</th>
              <th className="px-3 py-1 text-right font-medium">Gross</th>
              <th className="px-3 py-1 text-right font-medium">Net</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-200/30 dark:divide-blue-400/20">
            <tr>
              <td className="px-3 py-1 text-left">Annual</td>
              <td className="px-3 py-1 text-right">{formatAmount(0)}</td>
              <td className="px-3 py-1 text-right">{formatAmount(0)}</td>
            </tr>
            <tr>
              <td className="px-3 py-1 text-left">Monthly</td>
              <td className="px-3 py-1 text-right">{formatAmount(0)}</td>
              <td className="px-3 py-1 text-right">{formatAmount(0)}</td>
            </tr>
            <tr>
              <td className="px-3 py-1 text-left">Hourly</td>
              <td className="px-3 py-1 text-right">{formatAmount(0)}</td>
              <td className="px-3 py-1 text-right">{formatAmount(0)}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground flex items-center gap-1 text-[.75rem]">
            <LandmarkIcon className="size-3" />
            Paying <Skeleton className="h-4 w-8" /> % of tax in{" "}
            <Skeleton className="h-4 w-12" />.
          </p>
          <p className="text-muted-foreground flex items-center gap-1 text-[.75rem]">
            <HandCoinsIcon className="size-3" />
            Received <Skeleton className="h-4 w-16" /> on the{" "}
            <Skeleton className="h-4 w-8" />.
          </p>
        </div>
      </div>
    </div>
  );
}

export function EmptyIncomeCard() {
  return (
    <div
      className={cn(
        "default-border-color dark:bg-offgray-800/8 group transform-all relative h-full min-h-[290px] w-full overflow-clip rounded-sm border bg-white/60 p-2 opacity-50 shadow-[6px_6px_0_hsla(219,_93%,_42%,_0.06)] duration-70 dark:shadow-[5px_5px_0_hsla(219,_90%,_60%,_0.08)]",
      )}
    >
      <IncomeForm
        dialogTrigger={
          <div className="border-offgray-200 dark:bg-offgray-900/10 flex h-full items-center justify-center gap-2 overflow-clip rounded-[2px] border bg-white px-2.5 py-4 opacity-100 hover:cursor-pointer dark:border-gray-600/80">
            <div className="flex flex-col items-center gap-2">
              <h4 className="h6 font-lora text-muted-foreground font-normal text-pretty">
                New income source
              </h4>
              <p className="text-muted-foreground max-w-[95%] text-center text-xs">
                Add salary, freelance, or other income.
              </p>
              <button className="text-primary hover:bg-muted w-min rounded-full border p-1 hover:cursor-pointer">
                <PlusIcon />
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
