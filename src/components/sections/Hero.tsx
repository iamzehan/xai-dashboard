"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { Status } from "../common/Badge";
import { Button } from "../common/Button";
import { ArrowRight } from "lucide-react";
import { Container } from "../common/Container";
import ParticleNetwork from "../ui/ParticleNetwork";
import { Heading } from "../common/Heading";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
      });

      tl.from(badgeRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
      })
        .from(
          headingRef.current?.children || [],
          {
            y: 80,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.15",
        )
        .from(
          textRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          buttonsRef.current?.children ?? [],
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
          },
          "-=0.3",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen w-full mt-10">
      {/* Particle background */}
      <ParticleNetwork />

      <div
        className="hero-text absolute z-10 flex h-screen w-screen flex-col
        items-center justify-center gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-15 lg:px-0"
      >
        {/* Badge */}
        <div ref={badgeRef}>
          <Status text="INTELLIGENCE WORKSPACE" status="Active" />
        </div>

        {/* Headings */}
        <Container
          ref={headingRef}
          className="flex w-full flex-col gap-3 items-center text-center sm:gap-4 
          lg:gap-2"
        >
          <Heading as="h1" className="extra font-bold">
            Raw Data.
          </Heading>
          <Heading as="h2" className="extra">
            <b className="text-blue-400">Refined</b> intelligence.
          </Heading>
        </Container>

        {/* Description */}
        <Container ref={textRef} className="container max-w-150 px-4 sm:px-6">
          <p className="text-muted text-center text-shadow-sm">
            Xai ingests, structures, and transforms your data pipelines into
            actionable intelligence — built for decision-makers who cannot wait.
          </p>
        </Container>

        {/* Buttons */}
        <Container
          ref={buttonsRef}
          className="flex w-[80vw] flex-col items-center justify-center gap-2 sm:gap-3 sm:p-2 md:flex-row"
        >
          {/* Build Button*/}
          <Button variant="primary" className="w-full sm:w-auto">
            Start Building
          </Button>
          {/* Demo Button */}
          <Button
            variant="outline"
            className="text-muted flex w-full justify-center gap-1 backdrop-blur-2xl hover:gap-2 sm:w-auto"
          >
            Watch Demo <ArrowRight />
          </Button>
        </Container>
      </div>
    </section>
  );
}
