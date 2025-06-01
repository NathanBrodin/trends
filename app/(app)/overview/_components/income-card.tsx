"use client";

import { TileCard, TileCardTitle, TileCardValue } from "@/components/tile-card";
import { api } from "@/convex/_generated/api";
import { useCurrency } from "@/lib/hooks/use-currency";
import { useFrequency } from "@/lib/hooks/use-frequency";
import { useQuery } from "convex/react";

export function IncomeCard() {
  const { convertToFrequency } = useFrequency();
  const { convertAmount, formatAmount } = useCurrency();

  const incomes = useQuery(api.queries.getIncomes);

  const totalIncome =
    incomes?.reduce((total, income) => {
      // First convert currency
      const convertedAmount = convertAmount(
        income.grossAmount,
        income.currency,
      );

      return total + convertToFrequency(convertedAmount, "yearly");
    }, 0) ?? 0;

  return (
    <TileCard>
      <TileCardTitle>Income</TileCardTitle>
      <TileCardValue>{formatAmount(totalIncome)}</TileCardValue>
    </TileCard>
  );
}
