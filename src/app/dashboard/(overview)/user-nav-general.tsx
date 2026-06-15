"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type UserNavGeneral = {
  pathname: string;
  general: readonly {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
};

export default function UserNavGeneral({ pathname, general }: UserNavGeneral) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {general.map((item) => (
          <SidebarMenuItem
            key={item.name}
            className={cn(
              "rounded-md",
              pathname === item.url && "bg-accent font-medium text-foreground"
            )}
          >
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
