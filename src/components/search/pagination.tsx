import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
}

export function Pagination({ page, totalPages, hrefForPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const lastPage = Math.min(totalPages, 500);
  const visiblePages = Array.from(
    new Set([1, lastPage, page - 1, page, page + 1].filter((value) => value >= 1 && value <= lastPage)),
  ).sort((a, b) => a - b);

  return (
    <nav aria-label="Results pages" className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:mt-16">
      {page > 1 ? (
        <Link
          href={hrefForPage(page - 1)}
          aria-label="Previous page"
          className="mr-1 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm text-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold sm:px-4"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span className="mr-1 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border/50 px-3 text-sm text-muted/40 sm:px-4" aria-hidden="true">
          <ArrowLeft size={17} />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}
      {visiblePages.map((visiblePage, index) => (
        <span key={visiblePage} className="contents">
          {index > 0 && visiblePage - visiblePages[index - 1] > 1 && (
            <span aria-hidden="true" className="px-1 text-muted">…</span>
          )}
          <Link
            href={hrefForPage(visiblePage)}
            aria-label={`Page ${visiblePage}`}
            aria-current={visiblePage === page ? "page" : undefined}
            className={`inline-flex size-11 items-center justify-center rounded-lg border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
              visiblePage === page
                ? "border-gold bg-gold/10 font-semibold text-gold"
                : "border-border text-muted hover:border-gold/40 hover:text-foreground"
            }`}
          >
            {visiblePage}
          </Link>
        </span>
      ))}
      {page < lastPage ? (
        <Link
          href={hrefForPage(page + 1)}
          aria-label="Next page"
          className="ml-1 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm text-foreground transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold sm:px-4"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      ) : (
        <span className="ml-1 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border/50 px-3 text-sm text-muted/40 sm:px-4" aria-hidden="true">
          <span className="hidden sm:inline">Next</span>
          <ArrowRight size={17} />
        </span>
      )}
    </nav>
  );
}
