/**
 * Platform Utilities
 *
 * Functions for filtering and extending navigation based on platform.
 */

import type {
  NavigationGroup,
  NavigationItem,
  NavigationExtensions,
  Platform,
  PlatformConfig,
  NavigationConfig,
  AppMode,
} from "./types";
import { NAVIGATION_GROUPS, CHILDREN_MAP } from "./groups";

// ============================================================================
// Platform Filtering
// ============================================================================

/**
 * Filter a navigation item based on platform.
 * Returns true if the item should be shown on the given platform.
 */
export function isItemAvailable(
  item: NavigationItem,
  platform: Platform
): boolean {
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
  platform: Platform
): NavigationItem[] {
  return items.filter((item) => isItemAvailable(item, platform));
}

/**
 * Filter a navigation group for a specific platform.
 */
export function filterGroupForPlatform(
  group: NavigationGroup,
  platform: Platform
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
  platform: Platform
): NavigationGroup[] {
  return groups
    .map((group) => filterGroupForPlatform(group, platform))
    .filter((group) => group.items.length > 0);
}

// ============================================================================
// App Mode Filtering
// ============================================================================

/**
 * Check if a navigation item is available for a specific app mode.
 * Returns true if the item should be shown in the given mode.
 */
export function isItemAvailableForMode(
  item: NavigationItem,
  mode: AppMode
): boolean {
  // If no mode restriction, show in all modes
  if (!item.modes || item.modes.length === 0) {
    return true;
  }
  return item.modes.includes(mode);
}

/**
 * Filter navigation items for a specific app mode.
 */
export function filterItemsForMode(
  items: NavigationItem[],
  mode: AppMode
): NavigationItem[] {
  return items.filter((item) => isItemAvailableForMode(item, mode));
}

/**
 * Filter a navigation group for a specific app mode.
 */
export function filterGroupForMode(
  group: NavigationGroup,
  mode: AppMode
): NavigationGroup {
  // Check if the group itself is mode-specific
  if (group.modes && !group.modes.includes(mode)) {
    return { ...group, items: [] };
  }

  return {
    ...group,
    items: filterItemsForMode(group.items, mode),
  };
}

/**
 * Filter all navigation groups for a specific app mode.
 */
export function filterGroupsForMode(
  groups: NavigationGroup[],
  mode: AppMode
): NavigationGroup[] {
  return groups
    .map((group) => filterGroupForMode(group, mode))
    .filter((group) => group.items.length > 0);
}

/**
 * Get children items for a parent, filtered by app mode.
 */
export function getChildrenForMode(
  parentId: string,
  mode: AppMode
): NavigationItem[] {
  const children = CHILDREN_MAP[parentId] || [];
  return filterItemsForMode(children, mode);
}

/**
 * Get navigation groups filtered by both platform and app mode.
 */
export function getNavigationGroupsForMode(
  platform: Platform,
  mode: AppMode,
  extensions?: NavigationExtensions
): NavigationGroup[] {
  // First filter by platform
  let groups = filterGroupsForPlatform(NAVIGATION_GROUPS, platform);

  // Then filter by mode
  groups = filterGroupsForMode(groups, mode);

  // Apply extensions
  if (extensions) {
    groups = applyExtensions(groups, extensions);
  }

  return groups;
}

/**
 * Pre-built navigation config for the runner application with mode filtering.
 */
export function getRunnerNavigationForMode(
  mode: AppMode,
  extensions?: NavigationExtensions
): NavigationGroup[] {
  return getNavigationGroupsForMode("runner", mode, extensions);
}

/**
 * Get children items for a parent, filtered by both platform and mode.
 */
export function getChildrenForPlatformAndMode(
  parentId: string,
  platform: Platform,
  mode: AppMode
): NavigationItem[] {
  const children = CHILDREN_MAP[parentId] || [];
  return children.filter(
    (item) => isItemAvailable(item, platform) && isItemAvailableForMode(item, mode)
  );
}

// ============================================================================
// Navigation Extensions
// ============================================================================

