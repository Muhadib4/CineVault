export function ResultsSkeleton() {
  return (
    <div aria-label="Loading films" role="status" className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[2/3] rounded-lg bg-surface-raised" />
          <div className="mt-3 h-4 w-4/5 rounded bg-surface-raised" />
          <div className="mt-2 h-3 w-2/5 rounded bg-surface-raised" />
        </div>
      ))}
    </div>
  );
}
