/**
 * Icon Mappings
 *
 * Maps icon names to lucide-react icon components.
 * Each application imports this and provides the actual icon components.
 */

import type { IconName } from "./types";

/**
 * Icon name constants for type-safe icon references.
 * Use these instead of string literals for better IDE support.
 */
export const Icons = {
  // Common
  Play: "Play" as const,
  Activity: "Activity" as const,
  History: "History" as const,
  Bot: "Bot" as const,
  Settings: "Settings" as const,
  HelpCircle: "HelpCircle" as const,
  ChevronDown: "ChevronDown" as const,
  ChevronRight: "ChevronRight" as const,
  AlertCircle: "AlertCircle" as const,

  // Observe/Session
  ScrollText: "ScrollText" as const,
  LayoutDashboard: "LayoutDashboard" as const,
  ClipboardCheck: "ClipboardCheck" as const,
  Zap: "Zap" as const,
  Image: "Image" as const,
  ClipboardList: "ClipboardList" as const,
  FileText: "FileText" as const,
  FileSearch: "FileSearch" as const,
  TestTube: "TestTube" as const,
  BarChart3: "BarChart3" as const,
  Database: "Database" as const,
  Cloud: "Cloud" as const,
  Accessibility: "Accessibility" as const,

  // Build
  BookOpen: "BookOpen" as const,
  Sparkles: "Sparkles" as const,
  MousePointer2: "MousePointer2" as const,
  Layers: "Layers" as const,
  FlaskConical: "FlaskConical" as const,
  Camera: "Camera" as const,
  GitBranch: "GitBranch" as const,
  Globe: "Globe" as const,
  Code: "Code" as const,
  Puzzle: "Puzzle" as const,
  ShieldCheck: "ShieldCheck" as const,
  ListChecks: "ListChecks" as const,

  // Configure
  FolderOpen: "FolderOpen" as const,
  Tag: "Tag" as const,

  // Schedule
  Calendar: "Calendar" as const,

  // System/Settings
  User: "User" as const,
  HardDrive: "HardDrive" as const,
  Wrench: "Wrench" as const,
  Download: "Download" as const,
  Archive: "Archive" as const,
  Monitor: "Monitor" as const,
  Palette: "Palette" as const,
  Bell: "Bell" as const,
  Key: "Key" as const,
  CreditCard: "CreditCard" as const,
  Brain: "Brain" as const,
  Webhook: "Webhook" as const,
  Wifi: "Wifi" as const,
  Terminal: "Terminal" as const,
  RotateCcw: "RotateCcw" as const,
} satisfies Record<string, IconName>;

/**
 * Type for the Icons object keys.
 */
export type IconKey = keyof typeof Icons;

/**
 * All available icon names as an array.
 */
export const ICON_NAMES: IconName[] = Object.values(Icons);

/**
 * Check if a string is a valid icon name.
 */
export function isValidIconName(name: string): name is IconName {
  return ICON_NAMES.includes(name as IconName);
}

/**
 * Icon category mappings for organization in UI.
 */
export const ICON_CATEGORIES: Record<string, IconName[]> = {
  common: ["Play", "Activity", "History", "Bot", "Settings", "HelpCircle"],
  observe: [
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
    "AlertCircle",
    "RotateCcw",
  ],
  build: [
    "BookOpen",
    "Sparkles",
    "MousePointer2",
    "FlaskConical",
    "Camera",
    "GitBranch",
    "Globe",
    "Code",
    "Puzzle",
    "ShieldCheck",
    "ListChecks",
    "Terminal",
  ],
  configure: ["FolderOpen", "Tag"],
  schedule: ["Calendar"],
  system: [
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
  ],
};
