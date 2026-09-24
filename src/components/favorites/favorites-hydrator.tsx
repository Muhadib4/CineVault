"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/stores/favorites-store";

export function FavoritesHydrator() {
  useEffect(() => {
    void useFavoritesStore.persist.rehydrate().finally(() => {
      useFavoritesStore.getState().setHydrated(true);
    });
  }, []);
  return null;
}
