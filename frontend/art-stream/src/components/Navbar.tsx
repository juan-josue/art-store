"use client";

import { useRef } from "react";

import { Button } from "./ui/button";

const navbarItems = ["Gallery", "Marketplace", "About", "Contact"];

export default function Navbar() {
  const navContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 flex h-16 border-none transition-all duration-700"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-8">
            <img
              src="/img/artwork-1.jpg"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <Button id="product-btn" className="bg-amber-300 text-foreground">
              Products
            </Button>
          </div>

          <div className="flex h-full items-center ">
            {navbarItems.map((item, index) => (
              <a key={index}>{item}</a>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
}
