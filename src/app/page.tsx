import { HydrateClient } from "@/trpc/server";
import Header from "./_components/layout/header";
import IntroSection from "./intro-section";
import BookCTASection from "./book-cta-section";
import Footer from "./_components/layout/footer";

export default async function Home() {
  return (
    <HydrateClient>
      <Header />

      <main>
        <IntroSection />
        <BookCTASection />
      </main>

      <Footer />
    </HydrateClient>
  );
}
