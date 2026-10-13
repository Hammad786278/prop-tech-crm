import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { ContactsClient } from "./contacts-client";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Contacts — PropTech CRM",
};

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: { search?: string; type?: string; page?: string };
}) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const search = searchParams.search;
  const contactType = searchParams.type;
  const page = parseInt(searchParams.page || "1", 10);

  const { contacts, total } = await CrmStore.getContacts(session.organization.id, {
    search,
    contactType,
    page,
    limit: 15,
  });

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <ContactsClient
        initialContacts={contacts}
        total={total}
        currentPage={page}
        role={session.role}
      />
    </AppShell>
  );
}
