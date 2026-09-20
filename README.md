# qontinui-navigation

Shared navigation structure for Qontinui applications. Provides type-safe navigation definitions, platform filtering, and state management utilities.

## Installation

```bash
npm install @qontinui/navigation
```

## Features

- Type-safe navigation items and groups
- Platform filtering — `Platform` is `"web" | "runner"`, and that is the whole set
- Progressive disclosure: an "advanced" demotion (`hidden`) and a dev-only one (`hiddenInProd`)
- Product-mode filtering (`"ai"` / `"visual"`)
- State management with reducer pattern
- Persistence utilities for localStorage
- Icon name mappings for lucide-react, with a runtime validator
- Optional UI Bridge registration for every rendered nav item

## Usage

### Basic Navigation Setup

```typescript
import {
  NAVIGATION_GROUPS,
  getWebNavigation,
  getRunnerNavigation,
  createInitialState,
  navigationReducer,
} from "@qontinui/navigation";

// Get platform-specific navigation
const webNav = getWebNavigation();
const runnerNav = getRunnerNavigation();

// Initialize state
const initialState = createInitialState({
  activeItemId: "terminal",
  expandedGroups: ["workspace", "review", "system"],
});
```

`expandedGroups` defaults to exactly those three — the groups marked
`defaultExpanded` — so pass it only to override.

### Platform Filtering

Item visibility has one gate, `isItemAvailable`, and everything else composes
it. It folds four independent dimensions together, so an item is shown only when
all four agree. (A GROUP can additionally carry its own `platforms`, checked by
`filterGroupForPlatform` outside this gate; no group uses it today.)

| Dimension | Field | Set by |
|---|---|---|
| Platform | `platforms?: Platform[]` | the argument you pass |
| Dev/prod | `hiddenInProd?: boolean` | `setDevelopmentMode(isDev)` |
| Product mode | `productMode?: "ai" \| "visual" \| "both"` | `setProductMode(mode)` |
| Advanced disclosure | `hidden?: boolean \| Platform[]` | `setShowHiddenItems(show)` |

The three setters hold **module-global** state, so call them once at app
startup, before the first render — and reset them between tests (see
`src/platform.test.ts`).

```typescript
import {
  getNavigationGroups,
  getChildrenForPlatform,
  filterGroupsForPlatform,
  isItemAvailable,
  setDevelopmentMode,
  setProductMode,
  setShowHiddenItems,
  NAVIGATION_GROUPS,
} from "@qontinui/navigation";

setDevelopmentMode(import.meta.env.DEV);
setProductMode("ai");
setShowHiddenItems(userPrefs.showAdvancedAutomationFeatures);

// The whole sidebar for one platform. Groups left with no visible item are
// dropped, so no bare group header renders.
const groups = getNavigationGroups("runner");

// The flyout/submenu children of a parent item, filtered the same way.
const runsChildren = getChildrenForPlatform("runs", "runner");

// Or filter your own group list — e.g. app-local groups appended to the shared
// ones. There is no `extensions` option: compose the arrays yourself.
const withLocal = filterGroupsForPlatform(
  [...NAVIGATION_GROUPS, MY_APP_GROUP],
  "runner",
);
```

`hidden` demotes an item out of the **default** sidebar until the user opts
into "Show advanced automation features". It does **not** unregister the route
or tab id, so deep-links and programmatic tab activation keep resolving either
way. `hidden: true` demotes on every platform; `hidden: ["runner"]` demotes on
the named ones only, which is how the runner and qontinui-web disagree about an
item without either app keeping a private list that drifts from this registry.

### Parent items

An item with `hasChildren` has three possible click behaviours, and a consumer
must implement all three:

| Flags | Clicking the parent activates |
|---|---|
| `selectsFirstChild: true` | the FIRST CHILD's id (e.g. `settings` → `settings-account`) |
| `selectsFirstChild: false` | nothing — the click only expands |
| `hasOwnPage: true` | the PARENT's own id (e.g. `runs` → the Runs page) |

