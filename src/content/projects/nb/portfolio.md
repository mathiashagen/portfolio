---
title: Portefølje
summary: Denne siden. En tospråklig portefølje bygget i Astro som et prosjekt for å lære rammeverket, med null rammeverks-JavaScript og 100 i alle Lighthouse-kategorier.
tech: [Astro, TypeScript, CSS, Biome]
repo: https://github.com/mathiashagen/portfolio
demo: https://mathiashagen.dev
date: 2026-09-17
cover: ../../../assets/projects/portfolio.png
coverAlt: Forsiden av porteføljen i mørk modus. Øverst en navigasjon i monospace, deretter teksten «$ whoami», navnet Mathias Hagen med en grønn markør, og et kort med AIS-pipeline som utvalgt prosjekt.
---

Jeg har jobbet mye med React, og valgte Astro for å lære en helt annen modell: sider som
rendres ferdig på byggetidspunktet, og JavaScript bare der det faktisk trengs. Hele siden er
statisk HTML, og det eneste skriptet som sendes til nettleseren er en tema-bryter på noen
hundre byte.

## Innhold som data

Prosjektene og om meg-siden er Markdown-filer i content collections, validert med Zod-skjema
på byggetidspunktet. Mangler et prosjekt alt-tekst til bildet, stopper bygget i stedet for å
publisere en side med feil. Én side per prosjekt genereres med `getStaticPaths`.

## To språk

Norsk er standard uten prefiks, engelsk ligger under `/en/`. Hver side finnes én gang som
komponent og henter språket fra URL-en, så de to språkversjonene kan ikke gli fra hverandre.
Språkbryteren går til samme side på det andre språket, og sitemapen lenker versjonene sammen
med `hreflang`.

## Ytelse og tilgjengelighet

Siden får 100 i ytelse, tilgjengelighet, beste praksis og SEO i Lighthouse. Bilder
optimaliseres til WebP i flere størrelser, så prosjektbildet gikk fra 215 KB til 17 KB på en
vanlig skjerm. Fonter er selvhostet med tilpassede reservefonter, slik at teksten ikke hopper
når de lastes. Mørk og lys modus bruker `light-dark()` i CSS, og et lite skript i `<head>`
setter valgt tema før siden tegnes, så det ikke blinker.

## Hva jeg lærte

Den største omstillingen fra React var at komponentene ikke lever i nettleseren. Frontmatter
kjører én gang, det finnes ingen state, og stiler er avgrenset til komponenten som skrev
elementet. Det gjorde at jeg måtte tenke nøyere på hva som faktisk trenger å være interaktivt,
og svaret var nesten ingenting.
