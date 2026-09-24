import type { TmdbMovie, TmdbVideo } from "./tmdb/types";

export function getYear(date: string | null | undefined): string {
  const match = date?.match(/^(\d{4})-\d{2}-\d{2}$/);
  return match?.[1] ?? "Year unknown";
}

export function formatRating(value: number | null | undefined): string {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value.toFixed(1)
    : "Not rated";
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (typeof minutes !== "number" || !Number.isFinite(minutes) || minutes <= 0) {
    return "Runtime unavailable";
  }
  const total = Math.round(minutes);
  const hours = Math.floor(total / 60);
  const remainder = total % 60;
  return hours > 0 ? `${hours}h${remainder ? ` ${remainder}m` : ""}` : `${remainder}m`;
}

export function formatReleaseDate(date: string | null | undefined): string {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Release date unavailable";
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return "Release date unavailable";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(parsed);
}

export function getMovieTitle(movie: Pick<TmdbMovie, "title" | "original_title">): string {
  return movie.title?.trim() || movie.original_title?.trim() || "Untitled film";
}

/** Prefer the official YouTube trailer, then another trailer, then a teaser. */
export function findTrailer(
  videos: TmdbVideo[] | { results: TmdbVideo[] } | null | undefined,
): TmdbVideo | null {
  const items = Array.isArray(videos) ? videos : videos?.results;
  if (!items?.length) return null;
  const youtube = items.filter((video) => video.site === "YouTube" && /^[a-zA-Z0-9_-]{11}$/.test(video.key));
  return (
    youtube.find((video) => video.type === "Trailer" && video.official) ??
    youtube.find((video) => video.type === "Trailer") ??
    youtube.find((video) => video.type === "Teaser" && video.official) ??
    youtube.find((video) => video.type === "Teaser") ??
    null
  );
}

export function trailerEmbedUrl(video: TmdbVideo | null | undefined): string | null {
  if (!video || video.site !== "YouTube" || !/^[a-zA-Z0-9_-]{11}$/.test(video.key)) return null;
  return `https://www.youtube-nocookie.com/embed/${video.key}?rel=0`;
}
