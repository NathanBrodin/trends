import { SideLines } from "@/components/backgrounds/side-lines";
import { Doc } from "@/convex/_generated/dataModel";

// Helper function to calculate different period amounts
function calculatePeriodAmounts(income: Doc<"incomes">) {
  const { grossAmount, netAmount, payPeriod } = income;

  // Convert everything to annual first
  let annualGross = grossAmount;
  let annualNet = netAmount;

  // If the income isn't already annual, convert it
  switch (payPeriod) {
    case "monthly":
      annualGross = grossAmount * 12;
      annualNet = netAmount * 12;
      break;
    case "weekly":
      annualGross = grossAmount * 52;
      annualNet = netAmount * 52;
      break;
    case "one-time":
      // For one-time income, we'll just show the amount as-is
      // and calculate monthly/hourly as if it were spread over a year
      break;
    // "annual" stays as-is
  }

  // Calculate monthly amounts
  const monthlyGross = annualGross / 12;
  const monthlyNet = annualNet / 12;

  // Calculate hourly amounts (assuming 37.5 hours/week, 52 weeks/year = 2080 hours)
  const hourlyGross = annualGross / 1950;
  const hourlyNet = annualNet / 1950;

  return {
    annual: { gross: annualGross, net: annualNet },
    monthly: { gross: monthlyGross, net: monthlyNet },
    hourly: { gross: hourlyGross, net: hourlyNet },
  };
}

export function IncomeCard({ income }: { income: Doc<"incomes"> }) {
  const amounts = calculatePeriodAmounts(income);

  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: income.currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="default-border-color dark:bg-offgray-800/8 group transform-all relative overflow-clip rounded-sm border bg-white/60 p-2 shadow-[6px_6px_0_hsla(219,_93%,_42%,_0.06)] duration-70 hover:!border-blue-300 hover:bg-blue-50/15 hover:[box-shadow:_6px_6px_0_hsla(219,_100%,_40%,_0.06),-6px_-6px_0_hsla(219,_100%,_40%,_0.06)] dark:shadow-[5px_5px_0_hsla(219,_90%,_60%,_0.08)] dark:hover:!border-blue-400/50 dark:hover:bg-blue-900/15 dark:hover:[box-shadow:_6px_6px_0_hsla(219,_93%,_60%,_0.08),-6px_-6px_0_hsla(219,_93%,_80%,_0.08)]">
      <SideLines />
      <div className="border-offgray-200 bg-cream-50 dark:bg-offgray-900 flex h-full flex-col gap-2 overflow-clip rounded-[2px] border p-2.5 dark:border-gray-600/80">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-lora h6 scroll-mt-24 text-lg font-medium text-pretty capitalize">
            {income.source}
          </h3>
          <p className="text-muted-foreground text-sm">{income.description}</p>
        </div>
        <table className="grid-border-color w-full table-auto rounded-md border">
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
                {formatCurrency(amounts.annual.gross)}
              </td>
              <td className="px-3 py-1 text-right">
                {formatCurrency(amounts.annual.net)}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-1 text-left">Monthly</td>
              <td className="px-3 py-1 text-right">
                {formatCurrency(amounts.monthly.gross)}
              </td>
              <td className="px-3 py-1 text-right">
                {formatCurrency(amounts.monthly.net)}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-1 text-left">Hourly</td>
              <td className="px-3 py-1 text-right">
                {formatCurrency(amounts.hourly.gross)}
              </td>
              <td className="px-3 py-1 text-right">
                {formatCurrency(amounts.hourly.net)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-cream-50 dark:bg-offgray-950 text-primary absolute right-0 bottom-0 left-0 z-2 flex transform items-center divide-x divide-blue-300 border-t border-blue-300 text-xs [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] transition-transform duration-200 group-hover:translate-y-0 md:translate-y-full dark:divide-blue-400/50 dark:border-blue-400/50 dark:text-blue-100 dark:[box-shadow:hsl(218,_13%,_70%,_0.05)_0_-2px_0_0_inset]">
        <button className="dark:bg-offgray-950 flex w-full cursor-pointer items-center justify-center gap-1.5 px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-950">
          Edit
        </button>
        <button className="dark:bg-offgray-950 flex w-full cursor-pointer items-center justify-center gap-1.5 px-3 py-2 hover:bg-blue-50 dark:hover:bg-blue-950">
          Delete
        </button>
      </div>
    </div>
  );
}
