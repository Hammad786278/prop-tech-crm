import { describe, it, expect } from "vitest";
import { hasPermission } from "@/lib/auth/session";
import type { UserRole } from "@/types";

describe("Role-Based Access Control (RBAC) Permissions", () => {
  it("enforces Agency Owner permissions across all administrative actions", () => {
    const owner: UserRole = "agency_owner";
    expect(hasPermission(owner, ["agency_owner"])).toBe(true);
    expect(hasPermission(owner, ["agency_owner", "sales_manager"])).toBe(true);
  });

  it("prevents Sales Agents from modifying team members or organization settings", () => {
    const agent: UserRole = "sales_agent";
    expect(hasPermission(agent, ["agency_owner"])).toBe(false);
    expect(hasPermission(agent, ["agency_owner", "sales_manager"])).toBe(false);
  });

  it("allows Sales Managers to assign leads and view agency reports", () => {
    const manager: UserRole = "sales_manager";
    expect(hasPermission(manager, ["agency_owner", "sales_manager"])).toBe(true);
  });

  it("allows Property Managers to manage property inventory", () => {
    const propMan: UserRole = "property_manager";
    expect(hasPermission(propMan, ["agency_owner", "sales_manager", "property_manager"])).toBe(
      true
    );
    // But cannot manage user memberships
    expect(hasPermission(propMan, ["agency_owner"])).toBe(false);
  });
});
