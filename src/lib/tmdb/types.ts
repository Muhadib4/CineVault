/** The fields shared by TMDB's movie list endpoints. */
export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  original_language: string;
  popularity?: number;
  adult?: boolean;
  video?: boolean;
}

export interface TmdbPage<T = TmdbMovie> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  original_name?: string;
  character: string;
  profile_path: string | null;
  order: number;
  credit_id?: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id?: string;
}

export interface TmdbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at?: string;
}

export interface MovieDetails extends TmdbMovie {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  status: string;
  homepage: string;
  imdb_id: string | null;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  spoken_languages: Array<{ english_name: string; iso_639_1: string; name: string }>;
  credits: { cast: CastMember[]; crew: CrewMember[] };
  videos: { results: TmdbVideo[] };
  recommendations: TmdbPage<TmdbMovie>;
}
