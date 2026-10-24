import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#f0fbfc] py-20 lg:py-24">
      <div className="mx-auto max-w-300 px-6">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-normal tracking-[-0.01em] text-neutral-950 sm:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-base text-neutral-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-10"
              />
              <h3 className="mt-6 font-heading text-[1.75rem] font-normal leading-tight text-neutral-950">
                {feature.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
