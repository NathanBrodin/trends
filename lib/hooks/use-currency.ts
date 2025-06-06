"use client";

import { useSearchParams } from "next/navigation";

// Define available currencies explicitly
export const AVAILABLE_CURRENCIES = ["USD", "EUR", "NOK", "SEK"] as const;

export type Currency = (typeof AVAILABLE_CURRENCIES)[number];

// Exchange rates relative to USD (you can update these periodically)
// Last updated: 6.6.2025
const EXCHANGE_RATES_TO_USD: Record<Currency, number> = {
  USD: 1,
  EUR: 0.88,
  NOK: 10.12,
  SEK: 9.57,
};

export function useCurrency(defaultCurrency: Currency | string = "NOK") {
  const searchParams = useSearchParams();

  const currencyCode =
    (searchParams.get("currency") as Currency) ?? defaultCurrency;

  const convertAmount = (amount: number, fromCurrency: string): number => {
    if (fromCurrency === currencyCode) {
      return amount;
    }

    const fromRate = EXCHANGE_RATES_TO_USD[fromCurrency as Currency];
    const toRate = EXCHANGE_RATES_TO_USD[currencyCode as Currency];

    if (!fromRate || !toRate) {
      console.warn(
        `Exchange rate not available for ${fromCurrency} or ${currencyCode}`,
      );
      return amount;
    }

    // Convert to USD first, then to target currency
    const amountInUSD = amount / fromRate;
    return amountInUSD * toRate;
  };

  const formatAmount = (amount: number, fromCurrency?: string) => {
    const convertedAmount = fromCurrency
      ? convertAmount(amount, fromCurrency)
      : amount;

    return new Intl.NumberFormat("nb-NO", {
      style: "decimal",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  return {
    currency: currencyCode,
    convertAmount,
    formatAmount,
    availableCurrencies: AVAILABLE_CURRENCIES,
  };
}
