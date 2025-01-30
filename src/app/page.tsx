import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import BookCTASection from "./(landing)/book-cta-section";
import IntroSection from "./(landing)/intro-section";
import ReviewSection from "./(landing)/review-section";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <Header session={session} />

      <main>
        <IntroSection />
        <BookCTASection />
        <ReviewSection />
      </main>

      <Footer />
    </HydrateClient>
  );
}
