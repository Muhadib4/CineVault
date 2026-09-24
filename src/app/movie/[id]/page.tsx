import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CastRail } from "@/components/details/cast-rail";
import { MovieDetailsHero } from "@/components/details/movie-details-hero";
import { MovieCard } from "@/components/movie/movie-card";
import { backdropUrl, getMovieDetails, type MovieDetails } from "@/lib/tmdb";
import styles from "@/components/details/movie-detail.module.css";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

function isMissingMovie(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "NOT_FOUND"
  );
}

async function loadMovie(id: string): Promise<MovieDetails> {
  if (!/^\d+$/.test(id) || Number(id) <= 0) notFound();

  try {
    return await getMovieDetails(id);
  } catch (error) {
    if (isMissingMovie(error)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  if (!/^\d+$/.test(id) || Number(id) <= 0) {
    return { title: "Film Not Found" };
  }

  try {
    const movie = await getMovieDetails(id);
    const overview = movie.overview?.trim();
    const description = overview
      ? overview.length > 160 ? `${overview.slice(0, 157).trimEnd()}…` : overview
      : `Explore ${movie.title} on CineVault.`;
    const image = backdropUrl(movie.backdrop_path, "w1280");

    return {
      title: movie.title,
      description,
      openGraph: {
        title: `${movie.title} | CineVault`,
        description,
        type: "video.movie",
        images: image ? [{ url: image, alt: `${movie.title} backdrop` }] : undefined,
      },
    };
  } catch {
    return { title: "Film" };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await loadMovie(id);
  const cast = movie.credits?.cast?.slice(0, 12) ?? [];
  const recommendations = (movie.recommendations?.results ?? [])
    .filter((recommendation) => recommendation.id !== movie.id)
    .slice(0, 12);

  return (
    <main className={styles.page}>
      <MovieDetailsHero movie={movie} />

      <div className={styles.content}>
        <section className={styles.storySection} aria-labelledby="story-title">
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIndex}>01 / The story</span>
            <h2 id="story-title" className={styles.sectionTitle}>About the film</h2>
          </div>
          <p className={styles.fullOverview}>
            {movie.overview?.trim() || "A synopsis is not available for this film yet."}
          </p>
        </section>

        {cast.length > 0 && <CastRail cast={cast} />}

        {recommendations.length > 0 && (
          <section className={styles.recommendations} aria-labelledby="recommendations-title">
            <div className={styles.sectionHeading}>
              <span className={styles.sectionIndex}>{cast.length > 0 ? "03" : "02"} / Keep watching</span>
              <h2 id="recommendations-title" className={styles.sectionTitle}>More like this</h2>
            </div>
            <div className={styles.recommendationRail}>
              {recommendations.map((recommendation) => (
                <div className={styles.recommendationItem} key={recommendation.id}>
                  <MovieCard movie={recommendation} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
