import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { leadSchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const stage = searchParams.get("stage") || undefined;
    const source = searchParams.get("source") || undefined;
    let agentId = searchParams.get("agentId") || undefined;
    const propertyId = searchParams.get("propertyId") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    // If user is sales_agent, they can only view leads assigned to them unless specified
    if (session.role === "sales_agent") {
      agentId = session.user.id;
    }

    const result = await CrmStore.getLeads(session.organization.id, {
      search,
      stage,
      source,
      agentId,
      propertyId,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    let contactId = body.contactId;

    // If contactId is not provided, create contact inline
    if (!contactId && body.firstName && body.lastName && body.phone) {
      // Check duplicate contact first
      const duplicate = await CrmStore.findDuplicateContact(
        session.organization.id,
        body.phone,
        body.email
      );

      if (duplicate && !body.forceCreate) {
        return NextResponse.json(
          {
            duplicateWarning: true,
            duplicateContact: duplicate,
            message: `A contact with phone ${body.phone} already exists (${duplicate.firstName} ${duplicate.lastName}). Link this inquiry or confirm duplicate.`,
          },
          { status: 409 }
        );
      }

      if (duplicate && body.forceCreate) {
        contactId = duplicate.id;
      } else {
        const newContact = await CrmStore.createContact(
          session.organization.id,
          {
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,
            email: body.email,
            contactType: "buyer",
            preferredLanguage: "Urdu",
            notes: body.notes,
            createdBy: session.user.id,
          },
          session.user.id
        );
        contactId = newContact.id;
      }
    }

    if (!contactId) {
      return NextResponse.json({ error: "Please select an existing contact or enter contact details" }, { status: 400 });
    }

    const parsed = leadSchema.safeParse({ ...body, contactId });
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    const lead = await CrmStore.createLead(
      session.organization.id,
      {
        contactId,
        title: parsed.data.title,
        source: parsed.data.source,
        sourceDetails: parsed.data.sourceDetails,
        campaignName: parsed.data.campaignName,
        propertyId: parsed.data.propertyId || undefined,
        propertyTypePreference: parsed.data.propertyTypePreference as any,
        budgetMin: parsed.data.budgetMin || undefined,
        budgetMax: parsed.data.budgetMax || undefined,
        preferredLocation: parsed.data.preferredLocation,
        intendedUse: parsed.data.intendedUse as any,
        purchaseTimeline: parsed.data.purchaseTimeline as any,
        financingPreference: parsed.data.financingPreference as any,
        stage: parsed.data.stage,
        assignedAgentId: parsed.data.assignedAgentId || undefined,
        notes: parsed.data.notes,
        createdBy: session.user.id,
      },
      session.user.id
    );

    return NextResponse.json(lead, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create lead" }, { status: 500 });
  }
}
