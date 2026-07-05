"use client"
import { Status } from "../common/Badge";
import { Button } from "../common/Button";
import { ArrowRight } from "lucide-react";
import ParticleNetwork from "../ui/ParticleNetwork";

export default function Hero() {
  return (
    <section id="hero" className="w-full relative min-h-screen">
      
      {/* Particle background */}
      <ParticleNetwork />

      {/* Text */}
      <div
        className="hero-text absolute z-10 h-screen w-screen flex flex-col 
      gap-8 sm:gap-10 lg:gap-15 justify-center items-center px-4 sm:px-6 lg:px-0"
      >
        {/* Status Badge */}
        <Status text="INTELLIGENCE WORKSPACE" status="Active"/>

        {/* Headings */}
        <header className="flex flex-col gap-3 sm:gap-4 lg:gap-6 text-center w-full">
          <h1 className="extra font-bold">Raw Data.</h1>
          <h1 className="extra">
            <b className="text-blue-400">Refined</b> intelligence.
          </h1>
        </header>
        {/* Text Description */}
        <div className="container max-w-100 px-4 sm:px-6">
          <p className="text-muted text-shadow-sm text-center wrap-normal">
            Xai ingests, structures, and transforms your data pipelines into actionable intelligence — built for decision-makers who cannot wait.
          </p>
        </div>
        {/* Access buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant={"primary"} className="w-full sm:w-auto">Start Building</Button>
          <Button variant={"outline"} className="text-muted backdrop-blur-2xl flex gap-1 hover:gap-2 w-full sm:w-auto justify-center">
            Watch Demo <ArrowRight/></Button>
        </div>
      </div>
    </section>
  );
}
