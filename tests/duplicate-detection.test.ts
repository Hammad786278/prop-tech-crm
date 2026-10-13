import { describe, it, expect, beforeEach } from "vitest";
import { normalizePhoneNumber, normalizeEmail } from "@/lib/utils";
import { CrmStore } from "@/lib/database/store";

describe("Phone & Email Normalization and Duplicate Detection", () => {
  const orgId = "org-skyline-pk";

  beforeEach(() => {
    CrmStore._resetForTesting();
  });

  it("correctly normalizes diverse Pakistan phone number formats", () => {
    expect(normalizePhoneNumber("+92 300 8456123")).toBe("923008456123");
    expect(normalizePhoneNumber("0300-8456123")).toBe("923008456123");
    expect(normalizePhoneNumber("0092 300 8456123")).toBe("923008456123");
    expect(normalizePhoneNumber("923008456123")).toBe("923008456123");
    expect(normalizePhoneNumber("+92 (300) 845-6123")).toBe("923008456123");
  });

  it("normalizes email addresses by trimming and lowercasing", () => {
    expect(normalizeEmail("  Dr.Salman.Raza@Gmail.COM  ")).toBe("dr.salman.raza@gmail.com");
    expect(normalizeEmail("")).toBe("");
    expect(normalizeEmail(undefined)).toBe("");
  });

  it("detects existing contact by formatted or unformatted phone number", async () => {
    // Contact 1 has phone: "+92 300 8456123"
    const duplicateByLocalZeroFormat = await CrmStore.findDuplicateContact(
      orgId,
      "0300-8456123"
    );
    expect(duplicateByLocalZeroFormat).not.toBeNull();
    expect(duplicateByLocalZeroFormat?.firstName).toBe("Dr. Salman");

    const duplicateByPlusFormat = await CrmStore.findDuplicateContact(
      orgId,
      "+92 300 8456123"
    );
    expect(duplicateByPlusFormat).not.toBeNull();
  });

  it("detects existing contact by email address", async () => {
    const duplicateByEmail = await CrmStore.findDuplicateContact(
      orgId,
      "+92 300 9999999", // different phone
      "dr.salman.raza@gmail.com" // same email
    );
    expect(duplicateByEmail).not.toBeNull();
    expect(duplicateByEmail?.firstName).toBe("Dr. Salman");
  });

  it("returns null when no duplicate contact exists", async () => {
    const freshContact = await CrmStore.findDuplicateContact(
      orgId,
      "+92 311 0000000",
      "brand.new@investor.pk"
    );
    expect(freshContact).toBeNull();
  });
});
