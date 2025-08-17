import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import IntroSection from "./(landing)/intro-section";
import ReviewSection from "./(landing)/review-section";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";
import HowItWorksSection from "./(landing)/how-it-works-section";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <Header session={session} />

      <main>
        <IntroSection />
        <ReviewSection />
        <HowItWorksSection />
      </main>

      <Footer />
    </HydrateClient>
  );
}
