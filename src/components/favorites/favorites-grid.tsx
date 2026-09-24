"use client";

import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { MovieCard } from "@/components/movie/movie-card";
import { PosterSkeleton } from "@/components/movie/poster-skeleton";
import { useFavoritesStore } from "@/stores/favorites-store";

export function FavoritesGrid() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const hydrated = useFavoritesStore((state) => state.hydrated);

  if (!hydrated) {
    return <div role="status" aria-label="Loading your saved films"><PosterSkeleton /></div>;
  }

  if (favorites.length === 0) {
    return <div className="flex min-h-[45vh] flex-col items-center justify-center border-y border-border py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center border border-gold/30 bg-[#201717] text-gold"><Heart size={27} strokeWidth={1.2} aria-hidden="true" /></div>
      <h2 className="font-display text-3xl sm:text-4xl">Your vault is empty.</h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">Save a film and it will appear here.</p>
      <Link href="/discover" className="button-primary mt-7">Browse Movies <ArrowUpRight size={16} aria-hidden="true" /></Link>
    </div>;
  }

  return <>
    <p className="mb-7 text-sm text-muted" aria-live="polite">{favorites.length} saved {favorites.length === 1 ? "film" : "films"}</p>
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-6">
      {favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  </>;
}
