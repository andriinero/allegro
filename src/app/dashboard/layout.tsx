import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../_components/ui/breadcrumb";
import { Separator } from "../_components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../_components/ui/sidebar";
import { UserSidebar } from "./(overview)/user-sidebar";

type LayoutProps = { children: ReactNode };

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <SidebarProvider>
      <UserSidebar user={session.user} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            <Separator orientation="vertical" className="mr-2 h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Allegro</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <section className="flex-1 p-6 flex justify-center">
          <div className="w-full max-w-7xl">{children}</div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
