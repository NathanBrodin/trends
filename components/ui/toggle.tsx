"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "tracking-tight rounded-sm flex gap-1.5 items-center justify-center text-nowrap border duration-75 border-transparent cursor-pointer hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 font-mono text-xs data-[state=on]:border data-[state=on]:border-blue-500/20 data-[state=on]:bg-blue-50/60 data-[state=on]:text-blue-700 data-[state=on]:[box-shadow:hsl(218,_50%,_60%,_0.1)_0_-2px_0_0_inset] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] whitespace-nowrap data-[state=on]:dark:border-blue-300/10 data-[state=on]:dark:bg-blue-500/10 data-[state=on]:dark:text-blue-50 data-[state=on]:dark:[box-shadow:hsl(218,_50%,_70%,_0.08)_0_-2px_0_0_inset] data-[state=on]:hover:bg-blue-100/50 data-[state=on]:hover:[box-shadow:none] data-[state=on]:dark:hover:bg-blue-500/20 ",
  {
    variants: {
      variant: {
        default: "bg-transparent",
      },
      size: {
        default: "h-6 px-1.5 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
