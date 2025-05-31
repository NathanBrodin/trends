import { Noise } from "@/components/backgrounds/noise";
import { Diamond } from "@/components/ui/diamond";
import Link from "next/link";
import { ReactNode } from "react";

export function Banner({
  children,
  href,
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <Link
      href={href ?? ""}
      className="group relative flex w-full items-center border-b border-dashed border-blue-200/80 bg-linear-to-r from-transparent via-blue-100/40 to-transparent px-2 py-2 transition-colors hover:border-solid hover:bg-blue-50 md:px-16 dark:border-blue-300/10 dark:from-transparent dark:via-blue-600/10 dark:to-transparent dark:hover:bg-blue-700/10"
    >
      <div className="relative mx-auto flex max-w-2xl items-center gap-4 md:max-w-[1100px]">
        {children}
      </div>
      <Noise />
      <Diamond bottom left />
      <Diamond bottom right />
    </Link>
  );
}
