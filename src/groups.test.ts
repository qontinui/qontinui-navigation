/**
 * Registry invariants for the navigation items themselves.
 *
 * `platform.test.ts` covers the four visibility DIMENSIONS — which items a
 * given platform, mode and disclosure setting yields. This file covers the
 * registry's own shape: that ids identify one destination, that icons resolve,
 * and that an item's id is one a consumer can actually act on.
 *
 * The last of those is the failure this file exists for, and it has happened
 * three times. `visual-dashboard` and `vga` were qontinui-web routes offered on
 * the runner, where the sidebar's id guard REFUSED the click (fixed by
 * `platforms: ["web"]`). `autoresearch` was the same shape with a longer fuse:
 * qontinui-runner deleted the subsystem in `ac36fa4e4`, removing the id from
 * `MainTabId`, `VALID_TAB_IDS`, `TAB_LABELS` and `PAGE_TO_TAB`, and the nav item
 * survived — invisible in production behind `hiddenInProd`, so only developers
 * met the refusal, and nobody reported it.
 *
 * A test HERE cannot close that class on its own: this package does not know
 * which ids a consumer implements, and importing a consumer would invert the
 * dependency. The durable check belongs in each consumer, next to its own tab
 * union. What this file can do is pin the invariants that make such a check
 * possible — a stable, unambiguous id per destination — and pin the one item
 * that was found dead, so it cannot quietly return.
 */
import { describe, expect, it } from "vitest";

import {
  CHILDREN_MAP,
  NAVIGATION_GROUPS,
  findItemById,
  getAllItems,
  getItemGroup,
} from "./groups";
import { ICON_NAMES, isValidIconName } from "./icons";
import type { NavigationItem } from "./types";

/**
 * Ids that intentionally appear twice, with the reason.
 *
 * An alias is legitimate only when both entries name the same destination, so
 * every id listed here is additionally checked for route agreement below. An
 * id that lands here by accident is a bug: two different pages answering to
 * one id make `findItemById` return whichever the group walk reaches first.
 */
const DELIBERATE_ALIASES: Record<string, string> = {
  "run-findings":
    "top-level REVIEW entry + the run-detail child of `runs`; same route, different demotion",
};

const countById = (items: NavigationItem[]): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.id, (counts.get(item.id) ?? 0) + 1);
  }
  return counts;
};

describe("item ids", () => {
  it("are unique apart from the documented aliases", () => {
    const duplicated = [...countById(getAllItems())]
      .filter(([, count]) => count > 1)
      .map(([id]) => id)
      .sort();

    expect(duplicated).toEqual(Object.keys(DELIBERATE_ALIASES).sort());
  });

  it("give every alias one destination", () => {
    for (const id of Object.keys(DELIBERATE_ALIASES)) {
      const routes = new Set(
        getAllItems()
          .filter((item) => item.id === id)
          .map((item) => item.route),
      );
      // An alias whose copies disagree about the route is two pages wearing
      // one id — exactly what the uniqueness rule is protecting against, and
      // the allow-list above must not be able to smuggle it in.
      expect([...routes]).toHaveLength(1);
      // `route` is optional, and a Set of two `undefined`s also has length one
      // — so agreement alone would be satisfied by an alias that names no
      // destination at all. Require a real one.
      expect(typeof [...routes][0]).toBe("string");
      expect([...routes][0]).not.toBe("");
    }
  });

  it("all resolve to a group through getItemGroup", () => {
    const items = getAllItems();
    // Guard the loop against vacuity: an empty registry would pass it silently.
    expect(items.length).toBeGreaterThan(50);
    for (const item of items) {
      // Every item is reachable from a group — directly, or as a child whose
      // parent sits in one. A child whose parent id names nothing would return
      // undefined here, which is how an orphaned CHILDREN_MAP entry shows up.
      expect(getItemGroup(item.id), `"${item.id}" belongs to no group`).toBeDefined();
    }
  });

  it("resolve an alias to the top-level entry, not the child", () => {
    // The property worth pinning about `findItemById` is WHICH entry a
    // duplicated id returns — `getAllItems()` walks group items before
    // CHILDREN_MAP, so the top-level one wins. Asserting instead that the
    // result's id equals the id you asked for would be a tautology: that is
    // how `Array.prototype.find` is defined, and no registry could break it.
    //
    // The consequence is documented on the item itself: the two entries carry
    // DIFFERENT `hidden` values, so a consumer reading demotion back off a
    // lookup gets the top-level answer for both.
    expect(findItemById("run-findings")?.hidden).toBe(true);
    expect(getItemGroup("run-findings")?.id).toBe("review");
    expect(
      CHILDREN_MAP.runs.find((child) => child.id === "run-findings")?.hidden,
    ).toBeUndefined();
  });

  it("does not offer Autoresearch, whose page qontinui-runner deleted", () => {
    // qontinui-runner `ac36fa4e4` ("rip dead autoresearch subsystem") removed
    // `AutoresearchDashboard.tsx` and the `autoresearch` tab id. The nav item
    // outlived it by months because `hiddenInProd: true` kept it off every
    // production sidebar, so the refused click was only ever seen in dev.
    expect(findItemById("autoresearch")).toBeUndefined();
  });
});

