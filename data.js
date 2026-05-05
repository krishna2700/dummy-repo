// ─── Static Data for Company Sprint Todo ────────────────────────────────────

const TEAM_MEMBERS = [
  { id: "u1", name: "Alice Morgan",   avatar: "AM", role: "Frontend Dev",   color: "#6366f1" },
  { id: "u2", name: "Brian Cho",      avatar: "BC", role: "Backend Dev",    color: "#0ea5e9" },
  { id: "u3", name: "Carla Davis",    avatar: "CD", role: "UI/UX Designer", color: "#ec4899" },
  { id: "u4", name: "Daniel Kim",     avatar: "DK", role: "QA Engineer",    color: "#f59e0b" },
  { id: "u5", name: "Elena Torres",   avatar: "ET", role: "DevOps",         color: "#10b981" },
];

const SPRINTS = [
  {
    id: "sprint-1",
    name: "Sprint 1 — Foundation",
    startDate: "2026-04-07",
    endDate:   "2026-04-18",
    goal: "Set up project scaffolding, design system, and CI/CD pipeline.",
    status: "completed",
  },
  {
    id: "sprint-2",
    name: "Sprint 2 — Core Features",
    startDate: "2026-04-21",
    endDate:   "2026-05-02",
    goal: "Implement user authentication, dashboard, and data models.",
    status: "completed",
  },
  {
    id: "sprint-3",
    name: "Sprint 3 — Sprint Todo Feature",
    startDate: "2026-05-05",
    endDate:   "2026-05-16",
    goal: "Build the company sprint todo board with assignment and tracking.",
    status: "active",
  },
  {
    id: "sprint-4",
    name: "Sprint 4 — Integrations",
    startDate: "2026-05-19",
    endDate:   "2026-05-30",
    goal: "Third-party API integrations, notifications, and reporting.",
    status: "upcoming",
  },
];

const PRIORITIES = ["critical", "high", "medium", "low"];
const LABELS     = ["feature", "bug", "chore", "refactor", "design", "testing", "devops"];

