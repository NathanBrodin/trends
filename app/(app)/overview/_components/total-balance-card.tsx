"use client";

import {
  TileCard,
  TileCardGroupContent,
  TileCardGroupTitle,
  TileCardTitle,
} from "@/components/tile-card";
import { useCurrency } from "@/lib/hooks/use-currency";

export function TotalBalanceCard() {
  const { formatAmount } = useCurrency();

  const subtitles = [
    "Everything you’ve got.",
    "Your money, right now.",
    "All in, right here.",
    "Your full stack of cash.",
    "The full picture.",
    "This is the big number.",
    "All accounts, all yours.",
  ];

  const randomIndex = Math.floor(Math.random() * subtitles.length);
  const subtitle = subtitles[randomIndex];

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
