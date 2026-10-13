"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import type { UserProfile, Organization, UserRole } from "@/types";

interface AppShellProps {
  user: UserProfile;
  organization: Organization;
  role: UserRole;
  children: React.ReactNode;
}

export function AppShell({ user, organization, role, children }: AppShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-row">
      <Sidebar
        role={role}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          user={user}
          organization={organization}
          role={role}
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
