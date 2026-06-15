
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
import { tabs } from "@/data/user-nav";
import { Guitar } from "lucide-react";
import type { Session } from "next-auth";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import UserNav from "./user-nav";
import UserNavGeneral from "./user-nav-general";
import UserNavSecondary from "./user-nav-secondary";

type UserSidebarProps = ComponentProps<typeof Sidebar> & {
  user: Session["user"];
};

export function UserSidebar({ user, ...props }: UserSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Guitar className="size-4" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Allegro</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <UserNavGeneral general={tabs.general} pathname={pathname} />
        <UserNavSecondary items={tabs.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <UserNav user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
