"use client";

import * as React from "react";
import gsap from "gsap";

type RippleElement = HTMLElement;

export function useTouchRipple() {
  const createRipple = React.useCallback(
    (element: RippleElement, clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height) * 1.5;

      const ripple = document.createElement("span");

      Object.assign(ripple.style, {
        position: "absolute",
        left: `${clientX - rect.left}px`,
        top: `${clientY - rect.top}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "9999px",
        pointerEvents: "none",
        transform: "translate(-50%, -50%) scale(0)",
        opacity: "1",
        zIndex: "0",
        background:
          "radial-gradient(circle, rgba(255,255,255,.18) 0%, rgba(255,255,255,.08) 45%, transparent 75%)",
      });

      const computed = window.getComputedStyle(element);

      if (computed.position === "static") {
        element.style.position = "relative";
      }

      if (computed.overflow !== "hidden") {
        element.style.overflow = "hidden";
      }

      element.appendChild(ripple);

      gsap.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        onComplete: () => ripple.remove(),
      });
    },
    []
  );

  const onTouchStart = React.useCallback(
    <T extends HTMLElement>(e: React.TouchEvent<T>) => {
      const touch = e.touches[0];

      createRipple(
        e.currentTarget,
        touch.clientX,
        touch.clientY
      );
    },
    [createRipple]
  );

  const onPointerDown = React.useCallback(
    <T extends HTMLElement>(e: React.PointerEvent<T>) => {
      if (e.pointerType !== "touch") return;

      createRipple(
        e.currentTarget,
        e.clientX,
        e.clientY
      );
    },
    [createRipple]
  );

  return {
    onTouchStart,
    onPointerDown,
  };
}