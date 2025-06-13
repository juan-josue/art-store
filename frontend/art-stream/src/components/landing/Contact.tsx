"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const linkSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headingContainerRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "+=500",
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
      className="relative min-h-screen w-screen overflow-x-hidden bg-amber-200 px-4 lg:px-32 pt-16 lg:pt-64"
    >
      {/* link section */}
      <div ref={linkSectionRef} className="flex flex-col lg:flex-row w-full gap-32">
        {/* left side text */}
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <h2 className="font-title text-3xl lg:text-6xl text-zinc-900">
            Sell your art on
          </h2>
          <h3 className="font-title font-extrabold text-6xl text-zinc-900">
            Art Stream.
          </h3>
        </div>

        {/* links */}
        <div className="flex gap-16 lg:gap-32 w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <h2 className="font-title font-bold text-xl text-zinc-900">
              Sitemap
            </h2>
            <ul>
              <li>
                <a className="font-body text-md text-zinc-900 cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a className="font-body text-md text-zinc-900 cursor-pointer">
                  About
                </a>
              </li>
              <li>
                <a className="font-body text-md text-zinc-900 cursor-pointer">
                  Features
                </a>
              </li>
              <li>
                <a className="font-body text-md text-zinc-900 cursor-pointer">
                  Contact
                </a>
              </li>
              <li>
                <a className="font-body text-md text-zinc-900 cursor-pointer">
                  404
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-title font-bold text-xl text-zinc-900">
              Contact
            </h2>
            <ul>
              <li>
                <a className="font-body text-md text-zinc-900 cursor-pointer">
                  GitHub
                </a>
              </li>
              <li>
                <a className="font-body text-md text-zinc-900 cursor-pointer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="font-body text-md text-zinc-900 cursor-pointer">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* heading */}
      <div
        ref={headingContainerRef}
        className="flex mt-64 items-center justify-center w-full"
      >
        <h1 className="text-[3rem] lg:text-[14em] text-nowrap font-shrikhand text-center text-zinc-900 leading-0">
          ART STREAM
        </h1>
      </div>
    </section>
  );
}
