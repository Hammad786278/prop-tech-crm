import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import type { PipelineStage } from "@/types";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { stage, reason } = body;

    if (!stage) {
      return NextResponse.json({ error: "Stage is required" }, { status: 400 });
    }

    const updated = await CrmStore.updateLeadStage(
      session.organization.id,
      params.id,
      stage as PipelineStage,
      reason,
      session.user.id
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update lead stage" }, { status: 500 });
  }
}
