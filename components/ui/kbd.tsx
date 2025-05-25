import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Kbd({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "dark:border-offgray-400/10 dark:bg-cream-900/10 hidden h-5 max-w-max items-center gap-0.5 rounded-xs border border-gray-500/20 bg-gray-50/50 px-1.5 text-[.6875rem] font-bold text-gray-500 sm:flex dark:text-gray-300",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
