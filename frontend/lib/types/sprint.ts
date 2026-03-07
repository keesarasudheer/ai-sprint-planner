import type { EstimatedStory } from "./story";

export interface TeamMember {
  name: string;
  capacity_pct: number;
}

export interface VelocityRecord {
  sprint_id: string;
  completed_points: number;
}

export interface TeamContext {
  members: TeamMember[];
  sprint_duration_days: number;
  velocity_history: VelocityRecord[];
}

export interface SprintPlan {
  recommended_stories: EstimatedStory[];
  total_story_points: number;
  team_capacity_assessment: CapacityAssessment;
  velocity_comparison: VelocityComparison;
  risk_factors: RiskFactor[];
  excluded_stories: ExcludedStory[];
  overall_confidence_level: number;
}

export interface CapacityAssessment {
  total_capacity_points: number;
  available_capacity_pct: number;
  utilization_pct: number;
}

export interface VelocityComparison {
  current_sprint_points: number;
  average_velocity: number;
  trend: "increasing" | "stable" | "decreasing";
}

export interface RiskFactor {
  description: string;
  severity: "low" | "medium" | "high";
  mitigation: string;
}

export interface ExcludedStory {
  story: EstimatedStory;
  rationale: string;
}

export interface PlanningSession {
  session_id: string;
  status: "active" | "completed" | "failed";
  started_at: string;
  completed_at?: string;
}

export interface CrewExecutionRequest {
  session_id: string;
  backlog_items: {
    id: string;
    type: "epic" | "story";
    title: string;
    description: string;
  }[];
  team_context: TeamContext;
}
