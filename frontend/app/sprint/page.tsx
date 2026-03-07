"use client";

import { useState, useMemo, useCallback } from "react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
  useChatRuntime,
  AssistantChatTransport,
} from "@assistant-ui/react-ai-sdk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SprintPlanningThread } from "@/components/chat/SprintPlanningThread";
import { BacklogPanel } from "@/components/planning/BacklogPanel";
import { TeamConfig } from "@/components/planning/TeamConfig";
import { PlanningDashboard } from "@/components/planning/PlanningDashboard";
import { usePlanningStore } from "@/lib/store";
import {
  SAMPLE_BACKLOG_ITEMS,
  SAMPLE_TEAM_MEMBERS,
  SAMPLE_VELOCITY_HISTORY,
} from "@/lib/mock-data";
import {
  Layers,
  Users,
  MessageSquare,
  Sparkles,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SprintPage() {
  const transport = useMemo(
    () => new AssistantChatTransport({ api: "/api/chat" }),
    []
  );
  const runtime = useChatRuntime({ transport });

  const {
    state,
    stats,
    addBacklogItem,
    removeBacklogItem,
    toggleBacklogSelection,
    selectAllBacklog,
    clearBacklogSelection,
    addTeamMember,
    removeTeamMember,
    updateSprintDuration,
    addVelocityRecord,
  } = usePlanningStore();

  const [activeTab, setActiveTab] = useState<string>("backlog");
  const [mainView, setMainView] = useState<"dashboard" | "chat">("dashboard");
  const [isPlanning, setIsPlanning] = useState(false);

  const handleLoadSample = useCallback(() => {
    SAMPLE_BACKLOG_ITEMS.forEach((item) => {
      addBacklogItem({
        type: item.type,
        title: item.title,
        description: item.description,
      });
    });
    SAMPLE_TEAM_MEMBERS.forEach((m) => addTeamMember(m));
    SAMPLE_VELOCITY_HISTORY.forEach((v) => addVelocityRecord(v));
  }, [addBacklogItem, addTeamMember, addVelocityRecord]);

  const handleStartPlanning = useCallback(() => {
    setIsPlanning(true);
    setMainView("chat");
    setTimeout(() => setIsPlanning(false), 2000);
  }, []);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-full overflow-hidden">
        {/* Left panel: Backlog & Team config */}
        <div className="flex w-80 shrink-0 flex-col border-r border-border">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex h-full flex-col"
          >
            <div className="border-b border-border px-2 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="backlog" className="flex-1 gap-1.5 text-xs">
                  <Layers className="size-3" />
                  Backlog
                </TabsTrigger>
                <TabsTrigger value="team" className="flex-1 gap-1.5 text-xs">
                  <Users className="size-3" />
                  Team
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="backlog"
              className="mt-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
            >
              <BacklogPanel
                items={state.backlogItems}
                selectedIds={state.selectedBacklogIds}
                onAdd={addBacklogItem}
                onRemove={removeBacklogItem}
                onToggleSelect={toggleBacklogSelection}
                onSelectAll={selectAllBacklog}
                onClearSelection={clearBacklogSelection}
              />
            </TabsContent>

            <TabsContent
              value="team"
              className="mt-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
            >
              <TeamConfig
                members={state.team.members}
                sprintDuration={state.team.sprint_duration_days}
                velocityHistory={state.team.velocity_history}
                onAddMember={addTeamMember}
                onRemoveMember={removeTeamMember}
                onUpdateDuration={updateSprintDuration}
                onAddVelocity={addVelocityRecord}
              />
            </TabsContent>

            {/* Load sample data button */}
            {state.backlogItems.length === 0 && (
              <div className="border-t border-border p-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5 text-xs"
                  onClick={handleLoadSample}
                >
                  <Download className="size-3" />
                  Load Sample Data
                </Button>
              </div>
            )}
          </Tabs>
        </div>

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Main view switcher */}
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <div className="flex items-center gap-1">
              <Button
                variant={mainView === "dashboard" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 gap-1.5 text-xs"
                onClick={() => setMainView("dashboard")}
              >
                <Sparkles className="size-3" />
                Planning
              </Button>
              <Button
                variant={mainView === "chat" ? "secondary" : "ghost"}
                size="sm"
                className="h-7 gap-1.5 text-xs"
                onClick={() => setMainView("chat")}
              >
                <MessageSquare className="size-3" />
                AI Chat
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {stats.totalItems} items &middot; {stats.selected} selected
                &middot; {stats.teamSize} members
              </span>
            </div>
          </div>

          {/* Main view content */}
          <div className="flex-1 overflow-hidden">
            {mainView === "dashboard" ? (
              <PlanningDashboard
                backlogCount={stats.totalItems}
                selectedCount={stats.selected}
                teamSize={stats.teamSize}
                avgVelocity={stats.avgVelocity}
                sprintDuration={state.team.sprint_duration_days}
                onStartPlanning={handleStartPlanning}
                isPlanning={isPlanning}
              />
            ) : (
              <SprintPlanningThread />
            )}
          </div>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
