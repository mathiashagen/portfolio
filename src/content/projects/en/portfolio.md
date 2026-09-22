---
title: Portfolio
summary: This site. A bilingual portfolio built with Astro as a project to learn the framework, with zero framework JavaScript and 100 in every Lighthouse category.
tech: [Astro, TypeScript, CSS, Biome]
repo: https://github.com/mathiashagen/portfolio
demo: https://mathiashagen.dev
date: 2026-09-17
cover: ../../../assets/projects/portfolio.png
coverAlt: The portfolio home page in dark mode. At the top a monospace navigation, then the text "$ whoami", the name Mathias Hagen with a green cursor, and a card showing AIS-pipeline as the featured project.
---

I've worked a lot with React, and chose Astro to learn a completely different model: pages
rendered ahead of time at build time, and JavaScript only where it's actually needed. The
whole site is static HTML, and the only script sent to the browser is a theme toggle of a few
hundred bytes.

## Content as data

The projects and the about page are Markdown files in content collections, validated with Zod
schemas at build time. If a project is missing alt text for its image, the build stops
instead of publishing a broken page. One page per project is generated with `getStaticPaths`.

## Two languages

Norwegian is the default without a prefix, English lives under `/en/`. Each page exists once
as a component and reads the language from the URL, so the two language versions can't drift
apart. The language switcher goes to the same page in the other language, and the sitemap
links the versions together with `hreflang`.

## Performance and accessibility

The site scores 100 in performance, accessibility, best practices and SEO in Lighthouse.
Images are optimized to WebP in several sizes, so the project image went from 215 KB to 17 KB
on a typical screen. Fonts are self-hosted with adjusted fallback fonts, so the text doesn't
jump when they load. Dark and light mode use `light-dark()` in CSS, and a small script in
`<head>` applies the chosen theme before the page is drawn, so it doesn't flash.

## What I learned

The biggest shift from React was that components don't live in the browser. The frontmatter
runs once, there is no state, and styles are scoped to the component that wrote the element.
That made me think harder about what actually needs to be interactive, and the answer was
almost nothing.
