import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function StartJourney() {
  return (
    <section className="relative flex min-h-[350px] items-center overflow-hidden bg-neutral-900">
      <Image
        src="/images/CTA.png"
        alt="Airplane flying over a tropical island surrounded by turquoise water"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 text-center sm:py-20">
        <h2 className="font-display text-[clamp(2rem,4.3vw,3.5rem)] font-light leading-[1.1] text-white">
          Ready To Start Your Journey?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base font-light text-white/90 sm:text-[17px]">
          Join thousands of travelers who have discovered the world with us
        </p>

        <button
          type="button"
          className="group mt-10 inline-flex h-[50px] items-center justify-center gap-2.5 bg-white px-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Book Your Trip Today
          <ArrowRight
            className="size-[18px] transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </button>
      </div>
    </section>
  );
}
