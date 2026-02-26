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
    label: "Execute",
    icon: "Play",
    description: "Run and schedule workflows",
    route: "/execute",
    color: "#10B981",
  },
  {
    id: "run-plan",
    label: "Chat",
    icon: "MessageSquare",
    description: "Plan features with AI, generate workflows",
    route: "/chat",
    color: "#9333EA",
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
    route: "/runs/active",
    color: "#4A90D9",
  },
];

export const RUN_GROUP: NavigationGroup = {
  id: "run",
  label: "RUN",
  items: RUN_ITEMS,
  defaultExpanded: true,
};

// ============================================================================
// OBSERVE Group - Runs Sub-items (runner secondary sidebar)
// ============================================================================

export const SESSION_ITEMS: NavigationItem[] = [
  {
    id: "run-recap",
    label: "Summary",
    icon: "ClipboardCheck",
    description: "Overview, AI summary, and run details",
    route: "/runs/summary",
    color: "#4A90D9",
  },
  {
    id: "run-actions",
    label: "Actions",
    icon: "Zap",
    description: "Action execution log",
    route: "/runs/actions",
    color: "#4A90D9",
    hidden: true,
  },
  {
    id: "run-image",
    label: "Image Recognition",
    icon: "Image",
    description: "Visual recognition results",
    route: "/runs/image-recognition",
    color: "#4A90D9",
    hidden: true,
  },
  {
    id: "run-findings",
    label: "Findings",
    icon: "FileText",
    description: "Detected findings and issues",
    route: "/runs/findings",
    color: "#4A90D9",
  },
  {
    id: "run-state-explorer",
    label: "State Explorer",
    icon: "FileSearch",
    description: "State exploration results",
    route: "/runs/state-exploration",
    color: "#4A90D9",
    hidden: true,
  },
  {
    id: "run-tests",
    label: "Test Results",
    icon: "TestTube",
    description: "Playwright test results",
    route: "/runs/test-results",
    color: "#4A90D9",
  },
  {
    id: "run-ai-output",
    label: "AI Output",
    icon: "Bot",
    description: "AI conversation and responses",
    route: "/runs/ai-output",
    color: "#4A90D9",
  },
  {
    id: "run-statistics",
    label: "Statistics",
    icon: "BarChart3",
    description: "Performance metrics",
    route: "/runs/statistics",
    color: "#4A90D9",
  },
  {
    id: "run-ai-data",
    label: "AI Data View",
    icon: "Database",
    description: "Structured AI data",
    route: "/runs/ai-data",
    color: "#4A90D9",
  },
  {
    id: "capture",
    label: "Capture",
    icon: "Camera",
    description: "Screenshot capture tool",
    platforms: ["runner"],
    hidden: true,
  },
];

// ============================================================================
// OBSERVE Group - Runs Children (web sidebar collapsible)
// ============================================================================

export const RUNS_ITEMS: NavigationItem[] = [
  {
    id: "runs-history",
    label: "History",
    icon: "History",
    description: "Run history browser",
    route: "/runs",
    color: "#4A90D9",
    platforms: ["web"],
  },
];

export const OBSERVE_ITEMS: NavigationItem[] = [
  {
    id: "runs",
    label: "Runs",
    icon: "History",
    description: "Browse and manage all runs",
    hasChildren: true,
    selectsFirstChild: false,
    route: "/runs",
    color: "#4A90D9",
  },
  {
    id: "error-monitor",
    label: "Error Monitor",
    icon: "AlertCircle",
    description: "Monitor and fix application errors from log sources",
    route: "/tools/error-monitor",
    color: "#4A90D9",
  },
  {
    id: "processes",
    label: "Processes",
    icon: "Cpu",
    description: "Manage and monitor spawned child processes",
    platforms: ["runner"],
    color: "#06B6D4",
  },
  {
    id: "reflection",
    label: "Reflection",
    icon: "RotateCcw",
    description: "Reflection fix effectiveness and history",
    platforms: ["runner"],
  },
];

export const OBSERVE_GROUP: NavigationGroup = {
  id: "observe",
  label: "OBSERVE",
  items: OBSERVE_ITEMS,
  defaultExpanded: false,
};

