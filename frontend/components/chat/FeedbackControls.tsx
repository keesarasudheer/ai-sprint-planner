"use client";

import { Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FeedbackAction } from "@/lib/types/story";

interface FeedbackControlsProps {
  onFeedback?: (action: FeedbackAction) => void;
  size?: "sm" | "default";
  disabled?: boolean;
}

export function FeedbackControls({
  onFeedback,
  size = "sm",
  disabled = false,
}: FeedbackControlsProps) {
  const iconSize = size === "sm" ? "size-3.5" : "size-4";
  const btnSize = size === "sm" ? "icon-xs" : "icon-sm";

  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size={btnSize}
              onClick={() => onFeedback?.("accept")}
              disabled={disabled}
              className="text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
              aria-label="Accept"
            />
          }
        >
          <Check className={iconSize} />
        </TooltipTrigger>
        <TooltipContent>Accept</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size={btnSize}
              onClick={() => onFeedback?.("modify")}
              disabled={disabled}
              className="text-amber-500 hover:bg-amber-500/10 hover:text-amber-400"
              aria-label="Modify"
            />
          }
        >
          <Pencil className={iconSize} />
        </TooltipTrigger>
        <TooltipContent>Modify</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size={btnSize}
              onClick={() => onFeedback?.("reject")}
              disabled={disabled}
              className="text-rose-500 hover:bg-rose-500/10 hover:text-rose-400"
              aria-label="Reject"
            />
          }
        >
          <X className={iconSize} />
        </TooltipTrigger>
        <TooltipContent>Reject</TooltipContent>
      </Tooltip>
    </div>
  );
}
