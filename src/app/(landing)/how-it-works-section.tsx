import Image from "next/image";
import ContentWrapper from "../_components/general/content-wrapper";
import { Card, CardContent } from "../_components/ui/card";

export default function HowItWorksSection() {
  return (
    <section className="flex flex-col items-center">
      <ContentWrapper className="flex-col items-center gap-4 max-w-screen-5xl  py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Card className="bg-primary text-primary-foreground p-8 transform rotate-2">
              <CardContent className="p-0">
                <h3 className="font-black text-3xl mb-4">
                  WATCH
                  <br />
                  HOW IT
                  <br />
                  WORKS
                </h3>
                <div className="bg-white/20 rounded-lg p-4 mt-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary text-xl">▶</span>
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
            <h2 className="font-black text-3xl text-foreground">
              Allegro™ is <span className="bg-primary text-primary-foreground px-2 py-1 rounded">Different</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With YouTube and other lesson sites, you are on your own with <strong>no easy to follow</strong> and
              because we <strong>really care</strong> about helping you grow, our instructors offer personalized
              feedback and guidance.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Get Unstuck</h4>
                  <p className="text-muted-foreground">
                    Our system is designed to help you overcome trouble spots. Send a video of your playing and we&apos;ll
                    get back to you with advice and encouragement to help you improve.
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