# Contributing

This lab practices contributions from a fork to a repository maintained by another account. Pick a documentation or tooling improvement with a clear purpose and describe the resulting behavior in the pull request.

## Prepare a branch

Clone your fork and add the upstream remote once:

```sh
git clone https://github.com/Alice699/pull-request-lab.git
cd pull-request-lab
git remote add upstream https://github.com/biawakLahat/pull-request-lab.git
git fetch upstream
git switch --create docs/my-change upstream/main
```

Use a descriptive branch name. Starting from `upstream/main` keeps unrelated changes from earlier branches out of the proposal.

## Prepare the change

1. Make one focused improvement.
2. Check that relative links resolve from the Markdown file containing them.
3. Run `git diff --check` and review `git diff`.
4. Commit with a title describing the change, such as `docs: clarify the review steps`.
5. Push the branch to your fork and open a PR into `biawakLahat/pull-request-lab:main`.

Describe the problem, the change, and the checks actually performed. Distinguish a proposed result from an observed result, and attribute co-authors only when they participated in the change.

## Owner review

The repository owner reviews the diff and any checks before merging. Contributors leave the final merge to the owner. Review the [existing workflow](docs/pull-request-workflow.md) and [co-author guide](docs/co-authored-commits.md) when preparing a contribution.

Achievement eligibility and processing are controlled by GitHub. A PR or merge does not guarantee a new badge.
