"use client";

import FeaturedCarousel from "./FeaturedCarousel";
import ArtoworkGrid from "./ArtworkGrid";
import GuestNavbar from "@/components/GuestNavbar";

export default function page() {
  return (
    <>
      <header></header>
      <main className="flex flex-col gap-16 min-h-screen w-screen overflow-x-hidden">
        <GuestNavbar />
        <section className="flex w-full justify-center">
          <FeaturedCarousel />
        </section>
        <section className="flex w-full justify-center">
          <ArtoworkGrid />
        </section>
      </main>
      <footer></footer>
    </>
  );
}
