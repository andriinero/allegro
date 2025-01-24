import type { ReactNode } from "react";
import ContentWrapper from "../_components/general/content-wrapper";
import Footer from "../_components/layout/footer";
import Header from "../_components/layout/header";
import Link from "next/link";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header variant="solid" />

      <main className="flex justify-center">
        <ContentWrapper className="gap-4 pt-24">
          <aside>
            <nav>
              <ul>
                <li>
                  <Link href="/dashboard">Home</Link>
                </li>
                <li>
                  <Link href="/dashboard/history">History</Link>
                </li>
                <li>
                  <Link href="/dashboard/book-lesson">Book Lesson</Link>
                </li>
              </ul>
            </nav>
          </aside>
          <section>{children}</section>
        </ContentWrapper>
      </main>

      <Footer />
    </>
  );
}
