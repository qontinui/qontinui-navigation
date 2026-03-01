/**
 * Navigation Types
 *
 * Shared type definitions for navigation structures across Qontinui applications.
 */
/**
 * Icon names that map to lucide-react icons.
 * Each app imports the actual icon component from lucide-react.
 */
type IconName = "Play" | "Activity" | "History" | "Bot" | "Settings" | "HelpCircle" | "ChevronDown" | "ChevronRight" | "ScrollText" | "LayoutDashboard" | "ClipboardCheck" | "Zap" | "Image" | "ClipboardList" | "FileText" | "FileSearch" | "TestTube" | "BarChart3" | "Database" | "Cloud" | "Accessibility" | "AlertCircle" | "BookOpen" | "BookText" | "CheckCircle2" | "Sparkles" | "MousePointer2" | "Layers" | "FlaskConical" | "Camera" | "GitBranch" | "Globe" | "Code" | "Puzzle" | "ShieldCheck" | "Wifi" | "Terminal" | "ListChecks" | "FolderOpen" | "Tag" | "Calendar" | "User" | "HardDrive" | "Wrench" | "Download" | "Archive" | "Monitor" | "Palette" | "Bell" | "Key" | "CreditCard" | "Brain" | "Webhook" | "RotateCcw" | "Cpu" | "MessageSquare" | "Server" | "Workflow";
/**
 * A single navigation item in the sidebar.
 */
interface NavigationItem {
    /** Unique identifier for this item */
    id: string;
    /** Display label */
    label: string;
    /** Icon name (maps to lucide-react icon) */
    icon: IconName;
    /** Optional description shown in tooltips or secondary text */
    description?: string;
    /** Whether this item should be visually indented (for sub-items in flat lists) */
    indent?: boolean;
    /** If set, this item is a child of another item */
    parentId?: string;
    /** If true, this item has children and can be expanded/collapsed */
    hasChildren?: boolean;
    /** If true, clicking this item selects its first child instead of itself */
    selectsFirstChild?: boolean;
    /** Platform availability - if not set, available on all platforms */
    platforms?: Platform[];
    /** Badge count or status to show on this item */
    badge?: NavigationBadge;
    /** Whether this item is disabled */
    disabled?: boolean;
    /** Keyboard shortcut hint (e.g., "Ctrl+N") */
    shortcut?: string;
    /** Hide from navigation in production (visible in dev mode with a badge) */
    hiddenInProd?: boolean;
    /** URL path for web routing (e.g., "/build/workflows") */
    route?: string;
    /** Accent color CSS value (e.g., "#9333EA" or "var(--brand-secondary)") */
    color?: string;
    /** Requires superuser access (web-only concept) */
    adminOnly?: boolean;
}
/**
 * Badge configuration for navigation items.
 */
interface NavigationBadge {
    /** Type of badge */
    type: "count" | "dot" | "text";
    /** Value for count or text badges */
    value?: number | string;
    /** Color variant */
    variant?: "default" | "primary" | "success" | "warning" | "error";
}
/**
 * A group of navigation items (e.g., RUN, OBSERVE, BUILD).
 */
interface NavigationGroup {
    /** Unique identifier for this group */
    id: string;
    /** Display label (usually uppercase) */
    label: string;
    /** Items in this group */
    items: NavigationItem[];
    /** Whether this group should be expanded by default */
    defaultExpanded?: boolean;
    /** Icon for the group header (optional) */
    icon?: IconName;
    /** Platform availability - if not set, available on all platforms */
    platforms?: Platform[];
}
/**
 * Platform identifiers for conditional navigation items.
 */
type Platform = "web" | "runner";
/**
 * State for the secondary sidebar.
 */
interface SecondarySidebarState {
    /** Whether the secondary sidebar is open */
    isOpen: boolean;
    /** The parent item that triggered the secondary sidebar */
    parentId: string | null;
    /** Items to display in the secondary sidebar */
    items: NavigationItem[];
}
/**
 * Complete navigation state.
 */
