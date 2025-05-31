import { cn } from "@/lib/utils";

export function Tiles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 [z-index:-1] size-full [mask-image:linear-gradient(to_top,_#ffffffad,_transparent)] fill-blue-500/50 stroke-blue-500/50 opacity-[.30]",
        className,
      )}
      style={{
        visibility: "visible",
      }}
    >
      <defs>
        <pattern
          id=":R1oafknq6ja:"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          x="-1"
          y="-1"
        >
          <path d="M.5 20V.5H20" fill="none" strokeDasharray="0"></path>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill="url(#:R1oafknq6ja:)"
      ></rect>
    </svg>
  );
}
