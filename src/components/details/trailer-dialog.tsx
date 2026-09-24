"use client";

import { useRef, useState } from "react";
import { Play, X } from "lucide-react";
import type { TmdbVideo } from "@/lib/tmdb";
import styles from "./movie-detail.module.css";

type Props = {
  trailer: TmdbVideo;
  title: string;
};

export function TrailerDialog({ trailer, title }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function onClose() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button ref={triggerRef} type="button" onClick={openDialog} className={styles.trailerButton}>
        <Play size={17} fill="currentColor" aria-hidden="true" />
        Watch trailer
      </button>
      <dialog
        ref={dialogRef}
        className={styles.trailerDialog}
        aria-label={`${title} trailer`}
        onClose={onClose}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
      >
        <div className={styles.dialogContents}>
          <div className={styles.dialogHeader}>
            <div>
              <span className={styles.dialogEyebrow}>Official trailer</span>
              <h2>{title}</h2>
            </div>
            <button className={styles.closeButton} type="button" onClick={closeDialog} aria-label="Close trailer">
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.videoFrame}>
            {isOpen && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}?rel=0`}
                title={`${title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
