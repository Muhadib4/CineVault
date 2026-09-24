import { ResultsSkeleton } from "@/components/search/results-skeleton";

export default function DiscoverLoading() {
  return (
    <main className="min-h-screen bg-background px-5 pb-24 pt-32 text-foreground sm:px-8 sm:pt-40 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <div className="h-3 w-24 animate-pulse rounded bg-surface-raised" />
        <div className="mt-5 h-14 w-full max-w-xs animate-pulse rounded bg-surface-raised" />
        <div className="mt-10 h-4 w-full max-w-lg animate-pulse rounded bg-surface-raised" />
        <div className="mt-16 flex gap-2 overflow-hidden">
          {Array.from({ length: 7 }, (_, index) => <div key={index} className="h-11 w-28 shrink-0 animate-pulse rounded-full bg-surface-raised" />)}
        </div>
        <div className="my-10 border-t border-border" />
        <ResultsSkeleton />
      </div>
    </main>
  );
}
