const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type PosterSize = "w185" | "w342" | "w500" | "w780" | "original";
export type BackdropSize = "w780" | "w1280" | "original";
export type ProfileSize = "w185" | "h632" | "original";

function imageUrl(path: string | null | undefined, size: string): string | null {
  // TMDB paths are filenames rooted at /. Reject arbitrary URLs and path traversal.
  if (!path || !/^\/[a-zA-Z0-9._-]+\.(?:jpg|jpeg|png|webp)$/i.test(path) || path.includes("..")) {
    return null;
  }

  return `${IMAGE_BASE}/${size}${path}`;
}

/** Use for 2:3 posters. The default size suits poster rails and grids. */
export function posterUrl(path: string | null | undefined, size: PosterSize = "w342"): string | null {
  return imageUrl(path, size);
}

/** Use for wide hero and detail backdrops. */
export function backdropUrl(path: string | null | undefined, size: BackdropSize = "w1280"): string | null {
  return imageUrl(path, size);
}

/** Use for actor portraits. */
export function profileUrl(path: string | null | undefined, size: ProfileSize = "w185"): string | null {
  return imageUrl(path, size);
}
