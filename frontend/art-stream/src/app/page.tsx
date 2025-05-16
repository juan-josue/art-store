"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import Market from "@/components/Market";
import Contact from "@/components/Contact";

export default function Home() {

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-900">
      <Navbar />
      <Hero />
      <About />
      <Market />
      <Contact />
    </main>
  );
}
