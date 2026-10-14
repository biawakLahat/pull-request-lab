# Reviewing a lab pull request

Use this checklist before merging a proposal. Record the result of the review on the PR when useful.

## Scope and content

- Read the PR's problem statement and compare it with the actual diff.
- Check that the base is `biawakLahat/pull-request-lab:main` and the contributor is the expected account.
- Look for unrelated edits, duplicate proposals, or dependencies on unmerged work.
- Follow each new relative link and verify that the destination exists.
- Check commands against the file paths and branch names used by this repository.

## Evidence

For an experiment result, require a timestamp and a link to the relevant public event. A merged PR and a visible achievement are different observations. A missing badge in a public profile also does not prove which internal eligibility rule GitHub applied.

For tooling changes, review the checks run, the results, and limitations. A local pass does not establish that GitHub Actions has run successfully.

## Authorship and merge

Confirm the primary author and any co-author trailer. Co-author attribution should record actual participation. Choose a merge method that preserves the author metadata needed for the experiment, then verify the resulting commit and PR status.

The [workflow guide](pull-request-workflow.md) records the owner and contributor steps. The [co-author guide](co-authored-commits.md) explains the metadata used in this lab.
