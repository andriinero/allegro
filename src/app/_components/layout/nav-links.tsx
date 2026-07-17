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
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-inner shadow-black/10">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link
              href={link.href}
              className={cn(
                navigationMenuTriggerStyle(),
                "h-9 rounded-full border-0 bg-transparent px-4 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
                variant === "solid" && "text-slate-300",
                pathname === link.href &&
                  "bg-white/10 text-white shadow-sm hover:bg-white/10"
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
