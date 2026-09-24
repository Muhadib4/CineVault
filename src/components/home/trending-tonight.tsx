import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Film, Star } from "lucide-react";
import { backdropUrl, posterUrl } from "@/lib/tmdb/images";
import { formatRating, getYear } from "@/lib/movie-utils";
import type { TmdbMovie } from "@/lib/tmdb/types";

export function TrendingTonight({ movies }: { movies: TmdbMovie[] }) {
  const [lead, ...rest] = movies;
  if (!lead) return null;
  const leadImage = backdropUrl(lead.backdrop_path) ?? posterUrl(lead.poster_path, "w780");
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,.84fr)] lg:gap-8">
      <Link href={`/movie/${lead.id}`} className="group relative flex min-h-[365px] flex-col justify-end overflow-hidden bg-[#1c1515] p-5 sm:min-h-[440px] sm:p-8">
        {leadImage ? <Image src={leadImage} alt="" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /> : <div className="absolute inset-0 flex items-center justify-center text-gold/30"><Film size={80} strokeWidth={1} /></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <span className="pointer-events-none absolute -top-8 right-2 font-display text-[10rem] leading-none text-foreground/15 sm:text-[14rem]" aria-hidden="true">01</span>
        <div className="relative">
          <p className="eyebrow">This week&apos;s spotlight</p>
          <h3 className="font-display mt-2 text-4xl leading-none sm:text-5xl">{lead.title}</h3>
          <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-relaxed text-foreground/75">{lead.overview || "Explore film details."}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">Explore film <ArrowUpRight size={16} aria-hidden="true" /></span>
        </div>
      </Link>
      <div className="divide-y divide-border border-y border-border">
        {rest.slice(0, 4).map((movie, index) => {
          const poster = posterUrl(movie.poster_path, "w185");
          return <Link key={movie.id} href={`/movie/${movie.id}`} className="group grid grid-cols-[2rem_3.5rem_minmax(0,1fr)_1rem] items-center gap-3 py-3 transition-colors hover:bg-white/[.035] sm:grid-cols-[3rem_4.2rem_minmax(0,1fr)_1rem] sm:gap-4 sm:py-4">
            <span className="font-display text-3xl text-gold/70 sm:text-4xl">0{index + 2}</span>
            <span className="relative block aspect-[2/3] overflow-hidden bg-surface-raised">{poster ? <Image src={poster} alt="" fill sizes="70px" className="object-cover" /> : <span className="flex h-full items-center justify-center"><Film size={16} className="text-muted" /></span>}</span>
            <span className="min-w-0"><span className="block truncate font-display text-lg leading-tight text-foreground transition-colors group-hover:text-gold sm:text-xl">{movie.title}</span><span className="mt-1.5 flex items-center gap-3 text-xs text-muted"><span>{getYear(movie.release_date)}</span><span className="inline-flex items-center gap-1"><Star size={12} fill="currentColor" className="text-gold" />{formatRating(movie.vote_average)}</span></span></span>
            <ArrowUpRight size={16} className="text-gold opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
          </Link>;
        })}
      </div>
    </div>
  );
}
