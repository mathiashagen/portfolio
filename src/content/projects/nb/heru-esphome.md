---
title: heru-esphome
summary: En ESPHome-komponent som kobler et HERU-ventilasjonsaggregat til Home Assistant over aggregatets egen radiolink, med en ESP8266 og en nRF905 som later som den er en ekstra fjernkontroll.
tech: [C++, ESPHome, Python, ESP8266, nRF905, Home Assistant]
repo: https://github.com/mathiashagen/heru-esphome
date: 2026-09-23
cover: ../../../assets/projects/heru-esphome.png
coverAlt: Et diagram i terminalstil. Et HERU 100 T EC-aggregat er koblet over nRF905-radio på 868,4 MHz til en ESP8266, som er koblet over Wi-Fi til Home Assistant. Under vises en radiopakke i heksadesimal, der aggregatets ID, fjernkontrollens ID, kommandoen og CRC-en er markert i hver sin farge.
---

Ventilasjonsaggregatet hjemme, en Östberg HERU 100 T EC, styres med en trådløs fjernkontroll.
Den vanlige måten å få det inn i Home Assistant på er et Modbus-kort og kabling inn i
aggregatet. Jeg ville heller snakke samme språk som fjernkontrollen.

Løsningen er en ESP8266 med en nRF905-radio som oppfører seg som en fjernkontroll nummer to. Den
spør aggregatet om status hvert tiende sekund, og kan endre viftenivå, settpunkt, forsering,
borte-modus og overtrykk. Den ekte fjernkontrollen virker som før, og endringer gjort på den
dukker opp i Home Assistant også.

## Protokollen

Det fantes ingen dokumentasjon, bare et eldre prosjekt som hadde vist at linken er en nRF905 og
tatt opp noen pakker. Resten fant jeg ut ved å lytte og endre én ting om gangen på
fjernkontrollen:

- **Frekvensen** er 868,4 MHz, og adressen er den samme for alle aggregater. Det er ID-ene inne
  i pakken som skiller dem.
- **Pakkeformatet** har lengde, retning, mottaker- og avsender-ID, kommando, data og en
  sjekksum.
- **Sjekksummen** er CRC-16/CCITT-FALSE. Jeg fant polynomet ved å XOR-e to forespørsler som bare
  skilte seg i én bit.
- **Registrene** for status, temperaturer og innstillinger er kartlagt byte for byte, og hver
  oppføring i [protokollnotatene](https://github.com/mathiashagen/heru-esphome/blob/main/docs/protocol.md)
  sier hvordan den er bekreftet.

Komponenten logger alle skrivinger fra fjernkontrollen og hver byte som endrer seg i svarene fra
aggregatet. Det var slik det meste ble kartlagt.

## Oppbygning

Protokollen ligger i en egen header uten avhengigheter til ESPHome, så den kan testes på en
vanlig PC mot pakker tatt opp fra ekte trafikk. Selve komponenten er skrevet i C++, med
konfigurasjonen i Python slik ESPHome krever. CI kjører testene og kompilerer fastvaren på hver
push.

Noen innstillinger, som sommerkjøling, vil ikke aggregatet sende tilbake når man spør. Dem lærer
ESP-en når fjernkontrollen skriver dem, og lagrer dem i flash.

Prosjektet startet fra [JLFN/FTX-HERU](https://github.com/JLFN/FTX-HERU), som viste at linken
var en nRF905 og ga de første pakkene å jobbe ut fra. Prosjektet har ingen tilknytning til
Östberg.
