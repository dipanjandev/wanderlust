import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  Check,
  ArrowRight,
} from "lucide-react";
import EditDestinationDialog from "@/components/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";

interface IDataType {
  _id?: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  id?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const DestinationDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  // ফেচ ডেটা
  const res = await fetch(`http://localhost:8000/destinations/${id}`);

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Destination details not found.
      </div>
    );
  }

  const destination: IDataType = await res.json();

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-16">
      {/* ১. টপ নেভিগেশন বার */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Destinations</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* This is The Edit Button */}

          <EditDestinationDialog destination={destination} />

          {/* This is The Delete Button */}

          <DeleteDestinationDialog id={id} />
        </div>
      </div>

      {/* ২. বড় ব্যানার ইমেজ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-80 sm:h-105 md:h-125 rounded-lg overflow-hidden shadow-sm">
          <Image
            src={
              destination.imageUrl ||
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            }
            alt={destination.destinationName}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      {/* ৩. মূল কন্টেন্ট ও সাইডবার গ্রিড */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* বাম পাশ: বিস্তারিত বিবরণী */}
          <div className="lg:col-span-2 space-y-8">
            {/* হেডার: লোকেশন, নাম এবং বেসিক ইনফো */}
            <div>
              <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{destination.country}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900 tracking-tight">
                {destination.destinationName}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span className="font-semibold text-slate-900">4.9</span>
                  <span className="text-slate-400 font-normal">
                    (234 reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{destination.duration}</span>
                </div>
              </div>
            </div>

            {/* ওভারভিউ সেকশন */}
            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-xl font-serif font-medium text-slate-900 mb-3">
                Overview
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* হাইলাইটস সেকশন */}
            <div className="border-t border-slate-100 pt-6">
              <h2 className="text-xl font-serif font-medium text-slate-900 mb-2">
                Highlights
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {destination.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Luxury beachfront accommodation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Visit Uluwatu Temple at sunset</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Traditional Balinese spa treatment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Private beach dinner experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sunrise trek to Mount Batur</span>
                </div>
              </div>
            </div>
          </div>

          {/* ডান পাশ: বুকিং কার্ড */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 border border-slate-200/90 rounded-md p-6 bg-white shadow-sm space-y-6">
              {/* প্রাইস */}
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  Starting from
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-cyan-600">
                    ${destination.price}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">
                    per person
                  </span>
                </div>
              </div>

              {/* ডিপার্চার ডেট ফিল্ড */}
              <div>
                <div className="w-full border border-slate-200 bg-slate-50/60 rounded px-3.5 py-2.5 text-sm font-medium text-slate-800">
                  {destination.departureDate || "Select Date"}
                </div>
              </div>

              {/* বুক নাউ অ্যাকশন বাটন */}
              <button className="w-full bg-[#139ebd] hover:bg-[#0f8da8] text-white py-3 px-4 rounded font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* পলিসি ও পার্কস */}
              <div className="space-y-2.5 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Free cancellation up to 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Travel insurance included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
