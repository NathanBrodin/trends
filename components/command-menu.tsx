"use client";

import * as React from "react";
import {
  CommandIcon,
  LaptopIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "./ui/kbd";
import { useTheme } from "next-themes";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group fv-style dark:text-offgray-50 hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 flex h-8 items-center justify-center gap-1.5 rounded-sm border border-transparent px-1 text-sm tracking-tight text-nowrap text-black transition-colors duration-75 select-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SearchIcon className="size-[15px] text-gray-500 dark:text-gray-300" />
        <Kbd>
          <CommandIcon className="size-2.5" />K
        </Kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Website Theme">
            {theme === "light" ? (
              <CommandItem
                onSelect={() => {
                  setTheme("dark");
                  setOpen(false);
                }}
              >
                <MoonIcon />
                <span>Turn dark mode on</span>
              </CommandItem>
            ) : (
              <CommandItem
                onSelect={() => {
                  setTheme("light");
                  setOpen(false);
                }}
              >
                <SunIcon />
                <span>Turn light mode on</span>
              </CommandItem>
            )}
            <CommandItem
              onSelect={() => {
                setTheme("system");
                setOpen(false);
              }}
            >
              <LaptopIcon />
              <span>Follow the System&apos;s settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
