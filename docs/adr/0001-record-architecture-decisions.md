# 1. Record architecture decisions

**Status:** Accepted
**Date:** 2026-07-29

## Context

This is a solo-maintained monorepo with four apps, eight packages, and a growing amount
of AI-agent involvement in day-to-day development. Two problems follow from that:

The reasoning behind a decision lives only in one person's head, and is reconstructed
from git archaeology months later — usually at the moment it matters most.

Agents have no way to distinguish "this is deliberate" from "this is broken". Given an
unused module, a duplicated schema, or a config that points at the wrong file, an agent
will helpfully "fix" it — sometimes undoing a considered trade-off, sometimes wasting a
session rediscovering something already known.

## Decision

Keep architecture decision records in `docs/adr/`, numbered sequentially and named
`NNNN-short-title.md`.

Record a decision here when it:

- constrains future work (a pattern everything must follow),
- is non-obvious from reading the code,
- was contentious or had a real alternative,
- or is a deliberate acceptance of a known problem.

Do **not** record routine implementation choices. If the code makes it obvious, the code
is the documentation.

Use this shape: **Context** (what forced a choice), **Decision** (what was chosen, in the
active voice), **Consequences** (what this makes easier and harder). State consequences
honestly — an ADR that lists only benefits is not useful.

Records are immutable once accepted. To change a decision, write a new record that
supersedes the old one, and mark the old one `Superseded by NNNN`.

`0002-known-gaps.md` is a deliberate exception to the one-decision-per-record rule: it is
a living register of accepted-for-now problems rather than a single decision, and it is
expected to change as items are fixed.

## Consequences

Decisions become reviewable. A reader — human or agent — can see what was considered and
why, instead of inferring intent from an implementation.

The gaps register in particular gives agents a place to check before "fixing" something.
That should measurably reduce the amount of well-intentioned damage.

The cost is discipline: a register that goes stale is worse than none, because it will be
trusted. Update `0002` in the same PR that closes a gap, not afterwards.
