"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchFormProps {
  initialQuery: string;
}

const DEBOUNCE_MS = 400;

function searchUrl(query: string) {
  const normalized = query.trim().slice(0, 120);
  return normalized ? `/search?q=${encodeURIComponent(normalized)}` : "/search";
}

export function SearchForm({ initialQuery }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Browser back/forward changes the URL without remounting this form.
    const syncFromHistory = () => {
      setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    };
    window.addEventListener("popstate", syncFromHistory);
    return () => {
      window.removeEventListener("popstate", syncFromHistory);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function navigate(value: string, replace: boolean) {
    startTransition(() => {
      const url = searchUrl(value);
      if (replace) router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    });
  }

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => navigate(value, true), DEBOUNCE_MS);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    navigate(query, false);
    inputRef.current?.blur();
  }

  function clearSearch() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery("");
    navigate("", true);
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative w-full max-w-3xl">
      <label htmlFor="movie-search" className="sr-only">
        Search films by title
      </label>
      <Search
        aria-hidden="true"
        size={22}
        strokeWidth={1.8}
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gold sm:left-6"
      />
      <input
        ref={inputRef}
        id="movie-search"
        name="q"
        type="search"
        value={query}
        maxLength={120}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Search films..."
        autoComplete="off"
        className="h-16 w-full appearance-none rounded-xl border border-border bg-surface-raised/90 pl-14 pr-28 text-base text-foreground shadow-[0_18px_60px_rgba(0,0,0,.22)] outline-none transition-colors placeholder:text-muted/70 hover:border-gold/30 focus-visible:border-gold/70 focus-visible:ring-2 focus-visible:ring-gold/20 [&::-webkit-search-cancel-button]:appearance-none sm:h-[76px] sm:pl-16 sm:pr-36 sm:text-lg"
      />
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 sm:right-3">
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <X size={19} aria-hidden="true" />
          </button>
        )}
        <button
          type="submit"
          aria-label="Search films"
          className="flex size-11 items-center justify-center rounded-lg bg-gold text-background transition-colors hover:bg-[#e3c68d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-auto sm:gap-2 sm:px-4"
        >
          <span className="hidden text-sm font-semibold sm:inline">Search</span>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {isPending ? "Searching films" : ""}
      </span>
    </form>
  );
}
