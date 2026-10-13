import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";

export async function GET() {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { leads } = await CrmStore.getLeads(session.organization.id, { limit: 1000 });

    const headers = [
      "Lead Title",
      "Stage",
      "Source",
      "Contact First Name",
      "Contact Last Name",
      "Phone",
      "Email",
      "Interested Property",
      "Budget Min",
      "Budget Max",
      "Created At",
    ];

    const escapeCsv = (str?: string | number | null) => {
      if (str === undefined || str === null) return '""';
      const clean = String(str).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const csvLines = [headers.join(",")];
    for (const lead of leads) {
      csvLines.push(
        [
          escapeCsv(lead.title),
          escapeCsv(lead.stage),
          escapeCsv(lead.source),
          escapeCsv(lead.contact?.firstName),
          escapeCsv(lead.contact?.lastName),
          escapeCsv(lead.contact?.phone),
          escapeCsv(lead.contact?.email),
          escapeCsv(lead.property?.title),
          escapeCsv(lead.budgetMin),
          escapeCsv(lead.budgetMax),
          escapeCsv(lead.createdAt),
        ].join(",")
      );
    }

    const csvContent = csvLines.join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="skyvista-leads-export-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to export CSV" }, { status: 500 });
  }
}
