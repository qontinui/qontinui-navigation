# qontinui-navigation

Shared navigation structure for Qontinui applications. Provides type-safe navigation definitions, platform filtering, and state management utilities.

## Installation

```bash
npm install qontinui-navigation
```

## Features

- Type-safe navigation items and groups
- Platform-specific filtering (web, runner, desktop, mobile)
- Extensible navigation configuration
- State management with reducer pattern
- Persistence utilities for localStorage
- Icon mappings for lucide-react

## Usage

### Basic Navigation Setup

```typescript
import {
  NAVIGATION_GROUPS,
  getWebNavigation,
  getRunnerNavigation,
  createInitialState,
  navigationReducer,
} from "qontinui-navigation";

// Get platform-specific navigation
const webNav = getWebNavigation();
const runnerNav = getRunnerNavigation();

// Initialize state
const initialState = createInitialState({
  activeItemId: "run",
  expandedGroups: ["run", "system"],
});
```

### Platform Filtering

```typescript
import {
  filterGroupsForPlatform,
  buildNavigationConfig,
} from "qontinui-navigation";

// Filter navigation for a specific platform
const config = buildNavigationConfig("runner", {
  isDevelopment: true,
  extensions: {
    append: {
      system: [{ id: "debug-tools", label: "Debug Tools", icon: "Wrench" }],
    },
  },
});
```

### State Management

```typescript
import {
  createInitialState,
  navigationReducer,
  navigationActions,
} from "qontinui-navigation";

// Create initial state
let state = createInitialState();

// Dispatch actions
state = navigationReducer(state, navigationActions.setActive("history"));
state = navigationReducer(state, navigationActions.toggleGroup("observe"));
state = navigationReducer(
  state,
  navigationActions.openSecondary("session", sessionItems),
);
```

### Persistence

```typescript
import {
  serializeState,
  deserializeState,
  STORAGE_KEYS,
} from "qontinui-navigation";

// Save state
localStorage.setItem(STORAGE_KEYS.state, serializeState(state));

// Restore state
const saved = localStorage.getItem(STORAGE_KEYS.state);
if (saved) {
  const restored = deserializeState(saved);
  // Merge with initial state...
}
```

## Navigation Structure

The default navigation structure includes:

- **RUN** - Execute, Active, History
- **OBSERVE** - General Logs, Session (with sub-items), Discoveries
- **BUILD** - Library, Builders (with sub-items), Capture
- **CONFIGURE** - Log Sources, Findings
- **SCHEDULE** - Scheduled Tasks
- **SYSTEM** - Settings (with sub-items), Help

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint
```

### Stale `dist/*.d.ts` Trap

If `npm run build` completes but a consumer's `tsc --noEmit` reports
"module has no exported member `useNavigationItem`" (or any other newly-
added symbol), check **`ignoreDeprecations`** in `tsconfig.json`.

tsup's dts build runs in a worker. When TypeScript rejects a config option
(e.g. a stale `"ignoreDeprecations": "5.0"` on TS 6), the worker dies
silently and `dist/index.d.ts` is left stale — but the JS outputs still
succeed and `npm run build` exits 0. The symptom is only visible when a
consumer types-imports from the package.

Guardrails (Phase 3 Item 8):

- `package.json`'s `build` script ends with `&& test -s dist/index.d.ts`
  so an empty/missing dts is a hard error even when tsup doesn't flag it.
- `tsup --dts` with `{ resolve: true }` surfaces type-resolution failures
  as build errors.
- A repo-wide freshness check lives in
  `qontinui-claude-config/scripts/pre-commit-dts-freshness.sh`. Run it
  anytime you want to verify every shared package's dist is newer than its
  src; the Claude Code `git commit` hook runs it automatically.

## Release Process

This package is published to npm as `qontinui-navigation` (unscoped) via a tag-triggered GitHub Actions workflow.

To cut a release:

1. Bump `version` in `package.json` (use semver; `0.x` minor bumps for breaking changes while pre-1.0).
2. Commit the version bump on `master`.
3. Tag the commit with a `v`-prefixed tag matching the version, e.g. `git tag v0.2.0`.
4. Push the tag: `git push origin v0.2.0`.

The `.github/workflows/publish.yml` workflow runs on `push: tags: ['v*']` and publishes to npm using the org-level `NPM_TOKEN` secret. Verify the publish succeeded by checking the workflow run and `npm view qontinui-navigation version`.

For local validation before tagging:

```bash
npm run build
npm publish --dry-run
```

## License

Licensed under the GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later). See [LICENSE](LICENSE) for full terms.
