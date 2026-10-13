"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Menu, LogOut, ShieldCheck, ChevronDown, Building2, UserCircle } from "lucide-react";
import { GlobalSearchDialog } from "./global-search-dialog";
import { NotificationsDropdown } from "./notifications-dropdown";
import { ROLE_LABELS } from "@/lib/utils";
import type { UserProfile, Organization, UserRole } from "@/types";

interface TopNavProps {
  user: UserProfile;
  organization: Organization;
  role: UserRole;
  onToggleSidebar: () => void;
}

export function TopNav({ user, organization, role, onToggleSidebar }: TopNavProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSwitchUser = async (userId: string, roleName: string) => {
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, orgId: organization.id }),
      });
      setIsProfileOpen(false);
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur">
        {/* Left: Mobile sidebar toggle & Organization Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-navy-deep truncate max-w-[200px]">
              {organization.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
              {organization.currency}
            </span>
          </div>
        </div>

        {/* Center: Global Search trigger button */}
        <div className="flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition-all"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search leads, contacts, properties...</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 rounded text-slate-500 shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Notifications & Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NotificationsDropdown />

          {/* User profile menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-navy-deep text-white font-bold text-xs flex items-center justify-center border border-slate-800 shadow-sm">
                {user.fullName.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-bold text-navy-deep leading-tight truncate max-w-[130px]">
                  {user.fullName}
                </p>
                <p className="text-[10px] text-primary font-semibold leading-tight">
                  {ROLE_LABELS[role]}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-dropdown border border-slate-200 z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-navy-deep">{user.fullName}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-primary text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3" /> {ROLE_LABELS[role]}
                    </div>
                  </div>

                  {/* Demo Role Switcher to immediately test RBAC */}
                  <div className="p-2 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                      Quick Role Switch (Demo)
                    </p>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleSwitchUser("user-owner-1", "agency_owner")}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          role === "agency_owner"
                            ? "bg-primary text-white"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        Agency Owner
                      </button>
                      <button
                        onClick={() => handleSwitchUser("user-manager-1", "sales_manager")}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          role === "sales_manager"
                            ? "bg-primary text-white"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        Sales Manager
                      </button>
                      <button
                        onClick={() => handleSwitchUser("user-agent-1", "sales_agent")}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          role === "sales_agent"
                            ? "bg-primary text-white"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        Sales Agent
                      </button>
                      <button
                        onClick={() => handleSwitchUser("user-propman-1", "property_manager")}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          role === "property_manager"
                            ? "bg-primary text-white"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        Property Manager
                      </button>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-danger hover:bg-danger-light rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <GlobalSearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
