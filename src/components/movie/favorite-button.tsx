"use client";

import { useRef } from "react";
import { Heart } from "lucide-react";
import { animate } from "animejs";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";
import type { MovieSummary } from "@/types/movie";

interface FavoriteButtonProps {
  movie: MovieSummary;
  className?: string;
  variant?: "icon" | "labeled";
}

export function FavoriteButton({ movie, className, variant = "icon" }: FavoriteButtonProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const hydrated = useFavoritesStore((state) => state.hydrated);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const iconRef = useRef<SVGSVGElement>(null);
  const isFavorite = favorites.some((saved) => saved.id === movie.id);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!hydrated) return;
    toggleFavorite(movie);
    if (iconRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(iconRef.current, { scale: [0.9, 1.16, 1], duration: 230, ease: "out(3)" });
    }
  }

  return (
    <button
      type="button"
      aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Save ${movie.title} to favorites`}
      aria-pressed={hydrated ? isFavorite : undefined}
      title={isFavorite ? "Remove from vault" : "Save to vault"}
      disabled={!hydrated}
      onClick={handleClick}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-sm border border-white/20 bg-black/65 px-3 text-foreground backdrop-blur-sm transition-colors hover:border-gold hover:text-gold disabled:opacity-40",
        variant === "labeled" && "px-4",
        className,
      )}
    >
      <Heart ref={iconRef} size={18} strokeWidth={1.8} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-[#d78887]" : ""} aria-hidden="true" />
      {variant === "labeled" && <span>{isFavorite ? "In Your Vault" : "Add to Vault"}</span>}
    </button>
  );
}
