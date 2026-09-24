"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { MovieSummary } from "@/types/movie";

interface FavoritesState {
  favorites: MovieSummary[];
  hydrated: boolean;
  toggleFavorite: (movie: MovieSummary) => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      hydrated: false,
      toggleFavorite: (movie) =>
        set((state) => ({
          favorites: state.favorites.some((saved) => saved.id === movie.id)
            ? state.favorites.filter((saved) => saved.id !== movie.id)
            : [movie, ...state.favorites],
        })),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "cinevault-favorites",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);
