// src/groups.ts
var RUN_ITEMS = [
  {
    id: "workflow-queue",
    label: "Execute",
    icon: "Play",
    description: "Run and schedule workflows",
    route: "/execute",
    color: "#10B981"
  },
  {
    id: "run-plan",
    label: "Chat",
    icon: "MessageSquare",
    description: "Plan features with AI, generate workflows",
    route: "/chat",
    color: "#9333EA"
  },
  {
    id: "gui-automation",
    label: "GUI Automation",
    icon: "Play",
    description: "Run GUI automation workflows",
    hiddenInProd: true
  },
  {
    id: "active",
    label: "Active",
    icon: "Activity",
    description: "Monitor active executions",
    route: "/runs/active",
    color: "#4A90D9"
  }
];
var RUN_GROUP = {
  id: "run",
  label: "RUN",
  items: RUN_ITEMS,
  defaultExpanded: true
};
var SESSION_ITEMS = [
  {
    id: "run-recap",
    label: "Summary",
    icon: "ClipboardCheck",
    description: "Overview, AI summary, and run details",
    route: "/runs/summary",
    color: "#4A90D9"
  },
  {
    id: "run-actions",
    label: "Actions",
    icon: "Zap",
    description: "Action execution log",
    route: "/runs/actions",
    color: "#4A90D9",
    hiddenInProd: true
  },
  {
    id: "run-image",
    label: "Image Recognition",
    icon: "Image",
    description: "Visual recognition results",
    route: "/runs/image-recognition",
    color: "#4A90D9",
    hiddenInProd: true
  },
  {
    id: "run-findings",
    label: "Findings",
    icon: "FileText",
    description: "Detected findings and issues",
    route: "/runs/findings",
    color: "#4A90D9"
  },
  {
    id: "run-state-explorer",
    label: "State Explorer",
    icon: "FileSearch",
    description: "State exploration results",
    route: "/runs/state-exploration",
    color: "#4A90D9",
    hiddenInProd: true
  },
  {
    id: "run-tests",
    label: "Test Results",
    icon: "TestTube",
    description: "Playwright test results",
    route: "/runs/test-results",
    color: "#4A90D9"
  },
  {
    id: "run-ai-output",
    label: "AI Output",
    icon: "Bot",
    description: "AI conversation and responses",
    route: "/runs/ai-output",
    color: "#4A90D9"
  },
  {
    id: "run-statistics",
    label: "Statistics",
    icon: "BarChart3",
    description: "Performance metrics",
    route: "/runs/statistics",
    color: "#4A90D9"
  },
  {
    id: "run-ai-data",
    label: "AI Data View",
    icon: "Database",
    description: "Structured AI data",
    route: "/runs/ai-data",
    color: "#4A90D9"
  },
  {
    id: "capture",
    label: "Capture",
    icon: "Camera",
    description: "Screenshot capture tool",
    platforms: ["runner"],
    hiddenInProd: true
  }
];
var RUNS_ITEMS = [
  {
    id: "runs-history",
    label: "History",
    icon: "History",
    description: "Run history browser",
    route: "/runs",
    color: "#4A90D9",
    platforms: ["web"]
  }
];
var OBSERVE_ITEMS = [
  {
    id: "runs",
    label: "Runs",
    icon: "History",
    description: "Browse and manage all runs",
    hasChildren: true,
    selectsFirstChild: false,
    route: "/runs",
    color: "#4A90D9"
  },
  {
    id: "error-monitor",
    label: "Error Monitor",
    icon: "AlertCircle",
    description: "Monitor and fix application errors from log sources",
    route: "/tools/error-monitor",
    color: "#4A90D9"
  },
  {
    id: "processes",
    label: "Processes",
    icon: "Cpu",
    description: "Manage and monitor spawned child processes",
    platforms: ["runner"],
    color: "#06B6D4"
  },
  {
    id: "reflection",
    label: "Reflection",
    icon: "RotateCcw",
    description: "Reflection fix effectiveness and history",
    platforms: ["runner"]
  },
  {
    id: "generator-eval",
    label: "Generator Eval",
    icon: "FlaskConical",
    description: "Evaluate and improve workflow generation accuracy",
    platforms: ["runner"],
    hiddenInProd: true,
    color: "#8B5CF6"
  }
];
var OBSERVE_GROUP = {
  id: "observe",
  label: "OBSERVE",
  items: OBSERVE_ITEMS,
  defaultExpanded: false
};
var BUILD_ITEMS = [
  {
    id: "unified-workflow-builder",
    label: "Workflows",
    icon: "Sparkles",
    description: "Build phase-based automation workflows",
    route: "/build/workflows",
    color: "var(--brand-secondary)"
  },
  {
    id: "step-builders",
    label: "Step Builders",
    icon: "Layers",
    description: "Build and browse step templates",
    route: "/build/templates",
    color: "var(--brand-secondary)"
  },
  {
    id: "library",
    label: "Library",
    icon: "BookOpen",
    description: "Browse saved automation assets",
    route: "/library",
    color: "var(--brand-secondary)"
  }
];
var BUILD_GROUP = {
  id: "build",
  label: "BUILD",
  items: BUILD_ITEMS,
  defaultExpanded: false
};
var CONFIGURE_ITEMS = [
  {
    id: "config-findings",
    label: "Findings",
    icon: "Tag",
    description: "Configure finding patterns",
    route: "/settings/finding-rules",
    color: "#FFD700"
  },
  {
    id: "config-hooks",
    label: "Lifecycle Hooks",
    icon: "Webhook",
    description: "Configure execution event triggers",
    platforms: ["runner"],
    hiddenInProd: true
  }
];
var CONFIGURE_GROUP = {
  id: "configure",
  label: "CONFIGURE",
  items: CONFIGURE_ITEMS,
  defaultExpanded: false
};
var SCHEDULE_ITEMS = [
  {
    id: "tasks",
    label: "Scheduled Tasks",
    icon: "Calendar",
    description: "Manage scheduled automation",
    hiddenInProd: true
  }
];
var SCHEDULE_GROUP = {
  id: "schedule",
  label: "SCHEDULE",
  items: SCHEDULE_ITEMS,
  defaultExpanded: false
};
var SETTINGS_ITEMS = [
  {
    id: "settings-account",
    label: "Account",
    icon: "User",
    description: "User account settings",
    route: "/settings/account",
    color: "#FFD700"
  },
  {
    id: "settings-ai",
    label: "AI Providers",
    icon: "Bot",
    description: "Configure AI providers and models",
    route: "/settings/ai",
    color: "#FFD700"
  },
  {
    id: "settings-agentic",
    label: "Advanced AI",
    icon: "Brain",
    description: "Memory compression, retry, and task routing",
    route: "/settings/agentic",
    color: "#FFD700"
  },
  {
    id: "settings-self-healing",
    label: "Self-Healing",
    icon: "ShieldCheck",
    description: "Self-healing automation settings",
    route: "/settings/self-healing",
    color: "#FFD700"
  },
  {
    id: "settings-playwright",
    label: "Playwright",
    icon: "FlaskConical",
    description: "Playwright configuration",
    route: "/settings/playwright",
    color: "#FFD700"
  },
  {
    id: "settings-mobile",
    label: "Mobile",
    icon: "Monitor",
    description: "Mobile device (ADB) settings",
    platforms: ["runner"],
    hiddenInProd: true,
    route: "/settings/mobile",
    color: "#FFD700"
  },
  {
    id: "settings-cloud-relay",
    label: "Cloud Relay",
    icon: "Cloud",
    description: "Remote access via cloud relay connection",
    platforms: ["runner"],
    route: "/settings/cloud-relay",
    color: "#FFD700"
  },
  {
    id: "settings-mcp",
    label: "MCP Servers",
    icon: "Wifi",
    description: "Model Context Protocol server configuration",
    route: "/settings/mcp",
    color: "#FFD700"
  },
  {
    id: "settings-log-sources",
    label: "Log Sources",
    icon: "FolderOpen",
    description: "Global log source configuration with AI selection",
    route: "/settings/log-sources",
    color: "#FFD700"
  },
  {
    id: "settings-execution-variables",
    label: "Execution Variables",
    icon: "Code",
    description: "Configure execution variables",
    hiddenInProd: true,
    route: "/settings/execution-variables",
    color: "#FFD700"
  },
  {
    id: "settings-general",
    label: "General",
    icon: "Wrench",
    description: "General application settings",
    route: "/settings/general",
    color: "#FFD700"
  },
  {
    id: "settings-storage",
    label: "Storage",
    icon: "HardDrive",
    description: "Data storage settings",
    route: "/settings/storage",
    color: "#FFD700"
  },
  {
    id: "settings-backup",
    label: "Backup",
    icon: "Archive",
    description: "Backup and restore",
    route: "/settings/backup",
    color: "#FFD700"
  },
  {
    id: "settings-updates",
    label: "Updates",
    icon: "Download",
    description: "Check for updates",
    route: "/settings/updates",
    color: "#FFD700"
  },
  {
    id: "settings-debug",
    label: "Debug",
    icon: "FlaskConical",
    description: "Debug and diagnostics",
    route: "/settings/debug",
    color: "#FFD700"
  }
];
var SYSTEM_ITEMS = [
  {
    id: "runners",
    label: "Runners",
    icon: "Server",
    description: "Connected desktop runners",
    platforms: ["web"],
    route: "/runners",
    color: "#10B981"
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    hasChildren: true,
    selectsFirstChild: true,
    description: "Application settings",
    route: "/settings",
    color: "#FFD700"
  },
  {
    id: "help",
    label: "Help",
    icon: "HelpCircle",
    description: "Documentation and support",
    route: "/help",
    color: "#9CA3AF"
  }
];
var SYSTEM_GROUP = {
  id: "system",
  label: "SYSTEM",
  items: SYSTEM_ITEMS,
  defaultExpanded: true
};
var NAVIGATION_GROUPS = [
  RUN_GROUP,
  OBSERVE_GROUP,
  BUILD_GROUP,
  CONFIGURE_GROUP,
  SCHEDULE_GROUP,
  SYSTEM_GROUP
];
var CHILDREN_MAP = {
  runs: [...SESSION_ITEMS, ...RUNS_ITEMS],
  settings: SETTINGS_ITEMS
};
function getChildrenItems(parentId) {
  return CHILDREN_MAP[parentId] || [];
}
function getAllItems() {
  const items = [];
  for (const group of NAVIGATION_GROUPS) {
    items.push(...group.items);
  }
  for (const children of Object.values(CHILDREN_MAP)) {
    items.push(...children);
  }
  return items;
}
function findItemById(id) {
  return getAllItems().find((item) => item.id === id);
}
function getItemGroup(itemId) {
  for (const group of NAVIGATION_GROUPS) {
    if (group.items.some((item) => item.id === itemId)) {
      return group;
    }
  }
  for (const [parentId, children] of Object.entries(CHILDREN_MAP)) {
    if (children.some((item) => item.id === itemId)) {
      for (const group of NAVIGATION_GROUPS) {
        if (group.items.some((item) => item.id === parentId)) {
          return group;
        }
      }
    }
  }
  return void 0;
}

