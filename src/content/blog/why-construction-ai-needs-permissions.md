---
title: Why construction AI needs real permissions
description: Copilot features are only credible when they respect the same scopes as your people - not a parallel “god mode.”
date: 2026-04-01
category: blog
author: ZedOps Team
image: https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=85&auto=format&fit=crop
---

Generic AI demos show a chat box that can “read everything.” **Live sites do not work that way.** Subcontractor data, owner reports, and internal variances need different walls.

## The failure mode

When an assistant can reference data a user cannot open manually, you get:

- Trust collapse on the site (“the robot saw my numbers?”)  
- Audit headaches (“who approved that export?”)  
- Shadow copies of truth in email and spreadsheets  

### The “demo mode” trap

Sales environments reward **broad answers**. Construction rewards **scoped, attributable** ones. A copilot that sounds confident across data it should not touch will eventually **hallucinate** at the worst moment - usually right before a **owner meeting** or **claim filing**.

## The fix we ship toward

ZedOps ties **Zed AI** to the same application roles as the rest of the product. Narrow scope means narrower answers - **that is a feature**, not a bug.

> If it is not in your permitted context set, the copilot should say so - and point you to the person who can unblock it.

### Vendor and joint-venture reality

Many jobs involve **subs**, **design-build partners**, or **owner CM**. Their data boundaries are not “less important” - they are **different**. Permissions should reflect **contractual** and **commercial** separation, not just IT convenience.

## What good looks like

- Summaries that only use **projects you are on**  
- Draft RFIs that attach to **threads you can see**  
- “I can’t access that cost bucket” instead of hallucinating  

### Behaviour product owners should demand

- **Citations** or traceability to source records when summarising numbers - not vibes.  
- **Explicit denial** when context is missing, with next steps (“ask your PM to add you to job X”).  
- **No silent expansion** of scope between turns in a chat session.

## Compliance and regional expectations

Regulations vary, but the pattern is consistent: **personal data**, **final pay**, and **health/safety** incidents deserve tighter gates. AI should inherit those gates - not route around them because the model is eager to please.

Treat AI logs the same way you treat **export audit trails**: what was asked, in what context, and **which role** allowed it.

## Change management

Rollout fails when **office** gets copilot first and **site** hears rumours. A calmer path:

1. **Pilot with project leads** who already model good data hygiene.  
2. Publish **three allowed use cases** (e.g. summarise last week’s RFIs, draft meeting notes, find drawing refs) - nothing open-ended at first.  
3. Capture **failure stories** where the assistant correctly refused; celebrate those as much as successes.

## What good does *not* look like

- A “super-assistant” icon that **bypasses redlines** on drawings or cost.  
- Answers that **blend** multiple tenants’ vocabulary (“as we saw on the other job…”) when they should not.  
- Silent use of **external models** on data that should stay in your **VPC** boundary - your infra team should not need to reverse-engineer prompts to verify that.

---

We will keep publishing notes here as patterns mature. [Early access](/early-access) teams shape the guardrails we prioritise.

For the human side of the same model, read [Roles & permissions in practice](/blog/roles-and-permissions-guide). For rolling out a first project end-to-end, start with [Getting started with ZedOps](/blog/getting-started-with-zedops).
