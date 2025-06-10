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
  isLoading?: boolean;
};

export function Amount({
  value,
  currency,
  frequency,
  animated = true,
  showFrequency = false,
  isLoading,
}: AmountProps) {
  const { currency: targetCurrency, convertAmount } = useCurrency();
  const { convertToFrequency, frequencyShortLabel } = useFrequency();

  if (isLoading) {
    return <span>...</span>;
  }

  const formatConfig = {
    style: "currency" as const,
    currency: targetCurrency,
    trailingZeroDisplay: "stripIfInteger" as const,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  // First convert currency
  const convertedValue = convertAmount(value, currency);

  // Then convert frequency if provided
  const finalValue = frequency
    ? convertToFrequency(convertedValue, frequency)
    : convertedValue;

  const formatted = new Intl.NumberFormat("nb-NO", formatConfig).format(
    finalValue,
  );

  if (!animated) {
    return (
      <span>
        {formatted}
        {showFrequency && frequency && `/${frequencyShortLabel}`}
      </span>
    );
  }

  return (
    <span>
      <NumberFlow
        value={isLoading ? 0 : finalValue}
        locales="nb-NO"
        format={formatConfig}
      />
      {showFrequency && frequency && `/${frequencyShortLabel}`}
    </span>
  );
}
