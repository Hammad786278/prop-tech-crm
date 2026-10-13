import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { contactSchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const contactType = searchParams.get("type") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const result = await CrmStore.getContacts(session.organization.id, {
      search,
      contactType,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    // Check duplicate
    const duplicate = await CrmStore.findDuplicateContact(
      session.organization.id,
      parsed.data.phone,
      parsed.data.email
    );

    if (duplicate && !body.forceCreate) {
      return NextResponse.json(
        {
          duplicateWarning: true,
          duplicateContact: duplicate,
          message: `A contact with phone ${parsed.data.phone} already exists (${duplicate.firstName} ${duplicate.lastName}).`,
        },
        { status: 409 }
      );
    }

    const contact = await CrmStore.createContact(
      session.organization.id,
      {
        ...parsed.data,
        preferredLanguage: parsed.data.preferredLanguage || "Urdu",
        createdBy: session.user.id,
      },
      session.user.id
    );

    return NextResponse.json(contact, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create contact" }, { status: 500 });
  }
}
