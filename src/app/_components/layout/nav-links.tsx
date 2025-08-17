"use client";

import { navLinks } from "@/data/user-nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

type NavMenuProps = { variant?: "transparent" | "solid" };

export default function NavLinks({ variant = "transparent" }: NavMenuProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu className="flex-2 hidden sm:block">
      <NavigationMenuList>
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href} className="">
            <Link
              href={link.href}
              className={cn(
                navigationMenuTriggerStyle(),
                "border border-transparent bg-transparent font-normal text-base text-primary-foreground hover:bg-transparent hover:text-primary",
                variant === "solid" && "text-accent-foreground",
                pathname === link.href && "bg-accent",
              )}
            >
              {link.name}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
