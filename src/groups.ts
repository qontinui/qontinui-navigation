/**
 * Navigation Groups
 *
 * Shared navigation group definitions for Qontinui applications.
 * These define the structure and hierarchy of the sidebar navigation.
 */

import type { NavigationGroup, NavigationItem } from "./types";

// ============================================================================
// RUN Group
// ============================================================================

export const RUN_ITEMS: NavigationItem[] = [
  {
    id: "workflow-queue",
    label: "Workflow Queue",
    icon: "Layers",
    description: "Queue and execute workflow sequences",
    platforms: ["runner"],
    modes: ["advanced"],
  },
  {
    id: "run-plan",
    label: "Run Plan",
    icon: "ListChecks",
    description: "Execute structured implementation plans",
    platforms: ["runner"],
  },
  {
    id: "gui-automation",
    label: "GUI Automation",
    icon: "Play",
    description: "Run GUI automation workflows",
    hidden: true,
  },
  {
    id: "active",
    label: "Active",
    icon: "Activity",
    description: "Monitor active executions",
  },
];

export const RUN_GROUP: NavigationGroup = {
  id: "run",
  label: "RUN",
  items: RUN_ITEMS,
  defaultExpanded: true,
};

// ============================================================================
// OBSERVE Group - Session Sub-items
// ============================================================================

export const SESSION_ITEMS: NavigationItem[] = [
  {
    id: "run-recap",
    label: "Summary",
    icon: "ClipboardCheck",
    description: "Overview, AI summary, and run details",
  },
  {
    id: "run-actions",
    label: "Actions",
    icon: "Zap",
    description: "Action execution log",
    hidden: true,
  },
  {
    id: "run-image",
    label: "Image Recognition",
    icon: "Image",
    description: "Visual recognition results",
    hidden: true,
  },
  {
    id: "run-findings",
    label: "Findings",
    icon: "FileText",
    description: "Detected findings and issues",
  },
  {
    id: "run-exploration",
    label: "State Exploration",
    icon: "FileSearch",
    description: "State exploration results",
    hidden: true,
  },
  {
    id: "run-tests",
    label: "Test Results",
    icon: "TestTube",
    description: "Playwright test results",
  },
  {
    id: "run-ai-output",
    label: "AI Output",
    icon: "Bot",
    description: "AI conversation and responses",
  },
  {
    id: "run-statistics",
    label: "Statistics",
    icon: "BarChart3",
    description: "Performance metrics",
  },
  {
    id: "run-ai-data",
    label: "AI Data View",
    icon: "Database",
    description: "Structured AI data",
  },
];

// ============================================================================
// OBSERVE Group - Analysis Sub-items
// ============================================================================

export const ANALYSIS_ITEMS: NavigationItem[] = [
  {
    id: "run-accessibility",
    label: "Accessibility Explorer",
    icon: "Accessibility",
    description: "Explore browser accessibility tree via CDP",
    platforms: ["runner"],
  },
  {
    id: "run-ui-bridge",
    label: "UI Bridge Inspector",
    icon: "Puzzle",
    description: "Inspect and control UI Bridge elements",
    platforms: ["runner"],
  },
];

export const OBSERVE_ITEMS: NavigationItem[] = [
  {
    id: "runs",
    label: "Runs",
    icon: "History",
    description: "Browse and manage all runs",
  },
  {
    id: "session",
    label: "Session",
    icon: "LayoutDashboard",
    hasChildren: true,
    selectsFirstChild: false,
    description: "Current execution session",
    modes: ["advanced"],
  },
  {
    id: "analysis",
    label: "Analysis",
    icon: "FileSearch",
    hasChildren: true,
    selectsFirstChild: false,
    description: "Live inspection tools",
  },
  // Session children are handled separately for the secondary sidebar
  {
    id: "error-monitor",
    label: "Error Monitor",
    icon: "AlertCircle",
    description: "Monitor and fix application errors from log sources",
    platforms: ["runner"],
  },
  {
    id: "learning",
    label: "AI Task Analytics",
    icon: "Brain",
    description: "Patterns and performance from AI task executions",
    platforms: ["runner"],
    modes: ["advanced"],
    hidden: true,
  },
  {
    id: "checkpoints",
    label: "Checkpoints",
    icon: "History",
    description: "Time-travel debugging with checkpoints",
    platforms: ["runner"],
    modes: ["advanced"],
    hidden: true,
  },
  {
    id: "discoveries",
    label: "GUI Discoveries",
    icon: "Cloud",
    description: "Patterns detected from GUI automation runs",
    modes: ["advanced"],
    hidden: true,
  },
];

export const OBSERVE_GROUP: NavigationGroup = {
  id: "observe",
  label: "OBSERVE",
  items: OBSERVE_ITEMS,
  defaultExpanded: false,
};

// ============================================================================
// BUILD Group - Library Categories
// ============================================================================

