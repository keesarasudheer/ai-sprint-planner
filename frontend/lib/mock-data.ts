import type { BacklogItem } from "./types/story";
import type { TeamMember, VelocityRecord } from "./types/sprint";

export const SAMPLE_BACKLOG_ITEMS: BacklogItem[] = [
  {
    id: "bl-demo-1",
    type: "epic",
    title: "User Authentication & Authorization",
    description:
      "Implement end-to-end authentication flow including sign up, login, password reset, OAuth providers (Google, GitHub), and role-based access control for admin, editor, and viewer roles.",
  },
  {
    id: "bl-demo-2",
    type: "story",
    title: "Implement JWT token refresh mechanism",
    description:
      "As a user, I want my session to persist across browser refreshes so that I don't have to re-login frequently. Implement silent token refresh using refresh tokens stored in httpOnly cookies.",
  },
  {
    id: "bl-demo-3",
    type: "epic",
    title: "Dashboard Analytics Module",
    description:
      "Build a real-time analytics dashboard showing key business metrics: daily active users, revenue trends, conversion funnels, and cohort analysis. Support date range filtering and CSV export.",
  },
  {
    id: "bl-demo-4",
    type: "story",
    title: "Add pagination to project list API",
    description:
      "As a developer, I want the /api/projects endpoint to support cursor-based pagination so that the frontend can efficiently load large project lists without fetching all records at once.",
  },
  {
    id: "bl-demo-5",
    type: "story",
    title: "Fix timezone handling in scheduled reports",
    description:
      "Scheduled reports are firing at incorrect times for users in non-UTC timezones. Store user timezone preference and convert all cron schedules to UTC on the backend while displaying local time in the UI.",
  },
  {
    id: "bl-demo-6",
    type: "epic",
    title: "Notification System",
    description:
      "Build a multi-channel notification system supporting in-app, email, and Slack notifications. Include user preference management, notification templates, and delivery tracking with retry logic.",
  },
  {
    id: "bl-demo-7",
    type: "story",
    title: "Implement drag-and-drop for kanban board columns",
    description:
      "As a project manager, I want to drag tasks between kanban board columns (To Do, In Progress, Review, Done) so that I can quickly update task status without opening each card.",
  },
  {
    id: "bl-demo-8",
    type: "story",
    title: "Add rate limiting to public API endpoints",
    description:
      "Implement sliding window rate limiting (100 req/min for authenticated users, 20 req/min for unauthenticated) on all public API endpoints to prevent abuse and ensure fair usage.",
  },
];

export const SAMPLE_TEAM_MEMBERS: TeamMember[] = [
  { name: "Alice Chen", capacity_pct: 100 },
  { name: "Bob Martinez", capacity_pct: 80 },
  { name: "Carol Kim", capacity_pct: 100 },
  { name: "David Patel", capacity_pct: 60 },
  { name: "Eve Johnson", capacity_pct: 100 },
];

export const SAMPLE_VELOCITY_HISTORY: VelocityRecord[] = [
  { sprint_id: "Sprint 20", completed_points: 34 },
  { sprint_id: "Sprint 21", completed_points: 38 },
  { sprint_id: "Sprint 22", completed_points: 31 },
  { sprint_id: "Sprint 23", completed_points: 42 },
];
