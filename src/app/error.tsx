"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // The boundary intentionally keeps the technical error out of the UI.
    if (process.env.NODE_ENV === "development") console.error(error);
  }, [error]);

  return <main className="page-shell flex min-h-[75vh] flex-col justify-center pt-28">
    <p className="eyebrow">A brief intermission</p>
    <h1 className="font-display mt-3 text-5xl sm:text-7xl">The screen went dark.</h1>
    <p className="mt-5 max-w-xl text-muted">We couldn&apos;t load this page right now. Please try again.</p>
    <button type="button" onClick={reset} className="button-primary mt-8 w-fit">Try again</button>
  </main>;
}
