"use client";

import {
  Zap,
  Layers,
  Users,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PlanningDashboardProps {
  backlogCount: number;
  selectedCount: number;
  teamSize: number;
  avgVelocity: number;
  sprintDuration: number;
  onStartPlanning: () => void;
  isPlanning: boolean;
}

export function PlanningDashboard({
  backlogCount,
  selectedCount,
  teamSize,
  avgVelocity,
  sprintDuration,
  onStartPlanning,
  isPlanning,
}: PlanningDashboardProps) {
  const readyToRun = selectedCount > 0 && teamSize > 0;
  const completeness =
    [backlogCount > 0, selectedCount > 0, teamSize > 0, avgVelocity > 0]
      .filter(Boolean).length * 25;

  return (
    <div className="flex h-full flex-col items-center justify-center px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="size-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Sprint Planning
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure your backlog and team, then let AI plan your sprint.
          </p>
        </div>

        {/* Readiness checklist */}
        <Card className="border-border/60">
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Planning Readiness</span>
              <span className="font-mono text-muted-foreground">{completeness}%</span>
            </div>
            <Progress value={completeness} className="h-1.5" />

            <div className="space-y-2 pt-1">
              <ReadinessItem
                icon={Layers}
                label="Backlog items added"
                value={`${backlogCount} items`}
                done={backlogCount > 0}
              />
              <ReadinessItem
                icon={Zap}
                label="Items selected for planning"
                value={`${selectedCount} selected`}
                done={selectedCount > 0}
              />
              <ReadinessItem
                icon={Users}
                label="Team configured"
                value={`${teamSize} members`}
                done={teamSize > 0}
              />
              <ReadinessItem
                icon={ArrowRight}
                label="Velocity history"
                value={avgVelocity > 0 ? `avg ${avgVelocity} pts` : "none"}
                done={avgVelocity > 0}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sprint info */}
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-[10px]">
            {sprintDuration} day sprint
          </Badge>
          {avgVelocity > 0 && (
            <Badge variant="outline" className="text-[10px]">
              ~{avgVelocity} pts capacity
            </Badge>
          )}
        </div>

        {/* Action button */}
        <Button
          size="lg"
          className="w-full gap-2"
          disabled={!readyToRun || isPlanning}
          onClick={onStartPlanning}
        >
          {isPlanning ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              AI Agents Working...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Start Sprint Planning
            </>
          )}
        </Button>

        {!readyToRun && (
          <p className="text-center text-[11px] text-muted-foreground">
            {selectedCount === 0
              ? "Select backlog items in the left panel to begin."
              : "Add team members in the Team tab to begin."}
          </p>
        )}
      </div>
    </div>
  );
}

function ReadinessItem({
  icon: Icon,
  label,
  value,
  done,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  done: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon
          className={`size-3.5 ${done ? "text-emerald-500" : "text-muted-foreground/40"}`}
        />
        <span
          className={`text-xs ${done ? "text-foreground" : "text-muted-foreground"}`}
        >
          {label}
        </span>
      </div>
      <span className="font-mono text-[10px] text-muted-foreground">
        {value}
      </span>
    </div>
  );
}
