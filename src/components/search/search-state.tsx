import Link from "next/link";
import { Film, Search } from "lucide-react";

interface SearchStateProps {
  variant?: "search" | "empty" | "error";
  title: string;
  description: string;
  action?: { href: string; label: string };
}

export function SearchState({ variant = "empty", title, description, action }: SearchStateProps) {
  const Icon = variant === "search" ? Search : Film;

  return (
    <div className="relative mx-auto flex min-h-72 max-w-xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface/60 px-6 py-12 text-center sm:min-h-80">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(91,24,36,.20),transparent_65%)]" />
      <div className="relative mb-6 flex size-14 items-center justify-center rounded-full border border-gold/20 bg-gold/5 text-gold">
        <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <h2 className="relative font-display text-3xl text-foreground sm:text-4xl">{title}</h2>
      <p className="relative mt-3 max-w-md text-sm leading-7 text-muted sm:text-base">{description}</p>
      {action && (
        <Link href={action.href} className="relative mt-7 inline-flex min-h-11 items-center rounded-lg border border-gold/40 px-5 text-sm font-medium text-gold transition-colors hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
          {action.label}
        </Link>
      )}
    </div>
  );
}
