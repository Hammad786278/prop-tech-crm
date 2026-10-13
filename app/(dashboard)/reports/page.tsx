import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { ReportsClient } from "./reports-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reports & Analytics — SkyVista CRM",
};

export default async function ReportsPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  if (session.role === "sales_agent") {
    redirect("/unauthorized");
  }

  const metrics = await CrmStore.getDashboardMetrics(session.organization.id);
  const { properties } = await CrmStore.getProperties(session.organization.id, { limit: 100 });
  const teamMembers = await CrmStore.getOrganizationMembers(session.organization.id);
  const appointments = await CrmStore.getAppointments(session.organization.id);
  const { leads } = await CrmStore.getLeads(session.organization.id, { limit: 500 });

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <ReportsClient
        metrics={metrics}
        properties={properties}
        teamMembers={teamMembers}
        appointments={appointments}
        leads={leads}
      />
    </AppShell>
  );
}
