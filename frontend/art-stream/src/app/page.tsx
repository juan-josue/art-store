"use client";

import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Navbar from "@/components/landing/Navbar";
import Market from "@/components/landing/Market";
import Contact from "@/components/landing/Contact";

export default function Home() {

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-pink-300">
      <Navbar />
      <Hero />
      <About />
      <Market />
      <Contact />
    </main>
  );
}
