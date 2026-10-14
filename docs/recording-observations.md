# Recording an observation

A dated record makes the lab's workflow results reproducible. Record actual PR metadata and the achievements visible on a public profile, then keep interpretations in a separate note.

## Record fields

- `schemaVersion`: use `1` for this format.
- `observedAt`: the time the records and profile were checked, as an ISO timestamp in UTC.
- `profile`: the GitHub login and its public profile URL.
- `visibleAchievements`: the unique names actually displayed on the profile at that time.
- `pullRequests`: each PR URL, author, merged flag, merger, and merge timestamp. Use null merge details for an unmerged PR.
- `notes`: optional limits or context, such as the difference between a visible badge and GitHub's internal award record.

## Validate a record

From the repository root, run:

```sh
node scripts/validate-observation.mjs PATH_TO_RECORD.json
```

Replace `PATH_TO_RECORD.json` with the saved record's path. The command uses built-in Node.js modules and returns a nonzero exit code for malformed JSON or missing observation fields. It does not fetch GitHub data or verify whether a badge should be awarded.

The [JSON schema](../schemas/observation.schema.json) describes the record structure. The CLI adds checks for matching profile URLs, duplicate PR URLs, and consistent merge details. See the [workflow guide](pull-request-workflow.md) for the events to inspect.
