import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { PipelineClient } from "./pipeline-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sales Pipeline — PropTech CRM",
};

export default async function PipelinePage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  let agentFilter: string | undefined;
  if (session.role === "sales_agent") {
    agentFilter = session.user.id;
  }

  const { leads } = await CrmStore.getLeads(session.organization.id, {
    agentId: agentFilter,
    limit: 200,
  });

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <PipelineClient initialLeads={leads} role={session.role} />
    </AppShell>
  );
}
