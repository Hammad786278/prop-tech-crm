import { describe, it, expect, beforeEach } from "vitest";
import { CrmStore } from "@/lib/database/store";
import type { CSVImportRow } from "@/types";

describe("CSV Bulk Import Validation, Duplicate Matching & Reporting", () => {
  const orgId = "org-skyline-pk";

  beforeEach(() => {
    CrmStore._resetForTesting();
  });

  it("handles valid rows, invalid rows, and duplicate phone numbers accurately", async () => {
    const importRows: CSVImportRow[] = [
      // Row 1: Valid new contact
      {
        firstName: "Junaid",
        lastName: "Jamshed",
        phone: "+92 300 1122339",
        email: "junaid@brand.pk",
        leadTitle: "Interested in Commercial Plot DHA Phase 6",
        source: "Property Portal",
        budgetMax: 50000000,
        preferredLocation: "DHA Lahore",
      },
      // Row 2: Duplicate phone matching Dr. Salman Raza (+92 300 8456123)
      {
        firstName: "Salman",
        lastName: "Raza",
        phone: "0300-8456123", // Alternative format
        email: "dr.salman.raza@gmail.com",
        leadTitle: "Third Inquiry: Plot near Ring Road",
        source: "Website",
        budgetMax: 40000000,
      },
      // Row 3: Invalid row (missing required first and last name, invalid short phone)
      {
        firstName: "",
        lastName: "",
        phone: "123",
        leadTitle: "",
      },
    ];

    const result = await CrmStore.importCSV(orgId, importRows, "user-owner-1");

    expect(result.totalRows).toBe(3);
    // 1 brand new + 1 linked duplicate inquiry = 2 imported
    expect(result.importedCount).toBe(2);
    // 1 duplicate flagged
    expect(result.duplicateCount).toBe(1);
    expect(result.duplicates[0].phone).toBe("0300-8456123");
    expect(result.duplicates[0].contactName).toBe("Dr. Salman Raza");

    // 1 invalid row reported
    expect(result.errorCount).toBe(1);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0].row).toBe(3);
  });
});
