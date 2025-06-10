"use client";

import { useSearchParams } from "next/navigation";
import { Currency, convertAmount as convertSomeAmount } from "../currencies";

export function useCurrency(defaultCurrency: Currency | string = "NOK") {
  const searchParams = useSearchParams();

  const currencyCode =
    (searchParams.get("currency") as Currency) ?? defaultCurrency;

  const convertAmount = (amount: number, fromCurrency: string): number =>
    convertSomeAmount(amount, fromCurrency, currencyCode);

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
  };
}
