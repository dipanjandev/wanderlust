import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowUpRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DestinationItem {
  _id?: string | number;
  destinationName: string;
  country: string;
  category?: string;
  price: string | number;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  description?: string;
}

interface DestinationCardProps {
  destination: DestinationItem;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  //   console.log("this is the id", destination);

  const { destinationName, country, price, duration, imageUrl } = destination;

  return (
    <Card className="overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between p-5 rounded-lg">
      {/* ইমেজ ও রেটিং ব্যাজ সেকশন */}
      <div className="rounded-xl relative w-full h-56 bg-slate-100 overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* টপ রাইট রেটিং ব্যাজ */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 flex items-center gap-1 text-xs font-semibold text-slate-800 shadow-sm">
          <span>4.5</span>
          <Star className="w-3.5 h-3.5 fill-black text-black" />
        </div>
      </div>

      {/* কনটেন্ট সেকশন */}
      <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* দেশ / লোকেশন */}
          <div className="flex items-center gap-1 text-slate-500 text-xs mb-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 stroke-[1.5]" />
            <span>{country}</span>
          </div>

          {/* ডেস্টিনেশন নাম এবং প্রাইস */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-lg font-medium text-slate-900 tracking-tight line-clamp-1">
              {destinationName}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-semibold text-base text-slate-900">
                ${price}
              </span>
              <span className="text-slate-400 text-xs font-normal">
                /Person
              </span>
            </div>
          </div>

          {/* সময়সীমা */}
          <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 stroke-[1.5]" />
            <span>{duration}</span>
          </div>
        </div>

        {/* বুকিং লিংক */}
        <div className="pt-2">
          <Link
            href={`/destinations/${destination._id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-cyan-600 hover:text-cyan-700 uppercase transition-colors"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
