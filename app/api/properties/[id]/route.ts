import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { propertySchema } from "@/lib/validation/schemas";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const property = await CrmStore.getPropertyById(session.organization.id, params.id);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Associated leads/inquiries
    const { leads } = await CrmStore.getLeads(session.organization.id, { propertyId: params.id });
    const activities = await CrmStore.getActivities(session.organization.id, params.id);

    return NextResponse.json({ property, leads, activities });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch property" }, { status: 500 });
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

    if (session.role === "sales_agent") {
      return NextResponse.json({ error: "Forbidden: Sales Agents cannot edit property inventory" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = propertySchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    const prop = await CrmStore.getPropertyById(session.organization.id, params.id);
    if (!prop) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    Object.assign(prop, parsed.data);
    prop.updatedAt = new Date().toISOString();

    return NextResponse.json(prop);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update property" }, { status: 500 });
  }
}
