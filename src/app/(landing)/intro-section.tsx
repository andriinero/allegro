import Image from "next/image";
import ContentWrapper from "../_components/general/content-wrapper";
import { Button } from "../_components/ui/button";


export default function IntroSection() {
  return (
    <section className="flex justify-center relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <ContentWrapper>

<div className="relative container mx-auto px-4 py-20 lg:py-32">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    <div className="space-y-8">
      <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
        ✨ Certified Over 4 Million Members
      </div>

      <div className="space-y-4">
        <h1 className="font-black text-4xl lg:text-6xl leading-tight">
          MOST FUN WAY
          <br />
          <span className="text-primary">TO LEARN GUITAR</span>
        </h1>

        <p className="text-xl text-gray-300 max-w-lg">
          Get your free beginner chord chart and start your guitar journey today with the best guitar teacher in Berlin.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
          <Button
            variant="outline"
            className="bg-white border-white text-black hover:bg-transparent  hover:text-white h-12 flex-1"
          >
            Join with Google
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black h-12 flex-1"
          >
            Join with Apple
          </Button>

          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black h-12 flex-1"
          >
            Join with Facebook
          </Button>

          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black h-12 flex-1"
          >
            Join with Email
          </Button>
        </div>

        <p className="text-sm text-gray-400 max-w-md">
          By clicking any option above, you agree to our Terms of Service and acknowledge our Privacy Policy.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-primary rounded-full p-3">
          <span className="text-primary-foreground font-bold text-sm">FREE GIFT</span>
        </div>
        <span className="text-lg font-semibold">Get Beginner Chord Chart</span>
      </div>
    </div>

    <div className="relative">
      <Image
        width={500}
        height={500}
        src="/guitarist-recording-studio.png"
        alt="Professional guitarist playing acoustic guitar"
        className="w-full h-auto rounded-lg shadow-2xl"
      />
    </div>
  </div>
</div>
      </ContentWrapper>
    </section>
  );
}
