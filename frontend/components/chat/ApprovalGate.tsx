"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Pencil, X } from "lucide-react";

export const ApprovalGateToolUI = makeAssistantToolUI({
  toolName: "approval_needed",
  render: ({ args, status }) => {
    const isComplete = status?.type === "complete";
    const data = args as { task?: string; plan?: Record<string, unknown> };

    return (
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <div>
              <CardTitle className="text-sm">
                Human Approval Required
              </CardTitle>
              <CardDescription className="text-xs">
                {data.task === "sprint_scope"
                  ? "Review and approve the sprint plan before finalizing."
                  : "This action requires your explicit approval."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          {isComplete ? (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
              Approved -- Sprint plan finalized.
            </div>
          ) : (
            <div className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
              Awaiting your decision. Review the plan above and choose an
              action.
            </div>
          )}
        </CardContent>

        {!isComplete && (
          <CardFooter className="gap-2 border-t pt-3">
            <Button
              size="sm"
              className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-500"
              disabled
            >
              <ShieldCheck className="size-3.5" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5" disabled>
              <Pencil className="size-3.5" />
              Modify
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400"
              disabled
            >
              <X className="size-3.5" />
              Reject
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  },
});
