---
name: sync-notion
description: Read or update a task in the Downbeat Academy Notion Product Roadmap. Use when the user references a Notion task, asks what is in the backlog or in progress, wants a task's status/branch/PR updated, or wants a new Task/Epic/Bug page created. Also used by the plan-feature and ship skills.
---

# Sync Notion

The Downbeat Academy roadmap lives in one Notion database. This skill encodes its schema
so it does not have to be rediscovered every session.

## The database

**Product Roadmap** — data source `collection://a475103d-b0e2-48bf-9158-fcbae9cb5d56`
(database page `cb1c64cb-938c-4099-988a-bff09fe843b0`, inside the "Downbeat Academy"
page).

It is a **single self-referencing database** — epics, tasks, bugs, sprints, and
milestones are all rows in it, distinguished by `Type` and linked through self-relations.

### Properties

| Property | Type | Values / notes |
| --- | --- | --- |
| `Name` | title | |
| `Type` | select | `🏃 Sprint`, `🐞 Bug`, `🔨 Task`, `🏔 Epic`, `🚀 Milestone` |
| `Status` | status | `Parked`, `Backlog`, `To Do` (to-do) · `In Progress`, `Blocked` (in-progress) · `Completed`, `Won't Do` (complete) |
| `Priority` | select | `High`, `Medium`, `Low` |
| `LOE` | select | `High`, `Medium`, `Low`, `Unkown` *(sic — the typo is in the schema)* |
| `Category` | multi-select | `🎨 Design`, `🔧 Engineering`, `🖋 Content`, `🧰 Miscellaneous`, `💅 Branding` |
| `Branch` | url | Git branch for the work |
| `PR` | url | Pull request link |
| `Epics` | relation | Self-relation — the parent epic |
| `Tasks` | relation | Self-relation — child tasks |
| `Milestone` | relation | Self-relation |
| `Start Date`, `Due Date` | date | |
| `Assign` | person | |
| `Created` | created_time | read-only |

Both `Branch` and `PR` are plain URL properties — write the branch name into `Branch` and
the full pull-request URL into `PR`.

### Page templates

`Task` (`960a9f63-372b-48b0-9fad-da1af5a9bfa8`), `Epic`
(`14c34458-1590-40c1-bc0f-9d928ce2200c`), `Bug` (`45949c8c-35cb-456e-897f-c2b94e8ba35c`).
All open with an `# Overview` heading — follow that convention in new pages.

### Views

`Milestones` (board, Type = Milestone) · `Epic Board` (board, Type = Epic) ·
`Task Board` (board, Type = Task or Bug) · `All Up` (list) · `Backlog` (list).

## Reading

Fetch one page by URL or ID:

```
notion-fetch { id: "<url or uuid>" }
```

Query the database with SQL — note the data source URL is the table name, and date
columns are addressed with their expanded names:

```sql
SELECT "Name", "Status", "Priority", "Branch", url
FROM "collection://a475103d-b0e2-48bf-9158-fcbae9cb5d56"
WHERE "Type" = '🔨 Task' AND "Status" = 'In Progress'
```

Use `notion-search` with `data_source_url` set to the collection when the user describes
a task rather than naming it exactly.

## Writing

Update properties with `notion-update-page`. The common transitions:

| When | Set |
| --- | --- |
| Starting work | `Status` → `In Progress`, `Branch` → the branch name |
| PR opened | `PR` → the PR URL |
| Merged | `Status` → `Completed` |
| Blocked on something external | `Status` → `Blocked`, and say why in the page body |

Never write `Created` — it is system-managed.

## Rules

- **Say what you are changing, then write it.** Notion is shared, outward-facing state, so
  name the page and the fields in your reply — but do not block on approval for routine
  task transitions (`Status`, `Branch`, `PR`). Those are auto-approved in
  `.claude/settings.json` because they record work that is already happening. Reading needs
  no confirmation either.
- **Stop and ask before anything structural** — creating a page, changing a page's `Type`
  or parent, rewriting an epic's body, or closing something as `Won't Do`. Those are
  judgements about the roadmap, not records of work done.
- **Never invent a page.** If the task cannot be found, say so and ask, rather than
  creating a near-duplicate.
- **Match `Type` to reality** — a bug fix is `🐞 Bug`, not `🔨 Task`.
- When creating a task under an epic, set the `Epics` relation so the board stays useful.
- Preserve the emoji in `Type` and `Category` values; they are part of the option name.

## Related

- `plan-feature` — reads a task and starts work on it
- `ship` — writes `PR` and moves `Status` at the end
