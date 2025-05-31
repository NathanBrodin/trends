import { Noise } from "@/components/backgrounds/noise";
import { Header } from "../(app)/_components/header";
import { Footer } from "../(app)/_components/footer";
import { Banner } from "./_components/banner";
import {
  ConstructionIcon,
  GithubIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { Diamond } from "@/components/ui/diamond";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

import { Tiles } from "./_components/tiles";
import { Divider } from "../(app)/_components/divider";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-screen flex-none flex-col justify-between">
      <Header />
      <main className="grid-border-color mx-3 grow border-r border-l md:mx-8 lg:mx-12">
        <Banner href="/overview">
          <div className="text-accent flex items-center gap-1">
            <ConstructionIcon className="size-4" />
            <span className="text-sm">
              Trends is under construction:{" "}
              <span className="font-lora font-semibold tracking-wide">
                Bring your hard hat
              </span>
            </span>
          </div>
        </Banner>
        <section className="relative bg-linear-to-t from-blue-100/20 px-4 pt-20 pb-[12rem] sm:px-6 sm:pt-28 md:pb-[10.9rem] dark:from-blue-900/5">
          <Diamond left bottom />
          <Diamond right bottom />
          <div className="mx-6xl text-muted-foreground mx-auto flex w-full max-w-2xl flex-col items-center gap-8">
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <h1 className="font-lora h0 text-accent scroll-mt-24 text-center font-normal tracking-tight text-pretty">
                See where you stand. Plan where you’re going.
              </h1>
              <p className="max-w-lg text-center">
                Trends gives you a clear view of your money, past, present, and
                future.
              </p>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
                <Button asChild data-kbd="O">
                  <Link href="/overview">
                    <LayoutDashboardIcon className="size-4" />
                    Get Started
                  </Link>
                </Button>
                <Button asChild variant="secondary" data-kbd="S">
                  <Link href="https://github.com/NathanBrodin/trends">
                    <GithubIcon className="size-4" />
                    View Source
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <Tiles />
        </section>
        <Divider />
      </main>
      <Noise />
      <div className="bg-cream-200/12 absolute top-0 left-0 z-[-1] h-full w-3 md:w-8 lg:w-12 dark:bg-[hsl(218,_13%,_5%,_0.2)]" />
      <div className="bg-cream-200/12 absolute top-0 right-0 z-[-1] h-full w-3 md:w-8 lg:w-12 dark:bg-[hsl(218,_13%,_5%,_0.2)]" />
      <Footer />
    </div>
  );
}
