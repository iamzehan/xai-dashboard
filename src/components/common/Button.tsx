import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
// lightweight className helper to avoid depending on external utils
function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-xl",
    "font-medium",
    "transition-all duration-300",
    "cursor-pointer",
    "select-none",
    "outline-none",
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
          "hover:bg-[var(--color-primary-hover)]",
          "active:scale-[0.98]",
          "shadow-lg shadow-[var(--color-primary)]/20",
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

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}