import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, Film, Globe2, Star } from "lucide-react";
import { FavoriteButton } from "@/components/movie/favorite-button";
import { backdropUrl, posterUrl, type MovieDetails } from "@/lib/tmdb";
import { findTrailer, formatRating, formatReleaseDate, formatRuntime, getYear } from "@/lib/movie-utils";
import { TrailerDialog } from "./trailer-dialog";
import styles from "./movie-detail.module.css";

type Props = {
  movie: MovieDetails;
};

function languageName(code: string): string {
  if (!code) return "Not listed";
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) || code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

export function MovieDetailsHero({ movie }: Props) {
  const backdrop = backdropUrl(movie.backdrop_path, "w1280");
  const poster = posterUrl(movie.poster_path, "w500");
  const director = movie.credits?.crew?.find((member) => member.job === "Director");
  const trailer = findTrailer(movie.videos);
  const countries = movie.production_countries?.map((country) => country.name).join(", ");
  const releaseYear = getYear(movie.release_date);

  return (
    <>
      <section className={styles.hero} aria-labelledby="movie-title">
        <div className={styles.backdrop} aria-hidden="true">
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.backdropImage}
            />
          )}
        </div>

        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Discover</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{movie.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.posterFrame}>
              {poster ? (
                <Image
                  src={poster}
                  alt={`${movie.title} theatrical poster`}
                  fill
                  priority
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 280px"
                  className={styles.posterImage}
                />
              ) : (
                <div className={styles.posterFallback} role="img" aria-label={`No poster available for ${movie.title}`}>
                  <Film size={36} strokeWidth={1.3} aria-hidden="true" />
                  <span>CineVault</span>
                </div>
              )}
            </div>

            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>CineVault / Film details</p>
              <h1 id="movie-title" className={styles.movieTitle}>{movie.title}</h1>
              {movie.original_title && movie.original_title !== movie.title && (
                <p className={styles.originalTitle}>Original title: {movie.original_title}</p>
              )}
              {movie.tagline?.trim() && <p className={styles.tagline}>“{movie.tagline.trim()}”</p>}

              <div className={styles.quickMeta} aria-label="Film details">
                {releaseYear && (
                  <span><CalendarDays size={15} aria-hidden="true" />{releaseYear}</span>
                )}
                {movie.runtime ? (
                  <span><Clock3 size={15} aria-hidden="true" />{formatRuntime(movie.runtime)}</span>
                ) : null}
                {movie.vote_count > 0 && (
                  <span className={styles.rating} aria-label={`TMDB rating ${formatRating(movie.vote_average)} out of 10`}>
                    <Star size={15} fill="currentColor" aria-hidden="true" />
                    {formatRating(movie.vote_average)} <small>/ 10</small>
                  </span>
                )}
              </div>

              {movie.genres?.length > 0 && (
                <div className={styles.genres} aria-label="Genres">
                  {movie.genres.map((genre) => (
                    <Link href={`/discover?genre=${genre.id}`} key={genre.id} className={styles.genre}>
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}

              <p className={styles.heroOverview}>
                {movie.overview?.trim() || "A synopsis is not available for this film yet."}
              </p>

              <div className={styles.actions}>
                {trailer && <TrailerDialog trailer={trailer} title={movie.title} />}
                <FavoriteButton movie={movie} variant="labeled" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.factStrip}>
        <div className={styles.factStripInner}>
          <div className={styles.fact}>
            <span className={styles.factLabel}>Director</span>
            <span className={styles.factValue}>{director?.name || "Not listed"}</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factLabel}>Release</span>
            <span className={styles.factValue}>{formatReleaseDate(movie.release_date)}</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factLabel}>Language</span>
            <span className={styles.factValue}><Globe2 size={15} aria-hidden="true" />{languageName(movie.original_language)}</span>
          </div>
          <div className={styles.fact}>
            <span className={styles.factLabel}>Production</span>
            <span className={styles.factValue}>{countries || "Not listed"}</span>
          </div>
        </div>
      </div>
    </>
  );
}
