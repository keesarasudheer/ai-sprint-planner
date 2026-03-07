"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrendingUp } from "lucide-react";
import type { EstimatedStory } from "@/lib/types/story";

function EstimationContent({ story }: { story: EstimatedStory }) {
  const { confidence_range } = story;
  const range = confidence_range.high - confidence_range.low;
  const normalizedPosition =
    range > 0
      ? ((story.story_points - confidence_range.low) / range) * 100
      : 50;

  const confidenceColor =
    confidence_range.confidence_pct >= 80
      ? "text-emerald-400"
      : confidence_range.confidence_pct >= 60
        ? "text-amber-400"
        : "text-rose-400";

  return (
    <Card className="border-border/60 bg-card/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{story.title}</CardTitle>
          <Badge className="font-mono text-xs tabular-nums">
            {story.story_points} SP
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="font-mono">{confidence_range.low} pts</span>
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className={`cursor-default font-medium ${confidenceColor}`} />
                }
              >
                {confidence_range.confidence_pct}% confidence
              </TooltipTrigger>
              <TooltipContent>
                Confidence that actual effort falls within this range
              </TooltipContent>
            </Tooltip>
            <span className="font-mono">{confidence_range.high} pts</span>
          </div>

          <div className="relative">
            <Progress
              value={normalizedPosition}
              className="h-2 bg-muted"
            />
            <div
              className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background"
              style={{ left: `${normalizedPosition}%` }}
            />
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          {story.estimation_rationale}
        </p>

        {story.comparable_stories.length > 0 && (
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Similar Stories
            </p>
            <div className="space-y-1">
              {story.comparable_stories.slice(0, 3).map((cs) => (
                <div
                  key={cs.id}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-1.5 text-foreground/70">
                    <TrendingUp className="size-3" />
                    <span className="truncate">{cs.title}</span>
                  </div>
                  <span className="shrink-0 font-mono text-muted-foreground">
                    {cs.story_points} SP
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const EstimationDisplayToolUI = makeAssistantToolUI({
  toolName: "effort_estimation",
  render: ({ args }) => {
    const story = args as unknown as EstimatedStory;
    return <EstimationContent story={story} />;
  },
});
