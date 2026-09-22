---
title: AIS-pipeline
summary: En sanntids datapipeline i moderne C++ som leser skipstrafikk fra Kystverkets åpne AIS-strøm, dekoder den på bitnivå og viser skipene langs norskekysten på et radarkart.
tech: [C++20, Asio, SQLite, cpp-httplib, React, Leaflet, Docker]
repo: https://github.com/mathiashagen/ais-pipeline
demo: https://ais.mathiashagen.dev
date: 2026-06-19
cover: ../../../assets/projects/ais-pipeline.png
coverAlt: Radarkartet sentrert på Ålesund med 60 nautiske mils rekkevidde. Over 700 skip vises som fargede piler etter skipstype, spredt langs kysten og fjordene på mørk bakgrunn med avstandsringer.
featured: true
---

AIS-pipeline leser rå AIS-meldinger fra Kystverkets åpne TCP-strøm, dekoder de binære
NMEA-meldingene bit for bit, lagrer posisjoner og skipsdata i SQLite og gjør dem tilgjengelige
gjennom et lite REST-API. Et radarkart i React viser skipene rundt et valgfritt punkt på kysten
i sanntid.

Kartet er egentlig bare der for å vise at det virker. Det meste av arbeidet gikk med til
dekoderen og til å få tre tråder til å dele data trygt over lang tid.

## Hvorfor

Jeg bygde prosjektet for å lære C++20 skikkelig, med bakgrunn fra C#/.NET og TypeScript.
Designnotatene i koden forklarer hvorfor ting er gjort som de er, ofte sammenlignet med
hvordan det samme ville sett ut i C#.

## Arkitektur

Pipelinen består av tre tråder koblet sammen med avgrensede, trådsikre køer:

- **Leser:** en Asio-TCP-klient som setter sammen hele linjer fra strømmen og kobler til
  igjen med eksponentiell backoff når forbindelsen faller.
- **Dekoder:** validerer sjekksummen, setter sammen flerdelte meldinger og pakker ut
  6-bits-nyttelasten til posisjonsrapporter (type 1–3 og 18) og statiske skipsdata
  (type 5 og 24).
- **Skriver:** lagrer til SQLite i batchede transaksjoner med WAL-modus, og beholder
  24 timer med posisjonshistorikk.

Køene har en øvre grense, så hvis skrivingen går tregt, må dekoderen vente i stedet for at
minnebruken vokser uten kontroll. En egen API-prosess leser fra samme database, og WAL-modus
gjør at den kan lese uten å blokkere skriveren.

## Ytelse

Dekoderen håndterer rundt 4,5 millioner setninger i sekundet på én tråd. Skriveren gikk fra
om lag 670 til over 125 000 rapporter i sekundet da enkeltvise commits ble byttet ut med
batchede transaksjoner. Strømmen fra Kystverket leverer bare noen få rapporter i sekundet, så
det er den som er flaskehalsen.

## Kvalitet og drift

98 GoogleTest-tester dekker dekoderen, køen, TCP-klienten og databaselaget, blant annet mot
765 ekte linjer tatt opp fra strømmen. CI kjører i tillegg et bygg med AddressSanitizer og
UBSan på Linux. Hele stacken kjører i Docker Compose på en Proxmox-VM hjemme, publisert
gjennom Cloudflare Tunnel.

AIS-data fra Kystverket (NLOD). Kystlinje fra Kartverket N250 (CC BY 4.0).