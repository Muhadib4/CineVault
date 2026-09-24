"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Heart, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favorites-store";
import { SearchDialog } from "@/components/layout/search-dialog";

const links = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/favorites", label: "Favorites" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);
  const hydrated = useFavoritesStore((state) => state.hydrated);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const solid = scrolled || pathname !== "/";

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200", solid ? "border-border bg-[#0b0a0a]/95 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-black/60 to-transparent")}>
        <div className="page-shell flex h-[70px] items-center justify-between gap-4 sm:h-[78px]">
          <Link href="/" className="inline-flex shrink-0 items-center gap-2.5 text-[.92rem] font-bold tracking-[.22em] text-foreground" aria-label="CineVault home">
            <span className="relative inline-block h-6 w-5 border border-gold" aria-hidden="true"><span className="absolute inset-y-1 left-1/2 w-px bg-gold/80" /></span>
            CINEVAULT
          </Link>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={cn("relative py-2 text-sm transition-colors hover:text-foreground", active ? "text-foreground" : "text-foreground/65", active && "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-gold")}>{link.label}</Link>;
            })}
          </nav>
          <div className="flex items-center gap-1 sm:gap-3">
            <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-white/10" aria-label="Open search"><Search size={20} strokeWidth={1.8} /></button>
            <Link href="/favorites" className="relative hidden min-h-11 min-w-11 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-white/10 sm:inline-flex" aria-label={hydrated ? `Your Vault, ${favoritesCount} saved films` : "Your Vault"}>
              <Heart size={20} strokeWidth={1.8} />
              {hydrated && favoritesCount > 0 && <span className="absolute -right-1 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-burgundy px-1 text-[9px] font-bold text-white">{favoritesCount > 99 ? "99+" : favoritesCount}</span>}
            </Link>
            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild><button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-foreground md:hidden" aria-label="Open menu"><Menu size={22} /></button></Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[110] bg-black/75" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-[111] w-[min(330px,85vw)] border-l border-border bg-[#11100f] p-6 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-xs font-bold tracking-[.24em] text-gold">CINEVAULT</Dialog.Title>
                    <Dialog.Close className="flex min-h-11 min-w-11 items-center justify-center text-foreground" aria-label="Close menu"><X size={21} /></Dialog.Close>
                  </div>
                  <Dialog.Description className="sr-only">Navigate CineVault sections</Dialog.Description>
                  <nav className="mt-12 flex flex-col gap-2" aria-label="Mobile navigation">
                    {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className="border-b border-border py-4 font-display text-2xl transition-colors hover:text-gold">{link.label}</Link>)}
                    <button type="button" onClick={() => { setMenuOpen(false); setSearchOpen(true); }} className="flex items-center justify-between border-b border-border py-4 text-left font-display text-2xl transition-colors hover:text-gold">Search <Search size={19} /></button>
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
