"use client";

import { Thread } from "@/components/thread";
import { StoryCardToolUI } from "./StoryCard";
import { EstimationDisplayToolUI } from "./EstimationDisplay";
import { SprintPlanViewToolUI } from "./SprintPlanView";
import { ApprovalGateToolUI } from "./ApprovalGate";

export function SprintPlanningThread() {
  return (
    <div className="relative flex h-full flex-col">
      <Thread />
      <StoryCardToolUI />
      <EstimationDisplayToolUI />
      <SprintPlanViewToolUI />
      <ApprovalGateToolUI />
    </div>
  );
}
