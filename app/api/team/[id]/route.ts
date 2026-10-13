import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role !== "agency_owner") {
      return NextResponse.json({ error: "Forbidden: Only Agency Owners can update member status" }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;

    if (!["active", "deactivated"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await CrmStore.updateMemberStatus(session.organization.id, params.id, status);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update member" }, { status: 500 });
  }
}
