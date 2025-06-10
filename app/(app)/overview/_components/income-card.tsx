"use client";

import { TileCard, TileCardTitle, TileCardValue } from "@/components/tile-card";
import { api } from "@/convex/_generated/api";
import { useCurrency } from "@/lib/hooks/use-currency";
import { useQuery } from "convex/react";
import { Amount } from "@/components/amount";

export function IncomeCard() {
  const { convertAmount, currency } = useCurrency();

  const incomes = useQuery(api.queries.getIncomes);

  const totalGrossIncome =
    incomes?.reduce((total, income) => {
      const convertedAmount = convertAmount(
        income.grossAmount,
        income.currency,
      );

      return total + convertedAmount;
    }, 0) ?? 0;

  const monthlyGrossIncome = totalGrossIncome / 12;

  const totalNetIncome =
    incomes?.reduce((total, income) => {
      const convertedAmount = convertAmount(income.netAmount, income.currency);

      return total + convertedAmount;
    }, 0) ?? 0;

  const monthlyNetIncome = totalNetIncome / 12;

  return (
    <TileCard
      href="/incomes"
      tooltipContent={
        <table className="w-full table-auto">
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
                <Amount
                  value={totalGrossIncome}
                  currency={currency}
                  animated={false}
                />
              </td>
              <td className="px-3 py-1 text-right">
                <Amount
                  value={totalNetIncome}
                  currency={currency}
                  animated={false}
                />
              </td>
            </tr>
            <tr>
              <td className="px-3 py-1 text-left">Monthly</td>
              <td className="px-3 py-1 text-right">
                <Amount
                  value={monthlyGrossIncome}
                  currency={currency}
                  animated={false}
                />
              </td>
              <td className="px-3 py-1 text-right">
                <Amount
                  value={monthlyNetIncome}
                  currency={currency}
                  animated={false}
                />
              </td>
            </tr>
          </tbody>
        </table>
      }
    >
      <TileCardTitle>Income</TileCardTitle>
      <TileCardValue>
        <Amount
          value={totalNetIncome}
          currency={currency}
          frequency="yearly"
          isLoading={incomes === undefined}
        />
      </TileCardValue>
    </TileCard>
  );
}
