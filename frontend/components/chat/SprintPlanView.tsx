"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  CheckCircle2,
  Target,
  XCircle,
} from "lucide-react";
import type { SprintPlan } from "@/lib/types/sprint";

const trendIcons = {
  increasing: ArrowUp,
  stable: ArrowRight,
  decreasing: ArrowDown,
} as const;

const severityStyles = {
  low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  high: "bg-rose-500/15 text-rose-400 border-rose-500/30",
} as const;

function SprintPlanContent({ plan }: { plan: SprintPlan }) {
  const { team_capacity_assessment, velocity_comparison } = plan;
  const TrendIcon = trendIcons[velocity_comparison.trend];

  return (
    <div className="space-y-3">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/60 bg-card/50">
          <CardContent className="p-3 text-center">
            <p className="text-[11px] text-muted-foreground">Total Points</p>
            <p className="text-lg font-semibold tabular-nums">
              {plan.total_story_points}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/50">
          <CardContent className="p-3 text-center">
            <p className="text-[11px] text-muted-foreground">Capacity</p>
            <p className="text-lg font-semibold tabular-nums">
              {team_capacity_assessment.total_capacity_points}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/50">
          <CardContent className="p-3 text-center">
            <p className="text-[11px] text-muted-foreground">Confidence</p>
            <p className="text-lg font-semibold tabular-nums">
              {plan.overall_confidence_level}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Capacity gauge */}
      <Card className="border-border/60 bg-card/50">
        <CardContent className="space-y-2 p-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Target className="size-3.5 text-muted-foreground" />
              <span>Utilization</span>
            </div>
            <span className="font-mono text-muted-foreground">
              {team_capacity_assessment.utilization_pct}%
            </span>
          </div>
          <Progress
            value={team_capacity_assessment.utilization_pct}
            className="h-2"
          />
        </CardContent>
      </Card>

      {/* Velocity comparison */}
      <Card className="border-border/60 bg-card/50">
        <CardContent className="flex items-center justify-between p-3">
          <div className="flex items-center gap-1.5 text-xs">
            <BarChart3 className="size-3.5 text-muted-foreground" />
            <span>Velocity trend</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-muted-foreground">
              avg {velocity_comparison.average_velocity} SP
            </span>
            <TrendIcon className="size-3.5" />
          </div>
        </CardContent>
      </Card>

      {/* Recommended stories */}
      <Card className="border-border/60 bg-card/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="size-4 text-emerald-500" />
            Recommended Stories
          </CardTitle>
          <CardDescription className="text-xs">
            {plan.recommended_stories.length} stories, {plan.total_story_points}{" "}
            total points
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {plan.recommended_stories.map((story, i) => (
            <div
              key={story.id}
              className="flex items-center justify-between rounded-md border border-border/40 bg-muted/30 px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-muted-foreground">
                  #{i + 1}
                </span>
                <span className="font-medium">{story.title}</span>
              </div>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {story.story_points} SP
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Risk factors */}
      {plan.risk_factors.length > 0 && (
        <Card className="border-border/60 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-1.5 text-sm">
              <AlertTriangle className="size-4 text-amber-500" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {plan.risk_factors.map((risk, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${severityStyles[risk.severity]}`}
                  >
                    {risk.severity}
                  </Badge>
                  <span className="text-xs">{risk.description}</span>
                </div>
                <p className="pl-12 text-[11px] text-muted-foreground">
                  Mitigation: {risk.mitigation}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Excluded stories */}
      {plan.excluded_stories.length > 0 && (
        <>
          <Separator />
          <Card className="border-border/60 bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <XCircle className="size-4" />
                Excluded Stories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {plan.excluded_stories.map((excluded) => (
                <div
                  key={excluded.story.id}
                  className="rounded-md border border-border/30 bg-muted/20 px-3 py-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/60">
                      {excluded.story.title}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {excluded.story.story_points} SP
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {excluded.rationale}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export const SprintPlanViewToolUI = makeAssistantToolUI({
  toolName: "sprint_scope",
  render: ({ args }) => {
    const plan = args as unknown as SprintPlan;
    return <SprintPlanContent plan={plan} />;
  },
});
