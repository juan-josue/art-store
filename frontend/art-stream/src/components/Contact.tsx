"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headingContainerRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "+=400",
        scrub: true,
      },
      translateY: 200,
      opacity: 0,
      ease: "power2.inOut",
    });
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-screen overflow-x-hidden bg-amber-200 px-16"
    >
      <div
        ref={headingContainerRef}
        className="flex flex-col items-center justify-center h-full"
      >
        <h1 className="text-[180px] text-nowrap font-shrikhand text-center pt-32 text-pink-300">
          ART STREAM
        </h1>
      </div>
      <div className="w-full flex justify-start gap-8">
        <div className="flex flex-col gap-4 text-zinc-900">
          <h2 className="font-title font-bold">Socials</h2>
          <a className="font-body hover:cursor-pointer">GitHub</a>
          <a className="font-body hover:cursor-pointer">LinkedIn</a>
          <a className="font-body hover:cursor-pointer">Portfolio</a>
        </div>
      </div>
      <p className="mt-8 text-zinc-800 text-lg font-body text-center mx-auto">
        This website is a work in progress. If you're a recruiter, artist, or
        just curious, feel free to connect.
      </p>
    </section>
  );
}
