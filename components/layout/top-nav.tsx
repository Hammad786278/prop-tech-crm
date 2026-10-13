"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Menu, LogOut, ShieldCheck, ChevronDown, Building2, UserCircle, Sparkles, Check } from "lucide-react";
import { GlobalSearchDialog } from "./global-search-dialog";
import { NotificationsDropdown } from "./notifications-dropdown";
import { ThemeToggle } from "@/components/theme/theme-toggle";
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
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 dark:border-white/8 bg-white/85 dark:bg-[#070B14]/85 px-4 sm:px-6 backdrop-blur-xl transition-colors">
        {/* Left: Mobile sidebar toggle & Organization Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-2xs">
            <div className="w-6 h-6 rounded-lg bg-indigo-600/10 dark:bg-cyan/15 flex items-center justify-center text-primary dark:text-cyan">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-navy-deep dark:text-white truncate max-w-[200px]">
              {organization.name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20">
              {organization.currency}
            </span>
          </div>
        </div>

        {/* Center: Global Search trigger button */}
        <div className="flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 rounded-xl transition-all shadow-2xs group hover:border-primary/40 dark:hover:border-indigo-400/40"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-primary dark:group-hover:text-cyan transition-colors" />
              <span>Search deals, clients, properties...</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Theme Toggle, Notifications & Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <NotificationsDropdown />

          {/* User profile menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors text-left group"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-indigo-500/20">
                  {user.fullName.slice(0, 2).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#070B14]" />
              </div>

              <div className="hidden md:block">
                <p className="text-xs font-bold text-navy-deep dark:text-white leading-tight truncate max-w-[130px]">
                  {user.fullName}
                </p>
                <p className="text-[10px] text-primary dark:text-cyan font-bold leading-tight">
                  {ROLE_LABELS[role]}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white hidden sm:block transition-transform duration-200" />
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-[#0D1322] shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-slate-200 dark:border-white/10 z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-2xl">
                  {/* User Details Header */}
                  <div className="p-3.5 border-b border-slate-100 dark:border-white/8 rounded-xl bg-slate-50/50 dark:bg-white/[0.02]">
                    <p className="text-xs font-extrabold text-navy-deep dark:text-white">{user.fullName}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-primary dark:text-cyan text-[10px] font-bold border border-indigo-200/50 dark:border-indigo-800/50">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> {ROLE_LABELS[role]}
                    </div>
                  </div>

                  {/* Demo Role Switcher to immediately test RBAC */}
                  <div className="p-2 border-b border-slate-100 dark:border-white/8">
                    <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                      <span>Switch RBAC Role</span>
                      <span className="text-[9px] text-amber-500 font-bold">Instant Demo</span>
                    </p>
                    <div className="space-y-1">
                      {[
                        { id: "user-owner-1", r: "agency_owner", label: "Agency Owner", desc: "Full executive & financial access" },
                        { id: "user-manager-1", r: "sales_manager", label: "Sales Manager", desc: "Pipeline & team oversight" },
                        { id: "user-agent-1", r: "sales_agent", label: "Sales Agent", desc: "Assigned leads & site visits" },
                        { id: "user-propman-1", r: "property_manager", label: "Property Manager", desc: "Catalogues & unit availability" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSwitchUser(item.id, item.r)}
                          className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                            role === item.r
                              ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/25"
                              : "hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          <div>
                            <p className="leading-tight">{item.label}</p>
                            <p className={`text-[10px] ${role === item.r ? "text-indigo-200" : "text-slate-400"}`}>
                              {item.desc}
                            </p>
                          </div>
                          {role === item.r && <Check className="w-4 h-4 text-white shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sign Out */}
                  <div className="pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out from Agency
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
