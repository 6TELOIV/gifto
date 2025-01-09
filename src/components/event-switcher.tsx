"use client";

import * as React from "react";
import Icon, { IconName } from "./ui/icon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/components/ui/sidebar";

import { redirect } from "next/navigation";

export function EventSwitcher({
  events,
}: {
  events: {
    name: string;
    icon: IconName;
    active: boolean;
  }[];
}) {
  const { isMobile } = useSidebar();
  const activeEvent = events.find((e) => e.active);

  if (!activeEvent) {
    redirect("/dashboard");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Icon name={activeEvent.icon} size={24} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeEvent.name}
                </span>
              </div>
              <Icon name="ChevronsUpDown" className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Events
            </DropdownMenuLabel>
            {events.map((event) => (
              <DropdownMenuItem key={event.name} className="gap-2 p-2" asChild>
                <a href={`/dashboard/${event}`}>
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <Icon name={event.icon} size={16} />
                  </div>
                  {event.name}
                </a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Icon name="Plus" className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add event</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
