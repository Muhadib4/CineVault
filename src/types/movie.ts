import type { TmdbMovie } from "@/lib/tmdb/types";

export type MovieSummary = Pick<
  TmdbMovie,
  "id" | "title" | "poster_path" | "release_date" | "vote_average"
> & Partial<Pick<TmdbMovie, "backdrop_path" | "overview" | "original_title">>;
