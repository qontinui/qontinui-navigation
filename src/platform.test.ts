/**
 * Platform + disclosure filtering.
 *
 * `isItemAvailable` is the single gate every consumer's sidebar goes through,
 * and it now folds FOUR orthogonal dimensions together (platform, dev/prod,
 * product mode, advanced disclosure). The dimension added last — a `hidden`
 * that can name platforms instead of being a plain boolean — exists so the
 * runner and qontinui-web can disagree about one item without either app
 * keeping a private demotion list that drifts from this registry. These tests
 * pin that behaviour, plus the resulting default menus, because a regression
 * here is invisible in a type-check and shows up only as a page quietly
 * missing from (or reappearing in) someone's sidebar.
 */
import { beforeEach, describe, expect, it } from "vitest";

import {
  getRunnerNavigation,
  getWebNavigation,
  getChildrenForPlatform,
  isItemAvailable,
  isItemDemoted,
  setDevelopmentMode,
  setProductMode,
  setShowHiddenItems,
} from "./platform";
import type { NavigationItem } from "./types";

const item = (overrides: Partial<NavigationItem> = {}): NavigationItem => ({
  id: "x",
  label: "X",
  icon: "Play",
  ...overrides,
});

const idsIn = (groups: { items: { id: string }[] }[]) =>
  groups.flatMap((group) => group.items.map((i) => i.id));

beforeEach(() => {
  // The module keeps process-global filter state; reset it so test order
  // cannot leak a mode or a disclosure into the next case.
  setDevelopmentMode(false);
  setProductMode(null);
  setShowHiddenItems(false);
});

describe("isItemDemoted", () => {
  it("is false without a hidden flag", () => {
    expect(isItemDemoted(item(), "runner")).toBe(false);
    expect(isItemDemoted(item({ hidden: false }), "runner")).toBe(false);
  });

  it("demotes on every platform for hidden: true", () => {
    expect(isItemDemoted(item({ hidden: true }), "runner")).toBe(true);
    expect(isItemDemoted(item({ hidden: true }), "web")).toBe(true);
  });

  it("demotes only the named platforms for a platform list", () => {
    expect(isItemDemoted(item({ hidden: ["runner"] }), "runner")).toBe(true);
    expect(isItemDemoted(item({ hidden: ["runner"] }), "web")).toBe(false);
    expect(isItemDemoted(item({ hidden: ["web"] }), "web")).toBe(true);
    expect(isItemDemoted(item({ hidden: ["web"] }), "runner")).toBe(false);
  });

  it("treats an empty platform list as no demotion", () => {
    expect(isItemDemoted(item({ hidden: [] }), "runner")).toBe(false);
  });
});

describe("isItemAvailable", () => {
  it("hides a demoted item until the disclosure is opted into", () => {
    const runnerOnlyAdvanced = item({ hidden: ["runner"] });
    expect(isItemAvailable(runnerOnlyAdvanced, "runner")).toBe(false);
    expect(isItemAvailable(runnerOnlyAdvanced, "web")).toBe(true);

    setShowHiddenItems(true);
    expect(isItemAvailable(runnerOnlyAdvanced, "runner")).toBe(true);
  });

  it("keeps the other three dimensions independent of the disclosure", () => {
    setShowHiddenItems(true);

    // Opting into advanced does NOT resurrect dev-only or wrong-mode items.
    expect(isItemAvailable(item({ hiddenInProd: true }), "runner")).toBe(false);
    setProductMode("ai");
    expect(isItemAvailable(item({ productMode: "visual" }), "runner")).toBe(false);
    expect(isItemAvailable(item({ platforms: ["web"] }), "runner")).toBe(false);
  });
});

describe("the default runner menu is Terminal-first", () => {
  beforeEach(() => setProductMode("ai"));

  it("drops the loop-workflow runtime surfaces", () => {
    const visible = idsIn(getRunnerNavigation());

    // The loop paradigm's front door and cockpit.
    expect(visible).not.toContain("prompt-home");
    expect(visible).not.toContain("active");
    // Its authoring surfaces (demoted in 0.2.0, still demoted).
    expect(visible).not.toContain("unified-workflow-builder");
    expect(visible).not.toContain("orchestration-loop");

    // What a Terminal session actually needs.
    expect(visible).toEqual(
      expect.arrayContaining([
        "terminal",
        "productivity",
        "runs",
        "run-findings",
        "observations",
        "knowledge-explorer",
        "helper-tasks",
        "settings",
        "help",
      ]),
    );
  });

  it("keeps the chat-session run tabs and drops the GUI/verification ones", () => {
    // A Terminal session creates a task_run (`workflow_type: "chat"`), so the
    // run detail tabs it populates stay; the ones only a visual/loop run can
    // fill do not.
    const children = getChildrenForPlatform("runs", "runner").map((c) => c.id);
    expect(children).toEqual(
      expect.arrayContaining([
        "run-recap",
        "run-findings",
        "run-ai-output",
        "run-statistics",
        "run-ai-data",
      ]),
    );
    for (const loopOnly of ["run-actions", "run-image", "run-state-explorer", "run-tests"]) {
      expect(children).not.toContain(loopOnly);
    }
  });

  it("restores every demoted surface when the disclosure is on", () => {
    setShowHiddenItems(true);
    const visible = idsIn(getRunnerNavigation());
    expect(visible).toEqual(
      expect.arrayContaining(["prompt-home", "active", "unified-workflow-builder"]),
    );
    expect(getChildrenForPlatform("runs", "runner").map((c) => c.id)).toEqual(
      expect.arrayContaining(["run-actions", "run-image", "run-state-explorer", "run-tests"]),
    );
  });

  it("offers no visual-mode item the runner cannot actually open", () => {
    // `visual-dashboard` (/tools/visual-automation) and `vga` (/vga) are
    // qontinui-web routes; the runner has no tab for either, so rendering them
    // produced a nav entry whose click the runner REFUSES. Every item left in
    // the runner's Visual mode must correspond to a real runner page.
    setProductMode("visual");
    setShowHiddenItems(true);
    const visible = idsIn(getRunnerNavigation());
    expect(visible).not.toContain("visual-dashboard");
    expect(visible).not.toContain("vga");
    expect(visible).toContain("gui-automation");

    // …and they are still offered on web, which does have those routes.
    const web = idsIn(getWebNavigation());
    expect(web).toEqual(expect.arrayContaining(["visual-dashboard", "vga"]));
  });

  it("drops a group whose every item is demoted rather than rendering a bare header", () => {
    setDevelopmentMode(true); // CONFIGURE's last item is also hiddenInProd
    expect(getRunnerNavigation().map((g) => g.id)).not.toContain("configure");
    setShowHiddenItems(true);
    expect(getRunnerNavigation().map((g) => g.id)).toContain("configure");
  });
});

describe("the default web menu stays coord+sessions-centric", () => {
  beforeEach(() => setProductMode("ai"));

  it("keeps Home but drops the task_run-scoped surfaces", () => {
    const visible = idsIn(getWebNavigation());
    // /prompt-home is web's landing page — the runner-scoped demotion must not
    // reach it.
    expect(visible).toContain("prompt-home");
    // Web's sessions live in coord.sessions and produce no task_runs.
    for (const demoted of ["runs", "run-findings", "active"]) {
      expect(visible).not.toContain(demoted);
    }
  });
});
