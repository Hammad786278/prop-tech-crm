import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("proptech_session");
  cookies().delete("skyvista_session");
  return NextResponse.json({ success: true });
}
