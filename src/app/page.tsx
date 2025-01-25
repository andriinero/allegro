import { HydrateClient } from "@/trpc/server";
import Header from "./_components/layout/header";
import IntroSection from "./(home)/intro-section";
import BookCTASection from "./(home)/book-cta-section";
import Footer from "./_components/layout/footer";
import ReviewSection from "./(home)/review-section";

export default async function Home() {
  return (
    <HydrateClient>
      <Header />

      <main>
        <IntroSection />
        <BookCTASection />
        <ReviewSection />
      </main>

      <Footer />
    </HydrateClient>
  );
}
