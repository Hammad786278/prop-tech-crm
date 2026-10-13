import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import type { CSVImportRow } from "@/types";

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role === "sales_agent") {
      return NextResponse.json({ error: "Forbidden: Only Managers and Owners can perform bulk CSV import" }, { status: 403 });
    }

    const body = await request.json();
    const rows: CSVImportRow[] = body.rows;

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: "No data rows provided for import" }, { status: 400 });
    }

    if (rows.length > 500) {
      return NextResponse.json({ error: "Import batches cannot exceed 500 rows at a time" }, { status: 400 });
    }

    const result = await CrmStore.importCSV(session.organization.id, rows, session.user.id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to import CSV" }, { status: 500 });
  }
}
