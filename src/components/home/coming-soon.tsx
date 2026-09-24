import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Film } from "lucide-react";
import { posterUrl } from "@/lib/tmdb/images";
import { formatReleaseDate } from "@/lib/movie-utils";
import type { TmdbMovie } from "@/lib/tmdb/types";

export function ComingSoon({ movies }: { movies: TmdbMovie[] }) {
  return (
    <div className="grid gap-x-8 border-t border-border md:grid-cols-2">
      {movies.map((movie) => {
        const poster = posterUrl(movie.poster_path, "w185");
        return <Link href={`/movie/${movie.id}`} key={movie.id} className="group flex items-center gap-4 border-b border-border py-4 transition-colors hover:bg-white/[.025] sm:gap-6 sm:py-5">
          <span className="relative block h-28 w-[75px] shrink-0 overflow-hidden bg-surface-raised sm:h-32 sm:w-[86px]">{poster ? <Image src={poster} alt="" fill sizes="86px" className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" /> : <span className="flex h-full items-center justify-center text-muted"><Film size={20} /></span>}</span>
          <span className="min-w-0 flex-1">
            <span className="eyebrow">{formatReleaseDate(movie.release_date)}</span>
            <span className="font-display mt-2 block text-xl leading-tight transition-colors group-hover:text-gold sm:text-2xl">{movie.title}</span>
            <span className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{movie.overview || "See film details."}</span>
          </span>
          <ArrowUpRight size={18} className="shrink-0 self-start text-gold opacity-65 transition-opacity group-hover:opacity-100" aria-hidden="true" />
        </Link>;
      })}
    </div>
  );
}
