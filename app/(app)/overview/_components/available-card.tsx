"use client";

import { TileCard, TileCardTitle, TileCardValue } from "@/components/tile-card";
import { useFrequency } from "@/lib/hooks/use-frequency";

export function AvailableCard() {
  const { formatAmount } = useFrequency();

  return (
    <TileCard>
      <TileCardTitle>Free to Spend</TileCardTitle>
      <TileCardValue>{formatAmount(0)}</TileCardValue>
    </TileCard>
  );
}
