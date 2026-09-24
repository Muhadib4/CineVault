import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { MovieCard } from "@/components/movie/movie-card";
import { Pagination } from "@/components/search/pagination";
import { SearchState } from "@/components/search/search-state";
import { discoverMovies, getGenres, type DiscoverSort } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Discover Movies",
  description: "Explore movies by genre, popularity, rating, and release date in CineVault.",
};

type QueryValue = string | string[] | undefined;
type SortValue = "popular" | "rated" | "new";

interface DiscoverPageProps {
  searchParams: Promise<{ genre?: QueryValue; sort?: QueryValue; page?: QueryValue }>;
}

function singleValue(value: QueryValue) {
  return typeof value === "string" ? value : Array.isArray(value) ? value[0] : "";
}

function validPage(value: QueryValue) {
  const parsed = Number(singleValue(value));
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 500 ? parsed : 1;
}

function validSort(value: QueryValue): SortValue {
  const raw = singleValue(value);
  return raw === "rated" || raw === "new" ? raw : "popular";
}

const sortBy: Record<SortValue, DiscoverSort> = {
  popular: "popularity.desc",
  rated: "vote_average.desc",
  new: "primary_release_date.desc",
};

function discoverHref(genre: number | undefined, sort: SortValue, page?: number) {
  const params = new URLSearchParams();
  if (genre) params.set("genre", String(genre));
  if (sort !== "popular") params.set("sort", sort);
  if (page && page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/discover?${search}` : "/discover";
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const page = validPage(params.page);
  const sort = validSort(params.sort);
  const requestedGenre = Number(singleValue(params.genre));
  const isConfigured = Boolean(process.env.TMDB_ACCESS_TOKEN?.trim());
  const genres = isConfigured ? await getGenres() : [];
  const genre = genres.find((item) => item.id === requestedGenre);

  if (isConfigured && singleValue(params.genre) && !genre) {
    redirect(discoverHref(undefined, sort));
  }

  const results = isConfigured ? await discoverMovies({ genre: genre?.id, page, sortBy: sortBy[sort] }) : null;
  const resultCount = results?.total_results ?? 0;

  if (results && results.total_pages > 0 && page > results.total_pages) {
    redirect(discoverHref(genre?.id, sort, Math.min(results.total_pages, 500)));
  }

  return (
    <main className="min-h-screen bg-background pb-24 text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-36 lg:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-52 -top-64 -z-10 size-[700px] rounded-full bg-burgundy/15 blur-[110px]" />
        <div className="mx-auto max-w-[1480px]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">The collection</p>
          <h1 className="font-display text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">Discover</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base">Explore every genre. Find the next film worth saving.</p>
        </div>
      </section>

      <section aria-label="Discover results" className="mx-auto max-w-[1480px] px-5 pt-8 sm:px-8 sm:pt-10 lg:px-12">
        {isConfigured ? (
          <>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Browse by genre</p>
                <h2 id="browse-heading" className="font-display text-3xl sm:text-4xl">{genre ? genre.name : "All films"}</h2>
              </div>
              <form action="/discover" method="get" className="flex items-end gap-2">
                {genre && <input type="hidden" name="genre" value={genre.id} />}
                <div>
                  <label htmlFor="discover-sort" className="mb-1.5 block text-xs text-muted">Sort by</label>
                  <div className="relative">
                    <SlidersHorizontal size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold" aria-hidden="true" />
                    <select
                      id="discover-sort"
                      name="sort"
                      defaultValue={sort}
                      className="min-h-11 appearance-none rounded-lg border border-border bg-surface pl-10 pr-9 text-sm text-foreground transition-colors hover:border-gold/40 focus-visible:outline-2 focus-visible:outline-gold"
                    >
                      <option value="popular">Most popular</option>
                      <option value="rated">Highest rated</option>
                      <option value="new">Newest releases</option>
                    </select>
                    <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
                  </div>
                </div>
                <button type="submit" className="min-h-11 rounded-lg border border-gold/40 px-4 text-sm font-medium text-gold transition-colors hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-gold">Apply</button>
              </form>
            </div>

            <nav aria-label="Filter by genre" className="-mx-5 mt-7 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
              <div className="flex w-max gap-2">
                <Link
                  href={discoverHref(undefined, sort)}
                  aria-current={!genre ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-gold ${!genre ? "border-gold bg-gold/10 text-gold" : "border-border text-muted hover:border-gold/40 hover:text-foreground"}`}
                >
                  All genres
                </Link>
                {genres.map((item) => (
                  <Link
                    key={item.id}
                    href={discoverHref(item.id, sort)}
                    aria-current={genre?.id === item.id ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-gold ${genre?.id === item.id ? "border-gold bg-gold/10 text-gold" : "border-border text-muted hover:border-gold/40 hover:text-foreground"}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="mb-7 mt-5 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-5 sm:mt-7">
              <p className="text-sm text-muted">{sort === "popular" ? "Most popular" : sort === "rated" ? "Highest rated" : "Newest releases"} {genre ? `in ${genre.name}` : "films"}</p>
              <p className="text-sm tabular-nums text-muted">{resultCount.toLocaleString("en-US")} {resultCount === 1 ? "film" : "films"}</p>
            </div>

            {results && results.results.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
                  {results.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                </div>
                <Pagination page={page} totalPages={results.total_pages} hrefForPage={(nextPage) => discoverHref(genre?.id, sort, nextPage)} />
              </>
            ) : (
              <SearchState title="No films in this selection." description="Try another genre or sort order to keep exploring." action={{ href: "/discover", label: "View all films" }} />
            )}
          </>
        ) : (
          <SearchState
            variant="error"
            title="Movie data is unavailable."
            description="CineVault needs a TMDB Read Access Token to browse films. Add TMDB_ACCESS_TOKEN to .env.local and restart the app."
          />
        )}
      </section>
    </main>
  );
}
