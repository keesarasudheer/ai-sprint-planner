"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FeedbackControls } from "./FeedbackControls";
import { CheckCircle2, Circle, Link2 } from "lucide-react";
import type { RefinedStory } from "@/lib/types/story";

function StoryCardContent({ story }: { story: RefinedStory }) {
  const valueColor =
    story.business_value_score >= 7
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : story.business_value_score >= 4
        ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
        : "bg-rose-500/15 text-rose-400 border-rose-500/30";

  return (
    <Card className="border-border/60 bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium leading-snug">
            {story.title}
          </CardTitle>
          <Badge variant="outline" className={`shrink-0 text-[10px] ${valueColor}`}>
            BV: {story.business_value_score}/10
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {story.description}
        </p>

        <Separator />

        <div>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Acceptance Criteria
          </p>
          <ul className="space-y-1">
            {story.acceptance_criteria.map((ac) => (
              <li
                key={ac.id}
                className="flex items-start gap-2 text-xs text-foreground/80"
              >
                {ac.met ? (
                  <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                )}
                <span>{ac.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {story.dependencies.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Link2 className="size-3 text-muted-foreground" />
            {story.dependencies.map((dep) => (
              <Badge key={dep} variant="secondary" className="text-[10px]">
                {dep}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-end border-t pt-3">
        <FeedbackControls />
      </CardFooter>
    </Card>
  );
}

export const StoryCardToolUI = makeAssistantToolUI({
  toolName: "story_refinement",
  render: ({ args }) => {
    const story = args as unknown as RefinedStory;
    return <StoryCardContent story={story} />;
  },
});
