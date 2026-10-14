# Choosing a merge method

GitHub offers different ways to incorporate a pull request. The choice changes commit history and may affect which author metadata is retained.

| Method | Result | Check for this lab |
| --- | --- | --- |
| Create a merge commit | Adds a merge commit and retains the PR's original commits in the history. | Verify that the original co-authored commit is reachable from `main`. |
| Squash and merge | Combines the PR's changes into a new commit. | Review the final commit message and co-author trailers before confirming the merge. |
| Rebase and merge | Replays individual commits on the base branch with new commit IDs. | Verify authorship and trailers on the resulting commits rather than relying on the old IDs. |

The current co-author experiment uses **Create a merge commit** to preserve its original commit. That is a choice for this experiment, not a universal badge requirement.

After merging, record the PR URL, the merger, the merge time, and the resulting commit ID. Inspect author attribution separately from any achievement outcome.

See the [co-author guide](co-authored-commits.md) and [GitHub's merge documentation](https://docs.github.com/en/pull-requests/reference/pull-request-merges).