Setting both `selectsFirstChild` and `hasOwnPage` is a contradiction and
`src/groups.test.ts` rejects it.

### UI Bridge registration (optional)

`useNavigationItem` registers a rendered nav item with the UI Bridge under the
stable id `nav:<item.id>`, which makes it visible to `/control/snapshot` and
actionable through `/control/action`. `@qontinui/ui-bridge` is an optional peer:
when it is absent the hook is a no-op and never throws.

```tsx
import { NavigationItemShell, useNavigationItem } from "@qontinui/navigation";

// Wrap an existing button — no refactor needed.
<NavigationItemShell item={item} onActivate={() => onTabChange(item.id)}>
  <button onClick={() => onTabChange(item.id)}>{item.label}</button>
</NavigationItemShell>;

// Or call the hook directly from the component that renders the button.
useNavigationItem(item, () => onTabChange(item.id));
```

It accepts any `{ id, label, description? }` shape, so an app with its own
richer nav-item type can pass it straight through.

### State Management

```typescript
import {
  createInitialState,
  navigationReducer,
  navigationActions,
  getChildrenItems,
} from "@qontinui/navigation";

// Create initial state
let state = createInitialState();

// Dispatch actions
state = navigationReducer(state, navigationActions.setActive("terminal"));
state = navigationReducer(state, navigationActions.toggleGroup("insights"));
state = navigationReducer(
  state,
  navigationActions.openSecondary("runs", getChildrenItems("runs")),
);
```

### Persistence

```typescript
import {
  serializeState,
  deserializeState,
  STORAGE_KEYS,
} from "@qontinui/navigation";

// Save state
localStorage.setItem(STORAGE_KEYS.state, serializeState(state));

// Restore state
const saved = localStorage.getItem(STORAGE_KEYS.state);
if (saved) {
  const restored = deserializeState(saved);
  // Merge with initial state...
}
```

`serializeState` drops `secondarySidebar` deliberately — it holds item objects
rather than ids, and a flyout is not a thing to restore across a reload.
`deserializeState` returns `null` rather than throwing on malformed JSON.

## Navigation Structure

Groups, in render order. WORKSPACE, REVIEW and SYSTEM are `defaultExpanded`;
the rest are collapsed. Every item in REVIEW, SPEND, AUTOMATE, BUILD, INSIGHTS
and CONFIGURE is demoted — `hidden: true` in all but one case (`vga` is
`hidden: ["web"]` and `platforms: ["web"]`, so it is platform-excluded on the
only platform where it is not demoted) — so those groups surface only under
the advanced disclosure, and a group all of whose items filter out is dropped
entirely rather than rendered as a bare header. DEV is the only group whose
demotion is mostly `hiddenInProd` (dev builds only) rather than `hidden`.
WORKSPACE mixes demoted and undemoted items by design.

| Group | Contents |
|---|---|
| **WORKSPACE** | Projects, Dashboard, Home, Execute, Terminal, Active, Productivity |
| **REVIEW** | Runs (+ run-detail children), Findings, Memory, Knowledge, Helper Tasks |
| **SPEND** | LLM Analytics, Cost Control |
| **AUTOMATE** | Scheduled Tasks, Triggers, Watchers |
| **BUILD** | Workflows, DAG Editor, Step Builders, Library, UI Bridge States, Specs, Regression, Visual GUI, Orchestration, Demo Videos, Product Tours, Wrappers |
| **INSIGHTS** | Error Monitor, Processes, Activity Timeline, Automation Health, Reflection, Architecture, API Surface, Dev Intelligence, Explainer, Decision Trail, Session Recap |
| **CONFIGURE** | Findings, Lifecycle Hooks, UI Bridge, Event History |
| **DEV** | Generator Eval, Meta-Optimizer, Online Learning, Skills, Image Quality, Accessibility |
| **SYSTEM** | Sessions, Settings (+ children), Help |