interface NavigationState {
    /** Currently active item ID */
    activeItemId: string | null;
    /** Expanded group IDs */
    expandedGroups: Set<string>;
    /** Expanded parent item IDs (for items with children) */
    expandedItems: Set<string>;
    /** Secondary sidebar state */
    secondarySidebar: SecondarySidebarState;
    /** Whether the main sidebar is collapsed */
    isCollapsed: boolean;
}
/**
 * Navigation actions for state management.
 */
type NavigationAction = {
    type: "SET_ACTIVE";
    itemId: string;
} | {
    type: "TOGGLE_GROUP";
    groupId: string;
} | {
    type: "TOGGLE_ITEM";
    itemId: string;
} | {
    type: "EXPAND_GROUP";
    groupId: string;
} | {
    type: "COLLAPSE_GROUP";
    groupId: string;
} | {
    type: "OPEN_SECONDARY";
    parentId: string;
    items: NavigationItem[];
} | {
    type: "CLOSE_SECONDARY";
} | {
    type: "TOGGLE_SIDEBAR_COLLAPSE";
} | {
    type: "SET_SIDEBAR_COLLAPSED";
    collapsed: boolean;
};

/**
 * Navigation Groups
 *
 * Shared navigation group definitions for Qontinui applications.
 * These define the structure and hierarchy of the sidebar navigation.
 */

declare const RUN_ITEMS: NavigationItem[];
declare const RUN_GROUP: NavigationGroup;
declare const SESSION_ITEMS: NavigationItem[];
declare const RUNS_ITEMS: NavigationItem[];
declare const OBSERVE_ITEMS: NavigationItem[];
declare const OBSERVE_GROUP: NavigationGroup;
declare const BUILD_ITEMS: NavigationItem[];
declare const BUILD_GROUP: NavigationGroup;
declare const CONFIGURE_ITEMS: NavigationItem[];
declare const CONFIGURE_GROUP: NavigationGroup;
declare const SCHEDULE_ITEMS: NavigationItem[];
declare const SCHEDULE_GROUP: NavigationGroup;
declare const SETTINGS_ITEMS: NavigationItem[];
declare const SYSTEM_ITEMS: NavigationItem[];
declare const SYSTEM_GROUP: NavigationGroup;
/**
 * All navigation groups in order.
 */
declare const NAVIGATION_GROUPS: NavigationGroup[];
/**
 * Map of parent IDs to their children for secondary sidebar.
 */
declare const CHILDREN_MAP: Record<string, NavigationItem[]>;
/**
 * Get children items for a parent item.
 */
declare function getChildrenItems(parentId: string): NavigationItem[];
/**
 * Get all navigation items flattened.
 */
declare function getAllItems(): NavigationItem[];
/**
 * Find an item by ID across all groups and children.
 */
declare function findItemById(id: string): NavigationItem | undefined;
/**
 * Get the parent group for an item.
 */
declare function getItemGroup(itemId: string): NavigationGroup | undefined;

/**
 * Icon Utilities
 *
 * Runtime validation helpers for icon names.
 */

/**
 * All available icon names as an array.
 */
declare const ICON_NAMES: IconName[];
/**
 * Check if a string is a valid icon name.
 */
declare function isValidIconName(name: string): name is IconName;

/**
 * Platform Utilities
 *
 * Functions for filtering navigation based on platform.
 */

/**
 * Set whether the app is running in development mode.
 * Call this at app startup to enable showing dev-only navigation items.
 */
declare function setDevelopmentMode(isDev: boolean): void;
/**
 * Check if running in development mode.
 */
declare function isDevelopmentMode(): boolean;
/**
 * Filter a navigation item based on platform.
 * Returns true if the item should be shown on the given platform.
 */
declare function isItemAvailable(item: NavigationItem, platform: Platform): boolean;
/**
 * Filter navigation items for a specific platform.
 */
declare function filterItemsForPlatform(items: NavigationItem[], platform: Platform): NavigationItem[];
/**
 * Filter a navigation group for a specific platform.
 */
declare function filterGroupForPlatform(group: NavigationGroup, platform: Platform): NavigationGroup;
/**
 * Filter all navigation groups for a specific platform.
 */
declare function filterGroupsForPlatform(groups: NavigationGroup[], platform: Platform): NavigationGroup[];
/**
 * Get navigation groups filtered for a specific platform.
 */
