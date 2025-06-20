"use client";

import { useState, useEffect } from "react";

import FeaturedCarousel from "./FeaturedCarousel";
import ArtoworkGrid from "./ArtworkGrid";
import GuestNavbar from "@/components/GuestNavbar";
import UserNavbar from "@/components/UserNavbar";

export default function page() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5050/auth/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data));
  }, []);
  return (
    <>
      <header></header>
      <main className="flex flex-col gap-16 min-h-screen w-screen overflow-x-hidden">
        {user ? <UserNavbar /> : <GuestNavbar />}
        <section className="flex w-full justify-center">
          <FeaturedCarousel />
        </section>
        <section className="flex w-full justify-center">
          <ArtoworkGrid />
        </section>
      </main>
      <footer></footer>
    </>
  );
}
