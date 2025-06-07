"use client";

import {
  TileCard,
  TileCardGroupContent,
  TileCardGroupTitle,
  TileCardTitle,
} from "@/components/tile-card";
import { useCurrency } from "@/lib/hooks/use-currency";

export function TotalBalanceCard({ subtitle }: { subtitle: string }) {
  const { formatAmount } = useCurrency();

  return (
    <TileCard className="row-span-2 sm:col-span-2">
      <TileCardGroupContent>
        <TileCardGroupTitle>Total Balance</TileCardGroupTitle>
        <TileCardTitle>{subtitle}</TileCardTitle>
        <TileCardGroupTitle>{formatAmount(0)}</TileCardGroupTitle>
      </TileCardGroupContent>
    </TileCard>
  );
}
