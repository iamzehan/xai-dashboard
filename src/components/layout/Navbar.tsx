"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/src/lib/cn";
import { Container } from "@/src/components/common/Container";
import { Button } from "@/src/components/common/Button";
import { DesktopMenu } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { useIsMobile } from "@/src/hooks";
import { Logo } from "../ui/Logo";

export type NavBarProps = React.HTMLAttributes<HTMLElement>;

export const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  ({ className, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <header
        ref={ref}
        className={cn("fixed inset-x-0 top-0 z-50 py-5", className)}
        {...props}
      >
        <Container className="h-auto! min-w-full p-0!">
          <nav
            className={cn(
              "flex items-center justify-between px-6 py-4 transition-all duration-300",

              scrolled
                ? "border-b border-(--color-border) bg-surface/70 backdrop-blur-xl"
                : "border-b border-transparent bg-transparent backdrop-blur-none"
            )}
          >
            <a href="#hero" className="text-xl font-bold tracking-tight">
              <Logo />
              <p className="text-muted text-xs! font-thin">
                Intelligence within
              </p>
            </a>

            <DesktopMenu />

            {!isMobile && (
              <Button variant="primary" size="sm">
                Get Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {isMobile && <MobileMenu />}
          </nav>
        </Container>
      </header>
    );
  }
);

NavBar.displayName = "NavBar";