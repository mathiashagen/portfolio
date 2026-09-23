---
title: heru-esphome
summary: An ESPHome component that connects a HERU ventilation unit to Home Assistant over the unit's own radio link, using an ESP8266 and an nRF905 that pretends to be a second remote control.
tech: [C++, ESPHome, Python, ESP8266, nRF905, Home Assistant]
repo: https://github.com/mathiashagen/heru-esphome
date: 2026-09-23
cover: ../../../assets/projects/heru-esphome.png
coverAlt: A diagram in terminal style. A HERU 100 T EC unit is connected over nRF905 radio at 868.4 MHz to an ESP8266, which is connected over Wi-Fi to Home Assistant. Below it, a radio frame in hexadecimal with the unit ID, the remote ID, the command and the CRC each marked in their own color.
---

The ventilation unit at home, an Östberg HERU 100 T EC, is controlled with a wireless remote.
The usual way to get it into Home Assistant is a Modbus card and wiring into the unit.
I wanted to speak the same language as the remote instead.

The result is an ESP8266 with an nRF905 radio that acts as a second remote control. It asks the
unit for its status every ten seconds, and can change the fan level, setpoint, boost, away mode
and overpressure. The real remote works as before, and changes made on it show up in Home
Assistant too.

## The protocol

There was no documentation, only an older project that had shown the link is an nRF905 and
captured a few frames. I worked out the rest by listening and changing one thing at a time on
the remote:

- **The frequency** is 868.4 MHz, and the address is the same for every unit. The IDs inside the
  frame tell them apart.
- **The frame format** has a length, a direction, receiver and sender IDs, a command, data and a
  checksum.
- **The checksum** is CRC-16/CCITT-FALSE. I found the polynomial by XOR-ing two requests that
  differed in a single bit.
- **The registers** for status, temperatures and settings are mapped byte by byte, and every
  entry in the [protocol notes](https://github.com/mathiashagen/heru-esphome/blob/main/docs/protocol.md)
  says how it was confirmed.

The component logs every write from the remote and every byte that changes in the unit's
replies. That is how most of it was mapped.

## How it is built

The protocol lives in its own header with no dependency on ESPHome, so it can be tested on a
normal PC against frames captured from real traffic. The component itself is C++, with the
configuration in Python as ESPHome requires. CI runs the tests and compiles the firmware on
every push.

Some settings, like summer cooling, are never returned when the unit is asked for them. The ESP
learns them whenever the remote writes them, and keeps them in flash.

The project started from [JLFN/FTX-HERU](https://github.com/JLFN/FTX-HERU), which showed that the
link is an nRF905 and gave the first frames to work from. The project is not affiliated with
Östberg.
