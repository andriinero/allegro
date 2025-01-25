"use client";

import Autoplay from "embla-carousel-autoplay";
import ContentWrapper from "../_components/general/content-wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";
import ReviewCard from "./review-card";

export default function ReviewSection() {
  return (
    <section className="flex flex-col items-center py-20">
      <ContentWrapper>
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{ align: "start", loop: true }}
          className="w-full px-0.5"
        >
          <CarouselPrevious />

          <CarouselContent>
            <CarouselItem className="basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>

            <CarouselItem className="basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>

            <CarouselItem className="basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>

            <CarouselItem className="basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>

            <CarouselItem className="basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>
          </CarouselContent>

          <CarouselNext />
        </Carousel>
      </ContentWrapper>
    </section>
  );
}
