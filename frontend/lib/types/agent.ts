export type AgentName = "product_owner" | "sprint_analyst" | "scrum_master";

export type SSEEventType =
  | "agent_start"
  | "reasoning"
  | "tool_result"
  | "task_complete"
  | "approval_needed"
  | "crew_complete"
  | "error";

export interface AgentStartEvent {
  agent: AgentName;
  task: string;
}

export interface ReasoningEvent {
  agent: AgentName;
  content: string;
}

export interface ToolResultEvent {
  agent: AgentName;
  tool: string;
  result: Record<string, unknown>;
}

export interface TaskCompleteEvent {
  task: string;
  output: Record<string, unknown>;
}

export interface ApprovalNeededEvent {
  task: string;
  plan: Record<string, unknown>;
}

export interface CrewCompleteEvent {
  session_id: string;
  final_output: Record<string, unknown>;
  token_usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ErrorEvent {
  code: string;
  message: string;
  recoverable: boolean;
}

export type SSEEvent =
  | { type: "agent_start"; data: AgentStartEvent }
  | { type: "reasoning"; data: ReasoningEvent }
  | { type: "tool_result"; data: ToolResultEvent }
  | { type: "task_complete"; data: TaskCompleteEvent }
  | { type: "approval_needed"; data: ApprovalNeededEvent }
  | { type: "crew_complete"; data: CrewCompleteEvent }
  | { type: "error"; data: ErrorEvent };

export const AGENT_DISPLAY_INFO: Record<
  AgentName,
  { label: string; role: string; color: string }
> = {
  product_owner: {
    label: "Product Owner",
    role: "Backlog Grooming & Story Refinement",
    color: "var(--chart-1)",
  },
  sprint_analyst: {
    label: "Sprint Analyst",
    role: "Estimation & Velocity Forecasting",
    color: "var(--chart-2)",
  },
  scrum_master: {
    label: "Scrum Master",
    role: "Sprint Planning Facilitation",
    color: "var(--chart-3)",
  },
};
