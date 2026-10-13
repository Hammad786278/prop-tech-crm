import { describe, it, expect, beforeEach } from "vitest";
import { CrmStore } from "@/lib/database/store";

describe("Pipeline Stage Transitions & Closed Lost Logging", () => {
  const orgId = "org-skyline-pk";

  beforeEach(() => {
    CrmStore._resetForTesting();
  });

  it("updates lead stage and records an immutable stage transition history entry", async () => {
    const { leads } = await CrmStore.getLeads(orgId, { limit: 1 });
    const lead = leads[0];
    const initialStage = lead.stage;

    const updated = await CrmStore.updateLeadStage(
      orgId,
      lead.id,
      "visit_scheduled",
      "Client agreed to Sunday site visit",
      "user-agent-1"
    );

    expect(updated.stage).toBe("visit_scheduled");

    // Verify stage history audit
    const history = await CrmStore.getLeadStageHistory(orgId, lead.id);
    expect(history.length).toBeGreaterThan(0);
    const latestEvent = history[0];
    expect(latestEvent.fromStage).toBe(initialStage);
    expect(latestEvent.toStage).toBe("visit_scheduled");
    expect(latestEvent.reason).toBe("Client agreed to Sunday site visit");
    expect(latestEvent.changedBy).toBe("user-agent-1");
  });

  it("captures closed-lost reason when deal is marked lost", async () => {
    const { leads } = await CrmStore.getLeads(orgId, { limit: 1 });
    const lead = leads[0];

    const updated = await CrmStore.updateLeadStage(
      orgId,
      lead.id,
      "closed_lost",
      "Budget Mismatch - Client purchased in Bahria Enclave instead",
      "user-manager-1"
    );

    expect(updated.stage).toBe("closed_lost");
    expect(updated.closedLostReason).toBe(
      "Budget Mismatch - Client purchased in Bahria Enclave instead"
    );

    const history = await CrmStore.getLeadStageHistory(orgId, lead.id);
    expect(history[0].toStage).toBe("closed_lost");
  });
});
