# CineVault

A cinematic movie discovery app built around the films themselves. Browse releases, search titles, open detailed film pages, watch trailers, and keep a personal vault of favorites in your browser.

Movie information and imagery come from [The Movie Database (TMDB)](https://www.themoviedb.org/). A TMDB API Read Access Token is required for live data.

## Features

- Featured film and home sections for now playing, trending, popular, top rated, and upcoming movies
- Title search with a debounced input, shareable `?q=` URL, and paginated results
- Discover page with genre filtering and popularity, rating, or recent-release sorting
- Film details with cast, director, runtime, metadata, trailer, and related movies
- Favorites saved in `localStorage`, available without an account
- Responsive poster galleries, loading skeletons, missing-image fallbacks, and route error states
- Keyboard-friendly navigation, visible focus, accessible dialogs, and reduced-motion support

## Screenshots

Screenshots are not included yet. Capture the home, search, details, and vault pages after connecting a TMDB token to show live movie imagery.

## Technology

Next.js App Router, React, strict TypeScript, Tailwind CSS, Radix UI dialog primitives, Lucide icons, Anime.js, and Zustand. Fonts are Geist and DM Serif Display through `next/font`.

TMDB requests run only on the server. The bearer token stays in a server-side environment variable; browser components receive movie data and image URLs, never the token.

## Project structure

```text
src/
  app/                  Routes, metadata, loading and error states
    discover/           Genre and sort browsing
    favorites/          Your Vault
    movie/[id]/         Film details
    search/             Title search
  components/
    details/            Detail hero, cast, trailer dialog
    favorites/          Favorites hydration and vault UI
    home/               Featured film and discovery sections
    layout/             Navigation, search overlay, footer
    movie/              Reusable poster card and favorite action
    search/             Search form, pagination, states
  lib/
    tmdb/               Server API client, endpoints, types, image helpers
    movie-utils.ts      Movie formatting and trailer selection
  stores/               Persisted favorites state
  types/                Shared UI movie shape
public/                 Favicon and TMDB attribution logo
```

## TMDB setup

1. Create an account at [TMDB](https://www.themoviedb.org/) and request an API Read Access Token from your account's API settings.
2. Clone and install:

   ```bash
   git clone https://github.com/Muhadib4/CineVault.git
   cd CineVault
   npm install
   ```

3. Create your local environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Set the token in `.env.local`:

   ```env
   TMDB_ACCESS_TOKEN=your_token_here
   ```

Use the **API Read Access Token**, rather than a TMDB API key. `.env.local` is ignored by Git. Keep the token out of `NEXT_PUBLIC_` variables and browser code.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without a token, CineVault displays setup guidance instead of film data. Add the token and restart the development server.

## Verify and deploy

```bash
npm run typecheck
npm run lint
npm run build
```

To run the production build locally:

```bash
npm run start
```

Deploy to a Next.js-compatible host such as Vercel. Add `TMDB_ACCESS_TOKEN` to the host's **server-side** environment settings and redeploy. The image host is configured in `next.config.ts`. No database or account provider is required; favorites stay in each visitor's browser.

## Data and credits

This product uses the TMDB API but is not endorsed or certified by TMDB. The approved TMDB logo and notice appear in the footer. See [TMDB's attribution requirements](https://developer.themoviedb.org/docs/faq) and [approved logos](https://www.themoviedb.org/about/logos-attribution).

Interface icons are from [Lucide](https://lucide.dev/). The application uses [Geist](https://vercel.com/font) and [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display).

## License

No license file is currently included in this repository.
