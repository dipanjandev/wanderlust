import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedSlider, { IDataType } from "./FeaturedSlider";

const FeaturedSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/featured-destination`,
  );
  const data: IDataType[] = res.ok ? await res.json() : [];
  const featuredData = Array.isArray(data) ? data : [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            Featured Destinations
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 border border-teal-600/40 text-teal-700 px-5 py-2.5 rounded text-xs sm:text-sm font-semibold tracking-wider hover:bg-teal-50 transition"
        >
          ALL DESTINATIONS <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Slider Component */}
      <FeaturedSlider destinations={featuredData} />
    </section>
  );
};

export default FeaturedSection;
