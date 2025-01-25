import { auth } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";
import ContentWrapper from "../_components/general/content-wrapper";
import { Button } from "../_components/ui/button";

export default async function BookCTASection() {
  const session = await auth();

  return (
    <section className="flex items-center justify-center bg-primary p-2 text-primary-foreground">
      <ContentWrapper className="flex flex-col items-center justify-between gap-6">
        <h1 className="mt-4 text-center text-4xl font-extrabold">
          Book Your First Lesson And Take Action Now!
        </h1>
        <div className="flex gap-4 text-secondary-foreground">
          {session ? (
            <Link href="/book-lesson">
              <Button
                variant="hollow"
                className="border-2 uppercase text-primary-foreground"
              >
                Book Lesson Now
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/api/auth/signin">
                <Button
                  className="border-2 border-secondary-foreground"
                  variant="outline"
                >
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
                <Button
                  className="border-2 border-secondary-foreground"
                  variant="outline"
                >
                  <Image
                    src="/discord.png"
                    width={24}
                    height={24}
                    alt="Login with Discord"
                  />{" "}
                  Join with Discord
                </Button>
              </Link>
            </>
          )}
        </div>
        <p className="max-w-md text-center text-xs">
          By using our service, signing in, and/or registering for an account in
          any way, you agree to our Terms of Service and Privacy Policy which
          explain how we collect store and use your email address and data.
        </p>
      </ContentWrapper>
    </section>
  );
}
