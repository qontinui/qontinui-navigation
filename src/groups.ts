/**
 * Navigation Groups
 *
 * Shared navigation group definitions for Qontinui applications.
 * These define the structure and hierarchy of the sidebar navigation.
 *
 * Each item can have four orthogonal visibility dimensions:
 *   - platform:    "runner" | "web" | both (default) — which app shows the item
 *   - productMode: "ai" | "visual" | "both" | undefined (default=both) — which product mode
 *   - hiddenInProd: true — dev-only items hidden in production
 *   - hidden: true — "advanced" surfaces (the workflow-authoring tools) kept
 *     out of the default sidebar until the user opts in via "Show advanced
 *     automation features" (setShowHiddenItems). Route/tab id stays registered,
 *     so deep-links (e.g. the Terminal "save as workflow" disclosure) resolve.
 *
 * ---------------------------------------------------------------------------
 * Terminal-centric information architecture (2026-06).
 * ---------------------------------------------------------------------------
 * The Terminal page is now the primary surface — most users live there running
 * Claude Code / shell sessions. The previous IA (RUN / OBSERVE / LEARN / BUILD /
 * WRAPPERS / CONFIGURE / SCHEDULE) was organised around the older
 * setup→verification→agentic→completion workflow-loop paradigm and surfaced
 * ~25 items by default, burying the handful a session-driven user touches daily.
 *
 * The new IA applies progressive disclosure:
 *   - WORKSPACE / REVIEW / SYSTEM  — the daily set, expanded by default.
 *   - SPEND / AUTOMATE / BUILD / INSIGHTS / CONFIGURE / DEV — the legacy
 *     workflow-builder + monitoring + accumulated-intelligence long tail.
 *     These are flagged `hidden: true` so they are kept out of the default
 *     sidebar entirely until the user opts into "Show advanced automation
 *     features" (setShowHiddenItems) — the same one-toggle disclosure that
 *     reveals the workflow-authoring builders. Nothing is removed; every route
 *     and tab id is preserved so deep-links and tab-activation keep resolving.
 *     (Groups that end up with no visible items are dropped by
 *     filterGroupsForPlatform, so no bare group header renders.)
 *
 * The default (toggle OFF, AI Dev mode) is therefore the lean, Terminal-first
 * set: WORKSPACE (Home / Terminal / Active / Productivity), REVIEW (Runs /
 * Findings / Memory / Knowledge), and SYSTEM (Settings / Help). This mirrors
 * qontinui-web's coord+sessions-centric default menu.
 *
 * Both platforms share this structure; per-item `platforms`/`productMode`
 * filters yield the right view for each (web has no Terminal; runner has no
 * Dashboard/Runners, etc.). qontinui-web additionally demotes a few items the
 * runner keeps (runs/active/findings — task_run-scoped, not session-scoped)
 * via its own local list; those stay un-`hidden` here. The observation-memory
 * item is no longer among them: it is `platforms: ["runner"]` now, since web
 * has no `observe/` route tree (its route 404s there).
 */

import type { NavigationGroup, NavigationItem } from "./types";

// ============================================================================
// WORKSPACE Group — the daily entry points (where work starts)
// ============================================================================

export const WORKSPACE_ITEMS: NavigationItem[] = [
  {
    id: "visual-dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    description: "Visual automation dashboard",
    route: "/tools/visual-automation",
    color: "#10B981",
    productMode: "visual",
  },
  {
    id: "prompt-home",
    label: "Home",
    icon: "Sparkles",
    description: "Tell the runner what to do in plain English",
    route: "/prompt-home",
    color: "#8B5CF6",
    productMode: "ai",
  },
  {
    id: "gui-automation",
    label: "Execute",
    icon: "Play",
    description: "Run and schedule workflows",
    route: "/execute",
    color: "#10B981",
    productMode: "visual",
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: "Terminal",
    description: "Terminal, Claude Code sessions, and workflow generation",
    route: "/terminal",
    color: "#9CA3AF",
    productMode: "ai",
    platforms: ["runner"],
  },
  {
    id: "active",
    label: "Active",
    icon: "Activity",
    description: "Monitor active executions",
    route: "/runs/active",
    color: "#4A90D9",
    productMode: "ai",
  },
  {
    id: "productivity",
    label: "Productivity",
    icon: "ClipboardList",
    description: "Plan/task board, coordinator dashboard, and knowledge browser",
    route: "/productivity",
    color: "#F59E0B",
    platforms: ["runner"],
  },
];

