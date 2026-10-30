"use client";
import Image from "next/image";
import { CheckCircle2, Calendar, MapPin, Trash2, Eye } from "lucide-react";
import { IBookingType } from "@/app/bookings/page";
import { useRouter } from "next/navigation";

const MybookingsList = ({ myBooking }: { myBooking: IBookingType }) => {
  const router = useRouter();

  const handleDeleteItem = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mybookings/${myBooking._id}`,
      {
        method: "DELETE",
      },
    );
    await res.json();
    router.refresh();
  };

  // তারিখ সুন্দর ফরম্যাটে রূপান্তর (যেমন: May 15, 2026)
  const formattedDate = myBooking.departureDate
    ? new Date(myBooking.departureDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Not specified";

  // ছবির মতো ছোট বুকিং আইডি দেখাতে চাইলে (যেমন: _id এর প্রথম বা শেষের অংশ)
  const displayBookingId = myBooking._id ? myBooking._id.slice(-4) : "N/A";

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-lg p-5 flex flex-col md:flex-row items-stretch gap-6 shadow-sm hover:shadow-md transition-shadow">
      {/* বাম পাশের ছবি */}
      <div className="relative w-full md:w-72 h-48 md:h-auto rounded-md overflow-hidden shrink-0">
        <Image
          src={
            myBooking.imageUrl ||
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4"
          }
          alt={myBooking.destinationName || "Destination"}
          fill
          className="object-cover"
        />
      </div>

      {/* ডান পাশের তথ্য ও কন্ট্রোলস */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          {/* Confirmed ব্যাজ */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-medium mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </div>

          {/* ডেস্টিনেশন নাম */}
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
            {myBooking.destinationName}
          </h2>

          {/* মেটা ইনফরমেশন (তারিখ ও আইডি) */}
          <div className="space-y-2 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Departure: {formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Booking ID: {displayBookingId}</span>
            </div>
          </div>
        </div>

        {/* নিচের অংশ: প্রাইস ও বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-2">
          {/* প্রাইস */}
          <div className="text-3xl font-bold text-[#0891b2]">
            ${myBooking.price}
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="flex items-center gap-3">
            {/* Cancel বাটন */}
            <button
              onClick={handleDeleteItem}
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-rose-500 bg-white border border-rose-300 rounded hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Cancel</span>
            </button>

            {/* View বাটন */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white bg-[#0891b2] rounded hover:bg-[#0e7490] transition-colors cursor-pointer shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MybookingsList;
