import { cn } from "@/lib/utils";

type DiamondProps = {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
};

export function Diamond({ top, right, bottom, left }: DiamondProps) {
  return (
    <div
      className={cn(
        "absolute z-10 size-2 rotate-45 rounded-[1px] border border-blue-200 bg-white dark:border-blue-300/25 dark:bg-black",
        top && "top-[-4.5px]",
        right && "right-[-4.5px]",
        bottom && "bottom-[-4.5px]",
        left && "left-[-4.5px]",
      )}
    />
  );
}