export const WORKSPACE_GROUP: NavigationGroup = {
  id: "workspace",
  label: "WORKSPACE",
  items: WORKSPACE_ITEMS,
  defaultExpanded: true,
};

// ============================================================================
// REVIEW Group — sessions, output, and the intelligence a user reviews
// ============================================================================

// Runs Sub-items (runner secondary sidebar — flyout children of "Runs")
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
  },
  {
    id: "run-image",
    label: "Image Recognition",
    icon: "Image",
    description: "Visual recognition results",
    route: "/runs/image-recognition",
    color: "#4A90D9",
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
];

// Runs Children (web sidebar collapsible)
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

export const REVIEW_ITEMS: NavigationItem[] = [
  {
    id: "runs",
    label: "Runs",
    icon: "History",
    description: "Browse and manage all runs",
    hasChildren: true,
    // Runs is a parent WITH a page of its own (/runs — the run browser).
    // `selectsFirstChild: false` alone means "expand only, activate nothing",
    // which left the item inert: clicking Runs opened the flyout but never
    // dispatched a tab change. It must activate its OWN id, not its first
    // child's ("run-recap"), so `selectsFirstChild` cannot express this.
    selectsFirstChild: false,
    hasOwnPage: true,
    route: "/runs",
    color: "#4A90D9",
    productMode: "ai",
  },
  {
    id: "run-findings",
    label: "Findings",
    icon: "FileText",
    description: "Review findings and HITL questions across runs",
    route: "/runs/findings",
    color: "#4A90D9",
    productMode: "ai",
  },
  {
    // Id is "observations" (NOT "memory"): it must match the runner's
    // `MainTabId` union member / `TabContent` case that actually renders this
    // page. The old "memory" id was in no consumer's tab union, so clicking
    // the item activated a tab that did not exist.
    id: "observations",
    label: "Memory",
    icon: "Brain",
    description: "Cross-session observation memory from past runs",
    route: "/observe/memory",
    color: "#8B5CF6",
    // Runner-only: qontinui-web has no `observe/` route tree at all, so this
    // item's route 404s there — and because qontinui-web derives its co-pilot
    // page map from getWebNavigation(), an un-gated item also advertises that
    // 404 as a navigable target to the planner. Gate it at the source.
    platforms: ["runner"],
    productMode: "ai",
  },
  {
    id: "knowledge-explorer",
    label: "Knowledge",
    icon: "Globe",
    description: "Search external knowledge sources and view acquisition stats — web search, vulnerability intelligence, API docs",
    route: "/observe/knowledge",
    color: "#F97316",
    platforms: ["runner"],
    productMode: "ai",
  },
  {
    id: "helper-tasks",
    label: "Helper Tasks",
    icon: "MessageSquare",
    description: "Helper Task Queue — emit human spot-check tasks, review helper verdicts, invite helpers",
    route: "/review/helper-tasks",
    color: "#10B981",
    platforms: ["runner"],
    productMode: "ai",
  },
];

export const REVIEW_GROUP: NavigationGroup = {
  id: "review",
  label: "REVIEW",
  items: REVIEW_ITEMS,
  defaultExpanded: true,
};

// ============================================================================
// SPEND Group — token cost is a daily concern for session-heavy users
// ============================================================================

