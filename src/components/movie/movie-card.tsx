import Image from "next/image";
import Link from "next/link";
import { Film, Star } from "lucide-react";
import { posterUrl } from "@/lib/tmdb/images";
import { getYear, formatRating } from "@/lib/movie-utils";
import { FavoriteButton } from "@/components/movie/favorite-button";
import type { MovieSummary } from "@/types/movie";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: MovieSummary;
  className?: string;
  priority?: boolean;
}

export function MovieCard({ movie, className, priority = false }: MovieCardProps) {
  const title = movie.title?.trim() || movie.original_title?.trim() || "Untitled film";
  const poster = posterUrl(movie.poster_path);

  return (
    <article className={cn("group relative min-w-0", className)}>
      <div className="relative aspect-[2/3] overflow-hidden rounded-[3px] bg-surface-raised shadow-[0_20px_45px_rgba(0,0,0,.2)]">
        <Link href={`/movie/${movie.id}`} className="absolute inset-0 block focus-visible:z-20" aria-label={`View details for ${title}`}>
          {poster ? (
            <Image src={poster} alt={`${title} theatrical poster`} fill sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 190px" quality={78} preload={priority} className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.035]" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_15%,#352029,#171514_70%)] px-4 text-center text-muted">
              <Film size={28} strokeWidth={1.2} aria-hidden="true" />
              <span className="font-display text-lg leading-tight text-foreground/80">{title}</span>
            </div>
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-90" aria-hidden="true" />
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-sm bg-black/65 px-2 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            <Star size={12} fill="currentColor" className="text-gold" aria-hidden="true" />
            {formatRating(movie.vote_average)}
          </span>
        </Link>
        <FavoriteButton movie={movie} className="absolute right-2 top-2 z-10 min-h-10 min-w-10 p-2.5 sm:opacity-80 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-gold"><Link href={`/movie/${movie.id}`}>{title}</Link></h3>
          <p className="mt-1 text-xs text-muted">{getYear(movie.release_date)}</p>
        </div>
      </div>
    </article>
  );
}
