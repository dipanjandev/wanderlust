import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime / 3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

function SearchField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-16 bg-white/5 px-5 py-2.5 sm:px-6 sm:py-3">
      <p className="text-base font-semibold leading-tight text-white lg:text-[17px]">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-light text-white/75 lg:text-[15px]">
        {value}
      </p>
    </div>
  );
}

export default function Banner() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-neutral-900 lg:min-h-[calc(100svh-4.5rem)]">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a coastal village beside a turquoise bay"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/25 to-black/55" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:py-20">
        <h1 className="w-full max-w-5xl font-heading text-[clamp(2.25rem,6.6vw,6rem)] font-light leading-none tracking-[-0.01em] text-white">
          <span className="block">Discover Your</span>
          <span className="block">Next Adventure</span>
        </h1>

        <p className="mt-6 w-full max-w-160 text-[clamp(1rem,1.4vw,1.25rem)] font-light leading-relaxed text-white/95">
          Explore breathtaking destinations and create unforgettable memories
          with
          <br className="hidden sm:block" /> our curated travel experiences.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:mt-12">
          <button
            type="button"
            className="group inline-flex h-12.5 w-full items-center justify-center gap-2.5 bg-brand px-5 text-[15px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Explore Now
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </button>
          <button
            type="button"
            className="inline-flex h-12.5 w-full items-center justify-center border border-white/30 bg-white/20 px-5 text-[15px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            View Destination
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full bg-white/20 backdrop-blur-md">
        <div className="grid grid-cols-2 gap-px bg-white/30 lg:grid-cols-[1fr_1fr_1fr_1fr_190px]">
          {searchFields.map((field) => (
            <SearchField key={field.label} {...field} />
          ))}
          <button
            type="button"
            className="col-span-2 flex min-h-16 items-center justify-center bg-brand px-8 text-xl font-semibold text-white transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:col-span-1"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
