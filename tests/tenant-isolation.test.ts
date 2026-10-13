import { describe, it, expect, beforeEach } from "vitest";
import { CrmStore } from "@/lib/database/store";

describe("Multi-Tenant Data Isolation & Security", () => {
  const orgA = "org-skyline-pk"; // Skyline Horizon Real Estate
  const orgB = "org-apex-isb";    // Apex Towers Realty

  beforeEach(() => {
    CrmStore._resetForTesting();
  });

  it("Organization A cannot see contacts belonging to Organization B", async () => {
    const orgAContacts = await CrmStore.getContacts(orgA);
    const orgBContacts = await CrmStore.getContacts(orgB);

    expect(orgAContacts.total).toBeGreaterThan(0);
    expect(orgBContacts.total).toBeGreaterThan(0);

    // Ensure none of Org B contacts appear in Org A results
    const orgBIds = orgBContacts.contacts.map((c) => c.id);
    for (const contact of orgAContacts.contacts) {
      expect(orgBIds).not.toContain(contact.id);
      expect(contact.organizationId).toBe(orgA);
    }
  });

  it("Organization A cannot read or update a specific contact from Organization B", async () => {
    const orgBContacts = await CrmStore.getContacts(orgB);
    const targetContact = orgBContacts.contacts[0];

    // Attempt to fetch Org B contact using Org A context
    const crossTenantFetch = await CrmStore.getContactById(orgA, targetContact.id);
    expect(crossTenantFetch).toBeNull();

    // Attempt to update Org B contact using Org A context
    await expect(
      CrmStore.updateContact(orgA, targetContact.id, { firstName: "Hacked" })
    ).rejects.toThrow("Contact not found in organization");
  });

  it("Organization A cannot see or mutate properties belonging to Organization B", async () => {
    const orgBProps = await CrmStore.getProperties(orgB);
    const targetProp = orgBProps.properties[0];

    // Attempt to fetch Org B property using Org A context
    const crossTenantFetch = await CrmStore.getPropertyById(orgA, targetProp.id);
    expect(crossTenantFetch).toBeNull();

    // Attempt to update status across tenant boundary
    await expect(
      CrmStore.updatePropertyStatus(orgA, targetProp.id, "sold")
    ).rejects.toThrow("Property not found in organization");
  });

  it("Organization A cannot access leads belonging to Organization B", async () => {
    const orgBLeads = await CrmStore.getLeads(orgB);
    const targetLead = orgBLeads.leads[0];

    const crossTenantFetch = await CrmStore.getLeadById(orgA, targetLead.id);
    expect(crossTenantFetch).toBeNull();

    await expect(
      CrmStore.updateLeadStage(orgA, targetLead.id, "closed_won")
    ).rejects.toThrow("Lead not found in organization");
  });

  it("Duplicate contact lookup is strictly tenant-scoped", async () => {
    // Rashid Minhas exists in Org B with phone +92 302 4433221
    const duplicateInOrgB = await CrmStore.findDuplicateContact(orgB, "+92 302 4433221");
    expect(duplicateInOrgB).not.toBeNull();

    // The exact same phone searched in Org A must return null
    const duplicateInOrgA = await CrmStore.findDuplicateContact(orgA, "+92 302 4433221");
    expect(duplicateInOrgA).toBeNull();
  });
});
