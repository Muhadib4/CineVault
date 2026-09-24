import { PosterSkeleton } from "@/components/movie/poster-skeleton";

export default function Loading() {
  return <main role="status" aria-label="Loading movies">
    <div className="skeleton h-[620px] w-full sm:h-[740px]" aria-hidden="true" />
    <div className="page-shell mt-12">
      <div className="skeleton mb-8 h-10 w-60 rounded-sm" aria-hidden="true" />
      <PosterSkeleton />
    </div>
  </main>;
}
