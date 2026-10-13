import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";

export async function GET() {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await CrmStore.getNotifications(
      session.organization.id,
      session.user.id
    );

    return NextResponse.json({ notifications });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { notificationId, markAll } = body;

    if (markAll) {
      await CrmStore.markAllNotificationsRead(session.organization.id, session.user.id);
      return NextResponse.json({ success: true });
    }

    if (notificationId) {
      await CrmStore.markNotificationRead(notificationId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update notifications" }, { status: 500 });
  }
}
