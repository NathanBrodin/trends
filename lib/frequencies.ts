export const AVAILABLE_FREQUENCIES = ["monthly", "yearly", "once"] as const;

export type Frequency = (typeof AVAILABLE_FREQUENCIES)[number];

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  monthly: "Monthly",
  yearly: "Yearly",
  once: "One Time",
};

export const FREQUENCY_SHORT_LABELS: Record<Frequency, string> = {
  monthly: "month",
  yearly: "year",
  once: "",
};

export const convertToFrequency = (
  amount: number,
  from: Frequency,
  to: Frequency,
): number => {
  if (from === to) {
    return amount;
  }

  if (from === "yearly" && to === "monthly") {
    return amount / 12;
  } else if (from === "monthly" && to === "yearly") {
    return amount * 12;
  }

  return amount;
};

export function toFrequency(
  value: unknown,
  fallback: Frequency = "monthly",
): Frequency {
  if (
    typeof value === "string" &&
    AVAILABLE_FREQUENCIES.includes(value as Frequency)
  ) {
    return value as Frequency;
  }
  return fallback;
}
