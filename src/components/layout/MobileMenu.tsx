"use client";

import * as React from "react";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/src/components/common/Button";
import { Container } from "@/src/components/common/Container";
import { navLinks } from "@/src/lib/navlinks";
import gsap from "gsap";
import { useTouchRipple } from "@/src/hooks/useTouchRipple";
import { Logo } from "../ui/Logo";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const closeRef = React.useRef<SVGSVGElement | null>(null);
  const navRef = React.useRef<HTMLElement | null>(null)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const ripple = useTouchRipple();
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(headerRef.current?.children || [], {
        opacity: 0,
        stagger: 0.15
      })
      tl.to(closeRef?.current, {
        rotate: 180,
        duration: 0.5,
      });
      tl.from(navRef.current?.children || [], {
        opacity: 0,
        duration: 0.5,
        y:50,
        stagger: 0.15
      })
      tl.from(btnRef.current, {
        opacity: 0,
        scale: 0.95
      })
    });

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <Menu className="size-7" />
      </Button>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 backdrop-blur-lg"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute left-0 right-0 top-0 border-b border-border bg-background h-screen transition-transform duration-500 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Container className="flex flex-col justify-between h-full p-0!">
            {/* Header */}
            <div ref={headerRef} className="flex h-20 w-full items-center justify-between
            rounded-bl-2xl shadow-primary shadow-lg/20 border-b
             border-border px-2">
              <div className="flex flex-col">  
              <a
                href="#hero"
                className="text-xl font-bold tracking-tight flex flex-col"
                onClick={() => setOpen(false)}
              >
                <Logo/>
              </a>
              <p className="text-muted font-thin text-sm!">Intelligence within</p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X
                  ref={closeRef}
                  className="size-7 animate-[spin-0.5s-ease-in-out-forwards]"
                />
              </Button>
            </div>

            {/* Navigation */}
            <nav ref={navRef} className="flex flex-col gap-3 py-6 px-2">
              {navLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    onTouchStart={ripple.onTouchStart}
                    onPointerDown={ripple.onPointerDown}
                    className="group flex items-center gap-4 rounded-2xl px-4 py-4"
                  >
                    <div
                      className={`flex size-11 items-center justify-center rounded-xl bg-card ${link.color}`}
                    >
                      <Icon className="size-5" />
                    </div>

                    <span className="font-mono text-xl uppercase tracking-wide text-muted transition-colors group-hover:text-primary">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="pb-8 h-full flex-1 flex items-end mx-2">
              <Button
                ref={btnRef}
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Get Access
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
