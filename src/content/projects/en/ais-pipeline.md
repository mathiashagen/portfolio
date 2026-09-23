---
title: AIS-pipeline
summary: A real-time data pipeline in modern C++ that reads ship traffic from Kystverket's open AIS feed, decodes it at the bit level and shows the ships along the Norwegian coast on a radar display.
tech: [C++20, Asio, SQLite, cpp-httplib, React, Leaflet, Docker]
repo: https://github.com/mathiashagen/ais-pipeline
demo: https://ais.mathiashagen.dev
date: 2026-06-19
cover: ../../../assets/projects/ais-pipeline.png
coverAlt: The radar display centered on Ålesund at a 60 nautical mile range. More than 700 ships appear as arrows colored by ship type, spread along the coast and fjords on a dark background with range rings.
featured: true
og:
  image: ../../../assets/projects/og/ais-pipeline-en.png
  alt: 'Preview for AIS-pipeline. On the left the title, "Ship traffic along the Norwegian coast, live", and the numbers 700+ ships in real time and 4.5 million messages decoded per second. On the right a section of the radar map around Ålesund with ships as colored arrows and dots.'
---

AIS-pipeline reads raw AIS messages from Kystverket's open TCP feed, decodes the binary NMEA
payloads bit by bit, stores positions and ship details in SQLite and serves them through a
small REST API. A React radar display shows the ships around any point on the coast in real
time.

The map is mostly there to show that it works. Most of the effort went into the decoder and
into getting three threads to share data safely over long periods.

## Why

I built it to learn C++20 properly, coming from C#/.NET and TypeScript. Design notes in the
code explain why things are done the way they are, often compared with how the same thing
would look in C#.

## Architecture

The pipeline is three threads connected by bounded, thread-safe queues:

- **Reader:** an Asio TCP client that assembles whole lines from the stream and reconnects
  with exponential backoff when the connection drops.
- **Decoder:** validates checksums, reassembles multi-part messages and unpacks the 6-bit
  payload into position reports (types 1–3 and 18) and static ship data (types 5 and 24).
- **Writer:** stores to SQLite in batched transactions with WAL mode, keeping 24 hours of
  position history.

The queues have a size limit, so if writing slows down, the decoder waits instead of memory
use growing without limit. A separate API process reads from the same database, and WAL mode
lets it read without blocking the writer.

## Performance

The decoder handles around 4.5 million sentences per second on a single thread. The writer
went from about 670 to over 125,000 reports per second when single commits were replaced with
batched transactions. The feed from Kystverket only delivers a few reports per second, so the
feed itself is the bottleneck.

## Quality and operations

98 GoogleTest cases cover the decoder, the queue, the TCP client and the database layer,
including 765 real lines captured from the feed. CI also runs an AddressSanitizer and UBSan
build on Linux. The whole stack runs in Docker Compose on a Proxmox VM at home, published
through Cloudflare Tunnel.

AIS data from Kystverket (NLOD). Coastline from Kartverket N250 (CC BY 4.0).