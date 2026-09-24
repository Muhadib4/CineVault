import type { Metadata } from "next";
import { FavoritesGrid } from "@/components/favorites/favorites-grid";

export const metadata: Metadata = {
  title: "Your Vault",
  description: "Your saved films, ready whenever you are.",
};

export default function FavoritesPage() {
  return <main className="page-shell min-h-[65vh] pt-32 sm:pt-40">
    <div className="mb-10 border-b border-border pb-7 sm:mb-12">
      <p className="eyebrow">Your collection</p>
      <h1 className="font-display mt-3 text-5xl leading-none tracking-tight sm:text-7xl">Your Vault</h1>
      <p className="mt-4 text-sm text-muted">Films you&apos;ve saved for another night.</p>
    </div>
    <FavoritesGrid />
  </main>;
}
