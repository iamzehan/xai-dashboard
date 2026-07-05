// src/components/common/Heading.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/cn";

const headingVariants = cva("font-semibold tracking-tight", {
  variants: {
    size: {
      xs: "text-lg",
      sm: "text-xl",
      md: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl lg:text-5xl",
      xl: "text-4xl md:text-6xl lg:text-7xl",
      hero: "text-5xl md:text-7xl lg:text-8xl",
    },
    color: {
      default: "text-[var(--color-text)]",
      muted: "text-[var(--color-text-muted)]",
      primary: "text-[var(--color-primary)]",
    },
    weight: {
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
    weight: "bold",
    align: "left",
  },
});

type HeadingElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color" | "align">,
    VariantProps<typeof headingVariants> {
  as?: HeadingElement;
}

export const Heading = React.forwardRef<
  HTMLHeadingElement,
  HeadingProps
>(
  (
    {
      as: Component = "h2",
      size,
      color,
      weight,
      align,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants({
            size,
            color,
            weight,
            align,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";