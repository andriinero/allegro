import { TextQuote } from "lucide-react";
import ContentWrapper from "../_components/general/content-wrapper";
import { Separator } from "../_components/ui/separator";

export default function IntroSection() {
  return (
    <section className="flex justify-center bg-[url('/guitar-dark.jpg')] bg-cover bg-center p-4 pb-32 pt-12 text-secondary">
      <ContentWrapper className="mt-32">
        <div className="flex flex-col gap-4">
          <p className="self-start rounded-full border-2 border-primary px-2 py-1 font-semibold">
            Over 1 Thousand Satisfied Customers
          </p>

          <h1 className="text-6xl font-extrabold uppercase">
            The best way <br /> to learn guitar
          </h1>

          <Separator className="border-b border-dashed border-primary bg-transparent" />

          <div className="mt-10 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TextQuote className="size-4" />
                <Separator className="h-4 bg-primary" orientation="vertical" />
                <h4 className="text-lg uppercase">Andrew</h4>
              </div>

              <p className="max-w-sm text-sm">
                It&#39;s exciting to be discovering a new & long put off hobby
                with teacher that is making it FUN.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TextQuote className="size-4" />
                <Separator className="h-4 bg-primary" orientation="vertical" />
                <h4 className="text-lg uppercase">Sam</h4>
              </div>

              <p className="max-w-sm text-sm">
                Absolutely amazing guitar lesson! 🎸 The instructor was super
                knowledgeable, patient, and made every concept so easy to
                understand.
              </p>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
