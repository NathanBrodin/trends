import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group select-none text-sm tracking-tight rounded-sm flex gap-1.5 [&_svg:not([class*='size-'])]:size-4 items-center justify-center text-nowrap border transition-colors duration-75  shrink-0 [&_svg]:shrink-0 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-fit",
  {
    variants: {
      variant: {
        default:
          "bg-primary border-transparent text-white [box-shadow:hsl(219,_93%,_30%)_0_-2px_0_0_inset,_hsl(219,_93%,_95%)_0_1px_3px_0] dark:[box-shadow:hsl(219,_93%,_30%)_0_-2px_0_0_inset,_hsl(0,_0%,_0%,_0.4)_0_1px_3px_0] hover:bg-[hsl(219,_93%,_35%)] active:[box-shadow:none] hover:[box-shadow:none] dark:hover:[box-shadow:none]",
        secondary:
          "text-black dark:text-offgray-50 border-offgray-200/50 dark:border-offgray-400/20 bg-offgray-50/60 dark:bg-offgray-300/5 hover:bg-offgray-100/50 dark:hover:bg-offgray-200/10 [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] dark:[box-shadow:hsl(218,_13%,_70%,_0.08)_0_-2px_0_0_inset] hover:[box-shadow:none] dark:hover:[box-shadow:none] sm:shrink-0",
        ghost:
          "text-black dark:text-offgray-50 border-transparent hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 h-9 px-3 ",
      },
      size: {
        default: "h-9 pl-2.5 pr-3 data-kbd:pr-1.5",
        small: "h-8 pl-2.5 pr-3 data-kbd:pr-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
