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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] flex flex-row transition-colors duration-200 text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white">
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

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>
    </div>
  );
}
