"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const navLinks = [
  { href: "/blog", name: "Blog" },
  { href: "/about-me", name: "About Me" },
  { href: "/contact", name: "Contact" },
] as const;

type NavMenuProps = { variant?: "transparent" | "solid" };

export default function NavLinks({ variant = "transparent" }: NavMenuProps) {
  const pathname = usePathname();

  const isSolidVariant = variant === "solid";

  return (
    <NavigationMenu className="flex-2">
      <NavigationMenuList>
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href} className="">
            <Link
              href={link.href}
              className={cn(
                navigationMenuTriggerStyle(),
                "border border-transparent bg-transparent font-semibold text-primary-foreground hover:bg-transparent hover:text-primary",
                { "text-accent-foreground": isSolidVariant },
                { "bg-accent": pathname === link.href },
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
