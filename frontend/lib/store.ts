"use client";

import { useState, useCallback, useMemo } from "react";
import type { BacklogItem, RefinedStory, EstimatedStory } from "./types/story";
import type { TeamMember, VelocityRecord } from "./types/sprint";

export interface Sprint {
  id: string;
  name: string;
  duration_days: number;
  status: "planning" | "active" | "completed";
  story_ids: string[];
  total_points: number;
}

export interface PlanningState {
  backlogItems: BacklogItem[];
  refinedStories: RefinedStory[];
  estimatedStories: EstimatedStory[];
  sprints: Sprint[];
  team: {
    members: TeamMember[];
    sprint_duration_days: number;
    velocity_history: VelocityRecord[];
  };
  activeSprint: string | null;
  selectedBacklogIds: string[];
}

const initialState: PlanningState = {
  backlogItems: [],
  refinedStories: [],
  estimatedStories: [],
  sprints: [],
  team: {
    members: [],
    sprint_duration_days: 10,
    velocity_history: [],
  },
  activeSprint: null,
  selectedBacklogIds: [],
};

let nextId = 1;
function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${nextId++}`;
}

export function usePlanningStore(initial?: Partial<PlanningState>) {
  const [state, setState] = useState<PlanningState>({
    ...initialState,
    ...initial,
  });

  const addBacklogItem = useCallback(
    (item: Omit<BacklogItem, "id">) => {
      const newItem: BacklogItem = { ...item, id: generateId("bl") };
      setState((s) => ({
        ...s,
        backlogItems: [...s.backlogItems, newItem],
      }));
      return newItem;
    },
    []
  );

  const updateBacklogItem = useCallback(
    (id: string, updates: Partial<Omit<BacklogItem, "id">>) => {
      setState((s) => ({
        ...s,
        backlogItems: s.backlogItems.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      }));
    },
    []
  );

  const removeBacklogItem = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      backlogItems: s.backlogItems.filter((item) => item.id !== id),
      selectedBacklogIds: s.selectedBacklogIds.filter((sid) => sid !== id),
    }));
  }, []);

  const toggleBacklogSelection = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selectedBacklogIds: s.selectedBacklogIds.includes(id)
        ? s.selectedBacklogIds.filter((sid) => sid !== id)
        : [...s.selectedBacklogIds, id],
    }));
  }, []);

  const selectAllBacklog = useCallback(() => {
    setState((s) => ({
      ...s,
      selectedBacklogIds: s.backlogItems.map((item) => item.id),
    }));
  }, []);

  const clearBacklogSelection = useCallback(() => {
    setState((s) => ({ ...s, selectedBacklogIds: [] }));
  }, []);

  const addTeamMember = useCallback(
    (member: Omit<TeamMember, "name"> & { name: string }) => {
      setState((s) => ({
        ...s,
        team: { ...s.team, members: [...s.team.members, member] },
      }));
    },
    []
  );

  const removeTeamMember = useCallback((name: string) => {
    setState((s) => ({
      ...s,
      team: {
        ...s.team,
        members: s.team.members.filter((m) => m.name !== name),
      },
    }));
  }, []);

  const updateSprintDuration = useCallback((days: number) => {
    setState((s) => ({
      ...s,
      team: { ...s.team, sprint_duration_days: days },
    }));
  }, []);

  const addVelocityRecord = useCallback((record: VelocityRecord) => {
    setState((s) => ({
      ...s,
      team: {
        ...s.team,
        velocity_history: [...s.team.velocity_history, record],
      },
    }));
  }, []);

  const createSprint = useCallback((name: string) => {
    const sprint: Sprint = {
      id: generateId("sprint"),
      name,
      duration_days: 10,
      status: "planning",
      story_ids: [],
      total_points: 0,
    };
    setState((s) => ({
      ...s,
      sprints: [...s.sprints, sprint],
      activeSprint: sprint.id,
    }));
    return sprint;
  }, []);

  const setActiveSprint = useCallback((id: string | null) => {
    setState((s) => ({ ...s, activeSprint: id }));
  }, []);

  const stats = useMemo(() => {
    const totalItems = state.backlogItems.length;
    const epics = state.backlogItems.filter((i) => i.type === "epic").length;
    const stories = state.backlogItems.filter((i) => i.type === "story").length;
    const selected = state.selectedBacklogIds.length;
    const teamSize = state.team.members.length;
    const avgVelocity =
      state.team.velocity_history.length > 0
        ? Math.round(
            state.team.velocity_history.reduce(
              (sum, v) => sum + v.completed_points,
              0
            ) / state.team.velocity_history.length
          )
        : 0;
    return { totalItems, epics, stories, selected, teamSize, avgVelocity };
  }, [state]);

  return {
    state,
    stats,
    addBacklogItem,
    updateBacklogItem,
    removeBacklogItem,
    toggleBacklogSelection,
    selectAllBacklog,
    clearBacklogSelection,
    addTeamMember,
    removeTeamMember,
    updateSprintDuration,
    addVelocityRecord,
    createSprint,
    setActiveSprint,
  };
}
