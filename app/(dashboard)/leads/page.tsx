import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { LeadsClient } from "./leads-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Leads & Inquiries — SkyVista CRM",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    stage?: string;
    source?: string;
    agentId?: string;
    page?: string;
  };
}) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  let agentFilter = searchParams.agentId;
  if (session.role === "sales_agent") {
    agentFilter = session.user.id;
  }

  const page = parseInt(searchParams.page || "1", 10);
  const { leads, total } = await CrmStore.getLeads(session.organization.id, {
    search: searchParams.search,
    stage: searchParams.stage,
    source: searchParams.source,
    agentId: agentFilter,
    page,
    limit: 25,
  });

  const { contacts } = await CrmStore.getContacts(session.organization.id, { limit: 100 });
  const { properties } = await CrmStore.getProperties(session.organization.id, { limit: 100 });
  const teamMembers = await CrmStore.getOrganizationMembers(session.organization.id);

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <LeadsClient
        initialLeads={leads}
        total={total}
        currentPage={page}
        contacts={contacts}
        properties={properties}
        teamMembers={teamMembers}
        role={session.role}
      />
    </AppShell>
  );
}
