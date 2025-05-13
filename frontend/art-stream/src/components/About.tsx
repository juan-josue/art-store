"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=500 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div
      id="about"
      className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-900"
    >
      <div className="relative mt-36 flex flex-col items-center gap-4">
        <h2 className="font-body text-white text-md uppercase">
          Welcome to ARTSTREAM
        </h2>

        <div className="font-title text-white text-4xl mt-5 text-center uppercase">
          The future of art <br />
          is <span className="text-amber-300">frictionless</span>. <br />
          Welcome to your <br />
          new gallery.
        </div>
      </div>

      <div id="clip" className="flex flex-col items-center justify-center h-dvh w-screen">
        <div className="relative mask-clip-path w-[300px] h-[500px]">
          <img
            src="/img/artwork-2.jpg"
            alt="Artwork"
            className="absolute inset-0 size-full rounded-2xl object-cover"
          />     
        </div>
      </div>
    </div>
  );
}
