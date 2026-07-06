"use client";

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/src/lib/cn";
import { Feature } from "@/src/data/features";

type FeatureCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & Feature;

const accentClasses = {
  blue: {
    glow: "bg-blue-500/10",
    icon: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    badge: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  },

  purple: {
    glow: "bg-violet-500/10",
    icon: "border-violet-500/20 bg-violet-500/10 text-violet-400",
    badge: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  },

  green: {
    glow: "bg-emerald-500/10",
    icon: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  },
};

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon: Icon,
      title,
      description,
      badge,
      accent,
      step,
      className,
      ...props
    },
    ref
  ) => {
    const styles = accentClasses[accent];

    return (
      <article
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl",
          "border border-white/8",
          "bg-white2 backdrop-blur-sm",
          "cursor-pointer",
          // Only transition paint properties
          "transition-[background-color,border-color,box-shadow] ease-in-out duration-300",

          "hover:border-white/15",
          "hover:bg-white/[0.035]",
          "hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]",

          "p-10 lg:p-12",
          className
        )}
        {...props}
      >
        {/* Accent glow */}
        <div
          className={cn(
            "absolute -left-10 -top-10 h-36 w-36 rounded-full opacity-60 blur-3xl",
            styles.glow
          )}
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl border",
                "transition-colors duration-300",
                styles.icon
              )}
            >
              <Icon size={22} strokeWidth={2} />
            </div>

            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
              {step}
            </span>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-5">
            <h3 className="font-heading text-3xl font-semibold tracking-[-0.03em] text-foreground">
              {title}
            </h3>

            <p className="text-[15px] leading-8 text-muted">
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-12">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium tracking-wide",
                styles.badge
              )}
            >
              {badge}
            </span>
          </div>
        </div>
      </article>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;