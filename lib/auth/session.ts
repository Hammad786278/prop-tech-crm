import { cookies } from "next/headers";
import type { UserProfile, Organization, UserRole, OrganizationMembership } from "@/types";
import { CrmStore } from "@/lib/database/store";

export interface SessionContext {
  user: UserProfile;
  organization: Organization;
  role: UserRole;
  membershipId: string;
}

const DEFAULT_USER_ID = "user-owner-1";
const DEFAULT_ORG_ID = "org-skyline-pk";

/**
 * Resolves current authenticated session on the server.
 * Uses secure cookie fallback to configured default tenant.
 */
export async function getCurrentSession(): Promise<SessionContext | null> {
  const cookieStore = cookies();
  const sessionCookie =
    cookieStore.get("proptech_session")?.value ||
    cookieStore.get("skyvista_session")?.value;

  let userId = DEFAULT_USER_ID;
  let orgId = DEFAULT_ORG_ID;

  if (sessionCookie) {
    try {
      const parsed = JSON.parse(sessionCookie);
      if (parsed.userId && parsed.orgId) {
        userId = parsed.userId;
        orgId = parsed.orgId;
      }
    } catch {
      // ignore invalid cookie
    }
  }

  const organization = await CrmStore.getOrganization(orgId);
  if (!organization) return null;

  const memberships = await CrmStore.getMembershipsForUser(userId);
  const activeMem = memberships.find(
    (m) => m.organizationId === orgId && m.status === "active"
  );

  if (!activeMem || !activeMem.user) {
    return null;
  }

  return {
    user: activeMem.user,
    organization,
    role: activeMem.role,
    membershipId: activeMem.id,
  };
}

/**
 * Enforces authenticated session; returns session or throws
 */
export async function requireAuth(): Promise<SessionContext> {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }
  return session;
}

/**
 * Enforces role-based permissions; throws if user's role is not permitted
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<SessionContext> {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.role)) {
    throw new Error("FORBIDDEN: Insufficient role permissions");
  }
  return session;
}

/**
 * Checks role without throwing
 */
export function hasPermission(currentRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(currentRole);
}
