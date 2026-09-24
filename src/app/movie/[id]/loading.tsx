import styles from "@/components/details/movie-detail.module.css";

export default function LoadingMovie() {
  return (
    <main className={styles.page} aria-label="Loading film details">
      <div className={styles.skeletonHero}>
        <div className={styles.skeletonGrid}>
          <div className={styles.skeletonPoster} />
          <div className={styles.skeletonLines}>
            {Array.from({ length: 5 }, (_, index) => <div className={styles.skeletonLine} key={index} />)}
          </div>
        </div>
      </div>
      <div className={styles.skeletonLower}>
        {Array.from({ length: 5 }, (_, index) => <div className={styles.skeletonCard} key={index} />)}
      </div>
    </main>
  );
}
