import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { leadSchema } from "@/lib/validation/schemas";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lead = await CrmStore.getLeadById(session.organization.id, params.id);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Role check: if sales_agent, ensure they are assigned
    if (session.role === "sales_agent" && lead.assignedAgentId && lead.assignedAgentId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden: You do not have permission to view this lead" }, { status: 403 });
    }

    const stageHistory = await CrmStore.getLeadStageHistory(session.organization.id, params.id);
    const activities = await CrmStore.getActivities(session.organization.id, params.id);

    return NextResponse.json({ lead, stageHistory, activities });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch lead" }, { status: 500 });
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
    const parsed = leadSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    // Role check
    const existing = await CrmStore.getLeadById(session.organization.id, params.id);
    if (!existing) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (session.role === "sales_agent" && existing.assignedAgentId && existing.assignedAgentId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden: You do not have permission to update this lead" }, { status: 403 });
    }

    const updated = await CrmStore.updateLead(
      session.organization.id,
      params.id,
      parsed.data as any,
      session.user.id
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update lead" }, { status: 500 });
  }
}
