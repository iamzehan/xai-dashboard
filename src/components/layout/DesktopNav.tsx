"use client";

import * as React from "react";

import { navLinks } from "@/src/lib/navlinks";

export function DesktopMenu() {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <ul className="hidden items-center gap-8 md:flex">
      {navLinks.map((link) => (
        <li
          key={link.label}
          className="flex flex-col"
          onMouseEnter={() => setHovered(link.label)}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href={link.href}
            className="font-mono text-sm font-medium uppercase text-muted/50 transition-colors hover:text-primary"
          >
            {link.label}
          </a>

          <span
            className={`mt-1 h-px bg-primary transition-all duration-300 ${
              hovered === link.label ? "w-full" : "w-0"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}