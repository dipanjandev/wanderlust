import type { Metadata } from "next";
import { Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import FooterSection from "@/components/FooterSection";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Wanderlust | Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${cormorantGaramond.variable} ${josefinSans.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NavBar />
        <div className="flex-1">{children}</div>
        <FooterSection />
      </body>
    </html>
  );
}
