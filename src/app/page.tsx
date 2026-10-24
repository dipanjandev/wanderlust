import Banner from "@/components/Banner";
import StartJourney from "@/components/StartJourney";
import WhatTravelarsSays from "@/components/WhatTravelarsSays";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex-1">
        <Banner />
        <WhyChoose />
        <WhatTravelarsSays />
        <StartJourney />
      </main>
    </div>
  );
}
