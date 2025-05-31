import { Account } from "@/components/account";
import { CommandMenu } from "@/components/command-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Diamond } from "@/components/ui/diamond";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ViewParams } from "@/components/view-params";
import {
  BanknoteArrowUpIcon,
  ChevronRightIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MenuIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="grid-border-color bg-nav sticky top-0 z-20 flex h-[57px] w-full max-w-full items-center border-b">
      <div className="grid-border-color relative mx-3 flex w-full border-x md:mx-8 lg:mx-12">
        <Diamond left bottom />
        <Diamond right bottom />
        <nav className="relative z-2 flex w-full max-w-6xl justify-between gap-4 px-4 py-3 md:mx-auto md:px-6 lg:gap-0">
          <div className="flex flex-none items-center gap-3">
            <Link href="/" className="transition-transform hover:scale-105">
              <Image
                src="/trends.svg"
                alt="Trends logo"
                width={26}
                height={26}
              />
            </Link>
            <div className="relative hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/overview">
                      Overview
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/incomes">
                      Incomes
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <ul className="ml-auto hidden list-none items-center gap-2.5 md:m-0 md:flex">
            <li>
              <CommandMenu />
            </li>
            <li>
              <Account />
            </li>
            <li>
              <ViewParams />
            </li>
          </ul>
          <Drawer>
            <DrawerTrigger className="border-offgray/20 dark:border-offgray-800/50 inline-flex size-[32px] items-center justify-center rounded-sm border md:hidden">
              <MenuIcon className="text-primary size-4" />
            </DrawerTrigger>
            <DrawerContent className="mb-2 border-gray-300 bg-white dark:border-gray-600/20 dark:bg-[hsl(218,_13%,_12%)]">
              <DrawerTitle className="hidden">Menu</DrawerTitle>
              <ul className="flex h-fit list-none flex-col gap-1 p-2.5">
                <li>
                  <Link
                    href="/"
                    className="group hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 flex h-8 items-center justify-start gap-3 rounded-sm border border-transparent px-2 text-sm tracking-tight text-nowrap transition-colors duration-75 select-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <HomeIcon className="text-primary size-4" />
                    Go to the home page
                    <ChevronRightIcon className="text-primary ml-auto size-4" />
                  </Link>
                </li>
                <hr className="my-2 dark:border-gray-600/20" />
                <li>
                  <Link
                    href="/overview"
                    className="group hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 flex h-8 items-center justify-start gap-3 rounded-sm border border-transparent px-2 text-sm tracking-tight text-nowrap transition-colors duration-75 select-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LayoutDashboardIcon className="text-primary size-4" />
                    Overview
                    <ChevronRightIcon className="text-primary ml-auto size-4" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/incomes"
                    className="group hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 flex h-8 items-center justify-start gap-3 rounded-sm border border-transparent px-2 text-sm tracking-tight text-nowrap transition-colors duration-75 select-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <BanknoteArrowUpIcon className="text-primary size-4" />
                    Incomes
                    <ChevronRightIcon className="text-primary ml-auto size-4" />
                  </Link>
                </li>
                <hr className="my-2 dark:border-gray-600/20" />
                <li>
                  <ViewParams />
                </li>
                <li>
                  <ModeToggle />
                </li>
                <li>
                  <DrawerClose asChild>
                    <Button variant="ghost">Close Menu</Button>
                  </DrawerClose>
                </li>
              </ul>
            </DrawerContent>
          </Drawer>
        </nav>
      </div>
    </header>
  );
}
