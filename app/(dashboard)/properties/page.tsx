import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { PropertiesClient } from "./properties-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Properties & Inventory — SkyVista CRM",
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: string; type?: string; city?: string; page?: string };
}) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const page = parseInt(searchParams.page || "1", 10);
  const { properties, total } = await CrmStore.getProperties(session.organization.id, {
    search: searchParams.search,
    status: searchParams.status,
    propertyType: searchParams.type,
    city: searchParams.city,
    page,
    limit: 20,
  });

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <PropertiesClient
        initialProperties={properties}
        total={total}
        currentPage={page}
        role={session.role}
      />
    </AppShell>
  );
}
