"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
    });

    gsap.to("#video-frame", {
      clipPath: "polygon(14% 40%, 80% 0%, 90% 70%, 40% 90%)",
      borderRadius: "40%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        scrub: true,
      },
    });
  });

  return (
    <section
      id="home"
      className="relative min-h-screen w-screen overflow-x-hidden"
    >
      <div
        id="video-frame"
        className="relative z-7 h-dvh w-screen overflow-x-hidden"
      >
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/bg-video-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* ART + description + call to action btn  */}
        <div className="absolute top-32 left-4 lg:left-32 z-10 flex flex-col text-white">
          <h1 className="text-[4rem] lg:text-[16rem] leading-none font-shrikhand font-extrabold text-amber-200">
            ART
          </h1>
          <p className="text-lg font-body text-white">
            Curated digital artwork from emerging creators. <br />
            Upload, sell, and collect with secure instant delivery.
          </p>
          <Button className="bg-amber-200 hover:bg-pink-300 mt-4 rounded-4xl p-4 text-foreground w-40 cursor-pointer">
            Browse Art
          </Button>
        </div>

        {/* STREAM foreground */}
        <h1 className="absolute bottom-4 right-4 lg:right-32 z-10 text-[4rem] lg:text-[16rem] font-shrikhand font-extrabold text-amber-200">
          STREAM
        </h1>
      </div>

      {/* STREAM background */}
      <h1 className="absolute bottom-4 right-4 lg:right-32 z-5 text-[4rem] lg:text-[16rem] font-shrikhand font-extrabold text-white">
        STREAM
      </h1>
    </section>
  );
}
