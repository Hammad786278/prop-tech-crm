import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { taskSchema } from "@/lib/validation/schemas";

export async function GET(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    let assignedUserId = searchParams.get("userId") || undefined;
    const status = searchParams.get("status") || undefined;

    if (session.role === "sales_agent") {
      assignedUserId = session.user.id;
    }

    const tasks = await CrmStore.getTasks(session.organization.id, {
      assignedUserId,
      status,
    });

    return NextResponse.json({ tasks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = taskSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid data" }, { status: 400 });
    }

    const task = await CrmStore.createTask(
      session.organization.id,
      {
        title: parsed.data.title,
        description: parsed.data.description,
        contactId: parsed.data.contactId || undefined,
        leadId: parsed.data.leadId || undefined,
        assignedUserId: parsed.data.assignedUserId || session.user.id,
        dueDate: parsed.data.dueDate,
        priority: parsed.data.priority,
        status: parsed.data.status,
        createdBy: session.user.id,
      },
      session.user.id
    );

    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create task" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const updated = await CrmStore.updateTask(session.organization.id, id, updates, session.user.id);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update task" }, { status: 500 });
  }
}
