import { Diamond } from "@/components/ui/diamond";
import { TotalBalanceCard } from "./_components/total-balance-card";
import { IncomeCard } from "./_components/income-card";
import { ExpensesCard } from "./_components/expenses-card";
import { AvailableCard } from "./_components/available-card";
import { SectionDidiver } from "../_components/divider";
import { TrendsGraph } from "./_components/trends-graph";
import { getTotalBalanceSubtitle } from "@/lib/actions";

export default async function OverviewPage() {
  const subtitle = await getTotalBalanceSubtitle();

  return (
    <>
      <section className="relative h-full p-5">
        <div className="grid max-h-[450px] w-full auto-rows-auto grid-cols-1 content-evenly justify-evenly gap-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 2xl:gap-5">
          <TotalBalanceCard subtitle={subtitle} />
          <IncomeCard />
          <ExpensesCard />
          <AvailableCard />
        </div>
        <Diamond bottom left />
        <Diamond bottom right />
      </section>
      <SectionDidiver />
      <section className="relative flex w-full flex-1 gap-5 bg-linear-to-t from-blue-100/20 p-5 dark:from-blue-900/5">
        <TrendsGraph />
        <div></div>
      </section>
    </>
  );
}
