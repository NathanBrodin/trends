"use client";

import { Diamond } from "@/components/ui/diamond";
import Link from "next/link";
import { SideLines } from "@/components/backgrounds/side-lines";
import { Divider } from "../_components/divider";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  EmptyIncomeCard,
  IncomeCard,
  LoadingIncomeCard,
} from "./_components/income-card";

export default function IncomesPage() {
  const incomes = useQuery(api.queries.getIncomes);

  return (
    <>
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
            Your Incomes
          </h1>
          <p className="text-muted-foreground text-sm">
            You rich boy, it&apos;s time to flex the crazy money you make.
          </p>
          <SideLines className="[mask-image:linear-gradient(to_left,_#ffffffad,_transparent)] opacity-60 dark:opacity-80" />
        </div>
      </section>
      <Divider />
      <section className="flex h-full items-center justify-center px-6 py-8 md:py-16">
        <div className="grid w-full max-w-4xl flex-1 place-items-center gap-4 md:grid-cols-2">
          {!incomes ? (
            <>
              <LoadingIncomeCard />
              <LoadingIncomeCard />
              <LoadingIncomeCard />
              <LoadingIncomeCard />
            </>
          ) : (
            <>
              {incomes.map((income) => (
                <IncomeCard income={income} key={income._id} />
              ))}
              {incomes.length < 4 &&
                Array.from({ length: 4 - incomes.length }).map((_, index) => (
                  <EmptyIncomeCard key={`empty-${index}`} />
                ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
