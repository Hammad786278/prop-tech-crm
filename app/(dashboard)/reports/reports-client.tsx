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
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Building, CalendarCheck, Users } from "lucide-react";
import type { DashboardMetrics, Property, OrganizationMembership, Appointment, Lead } from "@/types";
import { formatCurrency, ROLE_LABELS } from "@/lib/utils";

interface ReportsClientProps {
  metrics: DashboardMetrics;
  properties: Property[];
  teamMembers: OrganizationMembership[];
  appointments: Appointment[];
  leads: Lead[];
}

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

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
    { name: "Available", value: availableProps },
    { name: "Reserved", value: reservedProps },
    { name: "Sold", value: soldProps },
  ];

  // Won vs Lost
  const wonCount = leads.filter((l) => l.stage === "closed_won").length;
  const lostCount = leads.filter((l) => l.stage === "closed_lost").length;
  const inProgressCount = leads.length - wonCount - lostCount;

  const outcomesData = [
    { name: "Closed Won", value: wonCount },
    { name: "Closed Lost", value: lostCount },
    { name: "In Progress", value: inProgressCount },
  ];

  // Agent workload analysis
  const agentPerformance = teamMembers
    .filter((m) => m.role === "sales_agent" || m.role === "sales_manager")
    .map((m) => {
      const agentLeads = leads.filter((l) => l.assignedAgentId === m.userId);
      const agentAppts = appointments.filter((a) => a.assignedAgentId === m.userId);
      const agentWon = agentLeads.filter((l) => l.stage === "closed_won").length;

      return {
        name: m.user?.fullName || "Unknown",
        role: ROLE_LABELS[m.role],
        leadsCount: agentLeads.length,
        apptsCount: agentAppts.length,
        wonCount: agentWon,
      };
    });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-deep tracking-tight">
          Agency Analytics & Reports
        </h1>
        <p className="text-xs text-text-secondary mt-1">
          Performance metrics calculated in real-time from active PostgreSQL tenant records.
        </p>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Inquiries</p>
            <p className="text-2xl font-black text-navy-deep mt-1">{leads.length}</p>
            <p className="text-[11px] text-primary font-semibold mt-1">Real database records</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-bold text-slate-400 uppercase">Won Deals</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{wonCount}</p>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
              Final contracts issued
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-bold text-slate-400 uppercase">Site Visits Done</p>
            <p className="text-2xl font-black text-cyan-600 mt-1">{appointments.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Conducted by team</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-bold text-slate-400 uppercase">Inventory Units</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{properties.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">{availableProps} currently available</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Acquisition Source */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Inquiries by Source Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.leadsBySource} margin={{ bottom: 25, left: -20 }}>
                  <XAxis
                    dataKey="source"
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1220",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Property Inventory Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#F59E0B" />
                    <Cell fill="#64748B" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1220",
                      borderRadius: "8px",
                      color: "#FFF",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 text-xs mt-2">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available ({availableProps})
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Reserved ({reservedProps})
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Sold ({soldProps})
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sales Agent Workload & Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                  <th className="p-3 pl-6">Team Member</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-center">Assigned Inquiries</th>
                  <th className="p-3 text-center">Site Visits Conducted</th>
                  <th className="p-3 pr-6 text-right">Closed Won Deals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {agentPerformance.map((agent, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 pl-6 font-bold text-navy-deep">{agent.name}</td>
                    <td className="p-3 text-slate-600">{agent.role}</td>
                    <td className="p-3 text-center font-bold text-primary">{agent.leadsCount}</td>
                    <td className="p-3 text-center font-semibold text-slate-700">
                      {agent.apptsCount}
                    </td>
                    <td className="p-3 pr-6 text-right font-black text-emerald-600">
                      {agent.wonCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
