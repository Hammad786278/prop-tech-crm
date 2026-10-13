import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { appointmentSchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    let agentId = searchParams.get("agentId") || undefined;
    const status = searchParams.get("status") || undefined;

    if (session.role === "sales_agent") {
      agentId = session.user.id;
    }

    const appointments = await CrmStore.getAppointments(session.organization.id, {
      assignedAgentId: agentId,
      status,
    });

    return NextResponse.json({ appointments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = appointmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    const appt = await CrmStore.createAppointment(
      session.organization.id,
      {
        title: parsed.data.title,
        contactId: parsed.data.contactId || undefined,
        leadId: parsed.data.leadId || undefined,
        propertyId: parsed.data.propertyId || undefined,
        assignedAgentId: parsed.data.assignedAgentId || session.user.id,
        appointmentType: parsed.data.appointmentType,
        startTime: parsed.data.startTime,
        durationMinutes: parsed.data.durationMinutes,
        location: parsed.data.location,
        status: parsed.data.status,
        outcomeNotes: parsed.data.outcomeNotes,
        createdBy: session.user.id,
      },
      session.user.id
    );

    return NextResponse.json(appt, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create appointment" }, { status: 500 });
  }
}
