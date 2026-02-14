/**
 * Navigation State Management
 *
 * Reducer and utilities for managing navigation state.
 */

import type {
  NavigationState,
  NavigationAction,
  NavigationItem,
  AppMode,
} from "./types";

// ============================================================================
// Initial State
// ============================================================================

/**
 * Create the initial navigation state.
 */
export function createInitialState(
  options?: Partial<{
    activeItemId: string | null;
    expandedGroups: string[];
    expandedItems: string[];
    isCollapsed: boolean;
    appMode: AppMode;
  }>,
): NavigationState {
  return {
    activeItemId: options?.activeItemId ?? null,
    expandedGroups: new Set(options?.expandedGroups ?? ["run", "system"]),
    expandedItems: new Set(options?.expandedItems ?? []),
    secondarySidebar: {
      isOpen: false,
      parentId: null,
      items: [],
    },
    isCollapsed: options?.isCollapsed ?? false,
    appMode: options?.appMode ?? "advanced",
  };
}

// ============================================================================
// Reducer
// ============================================================================

/**
 * Navigation state reducer.
 */
export function navigationReducer(
  state: NavigationState,
  action: NavigationAction,
): NavigationState {
  switch (action.type) {
    case "SET_ACTIVE":
      return {
        ...state,
        activeItemId: action.itemId,
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
        expandedGroups: newExpandedGroups,
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
        expandedItems: newExpandedItems,
      };
    }

    case "EXPAND_GROUP": {
      const newExpandedGroups = new Set(state.expandedGroups);
      newExpandedGroups.add(action.groupId);
      return {
        ...state,
        expandedGroups: newExpandedGroups,
      };
    }

    case "COLLAPSE_GROUP": {
      const newExpandedGroups = new Set(state.expandedGroups);
      newExpandedGroups.delete(action.groupId);
      return {
        ...state,
        expandedGroups: newExpandedGroups,
      };
    }

    case "OPEN_SECONDARY":
      return {
        ...state,
        secondarySidebar: {
          isOpen: true,
          parentId: action.parentId,
          items: action.items,
        },
      };

    case "CLOSE_SECONDARY":
      return {
        ...state,
        secondarySidebar: {
          isOpen: false,
          parentId: null,
          items: [],
        },
      };

    case "TOGGLE_SIDEBAR_COLLAPSE":
      return {
        ...state,
        isCollapsed: !state.isCollapsed,
      };

    case "SET_SIDEBAR_COLLAPSED":
      return {
        ...state,
        isCollapsed: action.collapsed,
      };

    case "SET_APP_MODE":
      return {
        ...state,
        appMode: action.mode,
      };

    default:
      return state;
  }
}

// ============================================================================
// Action Creators
// ============================================================================

/**
 * Action creators for navigation state.
 */
export const navigationActions = {
  setActive: (itemId: string): NavigationAction => ({
    type: "SET_ACTIVE",
    itemId,
  }),

  toggleGroup: (groupId: string): NavigationAction => ({
    type: "TOGGLE_GROUP",
    groupId,
  }),

  toggleItem: (itemId: string): NavigationAction => ({
    type: "TOGGLE_ITEM",
    itemId,
  }),

  expandGroup: (groupId: string): NavigationAction => ({
    type: "EXPAND_GROUP",
    groupId,
  }),

  collapseGroup: (groupId: string): NavigationAction => ({
    type: "COLLAPSE_GROUP",
    groupId,
  }),

  openSecondary: (
    parentId: string,
    items: NavigationItem[],
  ): NavigationAction => ({
    type: "OPEN_SECONDARY",
    parentId,
    items,
  }),

  closeSecondary: (): NavigationAction => ({
    type: "CLOSE_SECONDARY",
  }),

  toggleSidebarCollapse: (): NavigationAction => ({
    type: "TOGGLE_SIDEBAR_COLLAPSE",
  }),

  setSidebarCollapsed: (collapsed: boolean): NavigationAction => ({
    type: "SET_SIDEBAR_COLLAPSED",
    collapsed,
  }),

  setAppMode: (mode: AppMode): NavigationAction => ({
    type: "SET_APP_MODE",
    mode,
  }),
};

// ============================================================================
// Selectors
// ============================================================================

/**
 * Check if a group is expanded.
 */
export function isGroupExpanded(
  state: NavigationState,
  groupId: string,
): boolean {
  return state.expandedGroups.has(groupId);
}

/**
 * Check if an item is expanded (for items with children).
 */
export function isItemExpanded(
  state: NavigationState,
  itemId: string,
): boolean {
  return state.expandedItems.has(itemId);
}

/**
 * Check if an item is active.
 */
export function isItemActive(state: NavigationState, itemId: string): boolean {
  return state.activeItemId === itemId;
}

/**
 * Check if the secondary sidebar is open for a specific parent.
 */
export function isSecondaryOpenFor(
  state: NavigationState,
  parentId: string,
): boolean {
  return (
    state.secondarySidebar.isOpen &&
    state.secondarySidebar.parentId === parentId
  );
}

// ============================================================================
// Persistence
// ============================================================================

/**
 * Serialize navigation state for localStorage.
 */
export function serializeState(state: NavigationState): string {
  return JSON.stringify({
    activeItemId: state.activeItemId,
    expandedGroups: Array.from(state.expandedGroups),
    expandedItems: Array.from(state.expandedItems),
    isCollapsed: state.isCollapsed,
    appMode: state.appMode,
  });
}

/**
 * Deserialize navigation state from localStorage.
 */
export function deserializeState(
  json: string,
): Partial<NavigationState> | null {
  try {
    const data = JSON.parse(json);
    // Migrate old mode values
    let appMode: AppMode = data.appMode ?? "advanced";
    if (appMode === ("automation" as string)) appMode = "simple";
    if (appMode === ("developer" as string)) appMode = "advanced";
    return {
      activeItemId: data.activeItemId ?? null,
      expandedGroups: new Set(data.expandedGroups ?? []),
      expandedItems: new Set(data.expandedItems ?? []),
      isCollapsed: data.isCollapsed ?? false,
      appMode,
    };
  } catch {
    return null;
  }
}

/**
 * Storage keys for navigation persistence.
 */
export const STORAGE_KEYS = {
  state: "qontinui-navigation-state",
  collapsed: "qontinui-sidebar-collapsed",
  expandedGroups: "qontinui-sidebar-groups",
  activeTab: "qontinui-active-tab",
  appMode: "qontinui-app-mode",
} as const;
