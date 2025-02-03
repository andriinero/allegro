import ContentWrapper from "../_components/general/content-wrapper";
import { Separator } from "../_components/ui/separator";
import IntroQuote from "./intro-quote";

export default function IntroSection() {
  return (
    <section className="flex justify-center bg-[url('/guitar-dark.jpg')] bg-cover bg-center p-4 pb-32 pt-12 text-secondary">
      <ContentWrapper className="mt-32">
        <div className="flex flex-col gap-6 sm:gap-4">
          <p className="self-center rounded-full border-2 border-primary px-2 py-1 font-semibold sm:self-start">
            Over 1 Thousand Satisfied Customers
          </p>

          <h1 className="text-center text-5xl font-extrabold uppercase sm:text-start sm:text-6xl">
            The best way <br /> to learn guitar
          </h1>

          <Separator className="border-b border-dashed border-primary bg-transparent" />

          <div className="mt-4 space-y-4">
            <IntroQuote author="Andrew">
              It&#39;s exciting to be discovering a new & long put off hobby
              with teacher that is making it FUN.
            </IntroQuote>

            <IntroQuote author="Sam">
              Absolutely amazing guitar lesson! 🎸 The instructor was super
              knowledgeable, patient, and made every concept so easy to
              understand.
            </IntroQuote>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
