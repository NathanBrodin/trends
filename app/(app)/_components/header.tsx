import { CommandMenu } from "@/components/command-menu";
import { Diamond } from "@/components/ui/diamond";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="grid-border-color bg-nav sticky top-0 z-20 flex h-[57px] w-full max-w-full items-center border-b">
      <div className="relative mx-3 flex w-full border-x md:mx-8 lg:mx-12">
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
            <div className="relative hidden lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/overview">
                      Overview
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <ul className="ml-auto hidden list-none items-center gap-2.5 lg:m-0 lg:flex">
            <li>
              <CommandMenu />
            </li>
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                    <NavigationMenuContent></NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
