import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { FavoriteButton } from "@/components/movie/favorite-button";
import { TrailerDialog } from "@/components/details/trailer-dialog";
import { HeroReveal } from "@/components/home/hero-reveal";
import { backdropUrl } from "@/lib/tmdb/images";
import { findTrailer, formatRating, formatRuntime, getYear } from "@/lib/movie-utils";
import type { Genre, MovieDetails, TmdbMovie } from "@/lib/tmdb/types";

interface HeroMovieProps {
  movie: TmdbMovie;
  details: MovieDetails | null;
  genres: Genre[];
}

export function HeroMovie({ movie, details, genres }: HeroMovieProps) {
  const backdrop = backdropUrl(movie.backdrop_path);
  const trailer = findTrailer(details?.videos);
  const genreName = details?.genres?.[0]?.name ?? genres.find((genre) => genre.id === movie.genre_ids?.[0])?.name;

  return (
    <section className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-[#1a1013] pt-28 sm:min-h-[740px] lg:min-h-[810px]" aria-labelledby="featured-title">
      {backdrop ? (
        <Image src={backdrop} alt="" fill preload quality={84} sizes="100vw" className="z-0 object-cover object-[58%_top] sm:object-center" />
      ) : (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_30%,#4a1e29_0%,#171011_48%,#080808_100%)]" />
      )}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,5,5,.97)_0%,rgba(5,5,5,.76)_36%,rgba(5,5,5,.24)_73%,rgba(5,5,5,.1)_100%),linear-gradient(0deg,#080808_0%,rgba(8,8,8,.15)_45%,rgba(8,8,8,.12)_100%)] max-sm:bg-[linear-gradient(0deg,#080808_0%,rgba(8,8,8,.82)_35%,rgba(8,8,8,.18)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_70%_58%,rgba(187,125,68,.10),transparent_44%)]" aria-hidden="true" />
      <div className="page-shell relative z-20 pb-16 pt-28 sm:pb-20 lg:pb-28">
        <HeroReveal>
          <div className="max-w-[690px]">
            <div data-reveal className="mb-6 flex items-center gap-3">
              <span className="h-px w-7 bg-gold" aria-hidden="true" />
              <span className="eyebrow">Featured Film</span>
            </div>
            <h1 id="featured-title" data-reveal className="font-display max-w-[680px] text-[clamp(3.5rem,7.6vw,7.8rem)] leading-[.92] tracking-[-.035em] text-foreground [text-wrap:balance]">{movie.title || "Untitled film"}</h1>
            <div data-reveal className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/80 sm:gap-x-4">
              <span>{getYear(movie.release_date)}</span>
              {genreName && <><span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" /><span>{genreName}</span></>}
              {details?.runtime ? <><span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" /><span>{formatRuntime(details.runtime)}</span></> : null}
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5"><Star size={14} fill="currentColor" className="text-gold" aria-hidden="true" />{formatRating(movie.vote_average)}</span>
            </div>
            <p data-reveal className="mt-5 max-w-[560px] text-sm leading-[1.75] text-foreground/75 sm:text-base">{movie.overview || "Explore the story behind this film."}</p>
            <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/movie/${movie.id}`} className="button-primary"><span>View Details</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
              {trailer && <TrailerDialog trailer={trailer} title={movie.title} />}
              <FavoriteButton movie={movie} className="min-h-[46px] min-w-[46px]" />
            </div>
          </div>
        </HeroReveal>
      </div>
      <div className="absolute bottom-7 right-[max(1.5rem,calc((100%-var(--content-width))/2))] z-20 hidden items-center gap-3 text-[10px] font-semibold tracking-[.2em] text-foreground/45 lg:flex" aria-hidden="true"><span className="h-px w-12 bg-foreground/40" /> DISCOVER CINEMA</div>
    </section>
  );
}
