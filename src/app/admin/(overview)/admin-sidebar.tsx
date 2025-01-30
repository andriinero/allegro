"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { tabs } from "@/data/admin-nav";
import { Command } from "lucide-react";
import type { Session } from "next-auth";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import NavGeneral from "./nav-general";
import NavSecondary from "./nav-secondary";
import NavUser from "./nav-user";

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  user: Session["user"];
};

export function AdminSidebarar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Allegro</span>
                  <span className="truncate text-xs">Nero Software</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGeneral general={tabs.general} pathname={pathname} />
        <NavSecondary items={tabs.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
