import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { TasksClient } from "./tasks-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Tasks & Appointments — SkyVista CRM",
};

export default async function TasksPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  let userFilter: string | undefined;
  if (session.role === "sales_agent") {
    userFilter = session.user.id;
  }

  const tasks = await CrmStore.getTasks(session.organization.id, {
    assignedUserId: userFilter,
  });

  const appointments = await CrmStore.getAppointments(session.organization.id, {
    assignedAgentId: userFilter,
  });

  const { contacts } = await CrmStore.getContacts(session.organization.id, { limit: 100 });
  const { properties } = await CrmStore.getProperties(session.organization.id, { limit: 100 });
  const { leads } = await CrmStore.getLeads(session.organization.id, { limit: 100 });

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <TasksClient
        initialTasks={tasks}
        initialAppointments={appointments}
        contacts={contacts}
        properties={properties}
        leads={leads}
        role={session.role}
      />
    </AppShell>
  );
}
