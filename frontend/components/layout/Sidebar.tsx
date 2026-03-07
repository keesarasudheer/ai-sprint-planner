"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  LayoutList,
  BarChart3,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  deferred?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "Sprint Planning",
    href: "/sprint",
    icon: MessageSquare,
  },
  {
    label: "Backlog",
    href: "#",
    icon: LayoutList,
    deferred: true,
  },
  {
    label: "Analytics",
    href: "#",
    icon: BarChart3,
    deferred: true,
  },
  {
    label: "Settings",
    href: "#",
    icon: Settings,
    deferred: true,
  },
];

export function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-sidebar">
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.deferred ? "#" : item.href}
                aria-disabled={item.deferred}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  item.deferred &&
                    "pointer-events-none opacity-50 cursor-default"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.deferred && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-[10px] px-1.5 py-0"
                  >
                    Soon
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        <div className="px-3">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            AI-powered sprint planning with multi-agent coordination.
          </p>
        </div>
      </ScrollArea>
    </aside>
  );
}
