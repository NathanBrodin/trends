"use client";

import { Diamond } from "@/components/ui/diamond";
import Link from "next/link";
import { SideLines } from "@/components/backgrounds/side-lines";
import { Divider } from "../_components/divider";

export default function ExpensesPage() {
  return (
    <div>
      <section className="relative px-6 py-8 md:py-12">
        <Diamond bottom left />
        <Diamond bottom right />
        <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-center 2xl:mx-auto 2xl:justify-start">
          <Link
            href="/overview"
            className="text-accent decoration-primary/20 hover:decoration-primary/80 dark:decoration-primary/20 inline text-sm underline dark:hover:decoration-blue-400/80"
          >
            ← Back to the Overview
          </Link>
          <h1 className="h0 font-lora text-accent mt-6 max-w-4xl scroll-mt-24 font-normal text-pretty">
            Your Expenses
          </h1>
          <p className="text-muted-foreground text-sm">
            The flex is over, now face the financial consequences.
          </p>
          <SideLines className="[mask-image:linear-gradient(to_left,_#ffffffad,_transparent)] opacity-60 dark:opacity-80" />
        </div>
      </section>
      <Divider />
      <section className="flex h-full items-center justify-center px-6 py-8 md:py-16"></section>
    </div>
  );
}