/**
 * Apply extensions to a list of navigation items.
 */
export function applyItemExtensions(
  items: NavigationItem[],
  groupId: string,
  extensions?: NavigationExtensions
): NavigationItem[] {
  if (!extensions) {
    return items;
  }

  let result = [...items];

  // Remove items
  if (extensions.remove) {
    result = result.filter((item) => !extensions.remove!.includes(item.id));
  }

  // Prepend items
  if (extensions.prepend?.[groupId]) {
    result = [...extensions.prepend[groupId], ...result];
  }

  // Append items
  if (extensions.append?.[groupId]) {
    result = [...result, ...extensions.append[groupId]];
  }

  // Insert after specific items
  if (extensions.insertAfter) {
    for (const [afterId, newItems] of Object.entries(extensions.insertAfter)) {
      const index = result.findIndex((item) => item.id === afterId);
      if (index !== -1) {
        result = [
          ...result.slice(0, index + 1),
          ...newItems,
          ...result.slice(index + 1),
        ];
      }
    }
  }

  return result;
}

/**
 * Apply extensions to a navigation group.
 */
export function applyGroupExtensions(
  group: NavigationGroup,
  extensions?: NavigationExtensions
): NavigationGroup {
  return {
    ...group,
    items: applyItemExtensions(group.items, group.id, extensions),
  };
}

/**
 * Apply extensions to all navigation groups.
 */
export function applyExtensions(
  groups: NavigationGroup[],
  extensions?: NavigationExtensions
): NavigationGroup[] {
  return groups.map((group) => applyGroupExtensions(group, extensions));
}

// ============================================================================
// Complete Configuration Builder
// ============================================================================

/**
 * Build a complete navigation configuration for a platform.
 */
export function buildNavigationConfig(
  platform: Platform,
  options?: {
    extensions?: NavigationExtensions;
    isDevelopment?: boolean;
    features?: Record<string, boolean>;
  }
): NavigationConfig {
  // Start with base groups
  let groups = [...NAVIGATION_GROUPS];

  // Filter for platform
  groups = filterGroupsForPlatform(groups, platform);

  // Apply extensions
  if (options?.extensions) {
    groups = applyExtensions(groups, options.extensions);
  }

  return {
    groups,
    platform: {
      platform,
      isDevelopment: options?.isDevelopment,
      features: options?.features,
    },
    extensions: options?.extensions,
  };
}

/**
 * Get navigation groups for a platform with extensions applied.
 */
export function getNavigationGroups(
  platform: Platform,
  extensions?: NavigationExtensions
): NavigationGroup[] {
  let groups = filterGroupsForPlatform(NAVIGATION_GROUPS, platform);

  if (extensions) {
    groups = applyExtensions(groups, extensions);
  }

  return groups;
}

/**
 * Get children items for a parent, filtered by platform.
 */
export function getChildrenForPlatform(
  parentId: string,
  platform: Platform
): NavigationItem[] {
  const children = CHILDREN_MAP[parentId] || [];
  return filterItemsForPlatform(children, platform);
}

// ============================================================================
// Platform Detection
// ============================================================================

/**
 * Detect the current platform based on environment.
 * This is a simple heuristic - apps should override this with their known platform.
 */
export function detectPlatform(): Platform {
  // Check for Tauri (runner)
  if (typeof window !== "undefined" && "__TAURI__" in window) {
    return "runner";
  }

  // Check for mobile
  if (typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)) {
    return "mobile";
  }

  // Default to web
  return "web";
}

// ============================================================================
// Presets
// ============================================================================

/**
 * Pre-built navigation config for the runner application.
 */
export function getRunnerNavigation(
  extensions?: NavigationExtensions
): NavigationGroup[] {
  return getNavigationGroups("runner", extensions);
}

/**
 * Pre-built navigation config for the web application.
 */
export function getWebNavigation(
  extensions?: NavigationExtensions
): NavigationGroup[] {
  return getNavigationGroups("web", extensions);
}
