export function PosterSkeleton({ count = 6 }: { count?: number }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6" aria-hidden="true">
    {Array.from({ length: count }, (_, index) => <div key={index}>
      <div className="skeleton aspect-[2/3] rounded-[3px]" />
      <div className="skeleton mt-3 h-4 w-4/5 rounded-sm" />
      <div className="skeleton mt-2 h-3 w-1/3 rounded-sm" />
    </div>)}
  </div>;
}
