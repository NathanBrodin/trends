import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      autoComplete="off"
      className={cn(
        "block h-9 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 shadow-xs placeholder:italic placeholder:opacity-90 sm:text-sm dark:border-gray-400/20 dark:bg-[hsl(218,_13%,_10%)] dark:text-white dark:shadow-black dark:placeholder:opacity-40",
        "file:text-foreground selection:bg-primary selection:text-primary-foreground min-w-0 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
