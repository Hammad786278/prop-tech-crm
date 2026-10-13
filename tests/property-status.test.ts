import { describe, it, expect, beforeEach } from "vitest";
import { CrmStore } from "@/lib/database/store";

describe("Property Inventory Status Transitions & Auditing", () => {
  const orgId = "org-skyline-pk";

  beforeEach(() => {
    CrmStore._resetForTesting();
  });

  it("transitions property status from available to reserved and sold", async () => {
    const { properties } = await CrmStore.getProperties(orgId, { status: "available" });
    const property = properties[0];

    // 1. Move to Reserved
    const reserved = await CrmStore.updatePropertyStatus(
      orgId,
      property.id,
      "reserved",
      "user-propman-1"
    );
    expect(reserved.status).toBe("reserved");
    expect(reserved.lastAvailabilityUpdate).toBeDefined();

    // 2. Move to Sold
    const sold = await CrmStore.updatePropertyStatus(
      orgId,
      property.id,
      "sold",
      "user-propman-1"
    );
    expect(sold.status).toBe("sold");

    // 3. Verify audit event was logged
    const auditEvents = await CrmStore.getAuditEvents(orgId);
    const statusChangeEvents = auditEvents.filter(
      (a) => a.action === "PROPERTY_STATUS_CHANGED" && a.targetId === property.id
    );
    expect(statusChangeEvents.length).toBe(2);
  });
});