// src/icons.ts
var ICON_NAMES = [
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
  "Workflow"
];
function isValidIconName(name) {
  return ICON_NAMES.includes(name);
}

// src/platform.ts
var _isDevelopmentMode = false;
function setDevelopmentMode(isDev) {
  _isDevelopmentMode = isDev;
}
function isDevelopmentMode() {
  return _isDevelopmentMode;
}
function isItemAvailable(item, platform) {
  if (item.hiddenInProd && !isDevelopmentMode()) {
    return false;
  }
  if (!item.platforms || item.platforms.length === 0) {
    return true;
  }
  return item.platforms.includes(platform);
}
function filterItemsForPlatform(items, platform) {
  return items.filter((item) => isItemAvailable(item, platform));
}
function filterGroupForPlatform(group, platform) {
  if (group.platforms && !group.platforms.includes(platform)) {
    return { ...group, items: [] };
  }
  return {
    ...group,
    items: filterItemsForPlatform(group.items, platform)
  };
}
function filterGroupsForPlatform(groups, platform) {
  return groups.map((group) => filterGroupForPlatform(group, platform)).filter((group) => group.items.length > 0);
}
function getNavigationGroups(platform) {
  return filterGroupsForPlatform(NAVIGATION_GROUPS, platform);
}
function getChildrenForPlatform(parentId, platform) {
  const children = CHILDREN_MAP[parentId] || [];
  return filterItemsForPlatform(children, platform);
}
function getRunnerNavigation() {
  return getNavigationGroups("runner");
}
function getWebNavigation() {
  return getNavigationGroups("web");
}

