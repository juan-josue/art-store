"use client";

import FeaturedCarousel from "./FeaturedCarousel";

export default function page() {
  return (
    <>
      <header></header>
      <main className="min-h-screen w-screen overflow-x-hidden">
        <section className="flex w-full justify-center">
            <FeaturedCarousel />
        </section>
        <section> Browse All </section>
      </main>
      <footer></footer>
    </>
  );
}
