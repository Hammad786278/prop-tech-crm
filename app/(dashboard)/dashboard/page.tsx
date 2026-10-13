import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { DashboardClient } from "./dashboard-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard — SkyVista CRM",
};

export default async function DashboardPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }

  const metrics = await CrmStore.getDashboardMetrics(session.organization.id);
  const { contacts } = await CrmStore.getContacts(session.organization.id, { limit: 100 });
  const { properties } = await CrmStore.getProperties(session.organization.id, { limit: 100 });
  const teamMembers = await CrmStore.getOrganizationMembers(session.organization.id);

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <DashboardClient
        initialMetrics={metrics}
        contacts={contacts}
        properties={properties}
        teamMembers={teamMembers}
        role={session.role}
        orgName={session.organization.name}
      />
    </AppShell>
  );
}
