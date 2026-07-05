import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/cn";
import { useTouchRipple } from "@/src/hooks/useTouchRipple";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-xl",
    "font-medium",
    "cursor-pointer",
    "select-none",
    "outline-none",
    "transition-[background-color,color,border-color,box-shadow] duration-300",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--color-primary)]",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--color-bg)]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-primary)]",
          "text-white",
          "hover:text-[var(--color-primary)]",
          "hover:bg-[var(--color-primary-hover)]",
          "hover:shadow-lg shadow-blue-500/50",
          "border border-[var(--color-primary)]",
          "active:scale-[0.98]"
        ],

        secondary: [
          "bg-[var(--color-surface)]",
          "border border-[var(--color-border)]",
          "text-[var(--color-text)]",
          "hover:bg-[var(--color-card)]",
        ],

        outline: [
          "border border-[var(--color-border)]",
          "bg-transparent",
          "text-[var(--color-text)]",
          "hover:border-[var(--color-primary)]",
          "hover:bg-[var(--color-primary)]/10",
        ],

        ghost: [
          "bg-transparent",
          "text-[var(--color-text)]",
          "hover:bg-white/5",
        ],

        danger: [
          "bg-red-500",
          "text-white",
          "hover:bg-red-600",
        ],
      },

      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11 p-0",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      onTouchStart,
      onPointerDown,
      ...props
    },
    ref
  ) => {
    const ripple  = useTouchRipple();

    return (
      <button
        {...props}
        ref={ref}
        onTouchStart={(e) => {
          ripple.onTouchStart(e);
          onTouchStart?.(e);
        }}
        onPointerDown={(e) => {
          ripple.onPointerDown(e);
          onPointerDown?.(e);
        }}
        className={cn(
          "relative overflow-hidden active:scale-95!",
          buttonVariants({ variant, size }),
          variant === "outline" && "btn-outline-hover",
          className
        )}
      />
    );
  }
);

Button.displayName = "Button";