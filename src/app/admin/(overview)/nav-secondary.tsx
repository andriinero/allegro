import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type NavSecondaryProps = ComponentPropsWithoutRef<typeof SidebarGroup> & {
  pathname: string;
  items: readonly {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
};

export default function NavSecondary({
  items,
  pathname,
  ...props
}: NavSecondaryProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={cn(
                "rounded-md",
                pathname === item.url && "bg-accent font-medium text-foreground"
              )}
            >
              <SidebarMenuButton asChild size="sm">
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
