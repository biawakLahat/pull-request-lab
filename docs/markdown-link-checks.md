# Checking local Markdown links

Run the checker from the repository root with Node.js 24:

```sh
node scripts/check-markdown-links.mjs
```

The checker walks Markdown files and checks relative inline link and image targets against the checkout. A missing target or a target outside the repository produces a nonzero exit code and a file location.

External URLs, anchor-only links, and fenced code blocks are skipped. This is a file-path check, not a full Markdown parser: reference-style links and heading anchors are not validated, and balanced parentheses inside a link target are outside its supported syntax.

The accompanying GitHub Actions workflow runs the command for Markdown changes, changes to the checker, and changes to the workflow itself. The job needs only read access to repository contents.

Use the [existing workflow guide](pull-request-workflow.md) to prepare a contribution and review the new links before requesting a merge.
