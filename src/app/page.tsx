import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ComingSoon } from "@/components/home/coming-soon";
import { HeroMovie } from "@/components/home/hero-movie";
import { MovieRail } from "@/components/home/movie-rail";
import { SectionHeading } from "@/components/home/section-heading";
import { TrendingTonight } from "@/components/home/trending-tonight";
import { MovieCard } from "@/components/movie/movie-card";
import {
  getGenres,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  getMovieDetails,
  TmdbError,
} from "@/lib/tmdb";
import type { MovieDetails } from "@/lib/tmdb/types";

export const dynamic = "force-dynamic";

function fulfilled<T>(result: PromiseSettledResult<T>): T | null {
  return result.status === "fulfilled" ? result.value : null;
}

export default async function HomePage() {
  const [trendingResult, nowPlayingResult, popularResult, topRatedResult, upcomingResult, genresResult] = await Promise.allSettled([
    getTrendingMovies(),
    getNowPlayingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
    getGenres(),
  ]);

  const trending = fulfilled(trendingResult)?.results ?? [];
  const nowPlaying = fulfilled(nowPlayingResult)?.results ?? [];
  const popular = fulfilled(popularResult)?.results ?? [];
  const topRated = fulfilled(topRatedResult)?.results ?? [];
  const upcoming = fulfilled(upcomingResult)?.results ?? [];
  const genres = fulfilled(genresResult) ?? [];
  const featured = trending.find((movie) => movie.backdrop_path) ?? trending[0] ?? popular[0] ?? nowPlaying[0];
  let featuredDetails: MovieDetails | null = null;
  if (featured) {
    try { featuredDetails = await getMovieDetails(featured.id); } catch { /* The list movie remains a useful hero. */ }
  }

  if (!featured) {
    const failure = [trendingResult, nowPlayingResult, popularResult].find((result) => result.status === "rejected");
    const message = failure?.status === "rejected" && failure.reason instanceof TmdbError
      ? failure.reason.message
      : "Movie data is temporarily unavailable. Please try again shortly.";
    return <main className="page-shell flex min-h-[70vh] flex-col justify-center pt-32">
      <p className="eyebrow">CineVault</p>
      <h1 className="font-display mt-3 text-5xl sm:text-7xl">The screen is quiet.</h1>
      <p className="mt-5 max-w-xl text-muted">{message}</p>
      <form action="/" className="mt-8"><button type="submit" className="button-secondary">Try again</button></form>
    </main>;
  }

  return (
    <main>
      <HeroMovie movie={featured} details={featuredDetails} genres={genres} />
      <div className="page-shell relative z-10">
        {nowPlaying.length > 0 && <section className="mt-12 sm:mt-16" aria-labelledby="now-showing-heading">
          <div id="now-showing-heading"><SectionHeading eyebrow="On the big screen" title="Now Showing" href="/discover" linkLabel="Explore films" /></div>
          <MovieRail label="Now Showing movies">{nowPlaying.slice(0, 12).map((movie) => <div key={movie.id} className="w-[142px] shrink-0 sm:w-[170px] lg:w-[190px]"><MovieCard movie={movie} /></div>)}</MovieRail>
        </section>}

        {trending.length > 1 && <section className="mt-20 sm:mt-28" aria-labelledby="trending-heading">
          <div id="trending-heading"><SectionHeading eyebrow="In conversation" title="Trending Tonight" description="Films finding their moment right now." /></div>
          <TrendingTonight movies={trending.filter((movie) => movie.id !== featured.id).slice(0, 5)} />
        </section>}

        {popular.length > 0 && <section className="mt-20 sm:mt-28" aria-labelledby="popular-heading">
          <div id="popular-heading"><SectionHeading eyebrow="Audience favorites" title="Popular Movies" href="/discover" /></div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-6">
            {popular.slice(0, 12).map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        </section>}

        {genres.length > 0 && <section className="relative mt-20 overflow-hidden border-y border-border py-14 sm:mt-28 sm:py-20" aria-labelledby="genre-heading">
          <div className="pointer-events-none absolute -right-28 -top-20 h-80 w-80 rounded-full bg-burgundy/15 blur-[100px]" aria-hidden="true" />
          <SectionHeading eyebrow="Follow your mood" title="Browse by Genre" description="Every story starts somewhere." />
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {genres.filter((genre) => [28, 12, 16, 35, 80, 99, 18, 14, 27, 9648, 10749, 878, 53].includes(genre.id)).map((genre) =>
              <Link key={genre.id} href={`/discover?genre=${genre.id}`} className="group inline-flex min-h-11 items-center gap-3 border border-white/15 bg-[#151311] px-4 text-sm text-foreground/85 transition-colors hover:border-gold/65 hover:bg-[#241d19] hover:text-foreground sm:px-5">
                {genre.name}<ArrowUpRight size={13} className="text-gold/60 transition-colors group-hover:text-gold" aria-hidden="true" />
              </Link>,
            )}
          </div>
        </section>}

        {topRated.length > 0 && <section className="mt-20 sm:mt-28" aria-labelledby="top-rated-heading">
          <div id="top-rated-heading"><SectionHeading eyebrow="The enduring collection" title="Top Rated" href="/discover?sort=rated" linkLabel="See more" /></div>
          <MovieRail label="Top Rated movies">{topRated.slice(0, 12).map((movie) => <div key={movie.id} className="w-[142px] shrink-0 sm:w-[170px] lg:w-[190px]"><MovieCard movie={movie} /></div>)}</MovieRail>
        </section>}

        {upcoming.length > 0 && <section className="mt-20 sm:mt-28" aria-labelledby="coming-heading">
          <div id="coming-heading"><SectionHeading eyebrow="On the horizon" title="Coming Attractions" description="A look at what is headed to the screen." href="/discover?sort=new" linkLabel="Browse films" /></div>
          <ComingSoon movies={upcoming.slice(0, 6)} />
        </section>}
      </div>
    </main>
  );
}
