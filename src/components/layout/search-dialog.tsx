"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Search, X } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onOpenChange(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-[5px] data-[state=open]:animate-[fade-in_.2s_ease-out]" />
        <Dialog.Content className="fixed left-1/2 top-[12vh] z-[121] w-[min(740px,calc(100%-2rem))] -translate-x-1/2 border border-white/15 bg-[#13100f] p-5 shadow-[0_35px_90px_rgba(0,0,0,.65)] outline-none sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Find your next film</p>
              <Dialog.Title className="font-display mt-2 text-3xl text-foreground sm:text-4xl">Search the collection</Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-muted">Enter a title to explore movies on TMDB.</Dialog.Description>
            </div>
            <Dialog.Close className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-muted transition-colors hover:bg-white/10 hover:text-foreground" aria-label="Close search"><X size={20} /></Dialog.Close>
          </div>
          <form onSubmit={submit} className="mt-8 flex items-center gap-3 border-b border-gold/60 pb-3">
            <Search size={21} className="shrink-0 text-gold" aria-hidden="true" />
            <label htmlFor="overlay-search" className="sr-only">Search films</label>
            <input id="overlay-search" type="search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search films..." autoComplete="off" className="min-w-0 flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-muted/60" />
            <button type="submit" disabled={!query.trim()} className="flex min-h-11 min-w-11 items-center justify-center text-gold disabled:opacity-30" aria-label="Submit search"><ArrowRight size={21} /></button>
          </form>
          <p className="mt-4 text-xs text-muted">Press Enter to search · Esc to close</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
