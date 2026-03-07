import type {
  SSEEventType,
  SSEEvent,
  AgentStartEvent,
  ReasoningEvent,
  ToolResultEvent,
  TaskCompleteEvent,
  ApprovalNeededEvent,
  CrewCompleteEvent,
  ErrorEvent,
} from "@/lib/types/agent";

export const SSE_EVENT_TYPES: SSEEventType[] = [
  "agent_start",
  "reasoning",
  "tool_result",
  "task_complete",
  "approval_needed",
  "crew_complete",
  "error",
];

type EventDataMap = {
  agent_start: AgentStartEvent;
  reasoning: ReasoningEvent;
  tool_result: ToolResultEvent;
  task_complete: TaskCompleteEvent;
  approval_needed: ApprovalNeededEvent;
  crew_complete: CrewCompleteEvent;
  error: ErrorEvent;
};

export function parseSSEEvent(
  eventType: string,
  data: string
): SSEEvent | null {
  if (!SSE_EVENT_TYPES.includes(eventType as SSEEventType)) {
    return null;
  }

  try {
    const parsed = JSON.parse(data) as EventDataMap[SSEEventType];
    return { type: eventType as SSEEventType, data: parsed } as SSEEvent;
  } catch {
    return null;
  }
}

export function isTerminalEvent(event: SSEEvent): boolean {
  return event.type === "crew_complete" || event.type === "error";
}
