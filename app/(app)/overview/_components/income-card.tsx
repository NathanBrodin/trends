"use client";

import { TileCard, TileCardTitle, TileCardValue } from "@/components/tile-card";
import { useFrequency } from "@/lib/hooks/use-frequency";

export function IncomeCard() {
  const { formatAmount } = useFrequency();

  return (
    <TileCard>
      <TileCardTitle>Income</TileCardTitle>
      <TileCardValue>{formatAmount(0)}</TileCardValue>
    </TileCard>
  );
}