export const BUILD_ITEMS: NavigationItem[] = [
  {
    id: "unified-workflow-builder",
    label: "Workflows",
    icon: "Sparkles",
    description: "Build phase-based automation workflows",
    route: "/build/workflows",
    color: "var(--brand-secondary)",
  },
  {
    id: "step-builders",
    label: "Step Builders",
    icon: "Layers",
    description: "Build and browse step templates",
    route: "/build/templates",
    color: "var(--brand-secondary)",
  },
  {
    id: "library",
    label: "Library",
    icon: "BookOpen",
    description: "Browse saved automation assets",
    route: "/library",
    color: "var(--brand-secondary)",
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
    id: "config-findings",
    label: "Findings",
    icon: "Tag",
    description: "Configure finding patterns",
    route: "/settings/finding-rules",
    color: "#FFD700",
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
    route: "/settings/account",
    color: "#FFD700",
  },
  {
    id: "settings-ai",
    label: "AI Providers",
    icon: "Bot",
    description: "Configure AI providers and models",
    route: "/settings/ai",
    color: "#FFD700",
  },
  {
    id: "settings-agentic",
    label: "Advanced AI",
    icon: "Brain",
    description: "Memory compression, retry, and task routing",
    route: "/settings/agentic",
    color: "#FFD700",
  },
  {
    id: "settings-self-healing",
    label: "Self-Healing",
    icon: "ShieldCheck",
    description: "Self-healing automation settings",
    route: "/settings/self-healing",
    color: "#FFD700",
  },
  {
    id: "settings-playwright",
    label: "Playwright",
    icon: "FlaskConical",
    description: "Playwright configuration",
    route: "/settings/playwright",
    color: "#FFD700",
  },
  {
    id: "settings-mobile",
    label: "Mobile",
    icon: "Monitor",
    description: "Mobile device (ADB) settings",
    platforms: ["runner"],
    hidden: true,
    route: "/settings/mobile",
    color: "#FFD700",
  },
  {
    id: "settings-cloud-relay",
    label: "Cloud Relay",
    icon: "Cloud",
    description: "Remote access via cloud relay connection",
    platforms: ["runner"],
    route: "/settings/cloud-relay",
    color: "#FFD700",
  },
  {
    id: "settings-mcp",
    label: "MCP Servers",
    icon: "Wifi",
    description: "Model Context Protocol server configuration",
    route: "/settings/mcp",
    color: "#FFD700",
  },
  {
    id: "settings-log-sources",
    label: "Log Sources",
    icon: "FolderOpen",
    description: "Global log source configuration with AI selection",
    route: "/settings/log-sources",
    color: "#FFD700",
  },
  {
    id: "settings-execution-variables",
    label: "Execution Variables",
    icon: "Code",
    description: "Configure execution variables",
    hidden: true,
    route: "/settings/execution-variables",
    color: "#FFD700",
  },
  {
    id: "settings-general",
    label: "General",
    icon: "Wrench",
    description: "General application settings",
    route: "/settings/general",
    color: "#FFD700",
  },
  {
    id: "settings-storage",
    label: "Storage",
    icon: "HardDrive",
    description: "Data storage settings",
    route: "/settings/storage",
    color: "#FFD700",
  },
  {
    id: "settings-backup",
    label: "Backup",
    icon: "Archive",
    description: "Backup and restore",
    route: "/settings/backup",
    color: "#FFD700",
  },
  {
    id: "settings-updates",
    label: "Updates",
    icon: "Download",
    description: "Check for updates",
    route: "/settings/updates",
    color: "#FFD700",
  },
  {
    id: "settings-debug",
    label: "Debug",
    icon: "FlaskConical",
    description: "Debug and diagnostics",
    route: "/settings/debug",
    color: "#FFD700",
  },
];

export const SYSTEM_ITEMS: NavigationItem[] = [
  {
    id: "runners",
    label: "Runners",
    icon: "Server",
    description: "Connected desktop runners",
    platforms: ["web"],
    route: "/runners",
    color: "#10B981",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    hasChildren: true,
    selectsFirstChild: true,
    description: "Application settings",
    route: "/settings",
    color: "#FFD700",
  },
  {
    id: "help",
    label: "Help",
    icon: "HelpCircle",
    description: "Documentation and support",
    route: "/help",
    color: "#9CA3AF",
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
  runs: [...SESSION_ITEMS, ...RUNS_ITEMS],
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
