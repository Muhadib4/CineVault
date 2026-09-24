"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MovieRailProps {
  label: string;
  children: React.ReactNode;
}

export function MovieRail({ label, children }: MovieRailProps) {
  const ref = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    const element = ref.current;
    if (!element) return;
    element.scrollBy({ left: direction * Math.max(element.clientWidth * .75, 280), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="absolute -top-[65px] right-0 hidden gap-2 sm:flex">
        <button type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${label} left`} className="flex h-10 w-10 items-center justify-center border border-border text-foreground/80 transition-colors hover:border-gold hover:text-gold"><ArrowLeft size={17} /></button>
        <button type="button" onClick={() => scroll(1)} aria-label={`Scroll ${label} right`} className="flex h-10 w-10 items-center justify-center border border-border text-foreground/80 transition-colors hover:border-gold hover:text-gold"><ArrowRight size={17} /></button>
      </div>
      <div ref={ref} role="region" aria-label={label} tabIndex={0} className="flex gap-3 overflow-x-auto pb-4 pr-6 scrollbar-thin scrollbar-color-[#51413b_transparent] focus-visible:outline-offset-[-2px] sm:gap-5">
        {children}
      </div>
    </div>
  );
}
