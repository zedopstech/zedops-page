---
title: Getting started with ZedOps
description: How to roll out tenant setup, roles, and your first project so teams see value quickly.
date: 2026-03-18
category: blog
author: ZedOps Team
---

This guide walks through the first week with ZedOps: tenant boundaries, who gets which role, and how to stand up a **pilot project** without boiling the ocean.

## 1. Clarify your tenant model

Most teams start with one production tenant per customer or business unit. Decide early:

- Who admins users and roles
- Whether consultants get their own tenant or guest access in yours
- How you name projects so reporting rolls up cleanly (job codes, phases, regions)

Write it down in one paragraph - your ZedOps admin will mirror that in **Platform & access**. Ambiguity here shows up later as duplicate projects, wrong cost centres, and “which environment is this?” confusion.

### Questions that save rework

Ask your team:

- Do we need **non-production** sandboxes for training, or is prod-with-limited-roles enough?
- Will **subs or owners** ever need read-only visibility - and under whose tenant?
- Who owns the **break-glass** account policy if someone locks themselves out?

## 2. Map roles before inviting users

Avoid “everyone is admin.” Sketch:

| Role | Typical users | Sees |
|------|----------------|------|
| Corp admin | IT / ops lead | Tenants, SSO hints, audit |
| Project lead | PM / PE | Schedules, cost roll-ups, exports |
| Site | Supervisors | Daily logs, drawings, punch |

Roles drive menus and **Zed AI** scope - same rules, less drama later.

### Add roles only when pain appears

Start with three buckets: **admin**, **office/project**, **site**. When someone says “I need to see X but not Y,” that is the moment to split - not on day one when nobody has logged in yet.

## 3. Pilot on one active job

Pick a live project with a patient site lead. Success looks like:

1. Daily logs with photos in one place  
2. RFIs or correspondence in workflow (even if lightweight)  
3. One report or export leadership actually opens  

### Define “done” for week one

Write a one-sentence success criterion on a white (or digital) board, for example:

- *“Site supers submit logs from the trailer without calling the office for a password reset.”*

- *“Friday PM review uses ZedOps data, not a parallel spreadsheet.”*

If you cannot measure it by Friday, narrow the pilot.

## 4. Onboard in short bursts

Long classroom sessions rarely stick for field teams. Prefer:

- **15 minutes**  -  open app, create one log, attach one photo  
- **Later that week**  -  second session for edge cases (offline, attachments, who to call)  
- **Office**  -  slightly deeper dive on exports and permissions

Record a **two-minute Loom-style** walkthrough for the trailer TV - people will replay it when the trainer is gone.

## 5. Data you do not need to perfect on day one

You do not need a full historical import to prove value. Often the right order is:

1. **Current job**  -  active WBS, team roster, key drawings or folder links  
2. **This month’s** correspondence or RFIs (even a subset)  
3. **Backfill** older data when the workflow is trusted  

Perfectionism on migration day kills momentum; **trust** builds from daily use.

## 6. Watch for these early pitfalls

- **Too many required fields**  -  every extra tap costs you Monday morning compliance.  
- **Shadow admin accounts**  -  “just use mine” trains the wrong habit and breaks audit trails.  
- **Parallel systems**  -  if Excel is still the source of truth, ZedOps becomes a copy chore. Pick **one** system-of-record per artifact for the pilot.

## Next steps

- Pair this with [Roles & permissions in practice](/blog/roles-and-permissions-guide) if you are standardising access.  
- For product depth, see the [platform checklist](/platform).
- If daily work is part of your pilot, read [Daily logs that people actually use](/blog/daily-logs-that-people-actually-use).

Questions? Reach out via [Contact](/contact)  -  we read every note.
