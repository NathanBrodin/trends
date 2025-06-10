"use client";

import { Button } from "./ui/button";
import { Kbd } from "./ui/kbd";
import { useRouter, useSearchParams } from "next/navigation";

import { useCurrency } from "@/lib/hooks/use-currency";
import {
  AVAILABLE_FREQUENCIES,
  FREQUENCY_LABELS,
  useFrequency,
} from "@/lib/hooks/use-frequency";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { CommandIcon } from "lucide-react";
import { AVAILABLE_CURRENCIES } from "@/lib/currencies";

export function ViewParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();

  const { frequency, frequencyShortLabel } = useFrequency();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleCurrencyChange = (selectedCurrency: string, checked: boolean) => {
    if (!checked) return; // Only handle selection, not deselection

    const params = new URLSearchParams(searchParams.toString());

    if (selectedCurrency === "NOK") {
      // Remove currency param if selecting default (NOK)
      params.delete("currency");
    } else {
      params.set("currency", selectedCurrency);
    }

    router.push(`?${params.toString()}`);
  };
  const handleFrequencyChange = (
    selectedFrequency: string,
    checked: boolean,
  ) => {
    if (!checked) return; // Only handle selection, not deselection

    const params = new URLSearchParams(searchParams.toString());

    if (selectedFrequency === "monthly") {
      // Remove frequency param if selecting default (monthly)
      params.delete("frequency");
    } else {
      params.set("frequency", selectedFrequency);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="small" data-kbd="D">
          {currency}/{frequencyShortLabel}
          <Kbd className="border-white/20 bg-white/10 text-white">
            <CommandIcon className="size-2.5" />J
          </Kbd>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" align="end">
        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        {AVAILABLE_CURRENCIES.map((currencyOption) => (
          <DropdownMenuCheckboxItem
            key={currencyOption}
            checked={currency === currencyOption}
            onCheckedChange={(checked) =>
              handleCurrencyChange(currencyOption, checked)
            }
          >
            {currencyOption}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Frequency</DropdownMenuLabel>
        {AVAILABLE_FREQUENCIES.map((frequencyOption) => (
          <DropdownMenuCheckboxItem
            key={frequencyOption}
            checked={frequency === frequencyOption}
            onCheckedChange={(checked) =>
              handleFrequencyChange(frequencyOption, checked)
            }
          >
            {FREQUENCY_LABELS[frequencyOption]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
