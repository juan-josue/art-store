"use client";

import { useRef } from "react";
import Link from "next/link";

import { Button } from "./ui/button";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const navbarItems = ["Home", "About", "Market", "Contact"];

export default function Navbar() {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(navRef.current, {
      scrollTrigger: {
        trigger: navContainerRef.current,
        start: "top top",
        end: "+=400",
        scrub: true,
      },
      backgroundColor: "#18181b",
      scale: 0.95,
      ease: "power1.out",
    });
  });

  return (
    <div
      ref={navContainerRef}
      className="hidden fixed inset-x-0 top-4 z-50 lg:flex h-16 border-none rounded-xl"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2 flex justify-center">
        <nav
          ref={navRef}
          className="flex items-center justify-between gap-32 p-4 w-full mx-32 rounded-lg"
        >
          <div className="flex items-center gap-8">
            <img
              src="/img/artwork-1.jpg"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <Button
              id="product-btn"
              className="bg-white text-foreground hover:bg-amber-200 transition-colors duration-200 cursor-pointer"
            >
              <Link href="/login">Start Selling</Link>
            </Button>
          </div>

          <div className="hidden lg:flex h-full items-center gap-8">
            {navbarItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="text-white font-body font-bold uppercase hover:text-amber-200 transition-colors duration-200 cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
}
