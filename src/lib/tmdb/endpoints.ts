import "server-only";
import { cache } from "react";
import { TmdbError, tmdbFetch } from "./client";
import type { TmdbRequestOptions } from "./client";
import type { Genre, MovieDetails, TmdbMovie, TmdbPage } from "./types";

const LIST_REVALIDATE = 15 * 60;
const DETAIL_REVALIDATE = 6 * 60 * 60;

function validPage(page: number | undefined): number {
  if (!Number.isFinite(page)) return 1;
  return Math.min(500, Math.max(1, Math.trunc(page ?? 1)));
}

async function moviePage(path: string, options: TmdbRequestOptions): Promise<TmdbPage<TmdbMovie>> {
  const response = await tmdbFetch<TmdbPage<TmdbMovie>>(path, options);
  if (!Array.isArray(response.results)) {
    throw new TmdbError("BAD_RESPONSE", "Movie data could not be loaded. Please try again shortly.");
  }
  return response;
}

export function getTrendingMovies(): Promise<TmdbPage<TmdbMovie>> {
  return moviePage("/trending/movie/week", { revalidate: LIST_REVALIDATE });
}

export function getNowPlayingMovies(): Promise<TmdbPage<TmdbMovie>> {
  return moviePage("/movie/now_playing", { revalidate: LIST_REVALIDATE });
}

export function getPopularMovies(): Promise<TmdbPage<TmdbMovie>> {
  return moviePage("/movie/popular", { revalidate: LIST_REVALIDATE });
}

export function getTopRatedMovies(): Promise<TmdbPage<TmdbMovie>> {
  return moviePage("/movie/top_rated", { revalidate: LIST_REVALIDATE });
}

export function getUpcomingMovies(): Promise<TmdbPage<TmdbMovie>> {
  return moviePage("/movie/upcoming", { revalidate: LIST_REVALIDATE });
}

export const getGenres = cache(async (): Promise<Genre[]> => {
  const response = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list", {
    revalidate: DETAIL_REVALIDATE,
  });
  if (!Array.isArray(response.genres)) {
    throw new TmdbError("BAD_RESPONSE", "Movie genres could not be loaded.");
  }
  return response.genres;
});

export type DiscoverSort =
  | "popularity.desc"
  | "vote_average.desc"
  | "primary_release_date.desc";

export interface DiscoverMoviesOptions {
  genre?: number;
  page?: number;
  sortBy?: DiscoverSort;
}

export function discoverMovies({
  genre,
  page,
  sortBy = "popularity.desc",
}: DiscoverMoviesOptions = {}): Promise<TmdbPage<TmdbMovie>> {
  const validGenre = Number.isSafeInteger(genre) && (genre ?? 0) > 0 ? genre : undefined;
  return moviePage("/discover/movie", {
    query: {
      include_adult: false,
      page: validPage(page),
      sort_by: sortBy,
      with_genres: validGenre,
      // Prevent unrated films from dominating the vote-average sort.
      "vote_count.gte": sortBy === "vote_average.desc" ? 200 : undefined,
      // "Newest releases" should not be led by future premieres.
      "primary_release_date.lte":
        sortBy === "primary_release_date.desc" ? new Date().toISOString().slice(0, 10) : undefined,
    },
    revalidate: LIST_REVALIDATE,
  });
}

export function searchMovies(query: string, page = 1): Promise<TmdbPage<TmdbMovie>> {
  const trimmed = query.trim();
  if (!trimmed) {
    return Promise.resolve({ page: 1, results: [], total_pages: 0, total_results: 0 });
  }
  return moviePage("/search/movie", {
    query: { query: trimmed, page: validPage(page), include_adult: false },
    revalidate: 60,
  });
}

/** Cached within a React request so metadata and the page share one API call. */
export const getMovieDetails = cache(async (id: number | string): Promise<MovieDetails> => {
  const numericId = typeof id === "number" ? id : Number(id);
  if (!Number.isSafeInteger(numericId) || numericId <= 0) {
    throw new TmdbError("NOT_FOUND", "We couldn't find that film.");
  }

  const details = await tmdbFetch<MovieDetails>(`/movie/${numericId}`, {
    query: { append_to_response: "credits,videos,recommendations" },
    revalidate: DETAIL_REVALIDATE,
  });

  if (details.id !== numericId || !details.title) {
    throw new TmdbError("BAD_RESPONSE", "Film details could not be loaded. Please try again shortly.");
  }

  return {
    ...details,
    genres: Array.isArray(details.genres) ? details.genres : [],
    credits: {
      cast: Array.isArray(details.credits?.cast) ? details.credits.cast : [],
      crew: Array.isArray(details.credits?.crew) ? details.credits.crew : [],
    },
    videos: { results: Array.isArray(details.videos?.results) ? details.videos.results : [] },
    recommendations: {
      page: details.recommendations?.page ?? 1,
      results: Array.isArray(details.recommendations?.results) ? details.recommendations.results : [],
      total_pages: details.recommendations?.total_pages ?? 0,
      total_results: details.recommendations?.total_results ?? 0,
    },
  };
});
