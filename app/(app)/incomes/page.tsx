"use client";

import { Diamond } from "@/components/ui/diamond";
import IncomeForm from "./_components/income-form";
import Link from "next/link";
import { SideLines } from "@/components/backgrounds/side-lines";
import { Divider } from "../_components/divider";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { IncomeCard } from "./_components/income-card";

export default function IncomesPage() {
  const incomes = useQuery(api.queries.getIncomes);

  return (
    <div>
      <section className="relative px-6 py-8 md:py-12">
        <Diamond bottom left />
        <Diamond bottom right />
        <div className="mx-auto flex w-full flex-col items-start justify-center 2xl:mx-auto 2xl:max-w-[1100px] 2xl:justify-start">
          <Link
            href="/overview"
            className="text-primary decoration-primary/20 hover:decoration-primary/80 dark:decoration-primary/20 inline text-sm underline dark:hover:decoration-blue-400/80"
          >
            ← Back to the Overview
          </Link>
          <h1 className="h0 mt-6">Your Incomes</h1>
          <p className="text-muted-foreground text-sm">
            You rich boy, it&apos;s time to flex the crazy money you make.
          </p>
          <SideLines className="[mask-image:linear-gradient(to_left,_#ffffffad,_transparent)] opacity-60 dark:opacity-80" />
        </div>
      </section>
      <Divider />
      <section className="flex px-6 py-8 md:py-16">
        <IncomeForm />
        <div className="flex flex-wrap gap-2">
          {incomes?.map((income) => (
            <IncomeCard income={income} key={income._id} />
          ))}
        </div>
      </section>
    </div>
  );
}
