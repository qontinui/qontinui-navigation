/**
 * Platform Utilities
 *
 * Functions for filtering navigation based on platform.
 */

import type { NavigationGroup, NavigationItem, Platform } from "./types";
import { NAVIGATION_GROUPS, CHILDREN_MAP } from "./groups";

// ============================================================================
// Development Mode
// ============================================================================

let _isDevelopmentMode = false;

/**
 * Set whether the app is running in development mode.
 * Call this at app startup to enable showing hidden navigation items.
 */
export function setDevelopmentMode(isDev: boolean): void {
  _isDevelopmentMode = isDev;
}

/**
 * Check if running in development mode.
 */
export function isDevelopmentMode(): boolean {
  return _isDevelopmentMode;
}

// ============================================================================
// Platform Filtering
// ============================================================================

/**
 * Filter a navigation item based on platform.
 * Returns true if the item should be shown on the given platform.
 */
export function isItemAvailable(
  item: NavigationItem,
  platform: Platform,
): boolean {
  // Exclude hidden items in production (show in development)
  if (item.hidden && !isDevelopmentMode()) {
    return false;
  }
  // If no platform restriction, show everywhere
  if (!item.platforms || item.platforms.length === 0) {
    return true;
  }
  return item.platforms.includes(platform);
}

/**
 * Filter navigation items for a specific platform.
 */
export function filterItemsForPlatform(
  items: NavigationItem[],
  platform: Platform,
): NavigationItem[] {
  return items.filter((item) => isItemAvailable(item, platform));
}

/**
 * Filter a navigation group for a specific platform.
 */
export function filterGroupForPlatform(
  group: NavigationGroup,
  platform: Platform,
): NavigationGroup {
  // Check if the group itself is platform-specific
  if (group.platforms && !group.platforms.includes(platform)) {
    return { ...group, items: [] };
  }

  return {
    ...group,
    items: filterItemsForPlatform(group.items, platform),
  };
}

/**
 * Filter all navigation groups for a specific platform.
 */
export function filterGroupsForPlatform(
  groups: NavigationGroup[],
  platform: Platform,
): NavigationGroup[] {
  return groups
    .map((group) => filterGroupForPlatform(group, platform))
    .filter((group) => group.items.length > 0);
}

/**
 * Get navigation groups filtered for a specific platform.
 */
export function getNavigationGroups(platform: Platform): NavigationGroup[] {
  return filterGroupsForPlatform(NAVIGATION_GROUPS, platform);
}

/**
 * Get children items for a parent, filtered by platform.
 */
export function getChildrenForPlatform(
  parentId: string,
  platform: Platform,
): NavigationItem[] {
  const children = CHILDREN_MAP[parentId] || [];
  return filterItemsForPlatform(children, platform);
}

// ============================================================================
// Presets
// ============================================================================

/**
 * Pre-built navigation config for the runner application.
 */
export function getRunnerNavigation(): NavigationGroup[] {
  return getNavigationGroups("runner");
}

/**
 * Pre-built navigation config for the web application.
 */
export function getWebNavigation(): NavigationGroup[] {
  return getNavigationGroups("web");
}
