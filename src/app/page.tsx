import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import FeaturesSection from "./(landing)/features-section";
import HowItWorksSection from "./(landing)/how-it-works-section";
import IntroSection from "./(landing)/intro-section";
import ReviewSection from "./(landing)/review-section";
import StatsSection from "./(landing)/stats-section";
import Footer from "./_components/layout/footer";
import Header from "./_components/layout/header";
import FaqSection from "./(landing)/faq-section";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <Header session={session} />

      <main>
        <IntroSection />
        <ReviewSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <FaqSection />
      </main>

      <Footer />
    </HydrateClient>
  );
}
