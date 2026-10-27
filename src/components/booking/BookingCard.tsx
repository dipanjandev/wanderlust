"use client";
import { useSession } from "@/lib/auth-client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface IDataType {
  price: string;
  departureDate: string;
}

const BookingCard = ({ destination }: { destination: IDataType }) => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  //   console.log(destination);

  const handleBooking = async (e) => {
    e.preventDefault();
    const departureDate = e.target.departureDate.value;
    // console.log(departureDate);
    const data = {
      userName: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      departureDate: departureDate,
      bookingDate: new Date(),
    };

    const res = await fetch("http://localhost:8000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const bookingRes = await res.json();
    console.log(bookingRes);
  };

  return (
    <div className="sticky top-6 border border-slate-200/90 rounded-md p-6 bg-white shadow-sm space-y-6">
      {/* প্রাইস */}
      <div>
        <p className="text-xs text-slate-400 font-medium">Starting from</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-bold text-cyan-600">
            ${destination.price}
          </span>
          <span className="text-xs text-slate-500 font-normal">per person</span>
        </div>
      </div>

      <form onSubmit={handleBooking}>
        {/* ডিপার্চার ডেট ফিল্ড */}
        <div>
          <input
            type="date"
            name="departureDate"
            aria-label="Departure Date"
            defaultValue={destination.departureDate}
            className="w-full border border-slate-200 bg-slate-50/60 rounded px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 cursor-pointer"
          />
        </div>

        {/* বুক নাউ অ্যাকশন বাটন */}
        <Button
          type="submit"
          className="w-full bg-[#139ebd] hover:bg-[#0f8da8] text-white py-3 px-4 rounded font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

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
  );
};

export default BookingCard;