describe("group ids", () => {
  it("are unique", () => {
    const ids = NAVIGATION_GROUPS.map((group) => group.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("never name an empty group", () => {
    // `filterGroupsForPlatform` drops groups that filter down to nothing, so a
    // group that is empty AT THE SOURCE is dead weight rather than a rendered
    // bare header — but it is still a group nothing can ever surface.
    for (const group of NAVIGATION_GROUPS) {
      expect(group.items.length).toBeGreaterThan(0);
    }
  });
});

describe("icons", () => {
  it("has no repeated name in ICON_NAMES", () => {
    // The compile-time assertions in `icons.ts` compare MEMBERSHIP, so a name
    // listed twice satisfies both `Exclude`s and slips through. Harmless for
    // `isValidIconName`, misleading for anything that counts or renders the
    // list.
    expect(new Set(ICON_NAMES).size).toBe(ICON_NAMES.length);
  });

  it("rejects a name outside the union", () => {
    // Without this, every assertion below is also satisfied by a validator
    // that returns `true` unconditionally.
    expect(isValidIconName("NotAnIcon")).toBe(false);
    expect(isValidIconName("")).toBe(false);
  });

  it("are names isValidIconName accepts", () => {
    // `icon: IconName` makes tsc check the literal against the union; it says
    // nothing about `ICON_NAMES`, the array `isValidIconName` actually reads.
    // The compile-time assertions in `icons.ts` pin the two together; this
    // pins the registry to the runtime answer a consumer gets.
    //
    // Group icons are folded into the same list rather than looped over
    // separately: `NavigationGroup.icon` is optional and no group sets one
    // today, so a loop of its own would iterate zero times and pass for that
    // reason instead of for the right one.
    const iconsInRegistry = [
      ...getAllItems().map((item) => item.icon),
      ...NAVIGATION_GROUPS.flatMap((group) => (group.icon ? [group.icon] : [])),
    ];
    expect(iconsInRegistry.length).toBeGreaterThan(50);

    for (const icon of iconsInRegistry) {
      expect(isValidIconName(icon), `"${icon}" is not in ICON_NAMES`).toBe(true);
    }
  });
});

describe("parent items", () => {
  it("have children under the id CHILDREN_MAP keys on", () => {
    for (const parentId of Object.keys(CHILDREN_MAP)) {
      const parent = findItemById(parentId);
      expect(parent, `CHILDREN_MAP key "${parentId}" names no item`).toBeDefined();
      expect(parent?.hasChildren).toBe(true);
      expect(CHILDREN_MAP[parentId].length).toBeGreaterThan(0);
    }
  });

  it("declare exactly one parent-click behaviour", () => {
    // `selectsFirstChild` and `hasOwnPage` dispatch DIFFERENT ids — the first
    // child's and the parent's own. An item setting both leaves the consumer
    // to guess which, and the guess is what decides where the click lands.
    for (const item of getAllItems()) {
      expect(
        item.selectsFirstChild === true && item.hasOwnPage === true,
        `"${item.id}" sets both selectsFirstChild and hasOwnPage`,
      ).toBe(false);

      // Both flags are documented as "ignored for items without children", so
      // setting either on a leaf is a no-op that reads as intent.
      if (!item.hasChildren) {
        expect(item.hasOwnPage, `leaf "${item.id}" sets hasOwnPage`).toBeUndefined();
        expect(
          item.selectsFirstChild,
          `leaf "${item.id}" sets selectsFirstChild`,
        ).toBeUndefined();
      }
    }
  });
});
