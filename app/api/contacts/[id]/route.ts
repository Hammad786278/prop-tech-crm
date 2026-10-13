import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { contactSchema } from "@/lib/validation/schemas";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contact = await CrmStore.getContactById(session.organization.id, params.id);
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    // Related leads
    const { leads } = await CrmStore.getLeads(session.organization.id, { contactId: params.id });
    const activities = await CrmStore.getActivities(session.organization.id, params.id);

    return NextResponse.json({ contact, leads, activities });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch contact" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = contactSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    const updated = await CrmStore.updateContact(
      session.organization.id,
      params.id,
      parsed.data,
      session.user.id
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update contact" }, { status: 500 });
  }
}
