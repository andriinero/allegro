import ContentWrapper from "@/components/general/content-wrapper";
import { HydrateClient } from "@/trpc/server";
import { TextQuote } from "lucide-react";
import { Separator } from "./_components/ui/separator";
import Header from "./_components/layout/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <HydrateClient>
      <Header />

      <main>
        <section className="text-secondary flex justify-center bg-[url('/guitar-dark.jpg')] bg-cover bg-center p-4 pb-32 pt-16">
          <ContentWrapper className="mt-32">
            <div className="flex flex-col gap-4">
              <p className="border-primary self-start rounded-full border-2 px-2 py-1 font-semibold">
                Over 1 Thousand Satisfied Customers
              </p>
              <h1 className="text-6xl font-extrabold uppercase">
                The best way <br /> to learn guitar
              </h1>
              <Separator className="bg-primary h-[2px] border-dashed" />
              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TextQuote className="size-4" />
                    <Separator
                      className="bg-primary h-4"
                      orientation="vertical"
                    />
                    <h4 className="text-lg uppercase">Andrew</h4>
                  </div>

                  <p className="max-w-sm text-sm">
                    It&#39;s exciting to be discovering a new & long put off
                    hobby with teacher that is making it FUN.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TextQuote className="size-4" />
                    <Separator
                      className="bg-primary h-4"
                      orientation="vertical"
                    />
                    <h4 className="text-lg uppercase">Sam</h4>
                  </div>

                  <p className="max-w-sm text-sm">
                    Absolutely amazing guitar lesson! 🎸 The instructor was
                    super knowledgeable, patient, and made every concept so easy
                    to understand.
                  </p>
                </div>
              </div>
            </div>
          </ContentWrapper>
        </section>

        <section className="bg-primary text-primary-foreground flex items-center justify-center p-6">
          <ContentWrapper className="flex flex-col items-center justify-between gap-6">
            <h1 className="mt-4 text-center text-4xl font-extrabold">
              Book Your First Lesson And Take Action Now!
            </h1>
            <div className="text-secondary-foreground flex gap-4">
              <Link href="/api/auth/signin">
                <Button variant="outline">
                  <Image
                    src="/google.webp"
                    width={24}
                    height={24}
                    alt="Login with Google"
                  />{" "}
                  Join with Google
                </Button>
              </Link>
              <Link href="/api/auth/signin">
                <Button variant="outline">
                  <Image
                    src="/discord.png"
                    width={24}
                    height={24}
                    alt="Login with Discord"
                  />{" "}
                  Join with Discord
                </Button>
              </Link>
            </div>
            <p className="max-w-md text-center text-xs">
              By using our service, signing in, and/or registering for an
              account in any way, you agree to our Terms of Service and Privacy
              Policy which explain how we collect store and use your email
              address and data.
            </p>
          </ContentWrapper>
        </section>
      </main>

      <footer></footer>
    </HydrateClient>
  );
}
