import "server-only";

const API_BASE = "https://api.themoviedb.org/3";

export type TmdbErrorCode =
  | "MISSING_TOKEN"
  | "INVALID_TOKEN"
  | "NOT_FOUND"
  | "UNAVAILABLE"
  | "BAD_RESPONSE";

/** A deliberately small, user-safe error. Never include the access token in it. */
export class TmdbError extends Error {
  readonly code: TmdbErrorCode;

  constructor(code: TmdbErrorCode, message: string) {
    super(message);
    this.name = "TmdbError";
    this.code = code;
  }
}

type QueryValue = string | number | boolean | undefined | null;

export interface TmdbRequestOptions {
  query?: Record<string, QueryValue>;
  revalidate?: number;
}

export async function tmdbFetch<T>(path: string, options: TmdbRequestOptions = {}): Promise<T> {
  const token = process.env.TMDB_ACCESS_TOKEN?.trim();
  if (!token) {
    throw new TmdbError(
      "MISSING_TOKEN",
      "Movie data is unavailable. Add TMDB_ACCESS_TOKEN to .env.local and restart the server.",
    );
  }

  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: options.revalidate ?? 900 },
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new TmdbError("UNAVAILABLE", "Movie data could not be reached. Please try again shortly.");
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new TmdbError("NOT_FOUND", "We couldn't find that film.");
    }
    if (response.status === 401 || response.status === 403) {
      throw new TmdbError("INVALID_TOKEN", "The movie data service could not be authorized.");
    }
    throw new TmdbError("UNAVAILABLE", "Movie data is temporarily unavailable. Please try again shortly.");
  }

  try {
    const data: unknown = await response.json();
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new Error("Invalid TMDB payload");
    }
    return data as T;
  } catch {
    throw new TmdbError("BAD_RESPONSE", "Movie data could not be loaded. Please try again shortly.");
  }
}
