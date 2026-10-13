import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import type { PropertyStatus } from "@/types";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role === "sales_agent") {
      return NextResponse.json({ error: "Forbidden: Sales Agents cannot change property status" }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;

    if (!["available", "reserved", "sold"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await CrmStore.updatePropertyStatus(
      session.organization.id,
      params.id,
      status as PropertyStatus,
      session.user.id
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update property status" }, { status: 500 });
  }
}
