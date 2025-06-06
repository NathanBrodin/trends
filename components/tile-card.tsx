import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  className?: string;
};

function Background() {
  return (
    <div className="absolute inset-0">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [z-index:-1] size-full fill-blue-500/50 stroke-blue-500/50 opacity-20"
        style={{ visibility: "visible" }}
      >
        <defs>
          <pattern
            id=":r0:"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path d="M.5 14V.5H14" fill="none" strokeDasharray="0"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#:r0:)"
        ></rect>
      </svg>
    </div>
  );
}

export function TileCard({
  children,
  tooltipContent,
  href,
  className,
}: CardProps & { tooltipContent?: ReactNode; href?: string }) {
  return (
    <Link
      className={cn(
        "group transform-all square-gradient-bg relative col-span-1 row-span-1 flex flex-col items-center justify-center overflow-clip rounded-sm p-4 duration-70",
        "cursor-pointer transition-colors hover:border-blue-300 hover:[box-shadow:_var(--sh-alt)] dark:hover:border-blue-300/50",
        className,
      )}
      href={href ?? "/"}
    >
      {children}
      <Background />
      {tooltipContent && (
        <div className="bg-cream-50 dark:bg-offgray-950 text-accent absolute right-0 bottom-0 left-0 z-2 flex transform items-center divide-x divide-blue-300 border-t border-blue-300 text-xs [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] transition-transform duration-200 group-hover:translate-y-0 md:translate-y-full dark:divide-blue-400/50 dark:border-blue-400/50 dark:[box-shadow:hsl(218,_13%,_70%,_0.05)_0_-2px_0_0_inset]">
          {tooltipContent}
        </div>
      )}
    </Link>
  );
}

export function TileCardTitle({ children }: CardProps) {
  return <p className="text-center text-sm">{children}</p>;
}

export function TileCardValue({ children }: CardProps) {
  return (
    <p className="font-lora text-accent h-[32px] w-full text-center text-2xl font-semibold">
      {children}
    </p>
  );
}

export function TileCardGroupContent({ children }: CardProps) {
  return (
    <hgroup className="[z-index:2] mx-auto flex w-full max-w-xl flex-col items-center gap-1">
      {children}
    </hgroup>
  );
}

export function TileCardGroupTitle({ children }: CardProps) {
  return (
    <h2 className="font-lora h2 text-accent mb-2 scroll-mt-24 text-center font-medium text-pretty">
      {children}
    </h2>
  );
}
