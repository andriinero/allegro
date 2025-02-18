import { auth } from "@/server/auth";
import {
  History,
  House,
  MessageSquare,
  Settings,
  SquarePlusIcon,
  User,
} from "lucide-react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import ContentWrapper from "../_components/general/content-wrapper";
import Footer from "../_components/layout/footer";
import Header from "../_components/layout/header";
import SidebarTab from "./(overview)/sidebar-tab";
import DashboardProvider from "@/hooks/use-dashboard";
import DashboardDialogs from "./(overview)/dashboard-dialogs";

type LayoutProps = { children: ReactNode };

const navigationItems = [
  { href: "/dashboard", icon: House, label: "Home" },
  {
    href: "/dashboard/book-lesson",
    icon: SquarePlusIcon,
    label: "Book Lesson",
  },
  { href: "/dashboard/history", icon: History, label: "History" },
  { href: "/dashboard/chat", icon: MessageSquare, label: "Chat" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
] as const;

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <Header session={session} variant="solid" className="static" />

      <main className="flex justify-center">
        <DashboardProvider>
          <DashboardDialogs />
          <ContentWrapper className="gap-4 bg-secondary">
            <aside className="w-full max-w-52">
              <nav aria-label="Dashboard navigation">
                <ul className="flex flex-col gap-4">
                  {navigationItems.map((item) => (
                    <SidebarTab key={item.href} href={item.href}>
                      <item.icon className="size-4" />
                      {item.label}
                    </SidebarTab>
                  ))}
                </ul>
              </nav>
            </aside>

            <section className="dashboard-content flex min-h-[460px] w-full flex-col gap-4 rounded-lg bg-background p-4 shadow">
              {children}
            </section>
          </ContentWrapper>
        </DashboardProvider>
      </main>

      <Footer />
    </>
  );
}
