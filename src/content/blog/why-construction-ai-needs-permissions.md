---
title: Construction AI should only know what you know
description: An AI assistant that can see everything is a liability on a live project. Here is how we think about permissions, sources and trust in Zed AI.
date: 2026-08-19
category: Zed AI
author: Zed AI Team
featured: false
---

Most AI demos show a chat box that can read everything and answer anything. It looks impressive. On a real construction project, it is a problem.

A project holds information that different people should see differently: subcontractor rates, client correspondence, internal cost reports, personal details of workers on site. An assistant that can reach all of it, for anyone who asks, breaks every boundary the team has put in place.

We built Zed AI around one simple rule: **it only knows what you know.**

## The problem with "god mode" assistants

When an AI assistant can see data that the person asking it cannot, three things go wrong.

**Trust breaks.** The first time a subcontractor asks a question and gets an answer that includes your margin, you will switch the assistant off, and you will be right to.

**Accountability disappears.** If a number appears in a report, someone should be able to say where it came from and who was allowed to see it. An assistant with unlimited access makes that impossible.

**Shadow copies multiply.** People copy AI answers into emails and spreadsheets. If those answers contain data the sender shouldn't have seen, it spreads beyond the project with no record.

## How Zed AI handles access

Zed AI uses the same roles as the rest of ZedOps. When you ask a question, it works only with the projects you are on and the records your role lets you open.

- A **site engineer** can ask what was delayed on Level 4 this week and get an answer from the daily logs and tasks they can already see.
- The same engineer asking about the **budget** is told they don't have access, and who to ask.
- A **project manager** asking the same question gets the full answer, because their role allows it.

A narrower answer is not a limitation. It is the assistant behaving the way a responsible colleague would.

## Every answer should show its sources

On site, "the system said so" is not good enough. If Zed AI tells you that three material deliveries are late, you should be able to click through to those three purchase orders.

That is why Zed AI links its answers back to the records they came from: the daily log, the inspection, the PO, the drawing revision. If it can't find a source, it says so rather than guessing.

> An answer you can't check is an answer you can't use in a meeting with a client.

## Saying "I don't know" is a feature

Language models are built to be helpful, and that makes them want to answer. On a construction project, a confident wrong answer about quantities, dates or cost is worse than no answer at all.

We would rather Zed AI tell you "there is no daily log for that zone yesterday" than invent a summary. Missing data is useful information. It tells you where the gaps in the record are.

## Your data stays yours

Two commitments matter to most of the contractors we talk to:

- **We don't use your project data to train shared AI models.** What happens on your project stays in your project.
- **Enterprise customers can connect their own AI provider account**, so requests are processed under their own agreement with that provider.

Each customer's data also sits in its own dedicated database. Zed AI works inside that boundary; it never mixes one company's data with another's.

## Start small

If you are introducing AI to a project team, start with a few specific jobs rather than an open chat box:

1. Summarise yesterday's daily logs for the morning meeting.
2. List open snags by trade and area before a walk-through.
3. Draft a reply to an RFI using the related drawings and correspondence.

Once the team trusts the answers on those, they will find their own uses. Zed AI is currently in early access. [Request access](/early-access) if you want to try it on a live project, or read how to set up the [roles it depends on](/blog/roles-and-permissions-guide).
