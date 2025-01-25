import { HydrateClient } from "@/trpc/server";
import Footer from "../_components/layout/footer";
import Header from "../_components/layout/header";
import BookCTASection from "./book-cta-section";
import IntroSection from "./intro-section";
import ReviewSection from "./review-section";

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
