"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Building2,
  UserCircle,
  Sparkles,
  Check,
  Globe,
  ArrowUpRight,
  Home,
} from "lucide-react";
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
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#050814]/85 px-4 sm:px-6 backdrop-blur-2xl transition-colors shadow-xs">
        {/* Left: Mobile sidebar toggle & Organization Badge */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors lg:hidden"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-xs">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/15 dark:bg-emerald-400/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
              {organization.name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/30">
              {organization.currency}
            </span>
          </div>

          {/* DEDICATED "BACK TO MAIN SITE" PILL BUTTON */}
          <Link href="/" className="hidden md:inline-flex items-center">
            <motion.div
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-black bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 hover:from-emerald-500/25 hover:via-teal-500/20 hover:to-cyan-500/25 text-emerald-600 dark:text-emerald-300 border border-emerald-500/35 hover:border-emerald-400/60 shadow-xs hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all group"
            >
              <Home className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span>Public Website</span>
              <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.div>
          </Link>
        </div>

        {/* Center: Global Search trigger button */}
        <div className="flex-1 max-w-md mx-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 rounded-2xl transition-all shadow-xs group hover:border-emerald-500/40"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors shrink-0" />
              <span className="truncate">Search properties, clients, deals...</span>
            </span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-500 dark:text-slate-300 shadow-2xs">
              ⌘K
            </kbd>
          </motion.button>
        </div>

        {/* Right: Public Site Icon, Theme Toggle, Notifications & Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Back to Main Site button */}
          <Link href="/" className="md:hidden flex p-2 rounded-xl text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-500/30" title="Return to Main Website">
            <Globe className="w-4 h-4" />
          </Link>

          <ThemeToggle />
          <NotificationsDropdown />

          {/* User profile menu */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors text-left group"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-emerald-500/20">
                  {user.fullName.slice(0, 2).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#040714]" />
              </div>

              <div className="hidden md:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                  {user.fullName}
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold leading-tight">
                  {ROLE_LABELS[role]}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white hidden sm:block transition-transform duration-200" />
            </motion.button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 rounded-3xl bg-white dark:bg-[#0B1226] shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-slate-200 dark:border-white/12 z-50 p-2 backdrop-blur-3xl overflow-hidden"
                  >
                    {/* User Details Header */}
                    <div className="p-3.5 border-b border-slate-100 dark:border-white/8 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03]">
                      <p className="text-xs font-black text-slate-900 dark:text-white">{user.fullName}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[10px] font-black border border-emerald-200 dark:border-emerald-800/60">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> {ROLE_LABELS[role]}
                      </div>
                    </div>

                    {/* Return to Public Website shortcut */}
                    <div className="p-2 border-b border-slate-100 dark:border-white/8">
                      <Link
                        href="/"
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-500/20 transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5" /> Return to Main Website
                        </span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Demo Role Switcher to immediately test RBAC */}
                    <div className="p-2 border-b border-slate-100 dark:border-white/8">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
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
                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 font-bold"
                                : "hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200"
                            }`}
                          >
                            <div>
                              <p className="leading-tight">{item.label}</p>
                              <p className={`text-[10px] ${role === item.r ? "text-emerald-200" : "text-slate-400"}`}>
                                {item.desc}
                              </p>
                            </div>
                            {role === item.r && <Check className="w-4 h-4 text-white shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sign Out */}
                    <div className="p-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out of Agency</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Global Search Dialog Modal */}
      <GlobalSearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
