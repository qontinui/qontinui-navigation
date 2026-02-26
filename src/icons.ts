/**
 * Icon Utilities
 *
 * Runtime validation helpers for icon names.
 */

import type { IconName } from "./types";

/**
 * All available icon names as an array.
 */
export const ICON_NAMES: IconName[] = [
  // Common
  "Play",
  "Activity",
  "History",
  "Bot",
  "Settings",
  "HelpCircle",
  "ChevronDown",
  "ChevronRight",
  "AlertCircle",
  // Observe/Session
  "ScrollText",
  "LayoutDashboard",
  "ClipboardCheck",
  "Zap",
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
  "Webhook",
  "RotateCcw",
  "Cpu",
  // Web / shared
  "MessageSquare",
  "Server",
  "Workflow",
];

/**
 * Check if a string is a valid icon name.
 */
export function isValidIconName(name: string): name is IconName {
  return ICON_NAMES.includes(name as IconName);
}
