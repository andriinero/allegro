import { auth } from "@/server/auth";
import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "../_components/ui/sidebar";
import { AdminSidebarar } from "./(overview)/admin-sidebar";

type LayoutProps = { children: ReactNode };

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") return;

  return (
    <SidebarProvider>
      <AdminSidebarar user={session.user} />

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
