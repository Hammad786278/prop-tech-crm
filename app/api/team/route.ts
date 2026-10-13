import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { inviteUserSchema } from "@/lib/validation/schemas";

export async function GET() {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const members = await CrmStore.getOrganizationMembers(session.organization.id);
    return NextResponse.json({ members });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role !== "agency_owner") {
      return NextResponse.json({ error: "Forbidden: Only Agency Owners can invite new team members" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = inviteUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    const member = await CrmStore.inviteMember(
      session.organization.id,
      parsed.data.email,
      parsed.data.fullName,
      parsed.data.role
    );

    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to invite member" }, { status: 500 });
  }
}
