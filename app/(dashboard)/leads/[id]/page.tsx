import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { LeadDetailClient } from "./lead-detail-client";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "Lead Details — PropTech CRM",
};

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const lead = await CrmStore.getLeadById(session.organization.id, params.id);
  if (!lead) notFound();

  // Role check: Sales Agents can only view assigned leads
  if (session.role === "sales_agent" && lead.assignedAgentId && lead.assignedAgentId !== session.user.id) {
    redirect("/unauthorized");
  }

  const stageHistory = await CrmStore.getLeadStageHistory(session.organization.id, params.id);
  const activities = await CrmStore.getActivities(session.organization.id, params.id);
  const teamMembers = await CrmStore.getOrganizationMembers(session.organization.id);
  const { properties } = await CrmStore.getProperties(session.organization.id, { limit: 100 });

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <LeadDetailClient
        lead={lead}
        stageHistory={stageHistory}
        activities={activities}
        teamMembers={teamMembers}
        properties={properties}
        role={session.role}
      />
    </AppShell>
  );
}
