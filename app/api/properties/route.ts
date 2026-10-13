import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { propertySchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;
    const propertyType = searchParams.get("type") || undefined;
    const city = searchParams.get("city") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const result = await CrmStore.getProperties(session.organization.id, {
      search,
      status,
      propertyType,
      city,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Role check: Only Owner, Manager, or Property Manager can create properties
    if (session.role === "sales_agent") {
      return NextResponse.json({ error: "Forbidden: Sales Agents cannot create properties" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = propertySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    const property = await CrmStore.createProperty(
      session.organization.id,
      {
        ...parsed.data,
        currency: parsed.data.currency || "PKR",
        createdBy: session.user.id,
      },
      session.user.id
    );

    return NextResponse.json(property, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create property" }, { status: 500 });
  }
}
