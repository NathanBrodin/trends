import { LogOutIcon, UsersIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export async function Account() {
  const user = await currentUser();

  if (!user) return <SignInButton />;

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Account</NavigationMenuTrigger>
          <NavigationMenuContent className="p-1">
            <div className="flex flex-col gap-0.5 p-2">
              <p className="text-muted-foreground text-xs">Signed in as</p>
              <p className="text-sm font-semibold">{user.fullName}</p>
              <p className="text-muted-foreground text-sm">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <Separator />
            <ul className="flex w-full flex-col py-1">
              <li>
                <Link
                  href="/user"
                  className="group hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 inline-flex h-8 w-full items-center justify-start gap-2 rounded-sm border border-transparent px-1 text-sm tracking-tight text-nowrap transition-colors duration-75 select-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <UsersIcon className="text-primary size-4" />
                  My Account
                </Link>
              </li>
              <li>
                <SignOutButton>
                  <button className="group hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 inline-flex h-8 w-full items-center justify-start gap-2 rounded-sm border border-transparent px-1 text-sm tracking-tight text-nowrap transition-colors duration-75 select-none disabled:cursor-not-allowed disabled:opacity-50">
                    <LogOutIcon className="text-primary size-4" />
                    Sign Out
                  </button>
                </SignOutButton>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
