import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { PropertyDetailClient } from "./property-detail-client";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "Property Details — SkyVista CRM",
};

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const property = await CrmStore.getPropertyById(session.organization.id, params.id);
  if (!property) notFound();

  const { leads } = await CrmStore.getLeads(session.organization.id, { propertyId: params.id });
  const activities = await CrmStore.getActivities(session.organization.id, params.id);

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <PropertyDetailClient
        property={property}
        leads={leads}
        activities={activities}
        role={session.role}
      />
    </AppShell>
  );
}
