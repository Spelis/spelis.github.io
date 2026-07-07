---
title: Made a Pastebin site :P
keywords: pastebin c
date: 2026-05-07
---

These past few days I've spent my time working on a project called CBin, along with my friend Jan Palma (who made the frontend). It is a pastebin server written in C (if you couldn't tell) 

It takes text, stores it in memory, and hands it back when asked. No accounts, no fluff, no "yeah stick this OAuth up your ass or fuck off".

It runs entirely in-memory with FIFO eviction (sadly kind of slow, but fast enough to where it's unnoticable), meaning old pastes get yeeted off the face of the earth when things get full.

The frontend lives in a separate universe (HTML/Typescript/CSS), maintained by Jan Palma, because I have no will to make a frontend myself (shit would look straight out of 1998)

Overall, CBin is fast (fast enough), small, and mildly feral. It does one job, doesn't apologize for anything, and will absolutely forget your data if you blink wrong, or I get a power outage for more than a day. Not exactly the most memory safe but whatever. It's good enough to where if you aren't actively trying, you won't even notice.
