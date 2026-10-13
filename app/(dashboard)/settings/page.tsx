import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { SettingsClient } from "./settings-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Agency Settings — PropTech CRM",
};

export default async function SettingsPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const auditEvents = await CrmStore.getAuditEvents(session.organization.id);

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <SettingsClient
        organization={session.organization}
        user={session.user}
        role={session.role}
        auditEvents={auditEvents}
      />
    </AppShell>
  );
}
