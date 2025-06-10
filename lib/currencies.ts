// Define available currencies explicitly
export const AVAILABLE_CURRENCIES = ["USD", "EUR", "NOK"] as const;

export type Currency = (typeof AVAILABLE_CURRENCIES)[number];

// Last updated: 7.6.2025
export const exchangeRates = {
  EUR: {
    NOK: 11.52, // 1 EUR = 11.52 NOK
    USD: 1.14, // 1 EUR = 1.14 USD
  },
  NOK: {
    EUR: 0.087, // 1 NOK = 0.087 EUR
    USD: 0.099, // 1 NOK = 0.099 USD
  },
  USD: {
    EUR: 0.88, // 1 USD = 0.88 EUR
    NOK: 10.11, // 1 USD = 10.11 NOK
  },
};

export function convertAmount(
  amount: number,
  from: Currency | string,
  to: Currency,
): number {
  // Type guard to ensure 'from' is a valid Currency
  if (!AVAILABLE_CURRENCIES.includes(from as Currency)) {
    return amount;
  }

  const rate = exchangeRates[from as Currency];
  if (rate && to in rate) {
    return rate[to as keyof typeof rate] * amount;
  } else {
    return amount;
  }
}

export function toCurrency(
  value: unknown,
  fallback: Currency = "NOK",
): Currency {
  if (
    typeof value === "string" &&
    AVAILABLE_CURRENCIES.includes(value as Currency)
  ) {
    return value as Currency;
  }
  return fallback;
}
