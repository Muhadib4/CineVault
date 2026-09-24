"use client";

import Link from "next/link";
import styles from "@/components/details/movie-detail.module.css";

export default function MovieError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className={styles.page}>
      <div className={styles.routeState}>
        <p className={styles.eyebrow}>The projection paused</p>
        <h1>We couldn’t load this film.</h1>
        <p>The movie data is temporarily unavailable. Please try again in a moment.</p>
        <div className={styles.routeActions}>
          <button type="button" onClick={reset} className={styles.retryButton}>Try again</button>
          <Link href="/" className={styles.routeLink}>Go home</Link>
        </div>
      </div>
    </main>
  );
}
