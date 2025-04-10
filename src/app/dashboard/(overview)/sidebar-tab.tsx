"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ComponentPropsWithoutRef } from "react";

type SidebarTabProps = ComponentPropsWithoutRef<"a"> & { href: string };

export default function SidebarTab({
  href,
  className,
  children,
  ...props
}: SidebarTabProps) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 rounded-md border border-transparent bg-background p-3 text-sm font-semibold tracking-tight shadow transition-colors hover:border-primary hover:text-primary",
          { "border-primary text-primary": pathname === href },
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}
