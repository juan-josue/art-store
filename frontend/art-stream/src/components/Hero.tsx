"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
    });

    gsap.to("#video-frame", {
      clipPath: "polygon(14% 40%, 80% 0%, 90% 70%, 40% 90%)",
      borderRadius: "0 0 40% 40%",
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

        <h1 className="absolute bottom-5 right-5 z-10 text-[100px] font-title text-white">
          ARTSTREAM
        </h1>
      </div>
      <h1 className="absolute bottom-5 right-5 z-5 text-[100px] font-title text-blue-500">
        ARTSTREAM
      </h1>
    </div>
  );
}
