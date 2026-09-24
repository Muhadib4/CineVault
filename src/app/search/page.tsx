import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "@/components/movie/movie-card";
import { Pagination } from "@/components/search/pagination";
import { SearchForm } from "@/components/search/search-form";
import { SearchState } from "@/components/search/search-state";
import { searchMovies } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Search Films",
  description: "Search movies by title and find your next film in CineVault.",
};

type QueryValue = string | string[] | undefined;

interface SearchPageProps {
  searchParams: Promise<{ q?: QueryValue; page?: QueryValue }>;
}

function singleValue(value: QueryValue) {
  return typeof value === "string" ? value : Array.isArray(value) ? value[0] : "";
}

function validPage(value: QueryValue) {
  const parsed = Number(singleValue(value));
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 500 ? parsed : 1;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = singleValue(params.q).trim().slice(0, 120);
  const page = validPage(params.page);
  const isConfigured = Boolean(process.env.TMDB_ACCESS_TOKEN?.trim());
  const results = query && isConfigured ? await searchMovies(query, page) : null;
  const resultCount = results?.total_results ?? 0;

  if (results && results.total_pages > 0 && page > results.total_pages) {
    const lastPage = Math.min(results.total_pages, 500);
    redirect(`/search?q=${encodeURIComponent(query)}&page=${lastPage}`);
  }

  function hrefForPage(nextPage: number) {
    const nextParams = new URLSearchParams({ q: query });
    if (nextPage > 1) nextParams.set("page", String(nextPage));
    return `/search?${nextParams.toString()}`;
  }

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-56 -z-10 size-[600px] rounded-full bg-burgundy/15 blur-[100px]" />
        <div className="mx-auto max-w-[1480px]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Find a film</p>
          <h1 className="max-w-2xl font-display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">Search the screen.</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">A film you remember. A title you have yet to meet.</p>
          <div className="mt-9 sm:mt-11"><SearchForm initialQuery={query} /></div>
        </div>
      </section>

      <section aria-label="Search results" className="mx-auto max-w-[1480px] px-5 pt-10 sm:px-8 sm:pt-12 lg:px-12">
        {query && results && resultCount > 0 && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Search results</p>
              <h2 className="font-display text-3xl sm:text-4xl">Results for “{query}”</h2>
            </div>
            <p className="text-sm tabular-nums text-muted">{resultCount.toLocaleString("en-US")} {resultCount === 1 ? "film" : "films"}</p>
          </div>
        )}

        {!query ? (
          <SearchState
            variant="search"
            title="Find your next film."
            description="Search for a title above, or browse the collection by genre and rating."
            action={{ href: "/discover", label: "Explore all films" }}
          />
        ) : !isConfigured ? (
          <SearchState
            variant="error"
            title="Movie data is unavailable."
            description="CineVault needs a TMDB Read Access Token to search films. Add TMDB_ACCESS_TOKEN to .env.local and restart the app."
          />
        ) : results && resultCount === 0 ? (
          <SearchState
            title={`No films found for “${query}”`}
            description="Try another title or explore the collection."
            action={{ href: "/discover", label: "Browse films" }}
          />
        ) : results ? (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
              {results.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            <Pagination page={page} totalPages={results.total_pages} hrefForPage={hrefForPage} />
            <div className="mt-12 flex justify-center">
              <Link href="/discover" className="inline-flex min-h-11 items-center gap-1 text-sm text-muted transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-gold">
                Browse the full collection <ChevronRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
