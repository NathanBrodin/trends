"use client";

import NumberFlow from "@number-flow/react";
import { useCurrency } from "@/lib/hooks/use-currency";
import { useFrequency, type Frequency } from "@/lib/hooks/use-frequency";

type AmountProps = {
  value: number;
  currency: string;
  frequency?: Frequency;
  animated?: boolean;
  showFrequency?: boolean;
};

export function Amount({
  value,
  currency,
  frequency,
  animated = true,
  showFrequency = false,
}: AmountProps) {
  const { currency: targetCurrency, convertAmount } = useCurrency();
  const { convertToFrequency, frequencyShortLabel } = useFrequency();

  // First convert currency
  const convertedValue = convertAmount(value, currency);

  // Then convert frequency if provided
  const finalValue = frequency
    ? convertToFrequency(convertedValue, frequency)
    : convertedValue;

  const formatConfig = {
    style: "currency" as const,
    currency: targetCurrency,
    trailingZeroDisplay: "stripIfInteger" as const,
  };

  if (!animated) {
    const formatted = new Intl.NumberFormat("nb-NO", formatConfig).format(
      finalValue,
    );
    return (
      <span>
        {formatted}
        {showFrequency && frequency && `/${frequencyShortLabel}`}
      </span>
    );
  }

  return (
    <span>
      <NumberFlow value={finalValue} locales="nb-NO" format={formatConfig} />
      {showFrequency && frequency && `/${frequencyShortLabel}`}
    </span>
  );
}
