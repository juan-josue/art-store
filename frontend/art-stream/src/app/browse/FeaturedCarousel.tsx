"use client";

import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

import Autoplay from "embla-carousel-autoplay";

export default function FeaturedCarousel() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <Carousel
      plugins={[plugin.current]}
      orientation="horizontal"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
      className="w-full max-w-7xl"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/3 pl-8">
              <Card>
                <CardContent className="flex aspect-2/1 items-center justify-center p-4">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