export const LIBRARY_ITEMS: NavigationItem[] = [
  {
    id: "library-tasks",
    label: "Tasks",
    icon: "FileText",
    description: "Single-step AI tasks",
  },
  {
    id: "library-workflows",
    label: "Workflows",
    icon: "Sparkles",
    description: "Phase-based automation workflows",
  },
  {
    id: "library-macros",
    label: "Macros",
    icon: "Layers",
    description: "Deterministic action sequences",
    hidden: true,
  },
  {
    id: "library-scripts",
    label: "Scripts",
    icon: "TestTube",
    description: "Playwright scripts",
  },
  {
    id: "library-contexts",
    label: "Contexts",
    icon: "BookOpen",
    description: "AI knowledge base",
  },
  {
    id: "library-state-explorer",
    label: "State Explorer",
    icon: "ShieldCheck",
    description: "Saved state exploration configs",
    hidden: true,
  },
  {
    id: "library-api-requests",
    label: "API Requests",
    icon: "Globe",
    description: "Saved HTTP request templates",
  },
];

// ============================================================================
// BUILD Group - Builder Categories (flyout items)
// Matches 1:1 with Library categories
// ============================================================================

export const BUILDER_ITEMS: NavigationItem[] = [
  {
    id: "spec-discovery",
    label: "Spec Discovery",
    icon: "Globe",
    description: "Discover specs from live pages and generate workflows",
    platforms: ["runner"],
  },
  {
    id: "app-comparison",
    label: "App Comparison",
    icon: "BarChart3",
    description: "Compare two apps to discover structural differences",
    platforms: ["runner"],
  },
  {
    id: "task-builder",
    label: "Task Builder",
    icon: "FileText",
    description: "Create single-step AI tasks",
  },
  {
    id: "macro-builder",
    label: "Macro Builder",
    icon: "Layers",
    description: "Create deterministic action sequences",
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "script-builder",
    label: "Script Builder",
    icon: "TestTube",
    description: "Create Playwright scripts",
  },
  {
    id: "context-builder",
    label: "Context Builder",
    icon: "BookOpen",
    description: "Create AI knowledge base entries",
  },
  {
    id: "state-explorer-builder",
    label: "State Explorer Builder",
    icon: "ShieldCheck",
    description: "Create state exploration configs",
    hidden: true,
  },
  {
    id: "api-request-builder",
    label: "API Request Builder",
    icon: "Globe",
    description: "Create HTTP request templates",
  },
  {
    id: "awas-builder",
    label: "AWAS Builder",
    icon: "Wifi",
    description: "Create AWAS web automation configs",
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "test-builder",
    label: "Test Builder",
    icon: "FlaskConical",
    description: "Create verification tests",
  },
  {
    id: "check-builder",
    label: "Check Builder",
    icon: "ShieldCheck",
    description: "Create code quality checks (lint, format, type check)",
  },
  {
    id: "shell-command-builder",
    label: "Shell Command Builder",
    icon: "Terminal",
    description: "Create reusable shell commands for workflows",
  },
];

export const BUILD_ITEMS: NavigationItem[] = [
  {
    id: "unified-workflow-builder",
    label: "Workflows",
    icon: "Sparkles",
    description: "Build phase-based automation workflows",
  },
  {
    id: "flow-designer",
    label: "Flow Designer",
    icon: "GitBranch",
    description: "Visual editor for deterministic workflows",
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "builders",
    label: "Builders",
    icon: "Wrench",
    hasChildren: true,
    selectsFirstChild: false,
    description: "Create tasks, scripts, and other assets",
    modes: ["advanced"],
  },
  {
    id: "library",
    label: "Library",
    icon: "BookOpen",
    description: "Browse saved automation assets",
    modes: ["advanced"],
  },
  {
    id: "capture",
    label: "Capture",
    icon: "Camera",
    description: "Capture screen elements",
    platforms: ["runner"],
    hidden: true,
  },
];

export const BUILD_GROUP: NavigationGroup = {
  id: "build",
  label: "BUILD",
  items: BUILD_ITEMS,
  defaultExpanded: false,
};

// ============================================================================
// CONFIGURE Group
// ============================================================================

export const CONFIGURE_ITEMS: NavigationItem[] = [
  {
    id: "config-log-sources",
    label: "Log Sources",
    icon: "FolderOpen",
    description: "Configure log file locations",
  },
  {
    id: "config-findings",
    label: "Findings",
    icon: "Tag",
    description: "Configure finding patterns",
  },
  {
    id: "config-hooks",
    label: "Lifecycle Hooks",
    icon: "Webhook",
    description: "Configure execution event triggers",
    platforms: ["runner"],
    hidden: true,
  },
];

export const CONFIGURE_GROUP: NavigationGroup = {
  id: "configure",
  label: "CONFIGURE",
  items: CONFIGURE_ITEMS,
  defaultExpanded: false,
  modes: ["advanced"],
};

// ============================================================================
// SCHEDULE Group
// ============================================================================

export const SCHEDULE_ITEMS: NavigationItem[] = [
  {
    id: "tasks",
    label: "Scheduled Tasks",
    icon: "Calendar",
    description: "Manage scheduled automation",
    hidden: true,
  },
];

