import { Diamond } from "@/components/ui/diamond";
import { TotalBalanceCard } from "./_components/total-balance-card";
import { IncomeCard } from "./_components/income-card";
import { ExpensesCard } from "./_components/expenses-card";
import { AvailableCard } from "./_components/available-card";
import { SectionDidiver } from "../_components/divider";

export default function OverviewPage() {
  return (
    <>
      <section className="relative p-5">
        <div className="grid max-h-[450px] w-full auto-rows-auto grid-cols-1 content-evenly justify-evenly gap-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 2xl:gap-5">
          <TotalBalanceCard />
          <IncomeCard />
          <ExpensesCard />
          <AvailableCard />
        </div>
        <Diamond bottom left />
        <Diamond bottom right />
      </section>
      <SectionDidiver />
    </>
  );
}
