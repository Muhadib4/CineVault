"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/stores/favorites-store";

export function FavoritesHydrator() {
  useEffect(() => {
    try {
      void Promise.resolve(useFavoritesStore.persist.rehydrate())
        .catch(() => undefined)
        .finally(() => useFavoritesStore.getState().setHydrated(true));
    } catch {
      useFavoritesStore.getState().setHydrated(true);
    }
  }, []);
  return null;
}