On the runner, with `setProductMode("ai")`, `setShowHiddenItems(false)` and
`setDevelopmentMode(false)`, the menu is therefore small on purpose: WORKSPACE's
Projects / Terminal / Productivity, plus SYSTEM's Settings / Help. All three
setters matter — `setDevelopmentMode(true)` additionally restores the DEV group.
Web under the same settings is a different menu again (WORKSPACE's Home, plus
SYSTEM's Sessions / Settings / Help), because most of the rest is
`platforms: ["runner"]`. `src/groups.ts` carries the reasoning for each
demotion; treat that file as the authority and this table as an index.

## Development

```bash
# Install dependencies
npm ci

# Build
npm run build

# Watch mode
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint

# Test
npm test
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

The guardrail is in `package.json`'s `build` script, which ends with a
`node -e` check that `dist/index.d.ts` exists and is non-empty, so an
empty or missing dts is a hard error even when tsup does not flag it.

### Registry invariants

`src/groups.test.ts` pins the properties a consumer relies on and a type-check
cannot see: ids are unique (bar one documented alias, which must name one
route), every icon passes `isValidIconName`, every `CHILDREN_MAP` key names a
real parent, and no item claims two parent-click behaviours.

What it deliberately does **not** cover is whether a consumer has a page behind
each id — this package cannot know that, and importing a consumer to find out
would invert the dependency. That check belongs in each consumer, beside its own
tab union. Three items have shipped without one: `visual-dashboard` and `vga`
(qontinui-web routes offered on the runner, where the sidebar's id guard refused
the click) and `autoresearch`, whose runner subsystem was deleted while the nav
item stayed — and which `hiddenInProd` hid from everyone but developers, so it
went unreported for months. **Before adding an item, confirm its id is a real
destination on every platform it names.**

## Release Process

This package is published to npm as **`@qontinui/navigation` (scoped)** via a tag-triggered GitHub Actions workflow. (It is not unscoped — `package.json` `name` is `@qontinui/navigation`, `publish.yml` passes `--access public` because the scope defaults to restricted, and every consumer depends on the scoped name.)

**A merge to `master` ships nothing.** Consumers install from the registry, so a
change that lands without a release reaches no app. That is not hypothetical:
`733f117` corrected the Productivity item's description and sat unpublished
behind `v0.4.0`, so every installed runner kept rendering the old string.

To cut a release:

1. Bump `version` in `package.json`. Pre-1.0 rule: **minor** for a breaking change,
   for a new nav item, *or* for a removed one; **patch** for a fix that changes no
   item's existence or id.
   The reason an item's existence is a minor and not a patch: consumers depend on
   `^0.x.y`, and a caret range on `0.x` pins the minor — so a patch bump is picked up
   *automatically* by an app whose build has no page behind the new id, which renders a
   dead nav row the sidebar guard then refuses. A minor bump forces the consumer to bump
   deliberately, landing the item and its page together.
   **Also sync `package-lock.json`'s root `version`** — it has drifted from `package.json` before.
2. Commit the version bump on `master`.
3. Tag the commit with a `v`-prefixed tag matching the version, e.g. `git tag v0.5.0`.
4. Push the tag: `git push origin v0.5.0`.

The `.github/workflows/publish.yml` workflow runs on `push: tags: ['v*']` and publishes to npm using the repository's `NPMJS` secret. **Verify by reading the registry back** — `npm view @qontinui/navigation version` — not by the workflow's own green run; the run is the dispatch, the published version is the effect.

Then bump the consumers that need it. Current ranges: qontinui-runner
`^0.4.0` (no lockfile, so it resolves the newest matching version at install
time); qontinui-web/frontend `^0.3.1`, locked at `0.3.1`.

For local validation before tagging:

```bash
npm run build
npm publish --dry-run
```

## License

Licensed under the GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later). See [LICENSE](LICENSE) for full terms.
