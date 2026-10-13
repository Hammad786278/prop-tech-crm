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
  Building,
  Kanban,
  CalendarCheck,
  BarChart3,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
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
    },
    {
      label: "Leads",
      href: "/leads",
      icon: TrendingUp,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
    },
    {
      label: "Contacts",
      href: "/contacts",
      icon: Users,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
    },
    {
      label: "Properties",
      href: "/properties",
      icon: Building,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
    },
    {
      label: "Sales Pipeline",
      href: "/pipeline",
      icon: Kanban,
      roles: ["agency_owner", "sales_manager", "sales_agent"],
    },
    {
      label: "Tasks & Schedule",
      href: "/tasks",
      icon: CalendarCheck,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
    },
    {
      label: "Reports",
      href: "/reports",
      icon: BarChart3,
      roles: ["agency_owner", "sales_manager"],
    },
    {
      label: "Users & Team",
      href: "/team",
      icon: UserCog,
      roles: ["agency_owner", "sales_manager"],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["agency_owner", "sales_manager", "sales_agent", "property_manager"],
    },
  ];

  const permittedNav = navItems.filter((item) => item.roles.includes(role));

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#070B14] text-white selection:bg-primary selection:text-white">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <Logo
          variant={isCollapsed ? "icon" : "monochrome-dark"}
          showTagline={!isCollapsed}
          href="/dashboard"
        />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {permittedNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold shadow-md shadow-indigo-500/25 border border-indigo-400/30"
                  : "text-slate-400 hover:bg-slate-900/80 hover:text-white"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-cyan"
                )}
              />
              {!isCollapsed && <span>{item.label}</span>}
              {isActive && !isCollapsed && (
                <div className="absolute right-2.5 w-1.5 h-1.5 rounded-full bg-cyan shadow-glow-cyan" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Readiness Future Badge */}
      {!isCollapsed && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-semibold text-gold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>AI Architecture Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Phase 2 ready: WhatsApp AI & smart lead scoring plug seamlessly into current models.
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
          "hidden lg:block shrink-0 transition-all duration-300 ease-in-out border-r border-slate-800/80 h-screen sticky top-0 z-20",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
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
