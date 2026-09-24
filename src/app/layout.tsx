import type { Metadata } from "next";
import { DM_Serif_Display, Geist } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FavoritesHydrator } from "@/components/favorites/favorites-hydrator";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-dm-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://cinevault.vercel.app"),
  title: { default: "CineVault — Discover Your Next Movie", template: "%s | CineVault" },
  description: "Explore cinema worth watching. Discover films, watch trailers, and keep your favorites in one place.",
  openGraph: {
    title: "CineVault — Discover Your Next Movie",
    description: "Explore cinema worth watching.",
    type: "website",
    siteName: "CineVault",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${dmSerif.variable}`}>
      <body>
        <FavoritesHydrator />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">Skip to content</a>
        <Navbar />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
