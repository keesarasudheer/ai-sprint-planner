"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { TeamMember, VelocityRecord } from "@/lib/types/sprint";

interface TeamConfigProps {
  members: TeamMember[];
  sprintDuration: number;
  velocityHistory: VelocityRecord[];
  onAddMember: (member: TeamMember) => void;
  onRemoveMember: (name: string) => void;
  onUpdateDuration: (days: number) => void;
  onAddVelocity: (record: VelocityRecord) => void;
}

export function TeamConfig({
  members,
  sprintDuration,
  velocityHistory,
  onAddMember,
  onRemoveMember,
  onUpdateDuration,
  onAddVelocity,
}: TeamConfigProps) {
  const [newName, setNewName] = useState("");
  const [newCapacity, setNewCapacity] = useState("100");
  const [newSprintId, setNewSprintId] = useState("");
  const [newPoints, setNewPoints] = useState("");

  const avgVelocity =
    velocityHistory.length > 0
      ? Math.round(
          velocityHistory.reduce((s, v) => s + v.completed_points, 0) /
            velocityHistory.length
        )
      : 0;

  const totalCapacity = members.reduce((s, m) => s + m.capacity_pct, 0);

  const handleAddMember = () => {
    if (!newName.trim()) return;
    onAddMember({
      name: newName.trim(),
      capacity_pct: Math.min(100, Math.max(0, parseInt(newCapacity) || 100)),
    });
    setNewName("");
    setNewCapacity("100");
  };

  const handleAddVelocity = () => {
    if (!newSprintId.trim() || !newPoints.trim()) return;
    onAddVelocity({
      sprint_id: newSprintId.trim(),
      completed_points: parseInt(newPoints) || 0,
    });
    setNewSprintId("");
    setNewPoints("");
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="border-border/60 bg-card/50">
            <CardContent className="p-3 text-center">
              <Users className="mx-auto mb-1 size-4 text-muted-foreground" />
              <p className="text-lg font-semibold">{members.length}</p>
              <p className="text-[10px] text-muted-foreground">Members</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/50">
            <CardContent className="p-3 text-center">
              <Calendar className="mx-auto mb-1 size-4 text-muted-foreground" />
              <p className="text-lg font-semibold">{sprintDuration}d</p>
              <p className="text-[10px] text-muted-foreground">Duration</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/50">
            <CardContent className="p-3 text-center">
              <TrendingUp className="mx-auto mb-1 size-4 text-muted-foreground" />
              <p className="text-lg font-semibold">{avgVelocity}</p>
              <p className="text-[10px] text-muted-foreground">Avg Velocity</p>
            </CardContent>
          </Card>
        </div>

        {/* Sprint duration */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium">Sprint Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={30}
                value={sprintDuration}
                onChange={(e) => onUpdateDuration(parseInt(e.target.value) || 10)}
                className="h-8 w-20 text-xs"
              />
              <span className="text-xs text-muted-foreground">working days</span>
            </div>
          </CardContent>
        </Card>

        {/* Team members */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium">
              Team Members
              {totalCapacity > 0 && (
                <span className="ml-2 font-normal text-muted-foreground">
                  ({totalCapacity}% total capacity)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {members.map((m) => (
              <div
                key={m.name}
                className="group flex items-center justify-between rounded-md border border-border/40 px-3 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-xs">{m.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Progress value={m.capacity_pct} className="h-1.5 w-12" />
                    <span className="w-8 text-right font-mono text-[10px] text-muted-foreground">
                      {m.capacity_pct}%
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveMember(m.name)}
                    className="text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-1 pt-1">
              <Input
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-7 flex-1 text-xs"
                onKeyDown={(e) =>
                  e.key === "Enter" && newName.trim() && handleAddMember()
                }
              />
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="%"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                className="h-7 w-14 text-xs"
              />
              <Button
                size="icon-xs"
                variant="outline"
                onClick={handleAddMember}
                disabled={!newName.trim()}
              >
                <Plus className="size-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Velocity history */}
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium">Velocity History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {velocityHistory.length > 0 && (
              <div className="space-y-1">
                {velocityHistory.map((v) => (
                  <div
                    key={v.sprint_id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-muted-foreground">{v.sprint_id}</span>
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {v.completed_points} pts
                    </Badge>
                  </div>
                ))}
                <Separator className="my-1" />
                <div className="flex items-center justify-between text-xs font-medium">
                  <span>Average</span>
                  <span className="font-mono">{avgVelocity} pts</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1 pt-1">
              <Input
                placeholder="Sprint name"
                value={newSprintId}
                onChange={(e) => setNewSprintId(e.target.value)}
                className="h-7 flex-1 text-xs"
              />
              <Input
                type="number"
                min={0}
                placeholder="Pts"
                value={newPoints}
                onChange={(e) => setNewPoints(e.target.value)}
                className="h-7 w-14 text-xs"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  newSprintId.trim() &&
                  newPoints.trim() &&
                  handleAddVelocity()
                }
              />
              <Button
                size="icon-xs"
                variant="outline"
                onClick={handleAddVelocity}
                disabled={!newSprintId.trim() || !newPoints.trim()}
              >
                <Plus className="size-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