export const SCHEDULE_GROUP: NavigationGroup = {
  id: "schedule",
  label: "SCHEDULE",
  items: SCHEDULE_ITEMS,
  defaultExpanded: false,
  modes: ["advanced"],
};

// ============================================================================
// SYSTEM Group - Settings Sub-items
// ============================================================================

export const SETTINGS_ITEMS: NavigationItem[] = [
  {
    id: "settings-account",
    label: "Account",
    icon: "User",
    description: "User account settings",
  },
  {
    id: "settings-ai",
    label: "AI Providers",
    icon: "Bot",
    description: "Configure AI providers and models",
    modes: ["advanced"],
  },
  {
    id: "settings-agentic",
    label: "Advanced AI",
    icon: "Brain",
    description: "Memory compression, retry, and task routing",
    platforms: ["runner"],
    modes: ["advanced"],
  },
  {
    id: "settings-self-healing",
    label: "Self-Healing",
    icon: "ShieldCheck",
    description: "Self-healing automation settings",
    platforms: ["runner"],
    modes: ["advanced"],
  },
  {
    id: "settings-playwright",
    label: "Playwright",
    icon: "FlaskConical",
    description: "Playwright configuration",
    platforms: ["runner"],
    modes: ["advanced"],
  },
  {
    id: "settings-mobile",
    label: "Mobile",
    icon: "Monitor",
    description: "Mobile device (ADB) settings",
    platforms: ["runner"],
    modes: ["advanced"],
    hidden: true,
  },
  {
    id: "settings-mcp",
    label: "MCP Servers",
    icon: "Wifi",
    description: "Model Context Protocol server configuration",
    platforms: ["runner"],
    modes: ["advanced"],
  },
  {
    id: "settings-log-sources",
    label: "Log Sources",
    icon: "FolderOpen",
    description: "Global log source configuration with AI selection",
    platforms: ["runner"],
    modes: ["advanced"],
  },
  {
    id: "settings-general",
    label: "General",
    icon: "Wrench",
    description: "General application settings",
  },
  {
    id: "settings-storage",
    label: "Storage",
    icon: "HardDrive",
    description: "Data storage settings",
  },
  {
    id: "settings-backup",
    label: "Backup",
    icon: "Archive",
    description: "Backup and restore",
    modes: ["advanced"],
  },
  {
    id: "settings-updates",
    label: "Updates",
    icon: "Download",
    description: "Check for updates",
    platforms: ["runner"],
  },
  {
    id: "settings-debug",
    label: "Debug",
    icon: "FlaskConical",
    description: "Debug and diagnostics",
    modes: ["advanced"],
  },
];

export const SYSTEM_ITEMS: NavigationItem[] = [
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    hasChildren: true,
    selectsFirstChild: true,
    description: "Application settings",
  },
  {
    id: "help",
    label: "Help",
    icon: "HelpCircle",
    description: "Documentation and support",
  },
];

export const SYSTEM_GROUP: NavigationGroup = {
  id: "system",
  label: "SYSTEM",
  items: SYSTEM_ITEMS,
  defaultExpanded: true,
};

// ============================================================================
// Complete Navigation Structure
// ============================================================================

/**
 * All navigation groups in order.
 */
export const NAVIGATION_GROUPS: NavigationGroup[] = [
  RUN_GROUP,
  OBSERVE_GROUP,
  BUILD_GROUP,
  CONFIGURE_GROUP,
  SCHEDULE_GROUP,
  SYSTEM_GROUP,
];

/**
 * Map of parent IDs to their children for secondary sidebar.
 */
export const CHILDREN_MAP: Record<string, NavigationItem[]> = {
  session: SESSION_ITEMS,
  analysis: ANALYSIS_ITEMS,
  library: LIBRARY_ITEMS,
  builders: BUILDER_ITEMS,
  settings: SETTINGS_ITEMS,
};

/**
 * Get children items for a parent item.
 */
export function getChildrenItems(parentId: string): NavigationItem[] {
  return CHILDREN_MAP[parentId] || [];
}

/**
 * Get all navigation items flattened.
 */
export function getAllItems(): NavigationItem[] {
  const items: NavigationItem[] = [];

  for (const group of NAVIGATION_GROUPS) {
    items.push(...group.items);
  }

  // Add children items
  for (const children of Object.values(CHILDREN_MAP)) {
    items.push(...children);
  }

  return items;
}

/**
 * Find an item by ID across all groups and children.
 */
export function findItemById(id: string): NavigationItem | undefined {
  return getAllItems().find((item) => item.id === id);
}

/**
 * Get the parent group for an item.
 */
export function getItemGroup(itemId: string): NavigationGroup | undefined {
  for (const group of NAVIGATION_GROUPS) {
    if (group.items.some((item) => item.id === itemId)) {
      return group;
    }
  }

  // Check children
  for (const [parentId, children] of Object.entries(CHILDREN_MAP)) {
    if (children.some((item) => item.id === itemId)) {
      // Find the parent's group
      for (const group of NAVIGATION_GROUPS) {
        if (group.items.some((item) => item.id === parentId)) {
          return group;
        }
      }
    }
  }

  return undefined;
}
