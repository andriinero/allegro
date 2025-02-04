"use client";

import Autoplay from "embla-carousel-autoplay";
import { Star, StarHalf } from "lucide-react";
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
    <section className="flex flex-col items-center py-12">
      <ContentWrapper className="flex-col items-center gap-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{ align: "start", loop: true }}
          className="w-full px-0.5"
        >
          <CarouselPrevious className="hidden sm:flex" />

          <CarouselContent>
            <CarouselItem className="sm:basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>

            <CarouselItem className="sm:basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>

            <CarouselItem className="sm:basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>

            <CarouselItem className="sm:basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>

            <CarouselItem className="sm:basis-1/3">
              <ReviewCard authorName="Hank" score={5}>
                After frustration from looking for a path through YouTube and
                seeing the ads I decided to give it a try and I am so glad I
                did.
              </ReviewCard>
            </CarouselItem>
          </CarouselContent>

          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-base font-semibold">Excellent</span>
          <div className="flex gap-0.5 text-primary">
            <Star className="size-4" />
            <Star className="size-4" />
            <Star className="size-4" />
            <Star className="size-4" />
            <StarHalf className="size-4" />
          </div>
          <span>
            <span className="font-semibold">512</span> reviews from satisfied
            students
          </span>
        </div>
      </ContentWrapper>
    </section>
  );
}
