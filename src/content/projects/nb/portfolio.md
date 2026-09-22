---
title: Portefølje
summary: Denne siden. En tospråklig portefølje laget i Astro for å lære rammeverket, uten JavaScript fra rammeverket og med 100 i alle Lighthouse-kategorier.
tech: [Astro, TypeScript, CSS, Biome]
repo: https://github.com/mathiashagen/portfolio
demo: https://mathiashagen.dev
date: 2026-09-17
cover: ../../../assets/projects/portfolio.png
coverAlt: Forsiden av porteføljen i mørk modus. Øverst en navigasjon i monospace, deretter teksten «$ whoami», navnet Mathias Hagen med en grønn markør, og et kort med AIS-pipeline som utvalgt prosjekt.
---

Jeg har jobbet mye med React, og valgte Astro for å prøve en helt annen modell, der sidene
bygges ferdig på forhånd og JavaScript bare brukes der det trengs. Hele siden er statisk HTML,
og det eneste skriptet nettleseren får er en temabryter på noen hundre byte.

## Innhold som data

Prosjektene og om meg-siden er Markdown-filer i content collections, validert med Zod-skjema
når siden bygges. Mangler et prosjekt alt-tekst til bildet, stopper bygget i stedet for å
publisere en side med feil. Én side per prosjekt genereres med `getStaticPaths`.

## To språk

Norsk er standard uten prefiks, og engelsk ligger under `/en/`. Hver side finnes bare én gang
som komponent og henter språket fra URL-en, så de to versjonene har alltid samme oppbygning.
Språkbryteren går til samme side på det andre språket, og sitemapen kobler versjonene sammen
med `hreflang`.

## Ytelse og tilgjengelighet

Siden får 100 i ytelse, tilgjengelighet, beste praksis og SEO i Lighthouse. Bilder
optimaliseres til WebP i flere størrelser, så prosjektbildet gikk fra 601 KB til 36 KB på en
vanlig skjerm. Fontene er selvhostet med tilpassede reservefonter, slik at teksten ikke hopper
når de lastes. Mørk og lys modus bruker `light-dark()` i CSS, og et lite skript i `<head>`
setter valgt tema før siden tegnes, så den ikke blinker.

## Hva jeg lærte

Den største omstillingen fra React var at komponentene ikke lever i nettleseren. Frontmatter
kjører én gang, det finnes ingen state, og stilene gjelder bare for komponenten som lagde
elementet. Det gjorde at jeg måtte tenke nøyere på hva som trenger å være interaktivt, og
svaret var nesten ingenting.