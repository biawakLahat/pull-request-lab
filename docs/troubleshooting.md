# Troubleshooting a fork contribution

## The branch contains unrelated changes

Inspect the base and diff before opening a PR:

```sh
git remote -v
git fetch upstream
git log --oneline upstream/main..HEAD
git diff --stat upstream/main...HEAD
```

For a new contribution, start a new branch from the current upstream base. Save or commit work in progress before switching branches.

## The fork is behind upstream

On a clean checkout of your fork's `main`, fetch upstream and attempt a fast-forward update:

```sh
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
```

If `--ff-only` fails, the histories have diverged. Inspect both histories and choose a reviewed merge or rebase instead of overwriting commits.

## The PR has a merge conflict

On the contribution branch, fetch upstream and merge `upstream/main`. Resolve each conflict, review the resulting diff, rerun relevant checks, and push the updated branch. The owner should review the new head before merging.

## Co-authors are missing

Inspect the original and final commit messages. Check that the `Co-authored-by` trailer uses an email associated with the intended GitHub account and is separated from the subject by a blank line. Follow the [co-author guide](co-authored-commits.md).

## The badge is missing

First record the actual merged status, authorship, and visible profile achievements with a timestamp. Check [GitHub's published incident updates](https://github.com/orgs/community/discussions/203416). Missing achievements require an eligibility or processing investigation; repeatedly refreshing a page does not establish either outcome.
