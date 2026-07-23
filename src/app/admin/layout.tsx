import { auth } from "@/server/auth";
import { SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "../_components/ui/button";
import { Separator } from "../_components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../_components/ui/sidebar";
import { AdminSidebar } from "./(overview)/admin-sidebar";

type LayoutProps = { children: ReactNode };

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") return redirect("/");

  return (
    <SidebarProvider>
      <AdminSidebar user={session.user} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            <Separator orientation="vertical" className="mr-2 h-4" />

            <Button
              type="button"
              variant="outline"
              disabled
              aria-label="Navigation search is not available yet"
              className="w-full max-w-sm justify-start bg-muted/40 px-3 font-normal text-muted-foreground shadow-none disabled:opacity-60"
            >
              <SearchIcon />
              <span>Search pages...</span>
              <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </header>

        <section className="flex-1 p-6">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
