"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Award,
  Building,
  CalendarCheck,
  Users,
  Target,
  Sparkles,
  BarChart3,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import type { DashboardMetrics, Property, OrganizationMembership, Appointment, Lead } from "@/types";
import { formatCurrency, ROLE_LABELS } from "@/lib/utils";

interface ReportsClientProps {
  metrics: DashboardMetrics;
  properties: Property[];
  teamMembers: OrganizationMembership[];
  appointments: Appointment[];
  leads: Lead[];
}

const PIE_COLORS = ["#10B981", "#F59E0B", "#64748B", "#6366F1"];

export function ReportsClient({
  metrics,
  properties,
  teamMembers,
  appointments,
  leads,
}: ReportsClientProps) {
  // Inventory status breakdown
  const availableProps = properties.filter((p) => p.status === "available").length;
  const reservedProps = properties.filter((p) => p.status === "reserved").length;
  const soldProps = properties.filter((p) => p.status === "sold").length;

  const inventoryStatusData = [
    { name: "Available Units", value: availableProps },
    { name: "Reserved", value: reservedProps },
    { name: "Sold / Transferred", value: soldProps },
  ];

  // Won vs Lost
  const wonCount = leads.filter((l) => l.stage === "closed_won").length;
  const lostCount = leads.filter((l) => l.stage === "closed_lost").length;
  const inProgressCount = leads.length - wonCount - lostCount;

  // Agent workload analysis
  const agentPerformance = teamMembers
    .filter((m) => m.role === "sales_agent" || m.role === "sales_manager")
    .map((m) => {
      const agentLeads = leads.filter((l) => l.assignedAgentId === m.userId);
      const agentAppts = appointments.filter((a) => a.assignedAgentId === m.userId);
      const agentWon = agentLeads.filter((l) => l.stage === "closed_won").length;
      const conversionRate = agentLeads.length > 0 ? Math.round((agentWon / agentLeads.length) * 100) : 0;

      return {
        id: m.userId,
        name: m.user?.fullName || "Unassigned",
        role: ROLE_LABELS[m.role],
        leadsCount: agentLeads.length,
        apptsCount: agentAppts.length,
        wonCount: agentWon,
        conversionRate,
      };
    })
    .sort((a, b) => b.wonCount - a.wonCount || b.leadsCount - a.leadsCount);

  const winRate = leads.length > 0 ? Math.round((wonCount / leads.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-[11px] font-bold text-indigo-700 dark:text-indigo-400 mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Real-Time Business Intelligence</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Agency Analytics & Velocity
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Computed directly from live PostgreSQL database records with multi-tenant row isolation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Overall Conversion</p>
              <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{winRate}% Won</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Summary Aura Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Leads</span>
            <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">{leads.length}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active pipeline pipeline</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Won Deals</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2 tracking-tight">{wonCount}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Executed sales agreements</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Site Visits</span>
            <span className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mt-2 tracking-tight">{appointments.length}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>Client on-site inspections</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 hover:shadow-glow transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Inventory</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-2 tracking-tight">{properties.length}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>{availableProps} units available today</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources Bar Chart */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Inquiries by Source Channel</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Where high-intent buyers discover your properties</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.leadsBySource} margin={{ bottom: 25, left: -20, top: 10 }}>
                <defs>
                  <linearGradient id="reportsBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis
                  dataKey="source"
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  angle={-20}
                  textAnchor="end"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "12px",
                    border: "1px solid #1E293B",
                    color: "#FFF",
                    fontSize: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  }}
                />
                <Bar dataKey="count" fill="url(#reportsBarGrad)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Status Breakdown */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Property Inventory Liquidity</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ratio of active listings vs booked and settled</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              {properties.length} Total Units
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#F59E0B" />
                  <Cell fill="#64748B" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "12px",
                    border: "1px solid #1E293B",
                    color: "#FFF",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center flex-wrap gap-4 text-xs mt-2">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" /> Available ({availableProps})
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" /> Reserved ({reservedProps})
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 shadow-sm" /> Sold ({soldProps})
            </span>
          </div>
        </div>
      </div>

      {/* Agent Performance Leaderboard */}
      <div className="glass-panel rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Sales Agent Workload & Leaderboard</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Individual agent performance tracked against deal closures and site appointments
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {agentPerformance.length} Active Consultants
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="p-4 pl-6">Rank & Consultant</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Active Leads</th>
                <th className="p-4 text-center">Site Visits Conducted</th>
                <th className="p-4 text-center">Conversion</th>
                <th className="p-4 pr-6 text-right">Closed Won Deals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {agentPerformance.map((agent, i) => (
                <tr key={agent.id || i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        i === 0
                          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700"
                          : i === 1
                          ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}>
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{agent.name}</p>
                        <p className="text-[10px] text-slate-400">Consultant #{i + 1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {agent.role}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                    {agent.leadsCount}
                  </td>
                  <td className="p-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                    {agent.apptsCount}
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                      {agent.conversionRate}%
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {agent.wonCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
