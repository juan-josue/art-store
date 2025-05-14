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
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-7 h-dvh w-screen overflow-x-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* <div className="absolute inset-0 bg-black/20 z-0" /> */}

        <div className="absolute top-5 left-5 z-10 flex flex-col gap-4 text-white">
          <h1 className="text-[130px] font-title font-extrabold text-white">
            ART//
          </h1>
          <p className="text-md font-body text-white">
            Curated digital artwork from emerging creators. <br />
            Upload, sell, and collect with secure instant delivery.
          </p>
          <Button className="bg-amber-300 text-foreground w-40">Browse Art</Button>
        </div>

        <h1 className="absolute bottom-5 right-5 z-10 text-[130px] font-title font-extrabold text-white">
          //STREAM
        </h1>
      </div>
      <h1 className="absolute bottom-5 right-5 z-5 text-[130px] font-title font-extrabold text-amber-300">
        //STREAM
      </h1>
    </div>
  );
}