// src/state.ts
function createInitialState(options) {
  return {
    activeItemId: options?.activeItemId ?? null,
    expandedGroups: new Set(options?.expandedGroups ?? ["run", "system"]),
    expandedItems: new Set(options?.expandedItems ?? []),
    secondarySidebar: {
      isOpen: false,
      parentId: null,
      items: []
    },
    isCollapsed: options?.isCollapsed ?? false
  };
}
function navigationReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE":
      return {
        ...state,
        activeItemId: action.itemId
      };
    case "TOGGLE_GROUP": {
      const newExpandedGroups = new Set(state.expandedGroups);
      if (newExpandedGroups.has(action.groupId)) {
        newExpandedGroups.delete(action.groupId);
      } else {
        newExpandedGroups.add(action.groupId);
      }
      return {
        ...state,
        expandedGroups: newExpandedGroups
      };
    }
    case "TOGGLE_ITEM": {
      const newExpandedItems = new Set(state.expandedItems);
      if (newExpandedItems.has(action.itemId)) {
        newExpandedItems.delete(action.itemId);
      } else {
        newExpandedItems.add(action.itemId);
      }
      return {
        ...state,
        expandedItems: newExpandedItems
      };
    }
    case "EXPAND_GROUP": {
      const newExpandedGroups = new Set(state.expandedGroups);
      newExpandedGroups.add(action.groupId);
      return {
        ...state,
        expandedGroups: newExpandedGroups
      };
    }
    case "COLLAPSE_GROUP": {
      const newExpandedGroups = new Set(state.expandedGroups);
      newExpandedGroups.delete(action.groupId);
      return {
        ...state,
        expandedGroups: newExpandedGroups
      };
    }
    case "OPEN_SECONDARY":
      return {
        ...state,
        secondarySidebar: {
          isOpen: true,
          parentId: action.parentId,
          items: action.items
        }
      };
    case "CLOSE_SECONDARY":
      return {
        ...state,
        secondarySidebar: {
          isOpen: false,
          parentId: null,
          items: []
        }
      };
    case "TOGGLE_SIDEBAR_COLLAPSE":
      return {
        ...state,
        isCollapsed: !state.isCollapsed
      };
    case "SET_SIDEBAR_COLLAPSED":
      return {
        ...state,
        isCollapsed: action.collapsed
      };
    default:
      return state;
  }
}
var navigationActions = {
  setActive: (itemId) => ({
    type: "SET_ACTIVE",
    itemId
  }),
  toggleGroup: (groupId) => ({
    type: "TOGGLE_GROUP",
    groupId
  }),
  toggleItem: (itemId) => ({
    type: "TOGGLE_ITEM",
    itemId
  }),
  expandGroup: (groupId) => ({
    type: "EXPAND_GROUP",
    groupId
  }),
  collapseGroup: (groupId) => ({
    type: "COLLAPSE_GROUP",
    groupId
  }),
  openSecondary: (parentId, items) => ({
    type: "OPEN_SECONDARY",
    parentId,
    items
  }),
  closeSecondary: () => ({
    type: "CLOSE_SECONDARY"
  }),
  toggleSidebarCollapse: () => ({
    type: "TOGGLE_SIDEBAR_COLLAPSE"
  }),
  setSidebarCollapsed: (collapsed) => ({
    type: "SET_SIDEBAR_COLLAPSED",
    collapsed
  })
};
function isGroupExpanded(state, groupId) {
  return state.expandedGroups.has(groupId);
}
function isItemExpanded(state, itemId) {
  return state.expandedItems.has(itemId);
}
function isItemActive(state, itemId) {
  return state.activeItemId === itemId;
}
function isSecondaryOpenFor(state, parentId) {
  return state.secondarySidebar.isOpen && state.secondarySidebar.parentId === parentId;
}
function serializeState(state) {
  return JSON.stringify({
    activeItemId: state.activeItemId,
    expandedGroups: Array.from(state.expandedGroups),
    expandedItems: Array.from(state.expandedItems),
    isCollapsed: state.isCollapsed
  });
}
function deserializeState(json) {
  try {
    const data = JSON.parse(json);
    return {
      activeItemId: data.activeItemId ?? null,
      expandedGroups: new Set(data.expandedGroups ?? []),
      expandedItems: new Set(data.expandedItems ?? []),
      isCollapsed: data.isCollapsed ?? false
    };
  } catch {
    return null;
  }
}
var STORAGE_KEYS = {
  state: "qontinui-navigation-state",
  collapsed: "qontinui-sidebar-collapsed",
  expandedGroups: "qontinui-sidebar-groups",
  activeTab: "qontinui-active-tab"
};
export {
  BUILD_GROUP,
  BUILD_ITEMS,
  CHILDREN_MAP,
  CONFIGURE_GROUP,
  CONFIGURE_ITEMS,
  ICON_NAMES,
  NAVIGATION_GROUPS,
  OBSERVE_GROUP,
  OBSERVE_ITEMS,
  RUNS_ITEMS,
  RUN_GROUP,
  RUN_ITEMS,
  SCHEDULE_GROUP,
  SCHEDULE_ITEMS,
  SESSION_ITEMS,
  SETTINGS_ITEMS,
  STORAGE_KEYS,
  SYSTEM_GROUP,
  SYSTEM_ITEMS,
  createInitialState,
  deserializeState,
  filterGroupForPlatform,
  filterGroupsForPlatform,
  filterItemsForPlatform,
  findItemById,
  getAllItems,
  getChildrenForPlatform,
  getChildrenItems,
  getItemGroup,
  getNavigationGroups,
  getRunnerNavigation,
  getWebNavigation,
  isDevelopmentMode,
  isGroupExpanded,
  isItemActive,
  isItemAvailable,
  isItemExpanded,
  isSecondaryOpenFor,
  isValidIconName,
  navigationActions,
  navigationReducer,
  serializeState,
  setDevelopmentMode
};
