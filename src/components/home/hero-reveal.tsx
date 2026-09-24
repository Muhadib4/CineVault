"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function HeroReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = ref.current.querySelectorAll("[data-reveal]");
    const animation = animate(elements, {
      opacity: [0, 1],
      y: [16, 0],
      duration: 620,
      delay: stagger(95),
      ease: "out(3)",
    });
    return () => { animation.revert(); };
  }, []);

  return <div ref={ref}>{children}</div>;
}
