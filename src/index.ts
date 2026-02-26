/**
 * Qontinui Navigation
 *
 * Shared navigation structure for Qontinui applications.
 * Provides type-safe navigation definitions, platform filtering,
 * and state management utilities.
 *
 * @packageDocumentation
 */

// ============================================================================
// Type Exports
// ============================================================================

export type {
  // Icon types
  IconName,
  // Navigation item types
  NavigationItem,
  NavigationBadge,
  // Navigation group types
  NavigationGroup,
  // Platform types
  Platform,
  // Secondary sidebar types
  SecondarySidebarState,
  // State types
  NavigationState,
  NavigationAction,
} from "./types";

// ============================================================================
// Navigation Groups
// ============================================================================

export {
  // Individual group items
  RUN_ITEMS,
  SESSION_ITEMS,
  RUNS_ITEMS,
  OBSERVE_ITEMS,
  BUILD_ITEMS,
  CONFIGURE_ITEMS,
  SCHEDULE_ITEMS,
  SETTINGS_ITEMS,
  SYSTEM_ITEMS,
  // Groups
  RUN_GROUP,
  OBSERVE_GROUP,
  BUILD_GROUP,
  CONFIGURE_GROUP,
  SCHEDULE_GROUP,
  SYSTEM_GROUP,
  // Complete structure
  NAVIGATION_GROUPS,
  CHILDREN_MAP,
  // Helper functions
  getChildrenItems,
  getAllItems,
  findItemById,
  getItemGroup,
} from "./groups";

// ============================================================================
// Icon Utilities
// ============================================================================

export { ICON_NAMES, isValidIconName } from "./icons";

// ============================================================================
// Platform Utilities
// ============================================================================

export {
  // Development mode
  setDevelopmentMode,
  isDevelopmentMode,
  // Platform filtering
  isItemAvailable,
  filterItemsForPlatform,
  filterGroupForPlatform,
  filterGroupsForPlatform,
  // Navigation builders
  getNavigationGroups,
  getChildrenForPlatform,
  // Presets
  getRunnerNavigation,
  getWebNavigation,
} from "./platform";

// ============================================================================
// State Management
// ============================================================================

export {
  // Initial state
  createInitialState,
  // Reducer
  navigationReducer,
  // Action creators
  navigationActions,
  // Selectors
  isGroupExpanded,
  isItemExpanded,
  isItemActive,
  isSecondaryOpenFor,
  // Persistence
  serializeState,
  deserializeState,
  STORAGE_KEYS,
} from "./state";
