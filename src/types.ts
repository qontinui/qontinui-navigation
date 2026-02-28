/**
 * Navigation Types
 *
 * Shared type definitions for navigation structures across Qontinui applications.
 */

// ============================================================================
// Icon Types
// ============================================================================

/**
 * Icon names that map to lucide-react icons.
 * Each app imports the actual icon component from lucide-react.
 */
export type IconName =
  // Common
  | "Play"
  | "Activity"
  | "History"
  | "Bot"
  | "Settings"
  | "HelpCircle"
  | "ChevronDown"
  | "ChevronRight"
  // Observe/Session
  | "ScrollText"
  | "LayoutDashboard"
  | "ClipboardCheck"
  | "Zap"
  | "Image"
  | "ClipboardList"
  | "FileText"
  | "FileSearch"
  | "TestTube"
  | "BarChart3"
  | "Database"
  | "Cloud"
  | "Accessibility"
  | "AlertCircle"
  // Build
  | "BookOpen"
  | "BookText"
  | "CheckCircle2"
  | "Sparkles"
  | "MousePointer2"
  | "Layers"
  | "FlaskConical"
  | "Camera"
  | "GitBranch"
  | "Globe"
  | "Code"
  | "Puzzle"
  | "ShieldCheck"
  | "Wifi"
  | "Terminal"
  | "ListChecks"
  // Configure
  | "FolderOpen"
  | "Tag"
  // Schedule
  | "Calendar"
  // System/Settings
  | "User"
  | "HardDrive"
  | "Wrench"
  | "Download"
  | "Archive"
  | "Monitor"
  | "Palette"
  | "Bell"
  | "Key"
  | "CreditCard"
  | "Brain"
  | "Webhook"
  | "RotateCcw"
  | "Cpu"
  // Web / shared
  | "MessageSquare"
  | "Server"
  | "Workflow";

// ============================================================================
// Navigation Item Types
// ============================================================================

/**
 * A single navigation item in the sidebar.
 */
export interface NavigationItem {
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
export interface NavigationBadge {
  /** Type of badge */
  type: "count" | "dot" | "text";
  /** Value for count or text badges */
  value?: number | string;
  /** Color variant */
  variant?: "default" | "primary" | "success" | "warning" | "error";
}

// ============================================================================
// Navigation Group Types
// ============================================================================

/**
 * A group of navigation items (e.g., RUN, OBSERVE, BUILD).
 */
export interface NavigationGroup {
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

// ============================================================================
// Platform Types
// ============================================================================

/**
 * Platform identifiers for conditional navigation items.
 */
export type Platform = "web" | "runner";

// ============================================================================
// Secondary Sidebar Types
// ============================================================================

/**
 * State for the secondary sidebar.
 */
export interface SecondarySidebarState {
  /** Whether the secondary sidebar is open */
  isOpen: boolean;
  /** The parent item that triggered the secondary sidebar */
  parentId: string | null;
  /** Items to display in the secondary sidebar */
  items: NavigationItem[];
}

// ============================================================================
// Navigation State Types
// ============================================================================

/**
 * Complete navigation state.
 */
export interface NavigationState {
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
export type NavigationAction =
  | { type: "SET_ACTIVE"; itemId: string }
  | { type: "TOGGLE_GROUP"; groupId: string }
  | { type: "TOGGLE_ITEM"; itemId: string }
  | { type: "EXPAND_GROUP"; groupId: string }
  | { type: "COLLAPSE_GROUP"; groupId: string }
  | { type: "OPEN_SECONDARY"; parentId: string; items: NavigationItem[] }
  | { type: "CLOSE_SECONDARY" }
  | { type: "TOGGLE_SIDEBAR_COLLAPSE" }
  | { type: "SET_SIDEBAR_COLLAPSED"; collapsed: boolean };
