"use client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
];

const controlStyles =
  "static size-[50px] border-neutral-300 bg-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 [&_svg]:size-5! [&_svg]:stroke-[1.5]";

export default function WhatTravelarsSays() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Carousel opts={{ align: "start" }}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-4xl font-normal tracking-[-0.01em] text-neutral-950 sm:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-2 text-base text-neutral-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center gap-5">
              <CarouselPrevious
                className={controlStyles}
                aria-label="Previous testimonial"
              />
              <CarouselNext
                className={controlStyles}
                aria-label="Next testimonial"
              />
            </div>
          </div>

          <CarouselContent className="mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full md:basis-1/2"
              >
                <article className="flex h-full min-h-[264px] flex-col border border-neutral-200 bg-white sm:flex-row">
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-6">
                    <blockquote className="text-[20px] leading-[1.2] text-neutral-950">
                      {testimonial.quote}
                    </blockquote>
                    <div className="mt-6">
                      <p className="text-[15px] font-medium text-brand">
                        <span aria-hidden="true">— </span>
                        {testimonial.name}
                      </p>
                      <p className="mt-1 text-sm text-neutral-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="relative mx-6 mb-6 h-[213px] shrink-0 overflow-hidden sm:mx-0 sm:mb-0 sm:mr-5 sm:mt-4 sm:w-[197px] sm:self-start">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(min-width: 640px) 197px, calc(100vw - 96px)"
                      className="object-cover"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
