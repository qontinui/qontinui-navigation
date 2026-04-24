/**
 * React Integration for qontinui-navigation
 *
 * Exposes a lightweight hook and a thin shell component so every navigation
 * item rendered by a consumer automatically registers itself with the UI
 * Bridge as a first-class element. That makes sidebar / secondary-nav
 * entries discoverable via `/control/snapshot` and actionable via
 * `/control/action`, using a stable, predictable id scheme:
 *
 *   nav:<item.id>   (e.g. "nav:settings-discovery", "nav:build")
 *
 * The hook resolves `useUIElement` from `@qontinui/ui-bridge` lazily so this
 * package remains usable in environments where the UI Bridge isn't
 * installed (tests, Storybook, CLI tooling) — the hook degrades to a no-op
 * rather than crashing.
 */

import * as React from "react";
import type { NavigationItem } from "./types";

// ---------------------------------------------------------------------------
// Optional UI Bridge integration
// ---------------------------------------------------------------------------
//
// We use `require`-style dynamic import through a factory so bundlers that
// don't have `@qontinui/ui-bridge` installed (e.g. qontinui-navigation's
// own test runner) don't fail the module graph. The lookup is cached so
// consumers don't pay a per-render cost.

type UseUIElementFn = (options: Record<string, unknown>) => unknown;

// Tri-state cache: undefined = not yet resolved, null = resolved-but-unavailable,
// function = resolved-and-available.
let cachedUseUIElement: UseUIElementFn | null | undefined = undefined;

function resolveUseUIElement(): UseUIElementFn | null {
  if (cachedUseUIElement !== undefined) return cachedUseUIElement;
  try {
    // `eval`-style require keeps bundlers from statically pulling the peer
    // at build time when it isn't installed. When this module is loaded by
    // an ESM-only runtime with no CommonJS require, we fall back to null.
    const g: Record<string, unknown> = globalThis as Record<string, unknown>;
    const maybeRequire = g.require as
      | ((m: string) => unknown)
      | undefined;
    const dynamicRequire: ((m: string) => unknown) | null =
      typeof maybeRequire === "function"
        ? maybeRequire
        : // Last-resort: build a require via Function. Works in classic Node
          // CJS contexts; throws in bare-ESM, caught below.
          (() => {
            try {
              return new Function("m", "return require(m)") as (
                m: string,
              ) => unknown;
            } catch {
              return null;
            }
          })();

    if (!dynamicRequire) {
      cachedUseUIElement = null;
      return null;
    }

    let mod: unknown;
    try {
      mod = dynamicRequire("@qontinui/ui-bridge/react");
    } catch {
      mod = dynamicRequire("@qontinui/ui-bridge");
    }
    const m = mod as { useUIElement?: UseUIElementFn; default?: { useUIElement?: UseUIElementFn } } | null;
    const fn =
      (m && m.useUIElement) ||
      (m && m.default && m.default.useUIElement) ||
      null;
    cachedUseUIElement = typeof fn === "function" ? fn : null;
  } catch {
    cachedUseUIElement = null;
  }
  return cachedUseUIElement;
}

// ---------------------------------------------------------------------------
// useNavigationItem
// ---------------------------------------------------------------------------

/**
 * Minimal subset of `NavigationItem` the hook needs. Accepting this wider
 * type lets consumer apps that have their own richer nav-item shape (e.g.
 * qontinui-web's `NavItem` with `icon: React.ReactNode`) hand us an object
 * directly without a mapping step — as long as `id` and `label` exist.
 */
export interface NavigationItemLike {
  id: string;
  label: string;
  description?: string;
}

/**
 * Register a navigation item with the UI Bridge.
 *
 * - Always assigns `id: nav:<item.id>` (stable, predictable for test scripts
 *   and agent-driven workflows).
 * - Exposes a single `click` custom action that invokes the caller-supplied
 *   `onActivate`, which matches what a real user click does.
 * - Hints the element's semantic role as `"navigation-item"` via the
 *   `variant` field so content-element discovery can group nav entries
 *   together.
 * - Tags the element type as `menuitem` (closest DOM semantic, honoured by
 *   the existing registry's type filters).
 *
 * If `useUIElement` isn't available at runtime (package not installed, no
 * UIBridgeProvider in the tree, etc.) the hook is a no-op. It never throws.
 *
 * Consumers typically call this hook inside the component that renders the
 * nav item's `<button>`. See `NavigationItemShell` for a zero-boilerplate
 * wrapper.
 */
export function useNavigationItem(
  item: NavigationItemLike,
  onActivate: () => void,
): void {
  // Keep the latest `onActivate` in a ref so changes to the handler
  // identity don't force re-registration (which would churn the UI Bridge
  // registry on every render).
  const activateRef = React.useRef(onActivate);
  React.useEffect(() => {
    activateRef.current = onActivate;
  }, [onActivate]);

  const useUIElementFn = resolveUseUIElement();

  // Always call the hook in the same order whether UI Bridge is present or
  // not. We use a stable no-op substitute when UI Bridge isn't available.
  const hookFn: UseUIElementFn =
    useUIElementFn ?? (() => undefined);

  // Stable handler that forwards to the ref so the custom actions object
  // doesn't change identity.
  const handleClick = React.useCallback(() => {
    activateRef.current();
  }, []);

  const options = React.useMemo<Record<string, unknown>>(
    () => ({
      id: `nav:${item.id}`,
      type: "menuitem",
      label: item.label,
      // Standard click action — the registry and control executor both
      // understand this keyword. The actual handler lives in customActions
      // so the executor can dispatch it without a DOM element reference.
      actions: ["click"],
      customActions: {
        click: {
          id: "click",
          label: `Activate ${item.label}`,
          description: item.description,
          handler: handleClick,
        },
      },
      // Semantic hint for the Phase 1 content-element discovery pass.
      // The registry carries this verbatim; snapshots expose it to UI
      // Bridge clients.
      variant: "navigation-item",
      // Richer disambiguation hints — harmless for apps that don't use
      // them, valuable for NL-based agents.
      contextPath: item.description
        ? `navigation > ${item.label}`
        : undefined,
      // Don't attempt auto-register via a ref (we don't have one here);
      // the hook falls back to data-ui-bridge-id polling which is what the
      // existing nav buttons already stamp.
      autoRegister: true,
    }),
    [item.id, item.label, item.description, handleClick],
  );

  // Always invoke the hook (or the no-op substitute) — React rules of
  // hooks require a stable call order.
  hookFn(options);
}

// ---------------------------------------------------------------------------
// NavigationItemShell
// ---------------------------------------------------------------------------

export interface NavigationItemShellProps {
  item: NavigationItemLike;
  onActivate: () => void;
  children: React.ReactNode;
}

/**
 * Thin render-prop-free wrapper that invokes `useNavigationItem` for the
 * given `item` + `onActivate` and renders `children` unchanged.
 *
 * Use this when you want auto-registration without refactoring an existing
 * nav button into its own component. Example:
 *
 * ```tsx
 * <NavigationItemShell item={item} onActivate={() => onTabChange(item.id)}>
 *   <button onClick={() => onTabChange(item.id)}>{item.label}</button>
 * </NavigationItemShell>
 * ```
 */
export function NavigationItemShell({
  item,
  onActivate,
  children,
}: NavigationItemShellProps): React.ReactElement {
  useNavigationItem(item, onActivate);
  return <>{children}</>;
}

// Re-export the canonical NavigationItem for type-only consumers that
// prefer importing everything from this entry point.
export type { NavigationItem };