declare function getNavigationGroups(platform: Platform): NavigationGroup[];
/**
 * Get children items for a parent, filtered by platform.
 */
declare function getChildrenForPlatform(parentId: string, platform: Platform): NavigationItem[];
/**
 * Pre-built navigation config for the runner application.
 */
declare function getRunnerNavigation(): NavigationGroup[];
/**
 * Pre-built navigation config for the web application.
 */
declare function getWebNavigation(): NavigationGroup[];

/**
 * Navigation State Management
 *
 * Reducer and utilities for managing navigation state.
 */

/**
 * Create the initial navigation state.
 */
declare function createInitialState(options?: Partial<{
    activeItemId: string | null;
    expandedGroups: string[];
    expandedItems: string[];
    isCollapsed: boolean;
}>): NavigationState;
/**
 * Navigation state reducer.
 */
declare function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState;
/**
 * Action creators for navigation state.
 */
declare const navigationActions: {
    setActive: (itemId: string) => NavigationAction;
    toggleGroup: (groupId: string) => NavigationAction;
    toggleItem: (itemId: string) => NavigationAction;
    expandGroup: (groupId: string) => NavigationAction;
    collapseGroup: (groupId: string) => NavigationAction;
    openSecondary: (parentId: string, items: NavigationItem[]) => NavigationAction;
    closeSecondary: () => NavigationAction;
    toggleSidebarCollapse: () => NavigationAction;
    setSidebarCollapsed: (collapsed: boolean) => NavigationAction;
};
/**
 * Check if a group is expanded.
 */
declare function isGroupExpanded(state: NavigationState, groupId: string): boolean;
/**
 * Check if an item is expanded (for items with children).
 *
 * Currently unused by consumers. Available for future use.
 */
declare function isItemExpanded(state: NavigationState, itemId: string): boolean;
/**
 * Check if an item is active.
 *
 * Currently unused by consumers. Available for future use.
 */
declare function isItemActive(state: NavigationState, itemId: string): boolean;
/**
 * Check if the secondary sidebar is open for a specific parent.
 *
 * Currently unused by consumers. The runner manages flyout state
 * independently via local React state rather than through the
 * shared navigation reducer.
 */
declare function isSecondaryOpenFor(state: NavigationState, parentId: string): boolean;
/**
 * Serialize navigation state for localStorage.
 */
declare function serializeState(state: NavigationState): string;
/**
 * Deserialize navigation state from localStorage.
 */
declare function deserializeState(json: string): Partial<NavigationState> | null;
/**
 * Storage keys for navigation persistence.
 */
declare const STORAGE_KEYS: {
    readonly state: "qontinui-navigation-state";
    readonly collapsed: "qontinui-sidebar-collapsed";
    readonly expandedGroups: "qontinui-sidebar-groups";
    readonly activeTab: "qontinui-active-tab";
};

export { BUILD_GROUP, BUILD_ITEMS, CHILDREN_MAP, CONFIGURE_GROUP, CONFIGURE_ITEMS, ICON_NAMES, type IconName, NAVIGATION_GROUPS, type NavigationAction, type NavigationBadge, type NavigationGroup, type NavigationItem, type NavigationState, OBSERVE_GROUP, OBSERVE_ITEMS, type Platform, RUNS_ITEMS, RUN_GROUP, RUN_ITEMS, SCHEDULE_GROUP, SCHEDULE_ITEMS, SESSION_ITEMS, SETTINGS_ITEMS, STORAGE_KEYS, SYSTEM_GROUP, SYSTEM_ITEMS, type SecondarySidebarState, createInitialState, deserializeState, filterGroupForPlatform, filterGroupsForPlatform, filterItemsForPlatform, findItemById, getAllItems, getChildrenForPlatform, getChildrenItems, getItemGroup, getNavigationGroups, getRunnerNavigation, getWebNavigation, isDevelopmentMode, isGroupExpanded, isItemActive, isItemAvailable, isItemExpanded, isSecondaryOpenFor, isValidIconName, navigationActions, navigationReducer, serializeState, setDevelopmentMode };
