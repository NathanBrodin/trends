"use client";

import { TileCard, TileCardTitle, TileCardValue } from "@/components/tile-card";
import { useFrequency } from "@/lib/hooks/use-frequency";

export function ExpensesCard() {
  const { formatAmount } = useFrequency();

  return (
    <TileCard className="row-span-1 sm:row-span-2" href="/expenses">
      <TileCardTitle>Expenses</TileCardTitle>
      <TileCardValue>{formatAmount(0)}</TileCardValue>
    </TileCard>
  );
}
