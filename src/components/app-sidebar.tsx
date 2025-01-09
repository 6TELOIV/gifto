import * as React from "react";
import { NavUser } from "@/src/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/src/components/ui/sidebar";
import { EventSwitcher } from "./event-switcher";
import { Button } from "./ui/button";
import { signInAction } from "../actions/session";
import { sessionUser } from "../auth/sessionUser";
import { NavMain } from "./nav-main";
import { Grid3x3, LayoutDashboard, ListChecks } from "lucide-react";
import { db } from "../db";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await sessionUser();

  const userDoc = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user?.id ?? ""),
    with: {
      usersToEvents: {
        with: {
          event: true,
        },
      },
    },
  });

  console.log(userDoc?.usersToEvents);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <EventSwitcher
          events={[
            {
              name: "2024 GIFT(O) !!!",
              icon: "Gift",
              active: true,
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={[
            {
              title: "Dashboard",
              url: "/dashboard",
              icon: LayoutDashboard,
            },
            {
              title: "Cards",
              url: "/dashboard/cards",
              icon: Grid3x3,
            },
            {
              title: "Shopping List",
              url: "/dashboard/shopping",
              icon: ListChecks,
            },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser user={user} />
        ) : (
          <form action={signInAction}>
            <Button>Sign in</Button>
          </form>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
