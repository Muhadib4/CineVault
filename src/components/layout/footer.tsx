import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[#0b0a0a] py-10">
      <div className="page-shell flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold tracking-[.23em] text-foreground" aria-label="CineVault home">
            <span className="inline-block h-5 w-4 border border-gold" aria-hidden="true" />CINEVAULT
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">A place to discover films worth watching and keep the ones you love.</p>
          <p className="mt-4 text-xs text-muted">© {new Date().getFullYear()} CineVault</p>
        </div>
        <div className="max-w-sm text-xs leading-relaxed text-muted">
          <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="inline-block rounded-sm focus-visible:outline-gold" aria-label="The Movie Database website">
            <Image src="/tmdb-logo.svg" width={110} height={14} alt="TMDB" />
          </a>
          <p className="mt-2">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          <a href="https://github.com/Muhadib4/CineVault" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-foreground transition-colors hover:text-gold"><ExternalLink size={15} aria-hidden="true" /> View on GitHub</a>
        </div>
      </div>
    </footer>
  );
}