export const SPEND_ITEMS: NavigationItem[] = [
  {
    id: "llm-analytics",
    label: "LLM Analytics",
    icon: "CreditCard",
    description: "Token usage, cost breakdown, and provider latency analytics",
    color: "#D97706",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
  {
    id: "cost-control",
    label: "Cost Control",
    icon: "ShieldAlert",
    description: "Real-time budget tracking, circuit breakers, and cost anomaly detection",
    color: "#EF4444",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
];

export const SPEND_GROUP: NavigationGroup = {
  id: "spend",
  label: "SPEND",
  items: SPEND_ITEMS,
  defaultExpanded: false,
};

// ============================================================================
// AUTOMATE Group — scheduled / reactive agents
// ============================================================================

export const AUTOMATE_ITEMS: NavigationItem[] = [
  {
    id: "tasks",
    label: "Scheduled Tasks",
    icon: "Calendar",
    description: "Manage scheduled automation",
    productMode: "ai",
    // Runner-only feature — has no web page (web route 404s).
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "triggers",
    label: "Triggers",
    icon: "Zap",
    description: "Event-driven workflow automation",
    productMode: "ai",
    // Runner-only feature — has no web page (web route 404s).
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "watchers",
    label: "Watchers",
    icon: "Eye",
    description: "Scheduled reactive agents that monitor the activity timeline",
    route: "/observe/watchers",
    color: "#06B6D4",
    platforms: ["runner"],
    hidden: true,
  },
];

export const AUTOMATE_GROUP: NavigationGroup = {
  id: "automate",
  label: "AUTOMATE",
  items: AUTOMATE_ITEMS,
  defaultExpanded: false,
};

// ============================================================================
// BUILD Group — the workflow / visual-automation building surface (legacy core)
// ============================================================================

export const BUILD_ITEMS: NavigationItem[] = [
  {
    id: "unified-workflow-builder",
    label: "Workflows",
    icon: "Sparkles",
    description: "Build phase-based automation workflows",
    route: "/build/workflows",
    color: "var(--brand-secondary)",
    productMode: "ai",
    // Advanced surface — demoted from the default nav now that the Terminal is
    // the primary entry point. Reached via the Terminal "save as workflow"
    // disclosure or by opting into "Show advanced automation features".
    hidden: true,
  },
  {
    id: "dag-workflow-editor",
    label: "DAG Editor",
    icon: "GitBranch",
    description: "Visual DAG workflow editor with YAML syntax and graph visualization",
    route: "/build/dag-editor",
    color: "#6366f1",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
  {
    id: "step-builders",
    label: "Step Builders",
    icon: "Layers",
    description: "Build and browse step templates",
    route: "/build/templates",
    color: "var(--brand-secondary)",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "library",
    label: "Library",
    icon: "BookOpen",
    description: "Browse saved automation assets",
    route: "/library",
    color: "var(--brand-secondary)",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "state-machine",
    label: "UI Bridge States",
    icon: "Network",
    description: "Build state machines from UI Bridge SDK apps",
    route: "/automation-builder/ui-bridge-states",
    color: "var(--brand-secondary)",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "specs",
    label: "Specs",
    icon: "ClipboardCheck",
    description: "Manage and generate UI Bridge page specs for testing and automation",
    route: "/build/specs",
    color: "var(--brand-secondary)",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "regression",
    label: "Regression",
    icon: "ShieldCheck",
    description:
      "Run auto-generated regression suites against the live UI Bridge registry; review coverage and self-diagnoses for failures",
    color: "var(--brand-secondary)",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
  {
    id: "vga",
    label: "Visual GUI",
    icon: "Target",
    description: "Visual GUI automation — build state machines and inspect runs",
    route: "/vga",
    color: "var(--brand-secondary)",
    // Visual GUI automation belongs to Visual mode, not AI Dev (removed from
    // the AI Dev sidebar on both runner and web).
    productMode: "visual",
  },
  {
    id: "orchestration-loop",
    label: "Orchestration",
    icon: "Repeat",
    description: "Iterative workflow loop with pipeline mode (build/reflect/fix)",
    route: "/orchestration-loop",
    color: "#8B5CF6",
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "demo-video",
    label: "Demo Videos",
    icon: "Video",
    description: "Generate demo videos from UI Bridge page specs with AI narration",
    route: "/build/demo-videos",
    color: "var(--brand-secondary)",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
  {
    id: "product-tours",
    label: "Product Tours",
    icon: "MousePointer2",
    description: "Generate interactive product tours that auto-demonstrate features",
    route: "/build/product-tours",
    color: "var(--brand-secondary)",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
  {
    id: "wrappers",
    label: "Wrappers",
    icon: "Package",
    description: "Install and manage wrapper extensions",
    route: "/wrappers",
    color: "#06B6D4",
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
// INSIGHTS Group — live monitoring + accumulated analysis (the long tail)
// ============================================================================

export const INSIGHTS_ITEMS: NavigationItem[] = [
  {
    id: "error-monitor",
    label: "Error Monitor",
    icon: "AlertCircle",
    description: "Monitor and fix application errors from log sources",
    route: "/tools/error-monitor",
    color: "#4A90D9",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "processes",
    label: "Processes",
    icon: "Cpu",
    description: "Manage and monitor spawned child processes",
    color: "#06B6D4",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "activity-timeline",
    label: "Activity Timeline",
    icon: "Activity",
    description: "Searchable capture history — everything seen on screen during automation",
    route: "/observe/activity-timeline",
    color: "#06B6D4",
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "automation-health",
    label: "Automation Health",
    icon: "Activity",
    description: "UI Bridge automation quality, selector reliability, and improvement recommendations",
    color: "#10B981",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
  {
    id: "reflection",
    label: "Reflection",
    icon: "RotateCcw",
    description: "Reflection fix effectiveness and history",
    productMode: "ai",
    // Runner-only feature — has no web page (web route 404s).
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "architecture",
    label: "Architecture",
    icon: "GitBranch",
    description: "Component dependency graph and SDK project architecture",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "api-surface",
    label: "API Surface",
    icon: "Network",
    description: "Interactive map of every endpoint, command, query, and their connections",
    color: "#06B6D4",
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "development-intelligence",
    label: "Dev Intelligence",
    icon: "Brain",
    description: "Coverage gap analysis, complexity scoring, drift detection, and dead feature identification",
    route: "/observe/development-intelligence",
    color: "#8B5CF6",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
  {
    id: "project-explainer",
    label: "Explainer",
    icon: "BookOpen",
    description: "Hierarchical explainer for any project: overview, per-cluster narratives, and per-page deep dives with embedded architecture diagrams. AI side panel for asking questions while reading.",
    route: "/observe/explainer",
    color: "#06B6D4",
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "decision-trail",
    label: "Decision Trail",
    icon: "ListChecks",
    description: "Architectural decision history — what was decided, why, and what alternatives were considered",
    route: "/observe/decision-trail",
    color: "#8B5CF6",
    productMode: "ai",
    platforms: ["runner"],
    hidden: true,
  },
  {
    id: "session-recap",
    label: "Session Recap",
    icon: "GitBranch",
    description: "Semantic dependency map of what was built — files, types, endpoints, and how they connect",
    route: "/observe/session-recap",
    color: "#8B5CF6",
    platforms: ["runner"],
    productMode: "ai",
    hidden: true,
  },
];

export const INSIGHTS_GROUP: NavigationGroup = {
  id: "insights",
  label: "INSIGHTS",
  items: INSIGHTS_ITEMS,
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
    route: "/configure/finding-rules",
    color: "#FFD700",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "config-hooks",
    label: "Lifecycle Hooks",
    icon: "Webhook",
    description: "Configure execution event triggers",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "config-ui-bridge",
    label: "UI Bridge",
    icon: "Plug",
    description: "Manage UI Bridge integrations for external apps",
    productMode: "ai",
    hidden: true,
  },
  {
    id: "event-history",
    label: "Event History",
    icon: "Radio",
    description: "Workflow event bus, queue status, circuit breaker",
    hiddenInProd: true,
    productMode: "ai",
  },
];

export const CONFIGURE_GROUP: NavigationGroup = {
  id: "configure",
  label: "CONFIGURE",
  items: CONFIGURE_ITEMS,
  defaultExpanded: false,
};

// ============================================================================
// DEV Group — all dev-only items, entire group hidden in production
// ============================================================================

export const DEV_ITEMS: NavigationItem[] = [
  {
    id: "generator-eval",
    label: "Generator Eval",
    icon: "FlaskConical",
    description: "Evaluate and improve workflow generation accuracy",
    hiddenInProd: true,
    color: "#8B5CF6",
    productMode: "ai",
  },
  {
    id: "autoresearch",
    label: "Autoresearch",
    icon: "FlaskConical",
    description: "Compare workflow architectures with statistical A/B testing",
    hiddenInProd: true,
    color: "#8B5CF6",
    productMode: "ai",
    platforms: ["runner"],
  },
  {
    id: "meta-optimizer",
    label: "Meta-Optimizer",
    icon: "Sparkles",
    description: "Review and apply AI-generated recommendations to improve prompts, architecture, and generation rules",
    hiddenInProd: true,
    color: "#D97706",
    productMode: "ai",
    platforms: ["runner"],
  },
  {
    id: "online-learning",
    label: "Online Learning",
    icon: "Brain",
    description: "Monitor bandit model routing, drift detection, step credit attribution, and strategy evolution",
    hiddenInProd: true,
    color: "#06B6D4",
    productMode: "ai",
    platforms: ["runner"],
  },
  {
    id: "skills",
    label: "Skills",
    icon: "Zap",
    description: "Review and approve auto-extracted procedural skills learned from successful workflow runs",
    hiddenInProd: true,
    color: "#F59E0B",
    productMode: "ai",
    platforms: ["runner"],
  },
  {
    id: "image-quality-tests",
    label: "Image Quality",
    icon: "Image",
    description: "View and manage image quality test images",
    hiddenInProd: true,
    color: "#8B5CF6",
    platforms: ["runner"],
    productMode: "ai",
  },
  {
    id: "accessibility-explorer",
    label: "Accessibility",
    icon: "Accessibility",
    description: "Inspect and interact with native desktop accessibility trees via UIA, AT-SPI, or AX APIs",
    color: "#06B6D4",
    platforms: ["runner"],
    hidden: true,
  },
];

export const DEV_GROUP: NavigationGroup = {
  id: "dev",
  label: "DEV",
  items: DEV_ITEMS,
  defaultExpanded: false,
};

// ============================================================================
// SYSTEM Group — settings, account, help (always at the bottom)
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
    id: "settings-world-state-verifier",
    label: "World State Verifier",
    icon: "Eye",
    description: "VLM judge for agentic action verification (CUA-WSM)",
    route: "/settings/world-state-verifier",
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
    route: "/settings/mobile",
    color: "#FFD700",
  },
  {
    id: "settings-discovery",
    label: "App Discovery",
    icon: "Radar",
    description: "Custom ports for the UI Bridge app scanner",
    route: "/settings/discovery",
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
    id: "settings-instances",
    label: "Runner Instances",
    icon: "Server",
    description: "Spawn placement and per-instance configs",
    route: "/settings/instances",
    color: "#FFD700",
    platforms: ["runner"],
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
    id: "settings-security",
    label: "Security",
    icon: "ShieldAlert",
    description: "Sandboxing, policies, and audit",
    route: "/settings/security",
    color: "#FFD700",
    platforms: ["runner"],
  },
  {
    id: "settings-repos",
    label: "Repositories",
    icon: "GitBranch",
    description: "Manage coordinated repositories",
    route: "/settings/repos",
    color: "#FFD700",
    platforms: ["web"],
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
    id: "sessions",
    label: "Sessions",
    icon: "Terminal",
    description: "Terminal and agent sessions across machines",
    platforms: ["web"],
    route: "/sessions",
    color: "#10B981",
  },
  {
    // Member-visible coord layer. No adminOnly: any tenant member (Developer)
    // can VIEW; per-page mutation controls stay gated on coord_is_admin in
    // qontinui-web. Web-only — keeps it out of the runner sidebar.
    id: "ai-dev-coordination",
    label: "AI-Dev Coordination",
    icon: "Network",
    description: "Coordination layer — fleet, plans, gates, merge queue",
    platforms: ["web"],
    route: "/admin/coord",
    color: "#06B6D4",
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
 *
 * Order is deliberate: the expanded daily set (WORKSPACE, REVIEW) leads;
 * the collapsed legacy/long-tail groups follow; SYSTEM anchors the bottom.
 */
export const NAVIGATION_GROUPS: NavigationGroup[] = [
  WORKSPACE_GROUP,
  REVIEW_GROUP,
  SPEND_GROUP,
  AUTOMATE_GROUP,
  BUILD_GROUP,
  INSIGHTS_GROUP,
  CONFIGURE_GROUP,
  DEV_GROUP,
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
