"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Star,
} from "lucide-react";
import Image from "next/image";

export interface IDataType {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

export default function FeaturedSlider({
  destinations,
}: {
  destinations: IDataType[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // প্রতিটি ধাপে ১টি করে সরবে, মোট কার্ডের বাইরে যাবে না
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, destinations.length - 1));
  };

  return (
    <div className="relative w-full">
      {/* Cards Viewport */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            // প্রতিটি কার্ড বড় স্ক্রিনে প্রায় 48% জায়গা নেবে
            transform: `translateX(-${currentIndex * 50}%)`,
          }}
        >
          {destinations.map((item) => (
            <div
              key={item._id}
              className="min-w-full md:min-w-[calc(50%-12px)] shrink-0 flex flex-col bg-white rounded-lg overflow-hidden group"
            >
              {/* Destination Image */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.destinationName}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-sm text-xs font-semibold flex items-center gap-1 shadow-sm">
                  <span>4.5</span>
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                </div>
              </div>

              {/* Destination Info */}
              <div className="pt-4 flex flex-col flex-1">
                {/* Country */}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.country}</span>
                </div>

                {/* Title & Price */}
                <div className="flex justify-between items-baseline gap-2 mb-2">
                  <h3 className="text-xl font-serif font-bold text-gray-900 truncate">
                    {item.destinationName}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.price}
                    </span>
                    <span className="text-xs text-gray-500">/Person</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.duration}</span>
                </div>

                {/* Book Link */}
                <Link
                  href={`/destinations/${item._id}`}
                  className="inline-flex items-center gap-1 text-teal-600 font-semibold text-xs tracking-wider uppercase hover:text-teal-700 transition mt-auto"
                >
                  BOOK NOW <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation & Counter */}
      <div className="flex items-center justify-between mt-12 pt-4 border-t border-gray-100">
        {/* Step / Count (1/5) */}
        <div className="text-sm font-medium text-gray-800">
          <span className="text-base font-bold">{currentIndex + 1}</span>
          <span className="text-gray-400">/{destinations.length}</span>
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous destination"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= destinations.length - 1}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next destination"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
