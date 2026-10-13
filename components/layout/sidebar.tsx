"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
    },
    {
      label: "Leads & Inquiries",
      href: "/leads",
      icon: TrendingUp,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: "Live",
    },
    {
      label: "Contacts Directory",
      href: "/contacts",
      icon: Users,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
    },
    {
      label: "Properties Matrix",
      href: "/properties",
      icon: Building2,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
    },
    {
      label: "Sales Pipeline",
      href: "/pipeline",
      icon: Kanban,
      roles: ["agency_owner", "sales_manager", "sales_agent"],
      badge: "Kanban",
    },
    {
      label: "Tasks & Agenda",
      href: "/tasks",
      icon: CalendarCheck,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
    },
    {
      label: "Intelligence & Reports",
      href: "/reports",
      icon: BarChart3,
      roles: ["agency_owner", "sales_manager"],
      badge: null,
    },
    {
      label: "Team Management",
      href: "/team",
      icon: UserCog,
      roles: ["agency_owner", "sales_manager"],
      badge: null,
    },
    {
      label: "Agency Settings",
      href: "/settings",
      icon: Settings,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
      badge: null,
    },
  ];

  const permittedNav = navItems.filter((item) => item.roles.includes(role));

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#070B14] text-white selection:bg-primary selection:text-white border-r border-white/5 relative overflow-hidden">
      {/* Ambient gradient lighting inside sidebar */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-600/15 via-indigo-600/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan/10 to-transparent pointer-events-none" />

      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/8 relative z-10">
        <Logo
          variant={isCollapsed ? "icon" : "monochrome-dark"}
          showTagline={!isCollapsed}
          href="/dashboard"
        />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Agency Environment Pill */}
      {!isCollapsed && (
        <div className="px-3 pt-3 pb-1 relative z-10">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              <div className="truncate">
                <p className="text-[11px] font-bold text-white tracking-wide uppercase truncate">
                  Apex Real Estate
                </p>
                <p className="text-[10px] text-slate-400 truncate">Pakistan · PKR Multi-Tenant</p>
              </div>
            </div>
            <span className="shrink-0 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              RLS
            </span>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto relative z-10">
        {permittedNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative",
                isActive
                  ? "bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30"
                  : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-cyan"
                )}
              />
              {!isCollapsed && <span className="truncate">{item.label}</span>}

              {/* Status or Stage Badge */}
              {!isCollapsed && item.badge && !isActive && (
                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/20">
                  {item.badge}
                </span>
              )}

              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#06B6D4]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Architecture Readiness Footer */}
      {!isCollapsed && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/20 shadow-inner relative z-10">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>AI Ready Core</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
              v1.0
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            WhatsApp AI auto-agent & smart lead scoring plug into existing endpoints in Phase 2.
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
          "hidden lg:block shrink-0 transition-all duration-300 ease-in-out border-r border-slate-800/80 h-screen sticky top-0 z-20 shadow-2xl",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
