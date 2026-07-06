"use client";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import FeatureCard from "../cards/FeatureCard";
import { features } from "@/src/data/features";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Heading (shared across all breakpoints)
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        delay: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
          scrub: 1
        },
      });

      // Mobile
      mm.add("(max-width: 1023px)", () => {
        cardRefs.current.forEach((card) => {
          if (!card) return;

          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
              scrub:1
            },
          });
        });
      });

      // Desktop
      mm.add("(min-width: 1024px)", () => {
        gsap.from(cardRefs.current, {
          y: 100,
          opacity: 0,
          stagger: 0.18,
          delay: 1.5,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            start: "top 85%",
            trigger: sectionRef.current,
            scrub: 0.2
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Top transition */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-background via-background/70 to-transparent" />

      {/* Bottom transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-background via-background/70 to-transparent" />

      {/* Center vignette */}
      <div
        className="
      pointer-events-none
      absolute
      inset-0
      bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,15,0.08)_55%,rgba(10,10,15,0.28)_80%,rgba(10,10,15,0.6)_100%)]
    "
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-16 px-4 py-32">
        <div ref={headingRef} className="max-w-3xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">
            How it works
          </span>

          <h2 className="font-heading text-5xl font-semibold tracking-[-0.04em] text-balance md:text-6xl lg:text-7xl">
            Three stages.
            <br />
            One continuous flow.
          </h2>

          <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl">
            Every dataset follows the same intelligent pipeline—from ingestion
            to inference to actionable insights—without requiring manual
            orchestration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              step={String(index + 1).padStart(2, "0")}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
