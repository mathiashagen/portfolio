---
title: AIS-pipeline
summary: En sanntids datapipeline i moderne C++ som leser skipstrafikk fra Kystverkets åpne AIS-strøm, dekoder den på bitnivå og viser skipene langs norskekysten på et radarkart.
tech: [C++20, Asio, SQLite, cpp-httplib, React, Leaflet, Docker]
repo: https://github.com/mathiashagen/ais-pipeline
demo: https://ais.mathiashagen.dev
date: 2026-06-19
---

AIS-pipeline leser rå AIS-meldinger fra Kystverkets åpne TCP-strøm, dekoder de binære
NMEA-meldingene bit for bit, lagrer posisjoner og skipsdata i SQLite og eksponerer dem
gjennom et lite REST-API. Et radarkart i React viser skipene rundt et valgfritt punkt på
kysten i sanntid.

Kartet er den minst interessante delen. Poenget med prosjektet er rørleggerarbeidet
under: dekoding av en binærprotokoll på bitnivå, en langtkjørende nettverksforbindelse
som holder seg frisk, og trygg flyt av data mellom tre tråder.

## Hvorfor

Jeg bygde prosjektet for å lære C++20 skikkelig, med bakgrunn fra C#/.NET og TypeScript.
Designnotatene i koden forklarer *hvorfor* ting er gjort som de er, ofte i kontrast til
hvordan det samme ville sett ut i C#.

## Arkitektur

Pipelinen består av tre tråder koblet sammen med avgrensede, trådsikre køer:

- **Leser:** en Asio-TCP-klient som setter sammen hele linjer fra strømmen og kobler til
  igjen med eksponentiell backoff når forbindelsen faller.
- **Dekoder:** validerer checksum, setter sammen flerdelte meldinger og pakker ut
  6-bits-nyttelasten til posisjonsrapporter (type 1–3 og 18) og statiske skipsdata
  (type 5 og 24).
- **Skriver:** lagrer til SQLite i batchede transaksjoner med WAL-modus, og beholder
  24 timer med posisjonshistorikk.

Fordi køene er avgrenset, presser en treg skriving tilbake på dekoderen i stedet for at
minnet vokser ukontrollert. En egen API-prosess leser samme database, og WAL-modus gjør
at den kan lese uten å blokkere skriveren.

## Ytelse

Dekoderen håndterer rundt 4,5 millioner setninger i sekundet på én tråd. Skriveren gikk
fra om lag 670 til over 125 000 rapporter i sekundet da enkeltvise commits ble byttet ut
med batchede transaksjoner. Den levende strømmen leverer noen få rapporter i sekundet, så
flaskehalsen er strømmen selv.

## Kvalitet og drift

98 GoogleTest-tester dekker dekoderen, køen, TCP-klienten og databaselaget, blant annet mot
765 ekte linjer tatt opp fra strømmen. CI kjører i tillegg et bygg med AddressSanitizer og
UBSan på Linux. Hele stacken kjører i Docker Compose på en Proxmox-VM hjemme, publisert
gjennom Cloudflare Tunnel.

AIS-data fra Kystverket (NLOD). Kystlinje fra Kartverket N250 (CC BY 4.0).
