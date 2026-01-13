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
  PlatformConfig,
  // Configuration types
  NavigationConfig,
  NavigationExtensions,
  // Secondary sidebar types
  SecondarySidebarConfig,
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
  OBSERVE_ITEMS,
  LIBRARY_ITEMS,
  BUILDER_ITEMS,
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

export {
  Icons,
  ICON_NAMES,
  ICON_CATEGORIES,
  isValidIconName,
} from "./icons";

export type { IconKey } from "./icons";

// ============================================================================
// Platform Utilities
// ============================================================================

export {
  // Platform filtering
  isItemAvailable,
  filterItemsForPlatform,
  filterGroupForPlatform,
  filterGroupsForPlatform,
  // Extensions
  applyItemExtensions,
  applyGroupExtensions,
  applyExtensions,
  // Configuration builders
  buildNavigationConfig,
  getNavigationGroups,
  getChildrenForPlatform,
  // Platform detection
  detectPlatform,
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
