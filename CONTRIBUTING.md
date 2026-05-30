# Contributing

Thanks for your interest in contributing to qontinui. This document explains how to submit changes and what you're agreeing to when you do.

## License: AGPL-3.0-or-later

This project is licensed under the **GNU Affero General Public License v3 or later** (`AGPL-3.0-or-later`). The full text is in [`LICENSE`](LICENSE).

What this means for you as a contributor:

- Anyone can use, modify, and redistribute the code under the same AGPL terms.
- If you (or anyone else) runs a modified version of qontinui as a network service, the AGPL requires you to publish your modifications under AGPL too — this is the "network copyleft" provision and the reason this project chose AGPL.
- For typical self-hosting, internal use, forking, or contributing back, AGPL is no different from GPL in practice.

If your employer has policies about contributing to AGPL projects, please confirm with them before you submit a PR.

## Developer Certificate of Origin (DCO)

Contributions are accepted under the **Developer Certificate of Origin (DCO) 1.1** — *not* a CLA. The DCO text is kept in [`DCO.txt`](DCO.txt) for reference. Certify that you wrote (or otherwise have the right to submit) your contribution by adding a `Signed-off-by` trailer to every commit:

    git commit -s -m "your message"

This appends `Signed-off-by: Your Name <your@email>` from your `git config user.name` / `user.email`. The DCO bot verifies the trailer on every PR commit. Your contributions are licensed inbound under the same `AGPL-3.0-or-later` as the project (inbound = outbound); you retain copyright in your contributions. No relicensing rights are granted — the dual-/commercial-license lever is retained only on the embeddable `ui-bridge` library (via its CLA), not on the apps/libraries in this repository.

Trivial changes (typo fixes, single-line documentation tweaks) still benefit from a sign-off but the maintainer may waive it at their discretion.


## Code style

This repository follows the conventions documented in `CLAUDE.md` (project root). Highlights:

- Edit existing files in preference to creating new ones; keep changes scoped to the task.
- No comments unless the *why* is non-obvious. Don't narrate what well-named code already says.
- No backwards-compatibility shims unless explicitly requested.
- For Python: Black + ruff. For TypeScript/JavaScript: project's Prettier + ESLint config. For Rust: `cargo fmt` + `cargo clippy`.
- Run the test suite before opening a PR. CI will reject unformatted or lint-failing code.

## Submitting a change

1. Fork the repository and create a feature branch.
2. Make your change. Add tests where appropriate.
3. Run the local checks (lint, format, tests) — the per-repo `README` documents the exact commands.
4. Open a pull request against `main`. Describe the *why* in the PR body, not the *what* — the diff already shows the *what*.
5. Ensure every commit carries a `Signed-off-by` trailer (`git commit -s`) — the DCO bot checks this.
6. A maintainer will review. Expect feedback; we keep the bar high because every change becomes part of the shipped product.

## Reporting bugs / requesting features

Open a GitHub issue. For security vulnerabilities, please email the maintainers directly rather than filing a public issue.

## Code of conduct

Be kind. Be specific. No harassment. Discussions stay on the technical merits.
