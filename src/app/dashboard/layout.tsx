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

type LayoutProps = { children: ReactNode };

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <Header session={session} variant="solid" className="static" />

      <main className="flex justify-center">
        <ContentWrapper className="gap-6 bg-secondary">
          <aside className="w-full max-w-52">
            <nav>
              <ul className="flex flex-col gap-4">
                <SidebarTab href="/dashboard">
                  <House className="size-4" />
                  Home
                </SidebarTab>

                <SidebarTab href="/dashboard/book-lesson">
                  <SquarePlusIcon className="size-4" />
                  Book Lesson
                </SidebarTab>

                <SidebarTab href="/dashboard/history">
                  <History className="size-4" />
                  History
                </SidebarTab>

                <SidebarTab href="/dashboard/chat">
                  <MessageSquare className="size-4" />
                  Chat
                </SidebarTab>

                <SidebarTab href="/dashboard/settings">
                  <Settings className="size-4" />
                  Settings
                </SidebarTab>

                <SidebarTab href="/dashboard/profile">
                  <User className="size-4" />
                  Profile
                </SidebarTab>
              </ul>
            </nav>
          </aside>

          <section className="flex min-h-[460px] w-full flex-col gap-4 rounded-lg bg-background p-4 shadow">
            {children}
          </section>
        </ContentWrapper>
      </main>

      <Footer />
    </>
  );
}
