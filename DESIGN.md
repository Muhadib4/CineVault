# CineVault design system

## Concept

CineVault presents movie discovery like a modern cinema program: the film image carries the page, display typography provides editorial hierarchy, and warm light guides attention. Obsidian surfaces, restrained burgundy ambience, muted gold accents, and ivory text evoke an auditorium without literal theater props. Layouts remain open so posters, titles, and metadata are easy to scan.

## Color

The source of truth is `src/app/globals.css`. Tailwind exposes these variables through `@theme inline`.

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#080808` | Main canvas |
| `--surface` | `#11100f` | Dialogs and quiet sections |
| `--surface-raised` | `#1a1716` | Poster fallbacks and inputs |
| `--foreground` | `#f4ebdd` | Primary text |
| `--muted` | `#aaa49e` | Supporting text |
| `--gold` | `#c8a96b` | Focus, labels, ratings, primary accents |
| `--burgundy` | `#5b1824` | Low-opacity ambient light |
| `--border` | `rgba(255, 255, 255, 0.1)` | Quiet separators |
| `--content-width` | `1440px` | Maximum general page shell |

Gold is a small accent, not a large surface color. Burgundy is used mostly at low opacity behind content. Image overlays keep text legible across unpredictable TMDB backdrops.

## Typography

- **Geist** is the interface and body font, loaded by `next/font`.
- **DM Serif Display** is the editorial display face for film titles and large section headings.
- Small uppercase labels use wide tracking and gold; film titles stay in readable title case.
- Body copy uses muted ivory, generous line height, and constrained measure on synopsis text.

## Layout and spacing

- The shared `.page-shell` uses a `1440px` cap and responsive side gutters of `24px` on larger screens and `16px` on small screens.
- Detail content has a tighter `1380px` cap, and search/discover results use a `1480px` cap.
- Controls generally meet a `44–48px` minimum height. Section transitions use larger vertical gaps, typically around `64–110px`.
- Posters maintain a **2:3** aspect ratio and cast portraits a **4:5** ratio. Aspect ratios reserve space before images load.
- Search and discover grids move from two columns on phones to three on small tablets, four on laptops, and five on wide screens. Horizontal rails are scoped to their own scroll containers.

## Shape, borders, and shadow

- Poster frames are nearly square edged (`3–4px` radius) to feel like physical prints.
- Buttons and detail dialogs use restrained `3–6px` radii. Search fields are softer where a large target improves use.
- Hairline borders use `--border`. Gold borders mark active filters or a primary action.
- Posters use dark, soft shadows; the detail poster receives a deeper shadow against its backdrop. Shadows create depth without glass-heavy panels.

## Cinematic effects

- Wide backdrops receive black gradient masks and a vignette so titles remain readable.
- The fixed grain layer in `globals.css` uses a very low `0.028` opacity. Detail imagery adds subtle local grain with soft-light blending.
- Burgundy radial light appears behind selected page headings and backdrops. It is ambient, never a bright multicolor gradient.
- Missing poster/profile images use dark framed fallbacks sized like the image they replace.

## Component behavior

- **Navigation:** Transparent over the home hero, becoming a dark blurred bar after scrolling; compact Radix dialog navigation on mobile.
- **Search:** The navbar opens a dimmed Radix dialog with an immediately focused field. The route uses a debounced input and keeps the query in the URL.
- **Movie cards:** A small poster zoom and darker hover overlay support discovery. Rating is visible without hover, and the favorite action remains a separate button with a comfortable target.
- **Favorites:** The heart is outlined or filled according to persisted Zustand state. Hydration waits for browser storage before exposing the action.
- **Details:** Backdrop, poster, title, metadata, and actions form one hero; cast and related films use contained horizontal rails. The trailer opens only after an explicit action in a native modal dialog.
- **Loading and empty states:** Route skeletons preserve poster and hero geometry. Empty and error messages are written in plain language with useful navigation or retry actions.

## Motion

- UI transitions are short, mostly `180–300ms`. Poster zoom is restrained to `1.035`.
- The home hero uses a one-time Anime.js reveal (`620ms` with a `95ms` stagger). The favorite heart uses a `230ms` scale response (`0.9 → 1.16 → 1`).
- Skeleton shimmer is confined to loading states. Animation does not run continuously behind films.
- `prefers-reduced-motion: reduce` disables decorative animation and smooth scrolling; JavaScript motion also checks the preference before running.

## Responsive and accessibility principles

- The viewport is supported down to `320px`; text and poster layouts reflow rather than reducing the desktop composition in place.
- Mobile navigation and filter chips have touch-sized targets. Horizontal movement is limited to deliberate poster or filter rails.
- Semantic headings and landmarks describe each page. Poster and cast images have useful alternative text; decorative backdrops are hidden from assistive technology.
- Icon buttons have explicit labels. Search, navigation, and trailer dialogs support keyboard use and Escape. Focus is visible in gold, with a skip link before navigation.
- Ratings are presented on TMDB's ten-point scale, and unavailable metadata receives an explicit fallback rather than a misleading value.
