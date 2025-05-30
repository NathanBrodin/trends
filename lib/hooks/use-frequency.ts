"use client";

import { useSearchParams } from "next/navigation";

// Define available frequencies explicitly
export const AVAILABLE_FREQUENCIES = ["monthly", "annual"] as const;

export type Frequency = (typeof AVAILABLE_FREQUENCIES)[number];

// Frequency display mapping
export const FREQUENCY_LABELS: Record<Frequency, string> = {
  monthly: "Månedlig",
  annual: "Årlig",
};

export const FREQUENCY_SHORT_LABELS: Record<Frequency, string> = {
  monthly: "mnd",
  annual: "år",
};

export function useFrequency(defaultFrequency: Frequency = "monthly") {
  const searchParams = useSearchParams();

  const frequency =
    (searchParams.get("frequency") as Frequency) ?? defaultFrequency;

  const convertToFrequency = (
    amount: number,
    fromFrequency: Frequency,
  ): number => {
    if (fromFrequency === frequency) {
      return amount;
    }

    if (fromFrequency === "monthly" && frequency === "annual") {
      return amount * 12;
    } else if (fromFrequency === "annual" && frequency === "monthly") {
      return amount / 12;
    }

    return amount;
  };

  const formatAmount = (amount: number, fromFrequency?: Frequency) => {
    const convertedAmount = fromFrequency
      ? convertToFrequency(amount, fromFrequency)
      : amount;

    return new Intl.NumberFormat("nb-NO", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  return {
    frequency,
    frequencyLabel: FREQUENCY_LABELS[frequency],
    frequencyShortLabel: FREQUENCY_SHORT_LABELS[frequency],
    convertToFrequency,
    formatAmount,
    availableFrequencies: AVAILABLE_FREQUENCIES,
  };
}
