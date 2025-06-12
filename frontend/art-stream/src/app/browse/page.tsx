"use client";

import FeaturedCarousel from "./FeaturedCarousel";
import ArtoworkGrid from "./ArtworkGrid";

export default function page() {
  return (
    <>
      <header></header>
      <main className="flex flex-col gap-16 py-8 min-h-screen w-screen overflow-x-hidden">
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
