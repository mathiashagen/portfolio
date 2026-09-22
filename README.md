# mathiashagen.dev

[![CI](https://github.com/mathiashagen/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/mathiashagen/portfolio/actions/workflows/ci.yml)

My personal portfolio, live at **[mathiashagen.dev](https://mathiashagen.dev)**, in
Norwegian and English.

I built it to learn [Astro](https://astro.build), coming from React. The goal was to
understand a different model rather than to ship the fastest possible site: pages rendered
ahead of time, content treated as data, and JavaScript only where it earns its place. The
whole site is static HTML, and the only script sent to the browser is a theme toggle of a
few hundred bytes. It scores 100 in all four Lighthouse categories.

## How it is built

- **Static output, no framework on the client.** Every page is rendered at build time.
  There is no adapter and no server-side rendering, so production is just files behind
  nginx.
- **Two languages from one component per page.** Norwegian (`nb`) is the default with no
  URL prefix, English lives under `/en/`. Each page exists once as a component and reads
  its language from the URL, so the two versions cannot drift apart. UI strings are in
  `src/i18n/ui.ts`, where the English dictionary is typed from the Norwegian one, so a
  missing translation is a compile error. The language switcher links to the same page in
  the other language, and the sitemap ties the versions together with `hreflang`.
- **Content collections with Zod.** Projects and the about page are Markdown files
  validated at build time. A project without alt text for its cover image fails the build
  instead of publishing a broken page. Project pages are generated with `getStaticPaths`.
- **Images and fonts.** Cover images go through `astro:assets` and are served as WebP in
  several widths with a `srcset`. Fonts are self-hosted through Astro's Fonts API, with
  fallback fonts adjusted to the same metrics so text does not shift when they load.
- **Theme without a flash.** Colours use CSS `light-dark()` and follow the operating
  system by default. A small inline script in `<head>` applies a saved choice before the
  first paint, and the toggle button stays hidden if JavaScript does not run.
- **Native view transitions.** Page changes cross-fade with the CSS
  `@view-transition` rule instead of a client-side router, so every navigation is still a
  real page load. They are turned off for visitors who prefer reduced motion.
- **Styling.** Plain CSS: design tokens as custom properties in `src/styles/global.css`,
  and scoped `<style>` blocks in each component.

## Running it locally

Requires Node 24 and pnpm (the version is pinned in `package.json`; `corepack enable`
picks it up).

```bash
pnpm install
pnpm dev        # dev server at http://localhost:4321
pnpm check      # Biome (lint and format) and astro check (types)
pnpm build      # static site in dist/
pnpm preview    # serve dist/ locally
```

Measure performance against `pnpm build` and `pnpm preview`, not the dev server, which
serves unoptimised files.

## Deployment

The `Dockerfile` is a two-stage build: Node builds the site, and the final image is
`nginx:alpine` with nothing but the contents of `dist/`. `nginx.conf` serves the custom
404 page, compresses text, and caches the hashed files under `/_astro/` for a year while
HTML is always revalidated.

```bash
docker compose up -d --build   # site at http://localhost:8081
```

In production the container runs on a small home server and is published through a
Cloudflare Tunnel. Updating the live site is `git pull` followed by the same compose
command.

CI (`.github/workflows/ci.yml`) runs `pnpm check` and `pnpm build` on every push, fails if
the build logs a warning, and checks that the Docker image builds.

## Project layout

```
src/
  components/        Nav, ThemeToggle, LanguageSwitcher, ProjectCard, TechTags
    pages/           One component per page; the files in pages/ only render these
  content/
    projects/nb|en/  One Markdown file per project and language
    about/           The about page, nb.md and en.md
  content.config.ts  Collection schemas
  i18n/ui.ts         UI strings and language helpers
  layouts/           BaseLayout: <head>, header, footer
  lib/               Project queries and contact details
  pages/             Routes; en/ mirrors the Norwegian ones
  styles/global.css  Design tokens and base styles
```

## License

The code is licensed under MIT, see [LICENSE](LICENSE). The written content and images in
`src/content/` and `src/assets/` are not covered by it.
