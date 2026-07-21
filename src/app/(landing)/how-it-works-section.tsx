import Image from "next/image";
import ContentWrapper from "../_components/general/content-wrapper";
import { Card, CardContent } from "../_components/ui/card";

export default function HowItWorksSection() {
  return (
    <section className="flex flex-col items-center">
      <ContentWrapper className="max-w-screen-5xl flex-col items-center gap-4 py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <Card className="rotate-2 transform bg-primary p-8 text-primary-foreground">
                <CardContent className="p-0">
                  <h3 className="mb-4 text-3xl font-black">
                    WATCH
                    <br />
                    HOW IT
                    <br />
                    WORKS
                  </h3>
                  <div className="mt-6 rounded-lg bg-white/20 p-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                      <span className="text-xl text-primary">▶</span>
                    </div>
                    <Image
                      width={500}
                      height={500}
                      src="/guitar-lesson-interface.png"
                      alt="Guitar lesson interface"
                      className="w-full rounded"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-black text-foreground">
                Allegro™ is{" "}
                <span className="rounded bg-primary bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 px-2 py-1 text-primary-foreground">
                  Different
                </span>
              </h2>

              <p className="text-lg leading-relaxed text-muted-foreground">
                With YouTube and other lesson sites, you are on your own with{" "}
                <strong>no easy to follow</strong> and because we{" "}
                <strong>really care</strong> about helping you grow, our
                instructors offer personalized feedback and guidance.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm text-primary-foreground">✓</span>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      Get Unstuck
                    </h4>
                    <p className="text-muted-foreground">
                      Our system is designed to help you overcome trouble spots.
                      Send a video of your playing and we&apos;ll get back to
                      you with advice and encouragement to help you improve.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Image
                  width={500}
                  height={500}
                  src="/guitar-lessons-app.png"
                  alt="Mobile app interface"
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
