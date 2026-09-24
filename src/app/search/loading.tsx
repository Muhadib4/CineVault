import { ResultsSkeleton } from "@/components/search/results-skeleton";

export default function SearchLoading() {
  return (
    <main className="min-h-screen bg-background px-5 pb-24 pt-32 text-foreground sm:px-8 sm:pt-40 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <div className="h-3 w-24 animate-pulse rounded bg-surface-raised" />
        <div className="mt-5 h-14 w-full max-w-md animate-pulse rounded bg-surface-raised" />
        <div className="mt-10 h-16 w-full max-w-3xl animate-pulse rounded-xl bg-surface-raised sm:h-[76px]" />
        <div className="my-12 border-t border-border" />
        <ResultsSkeleton />
      </div>
    </main>
  );
}
