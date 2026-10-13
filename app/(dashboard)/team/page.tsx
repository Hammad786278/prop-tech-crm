import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { TeamClient } from "./team-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Users & Team — PropTech CRM",
};

export default async function TeamPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  if (session.role === "sales_agent" || session.role === "property_manager") {
    redirect("/unauthorized");
  }

  const members = await CrmStore.getOrganizationMembers(session.organization.id);

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <TeamClient
        initialMembers={members}
        currentUserId={session.user.id}
        role={session.role}
      />
    </AppShell>
  );
}
