"use client";

import { TileCard, TileCardTitle, TileCardValue } from "@/components/tile-card";
import { api } from "@/convex/_generated/api";
import { useCurrency } from "@/lib/hooks/use-currency";
import { useQuery } from "convex/react";
import { Amount } from "@/components/amount";

export function IncomeCard() {
  const { convertAmount, currency } = useCurrency();

  const incomes = useQuery(api.queries.getIncomes);

  const totalIncome =
    incomes?.reduce((total, income) => {
      const convertedAmount = convertAmount(
        income.grossAmount,
        income.currency,
      );

      return total + convertedAmount;
    }, 0) ?? 0;

  return (
    <TileCard>
      <TileCardTitle>Income</TileCardTitle>
      <TileCardValue>
        <Amount value={totalIncome} currency={currency} frequency="yearly" />
      </TileCardValue>
    </TileCard>
  );
}