const TODOS = [
  // ── Sprint 1 (completed) ──────────────────────────────────────────────────
  {
    id: "t-101", sprintId: "sprint-1",
    title: "Initialise Git repository and branch strategy",
    description: "Set up main/develop/feature branching model with protection rules.",
    priority: "high", label: "devops",
    assigneeId: "u5", status: "done",
    storyPoints: 2, createdAt: "2026-04-07",
  },
  {
    id: "t-102", sprintId: "sprint-1",
    title: "Configure CI/CD pipeline with GitHub Actions",
    description: "Automated lint, test, build, and deploy on every PR to develop.",
    priority: "high", label: "devops",
    assigneeId: "u5", status: "done",
    storyPoints: 5, createdAt: "2026-04-07",
  },
  {
    id: "t-103", sprintId: "sprint-1",
    title: "Design system — colour tokens and typography",
    description: "Define brand palette, font scales, and spacing tokens in Figma + CSS vars.",
    priority: "medium", label: "design",
    assigneeId: "u3", status: "done",
    storyPoints: 3, createdAt: "2026-04-08",
  },
  {
    id: "t-104", sprintId: "sprint-1",
    title: "Create base component library (buttons, inputs, cards)",
    description: "Reusable UI primitives following the design tokens.",
    priority: "medium", label: "feature",
    assigneeId: "u1", status: "done",
    storyPoints: 5, createdAt: "2026-04-09",
  },
  {
    id: "t-105", sprintId: "sprint-1",
    title: "Database schema — initial ERD",
    description: "Define entities: User, Project, Sprint, Task, Comment.",
    priority: "high", label: "chore",
    assigneeId: "u2", status: "done",
    storyPoints: 3, createdAt: "2026-04-10",
  },

  // ── Sprint 2 (completed) ──────────────────────────────────────────────────
  {
    id: "t-201", sprintId: "sprint-2",
    title: "User registration and email verification",
    description: "POST /auth/register endpoint, JWT issuance, and email OTP flow.",
    priority: "critical", label: "feature",
    assigneeId: "u2", status: "done",
    storyPoints: 8, createdAt: "2026-04-21",
  },
  {
    id: "t-202", sprintId: "sprint-2",
    title: "Login page UI",
    description: "Responsive login form with validation and error states.",
    priority: "high", label: "feature",
    assigneeId: "u1", status: "done",
    storyPoints: 3, createdAt: "2026-04-21",
  },
  {
    id: "t-203", sprintId: "sprint-2",
    title: "Dashboard layout with sidebar navigation",
    description: "Main app shell: sidebar, top bar, breadcrumb, content area.",
    priority: "high", label: "feature",
    assigneeId: "u1", status: "done",
    storyPoints: 5, createdAt: "2026-04-22",
  },
  {
    id: "t-204", sprintId: "sprint-2",
    title: "Fix: sidebar collapses incorrectly on tablet viewports",
    description: "Toggle icon misaligned; sidebar overlaps content at 768 px breakpoint.",
    priority: "high", label: "bug",
    assigneeId: "u4", status: "done",
    storyPoints: 2, createdAt: "2026-04-25",
  },
  {
    id: "t-205", sprintId: "sprint-2",
    title: "Unit tests — auth service",
    description: "Jest tests for register, login, refresh, and logout flows.",
    priority: "medium", label: "testing",
    assigneeId: "u4", status: "done",
    storyPoints: 3, createdAt: "2026-04-28",
  },

  // ── Sprint 3 (active) ─────────────────────────────────────────────────────
  {
    id: "t-301", sprintId: "sprint-3",
    title: "Design sprint board wireframes",
    description: "Kanban-style board with To Do / In Progress / Review / Done columns.",
    priority: "high", label: "design",
    assigneeId: "u3", status: "done",
    storyPoints: 3, createdAt: "2026-05-05",
  },
  {
    id: "t-302", sprintId: "sprint-3",
    title: "Implement sprint todo data model",
    description: "Sprint, Task, Assignee entities with static JSON fixtures for dev.",
    priority: "high", label: "feature",
    assigneeId: "u2", status: "done",
    storyPoints: 3, createdAt: "2026-05-05",
  },
  {
    id: "t-303", sprintId: "sprint-3",
    title: "Build kanban board UI component",
    description: "Drag-and-drop columns, task cards, priority badges, assignee avatars.",
    priority: "critical", label: "feature",
    assigneeId: "u1", status: "in-progress",
    storyPoints: 8, createdAt: "2026-05-05",
  },
  {
    id: "t-304", sprintId: "sprint-3",
    title: "Task detail modal — view and edit",
    description: "Click a card to expand: title, description, priority, assignee, comments.",
    priority: "high", label: "feature",
    assigneeId: "u1", status: "in-progress",
    storyPoints: 5, createdAt: "2026-05-06",
  },
  {
    id: "t-305", sprintId: "sprint-3",
    title: "Sprint progress metrics widget",
    description: "Burndown numbers, story-point completion percentage, and per-member load.",
    priority: "medium", label: "feature",
    assigneeId: "u3", status: "in-progress",
    storyPoints: 5, createdAt: "2026-05-06",
  },
  {
    id: "t-306", sprintId: "sprint-3",
    title: "Filter and search tasks by assignee / priority / label",
    description: "Persistent filter bar above the kanban board.",
    priority: "medium", label: "feature",
    assigneeId: "u1", status: "todo",
    storyPoints: 3, createdAt: "2026-05-07",
  },
  {
    id: "t-307", sprintId: "sprint-3",
    title: "Fix: avatar tooltip overflows viewport on narrow screens",
    description: "Tooltip for long names clips below the fold at < 400 px.",
    priority: "low", label: "bug",
    assigneeId: "u4", status: "todo",
    storyPoints: 1, createdAt: "2026-05-07",
  },
  {
    id: "t-308", sprintId: "sprint-3",
    title: "Write integration tests for task status transitions",
    description: "Ensure state machine: todo → in-progress → review → done (and rollbacks).",
    priority: "medium", label: "testing",
    assigneeId: "u4", status: "todo",
    storyPoints: 3, createdAt: "2026-05-08",
  },
  {
    id: "t-309", sprintId: "sprint-3",
    title: "Refactor CSS class naming to BEM convention",
    description: "Align all component class names before the feature ships.",
    priority: "low", label: "refactor",
    assigneeId: "u1", status: "todo",
    storyPoints: 2, createdAt: "2026-05-08",
  },
  {
    id: "t-310", sprintId: "sprint-3",
    title: "Deploy sprint board to staging environment",
    description: "Terraform update + Docker image push to staging ECS cluster.",
    priority: "high", label: "devops",
    assigneeId: "u5", status: "review",
    storyPoints: 3, createdAt: "2026-05-05",
  },

  // ── Sprint 4 (upcoming) ───────────────────────────────────────────────────
  {
    id: "t-401", sprintId: "sprint-4",
    title: "Slack notifications for task updates",
    description: "Webhook integration — notify channel when a task moves to Done.",
    priority: "medium", label: "feature",
    assigneeId: "u2", status: "todo",
    storyPoints: 5, createdAt: "2026-05-05",
  },
  {
    id: "t-402", sprintId: "sprint-4",
    title: "Export sprint report as PDF",
    description: "One-click PDF with burndown chart, task list, and velocity.",
    priority: "medium", label: "feature",
    assigneeId: "u3", status: "todo",
    storyPoints: 5, createdAt: "2026-05-05",
  },
  {
    id: "t-403", sprintId: "sprint-4",
    title: "API rate-limiting and monitoring",
    description: "Redis-backed throttle + Datadog dashboard for p95 latency.",
    priority: "high", label: "devops",
    assigneeId: "u5", status: "todo",
    storyPoints: 5, createdAt: "2026-05-05",
  },
];

// Helper functions
function getSprintById(id)        { return SPRINTS.find(s => s.id === id); }
function getMemberById(id)        { return TEAM_MEMBERS.find(m => m.id === id); }
function getTodosBySprintId(sid)  { return TODOS.filter(t => t.sprintId === sid); }
function getActiveSprint()        { return SPRINTS.find(s => s.status === "active"); }

function getSprintStats(sprintId) {
  const tasks = getTodosBySprintId(sprintId);
  const total  = tasks.reduce((a, t) => a + t.storyPoints, 0);
  const done   = tasks.filter(t => t.status === "done").reduce((a, t) => a + t.storyPoints, 0);
  const byStatus = { todo: 0, "in-progress": 0, review: 0, done: 0 };
  tasks.forEach(t => { byStatus[t.status] = (byStatus[t.status] || 0) + 1; });
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0, byStatus, taskCount: tasks.length };
}

// Export for use in other modules (or directly via <script> tags)
if (typeof module !== "undefined") {
  module.exports = { TEAM_MEMBERS, SPRINTS, TODOS, PRIORITIES, LABELS,
    getSprintById, getMemberById, getTodosBySprintId, getActiveSprint, getSprintStats };
}
