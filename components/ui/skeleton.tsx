import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="skeleton"
      className={cn(
        "dark:bg-offgray-900/30 animate-pulse rounded-md bg-gray-200/50",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
