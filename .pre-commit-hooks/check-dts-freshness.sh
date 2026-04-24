#!/usr/bin/env bash
# Pre-commit hook: fail if dist/index.d.ts is stale relative to src/.
#
# Why: qontinui-navigation is one of the few packages that commits its dist/
# to git. If you edit src/ and forget to re-run `npm run build`, the committed
# .d.ts won't reflect your type changes — consumers pick up the stale types and
# hit confusing type errors a few commits later.
#
# The check is intentionally narrow: if the newest mtime under src/ is newer
# than dist/index.d.ts, fail with a clear fix instruction. No-op if dist/
# doesn't exist yet (fresh clone, pre-first-build).
#
# Runs from the package root (pre-commit invokes hooks from the repo root).
set -euo pipefail

PKG_ROOT="$(git rev-parse --show-toplevel)"
SRC_DIR="${PKG_ROOT}/src"
DTS_FILE="${PKG_ROOT}/dist/index.d.ts"

# Skip the check cleanly if either path is absent — fresh clones haven't built
# yet and should not be blocked.
if [[ ! -d "$SRC_DIR" ]]; then
    exit 0
fi
if [[ ! -f "$DTS_FILE" ]]; then
    exit 0
fi

# Find the newest mtime under src/, in seconds since epoch.
src_newest=$(find "$SRC_DIR" -type f -printf '%T@\n' 2>/dev/null | sort -n | tail -1 | cut -d. -f1)
dts_mtime=$(stat -c '%Y' "$DTS_FILE" 2>/dev/null || stat -f '%m' "$DTS_FILE" 2>/dev/null)

if [[ -z "$src_newest" || -z "$dts_mtime" ]]; then
    # Can't compare — fail open rather than block commits on a hook malfunction.
    exit 0
fi

if (( src_newest > dts_mtime )); then
    echo "ERROR: dist/index.d.ts is stale relative to src/." >&2
    echo "       Newest src mtime: $(date -d @"$src_newest" 2>/dev/null || date -r "$src_newest")" >&2
    echo "       dist/index.d.ts : $(date -d @"$dts_mtime" 2>/dev/null || date -r "$dts_mtime")" >&2
    echo "       Run 'npm run build' to regenerate, then git add dist/ and retry the commit." >&2
    echo "" >&2
    echo "       This check exists because a prior session hit a silent tsup failure" >&2
    echo "       (ignoreDeprecations wrong version) that left the committed .d.ts behind," >&2
    echo "       shipping stale types to consumers. See README.md 'Build system notes'." >&2
    exit 1
fi

exit 0
