import Link from "next/link";
import styles from "@/components/details/movie-detail.module.css";

export default function MovieNotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.routeState}>
        <p className={styles.eyebrow}>Film unavailable / 404</p>
        <h1>That film is off screen.</h1>
        <p>We couldn’t find this title. It may have been removed or the link may be incorrect.</p>
        <div className={styles.routeActions}>
          <Link href="/discover" className={styles.routeLink}>Browse films</Link>
        </div>
      </div>
    </main>
  );
}
