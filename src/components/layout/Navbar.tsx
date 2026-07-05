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
    return (
      <header
        ref={ref}
        className={cn("fixed inset-x-0 top-0 z-50 py-5", className)}
      >
        <Container className="p-0! h-auto! min-w-full">
          <nav className="flex items-center justify-between border-b border-(--color-border) bg-surface/70 px-6 py-4 backdrop-blur-xl">
            <a href="#hero" className="text-xl font-bold tracking-tight">
              <Logo/>
              <p className="text-muted font-thin text-xs!">Intelligence within</p>
            </a>

            <DesktopMenu />
            {!isMobile && (
              <Button variant="primary" size="sm" className={`md:inline-flex`}>
                Get Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {isMobile && <MobileMenu />}
          </nav>
        </Container>
      </header>
    );
  },
);

NavBar.displayName = "NavBar";
