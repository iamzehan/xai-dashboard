"use client";
import { NavBar } from "../components/layout/Navbar";
import Features from "../components/sections/Features";
import Hero from "../components/sections/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <NavBar/>
      {/* Hero Container */}
      <Hero />
      {/* Feature Cards Container */}
      <Features/>
    </main>
  );
}
