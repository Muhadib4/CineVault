"use client";

import { RotateCcw } from "lucide-react";

export default function SearchError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-background px-5 pt-24 text-center text-foreground">
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Search unavailable</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">The screen went dark.</h1>
        <p className="mt-5 leading-7 text-muted">CineVault could not load search results right now. Check your connection and try again.</p>
        <button onClick={reset} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg border border-gold/40 px-5 text-sm font-medium text-gold transition-colors hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
          <RotateCcw size={17} aria-hidden="true" /> Try again
        </button>
      </div>
    </main>
  );
}
