import Image from "next/image";
import ContentWrapper from "../_components/general/content-wrapper";
import { Button } from "../_components/ui/button";
import { auth } from "@/server/auth";

export default async function IntroSection() {
  const session = await auth();

  return (
    <section className="relative flex justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <ContentWrapper>
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                ✨ Certified Over 4 Million Members
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black leading-tight lg:text-6xl">
                  MOST FUN WAY
                  <br />
                  <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                    TO LEARN GUITAR
                  </span>
                </h1>

                <p className="max-w-lg text-xl text-gray-300">
                  Get your free beginner chord chart and start your guitar
                  journey today with the best guitar teacher in Berlin.
                </p>
              </div>
              {!session?.user && (
                <div className="space-y-4">
                  <div className="flex max-w-md flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      className="h-12 flex-1 border-white bg-white text-black hover:bg-transparent hover:text-white"
                    >
                      Join with Google
                    </Button>
                  </div>

                  <div className="flex max-w-md flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      className="h-12 flex-1 border-white bg-transparent text-white hover:bg-white hover:text-black"
                    >
                      Join with Apple
                    </Button>

                    <Button
                      variant="outline"
                      className="h-12 flex-1 border-white bg-transparent text-white hover:bg-white hover:text-black"
                    >
                      Join with Facebook
                    </Button>

                    <Button
                      variant="outline"
                      className="h-12 flex-1 border-white bg-transparent text-white hover:bg-white hover:text-black"
                    >
                      Join with Email
                    </Button>
                  </div>

                  <p className="max-w-md text-sm text-gray-400">
                    By clicking any option above, you agree to our Terms of
                    Service and acknowledge our Privacy Policy.
                  </p>
                </div>
              )}
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary p-3">
                  <span className="text-sm font-bold text-primary-foreground">
                    FREE GIFT
                  </span>
                </div>
                <span className="text-lg font-semibold">
                  Get Beginner Chord Chart
                </span>
              </div>
            </div>

            <div className="relative">
              <Image
                width={500}
                height={500}
                src="/guitarist-recording-studio.png"
                alt="Professional guitarist playing acoustic guitar"
                className="h-auto w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
