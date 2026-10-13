import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CrmStore } from "@/lib/database/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, orgId, email } = body;

    let targetUserId = userId;
    let targetOrgId = orgId || "org-skyline-pk";

    // If logging in via email
    if (email && !userId) {
      const members = await CrmStore.getOrganizationMembers(targetOrgId);
      const match = members.find((m) => m.user?.email.toLowerCase() === email.toLowerCase());
      if (match) {
        targetUserId = match.userId;
      } else {
        return NextResponse.json(
          { error: "Invalid credentials or user not found in agency" },
          { status: 401 }
        );
      }
    }

    if (!targetUserId) {
      targetUserId = "user-owner-1";
    }

    const sessionData = JSON.stringify({ userId: targetUserId, orgId: targetOrgId });
    const cookieOpts = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    };
    cookies().set("proptech_session", sessionData, cookieOpts);
    cookies().set("skyvista_session", sessionData, cookieOpts);

    return NextResponse.json({ success: true, userId: targetUserId, orgId: targetOrgId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to authenticate" }, { status: 500 });
  }
}
