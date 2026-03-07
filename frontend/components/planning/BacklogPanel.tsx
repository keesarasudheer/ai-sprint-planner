"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronRight,
  Layers,
  BookOpen,
  CheckCheck,
  XSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { BacklogItem } from "@/lib/types/story";

interface BacklogPanelProps {
  items: BacklogItem[];
  selectedIds: string[];
  onAdd: (item: Omit<BacklogItem, "id">) => void;
  onRemove: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

export function BacklogPanel({
  items,
  selectedIds,
  onAdd,
  onRemove,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
}: BacklogPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState<"epic" | "story">("story");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAdd({ title: newTitle.trim(), description: newDesc.trim(), type: newType });
    setNewTitle("");
    setNewDesc("");
    setNewType("story");
    setShowForm(false);
  };

  const epics = items.filter((i) => i.type === "epic");
  const stories = items.filter((i) => i.type === "story");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold">Backlog</h2>
          <p className="text-xs text-muted-foreground">
            {items.length} items &middot; {selectedIds.length} selected
          </p>
        </div>
        <div className="flex items-center gap-1">
          {items.length > 0 && (
            <>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={
                        selectedIds.length === items.length
                          ? onClearSelection
                          : onSelectAll
                      }
                    />
                  }
                >
                  {selectedIds.length === items.length ? (
                    <XSquare className="size-3.5" />
                  ) : (
                    <CheckCheck className="size-3.5" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {selectedIds.length === items.length
                    ? "Deselect all"
                    : "Select all"}
                </TooltipContent>
              </Tooltip>
            </>
          )}
          <Button
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="size-3" />
            Add
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="space-y-2 border-b border-border px-4 pb-3">
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={newType === "epic" ? "default" : "outline"}
              className="h-6 gap-1 text-[11px]"
              onClick={() => setNewType("epic")}
            >
              <Layers className="size-3" />
              Epic
            </Button>
            <Button
              size="sm"
              variant={newType === "story" ? "default" : "outline"}
              className="h-6 gap-1 text-[11px]"
              onClick={() => setNewType("story")}
            >
              <BookOpen className="size-3" />
              Story
            </Button>
          </div>
          <Input
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="h-8 text-xs"
            onKeyDown={(e) => e.key === "Enter" && newTitle.trim() && handleAdd()}
          />
          <Textarea
            placeholder="Description (optional)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="min-h-[60px] resize-none text-xs"
          />
          <div className="flex justify-end gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-7 text-xs"
              onClick={handleAdd}
              disabled={!newTitle.trim()}
            >
              Add Item
            </Button>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="space-y-1 px-3 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Layers className="mb-2 size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No backlog items yet
              </p>
              <p className="text-xs text-muted-foreground/60">
                Add epics and stories to get started
              </p>
            </div>
          ) : (
            <>
              {epics.length > 0 && (
                <div className="mb-1">
                  <p className="px-1 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Epics ({epics.length})
                  </p>
                  {epics.map((item) => (
                    <BacklogItemRow
                      key={item.id}
                      item={item}
                      selected={selectedIds.includes(item.id)}
                      expanded={expandedId === item.id}
                      onToggleSelect={() => onToggleSelect(item.id)}
                      onToggleExpand={() =>
                        setExpandedId(
                          expandedId === item.id ? null : item.id
                        )
                      }
                      onRemove={() => onRemove(item.id)}
                    />
                  ))}
                </div>
              )}
              {stories.length > 0 && (
                <div>
                  {epics.length > 0 && <Separator className="my-2" />}
                  <p className="px-1 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Stories ({stories.length})
                  </p>
                  {stories.map((item) => (
                    <BacklogItemRow
                      key={item.id}
                      item={item}
                      selected={selectedIds.includes(item.id)}
                      expanded={expandedId === item.id}
                      onToggleSelect={() => onToggleSelect(item.id)}
                      onToggleExpand={() =>
                        setExpandedId(
                          expandedId === item.id ? null : item.id
                        )
                      }
                      onRemove={() => onRemove(item.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {selectedIds.length > 0 && (
        <div className="border-t border-border bg-primary/5 px-4 py-2">
          <p className="text-xs font-medium text-primary">
            {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""}{" "}
            selected for sprint planning
          </p>
        </div>
      )}
    </div>
  );
}

function BacklogItemRow({
  item,
  selected,
  expanded,
  onToggleSelect,
  onToggleExpand,
  onRemove,
}: {
  item: BacklogItem;
  selected: boolean;
  expanded: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={cn(
        "group rounded-md border border-transparent transition-colors",
        selected && "border-primary/30 bg-primary/5"
      )}
    >
      <div className="flex items-start gap-2 px-2 py-1.5">
        <button
          onClick={onToggleSelect}
          className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground"
          aria-label={selected ? "Deselect" : "Select"}
        >
          {selected ? (
            <CheckSquare className="size-4 text-primary" />
          ) : (
            <Square className="size-4" />
          )}
        </button>

        <button
          onClick={onToggleExpand}
          className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground"
        >
          {expanded ? (
            <ChevronDown className="size-3.5" />
          ) : (
            <ChevronRight className="size-3.5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Badge
              variant="outline"
              className={cn(
                "shrink-0 text-[9px] px-1 py-0",
                item.type === "epic"
                  ? "border-violet-500/40 text-violet-400"
                  : "border-sky-500/40 text-sky-400"
              )}
            >
              {item.type}
            </Badge>
            <span className="truncate text-xs font-medium">{item.title}</span>
          </div>

          {expanded && item.description && (
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>

        <button
          onClick={onRemove}
          className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
          aria-label="Remove"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
