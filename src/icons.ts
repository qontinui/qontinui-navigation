/**
 * Icon Utilities
 *
 * Runtime validation helpers for icon names.
 */

import type { IconName } from "./types";

/**
 * Every icon name, as a literal tuple.
 *
 * `as const` is load-bearing: it is what lets the two assertions below compare
 * this list against the `IconName` union at compile time. Without it the tuple
 * widens to `IconName[]` and both `Exclude`s collapse to `never`, so the check
 * passes vacuously while the list drifts.
 */
const ICON_NAME_TUPLE = [
  // Common
  "Video",
  "Play",
  "Activity",
  "History",
  "Bot",
  "Settings",
  "HelpCircle",
  "ChevronDown",
  "ChevronRight",
  "AlertCircle",
  "Bug",
  // Observe/Session
  "ScrollText",
  "LayoutDashboard",
  "ClipboardCheck",
  "Zap",
  "Radio",
  "Radar",
  "Image",
  "ClipboardList",
  "FileText",
  "FileSearch",
  "TestTube",
  "BarChart3",
  "Database",
  "Cloud",
  "Accessibility",
  // Build
  "BookOpen",
  "BookText",
  "CheckCircle2",
  "Sparkles",
  "MousePointer2",
  "Layers",
  "FlaskConical",
  "Camera",
  "GitBranch",
  "Network",
  "Globe",
  "Code",
  "Puzzle",
  "ShieldCheck",
  "Wifi",
  "Terminal",
  "ListChecks",
  // Configure
  "FolderOpen",
  "Tag",
  "Plug",
  // Schedule
  "Calendar",
  // System/Settings
  "User",
  "HardDrive",
  "Wrench",
  "Download",
  "Archive",
  "Monitor",
  "Palette",
  "Bell",
  "Key",
  "CreditCard",
  "Brain",
  "Eye",
  "Webhook",
  "RotateCcw",
  "Cpu",
  "Target",
  "Repeat",
  "ShieldAlert",
  // Web / shared
  "MessageSquare",
  "Server",
  "Workflow",
  "Package",
] as const;

/**
 * Compile-time proof that `ICON_NAME_TUPLE` and the `IconName` union hold the
 * same members.
 *
 * Nothing else pins them. `ICON_NAMES` was declared `IconName[]`, which makes
 * TypeScript check that every entry IS an icon name but never that every icon
 * name is an entry — so an icon added to the union and forgotten here would
 * make `isValidIconName` answer `false` for a name the type system accepts,
 * and no build step would have said so. Each alias below resolves to `never`
 * when the two agree; when they do not, `AssertNever` fails to satisfy its
 * `extends never` bound and `tsc` names the offending icons.
 */
type AssertNever<T extends never> = T;
type _NoIconNameMissingFromTuple = AssertNever<
  Exclude<IconName, (typeof ICON_NAME_TUPLE)[number]>
>;
type _NoTupleEntryOutsideIconName = AssertNever<
  Exclude<(typeof ICON_NAME_TUPLE)[number], IconName>
>;

/**
 * All available icon names as an array.
 *
 * A fresh mutable copy, so a consumer sorting or filtering it in place cannot
 * corrupt the tuple the assertions above are written against.
 */
export const ICON_NAMES: IconName[] = [...ICON_NAME_TUPLE];

/**
 * Check if a string is a valid icon name.
 */
export function isValidIconName(name: string): name is IconName {
  return ICON_NAMES.includes(name as IconName);
}
