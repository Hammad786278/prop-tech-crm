"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Building2,
  Kanban,
  CalendarCheck,
  BarChart3,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  CircleDot,
  Globe,
  ArrowLeft,
  ExternalLink,
  Compass,
} from "lucide-react";
import type { UserRole } from "@/types";

interface SidebarProps {
  role: UserRole;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ role, isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      label: "Executive Cockpit",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
      accent: "from-indigo-500 to-purple-600",
    },
    {
      label: "Leads & Inquiries",
      href: "/leads",
      icon: TrendingUp,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: "Live",
      accent: "from-emerald-500 to-teal-600",
    },
    {
      label: "Contacts Directory",
      href: "/contacts",
      icon: Users,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
      accent: "from-cyan-500 to-blue-600",
    },
    {
      label: "Properties Matrix",
      href: "/properties",
      icon: Building2,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
      accent: "from-amber-500 to-orange-600",
    },
    {
      label: "Sales Pipeline",
      href: "/pipeline",
      icon: Kanban,
      roles: ["agency_owner", "sales_manager", "sales_agent"],
      badge: "Kanban",
      accent: "from-pink-500 to-rose-600",
    },
    {
      label: "Tasks & Agenda",
      href: "/tasks",
      icon: CalendarCheck,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
      accent: "from-blue-500 to-indigo-600",
    },
    {
      label: "Intelligence & Reports",
      href: "/reports",
      icon: BarChart3,
      roles: ["agency_owner", "sales_manager"],
      badge: null,
      accent: "from-teal-500 to-emerald-600",
    },
    {
      label: "Team Management",
      href: "/team",
      icon: UserCog,
      roles: ["agency_owner", "sales_manager"],
      badge: null,
      accent: "from-purple-500 to-indigo-600",
    },
    {
      label: "Agency Settings",
      href: "/settings",
      icon: Settings,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
      accent: "from-slate-500 to-slate-700",
    },
  ];

  const permittedNav = navItems.filter((item) => item.roles.includes(role));

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#040714] text-white selection:bg-emerald-500 selection:text-black border-r border-white/10 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
      {/* Ambient glowing radial orbs */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-emerald-500/15 via-indigo-600/10 to-transparent pointer-events-none blur-2xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full pointer-events-none blur-3xl" />

      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 relative z-10 bg-white/[0.02]">
        <Logo
          variant={isCollapsed ? "icon" : "monochrome-dark"}
          showTagline={!isCollapsed}
          href="/dashboard"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4 text-emerald-400" /> : <ChevronLeft className="w-4 h-4 text-slate-400" />}
        </motion.button>
      </div>

      {/* PROMINENT "BACK TO MAIN SITE" ACTION BUTTON */}
      <div className="px-3 pt-3 pb-1 relative z-10">
        <Link href="/" className="block">
          <motion.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20 hover:from-emerald-500/30 hover:via-teal-500/25 hover:to-cyan-500/30 text-emerald-300 hover:text-white border border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-950/40 transition-all font-bold group relative overflow-hidden",
              isCollapsed && "justify-center px-2"
            )}
            title="Return to Public Website"
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-400 group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4" />
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-black tracking-wide text-white leading-tight flex items-center gap-1">
                    <span>Main Website</span>
                    <ArrowLeft className="w-3 h-3 text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
                  </p>
                  <p className="text-[10px] text-emerald-300/80 font-medium truncate">Public Agency Portal</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0 opacity-70 group-hover:opacity-100" />
              </>
            )}
          </motion.div>
        </Link>
      </div>

      {/* Agency Environment Status Pill */}
      {!isCollapsed && (
        <div className="px-3 py-1.5 relative z-10">
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399] animate-pulse" />
              <div className="truncate">
                <p className="text-[11px] font-black text-white tracking-wide uppercase truncate">
                  Apex Real Estate
                </p>
                <p className="text-[10px] text-slate-400 truncate">Pakistan · PKR Multi-Tenant</p>
              </div>
            </div>
            <span className="shrink-0 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Live RLS
            </span>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto relative z-10">
        {permittedNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className="block"
            >
              <motion.div
                whileHover={{ x: 3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/80 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/40"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white border border-transparent hover:border-white/5"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent pointer-events-none" />
                )}

                <div className={cn(
                  "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                  isActive 
                    ? "bg-white/20 text-white" 
                    : "bg-white/[0.04] text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 border border-white/5"
                )}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {!isCollapsed && <span className="truncate font-bold">{item.label}</span>}

                {/* Status or Stage Badge */}
                {!isCollapsed && item.badge && !isActive && (
                  <span className="ml-auto text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}

                {isActive && !isCollapsed && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#34D399]" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Architecture Readiness Footer */}
      {!isCollapsed && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-950 border border-indigo-500/30 shadow-inner relative z-10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>AI Extension Ready</span>
            </div>
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
              Phase 1 MVP
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
            Clean extension points reserved for future WhatsApp bots & auto-scoring.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Collapsible Sidebar */}
      <aside
        className={cn(
          "hidden lg:block shrink-0 transition-all duration-300 ease-in-out border-r border-white/10 h-screen sticky top-0 z-20 shadow-2xl",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
              onClick={onMobileClose}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-64 max-w-[80vw] h-full shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
