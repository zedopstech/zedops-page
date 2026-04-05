---
title: Roles & permissions in practice
description: A practical read on scoping menus, data, exports, and the copilot so field and office stay aligned.
date: 2026-03-22
category: blog
author: ZedOps Team
---

Construction software fails when **permissions are an afterthought**. ZedOps treats roles as the spine of navigation, data access, exports - and **Zed AI**.

## Principles

1. **Least privilege**  -  site teams do not need finance unless their job requires it.  
2. **Same model for humans and AI**  -  if a user cannot open a record, the copilot does not bypass that.  
3. **Tenant isolation**  -  customer data stays in the right boundary by default.

### Why “same for humans and AI” matters

Teams notice instantly if the assistant can **summarise a cost line** they cannot open in the UI. That erodes trust faster than a slow page load. A single permission model avoids “two truths” - one for people and one for automation.

## What roles control

- **Menus**  -  which modules appear in the shell.  
- **Records**  -  projects, cost layers, and documents scoped by assignment or org rules.  
- **Exports**  -  who can generate packs for owners or regulators.  
- **Copilot**  -  which context sets the assistant is allowed to summarise or draft against.

### Exports deserve their own conversation

Exports feel boring until **legal** or **the owner** asks who generated a pack containing sensitive numbers. Tie exports to roles early: who can batch, who needs approval, and whether watermarked previews are enough for external sharing.

## Patterns we see in the field

| Scenario | Conservative default | When to loosen |
|----------|----------------------|----------------|
| Sub foreman | Project-scoped logs and drawings only | Never give tenant-wide search by accident |
| Owner rep (read-only) | Named projects + document library | Add correspondence when contract requires |
| Estimating | No live job cost in pilot phase | Separate role when officially on the team |

Document the **why** next to each pattern - future you (and auditors) will not remember the hallway decision from 2024.

## Auditing and breaks

- **Who changed this role?**  -  retention and attribution should be boringly answerable.  
- **Temporary elevation**  -  if someone needs one-off access, use a **time-bound** grant where your process allows it, not a permanent “superuser for everyone.”  
- **Offboarding**  -  deactivating a login is step one; step two is **reassigning ownership** of saved views, scheduled exports, and integrations.

## Rollout tip

Pilot with **two roles only** (e.g. site vs office), then split finer once usage is real. Over-splitting on day one creates support load and shadow IT.

### Signs you are ready to add a third role

- Repeated **access requests** of the same shape (“I only need drawing X but I see the whole library”).  
- **Accidental edits** by people who should be read-only.  
- **Zed AI** answers that are usefully narrow for one group and frustratingly empty for another - often a hint to split context, not loosen everything.

## How Zed AI uses the same wall

When a user asks for a summary or a draft:

- Context is built from **the same project and record scopes** as the UI.  
- If data is out of scope, the product should **refuse clearly**, not guess from partial memory or unrelated folders.

That behaviour is what lets GCs sleep when pilots expand from one job to ten.

## Related

- [How we help  -  roles](/how-we-help/role)  
- [Platform & access](/platform/module/platform-access)  
- [Why construction AI needs real permissions](/blog/why-construction-ai-needs-permissions)
