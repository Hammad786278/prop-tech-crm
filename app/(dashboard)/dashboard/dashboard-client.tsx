"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Users,
  Building,
  CalendarCheck,
  Award,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate, formatDateTime, STAGE_CONFIG, ROLE_LABELS } from "@/lib/utils";
import type { DashboardMetrics, Contact, Property, OrganizationMembership, UserRole } from "@/types";
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
import { toast } from "sonner";

interface DashboardClientProps {
  initialMetrics: DashboardMetrics;
  contacts: Contact[];
  properties: Property[];
  teamMembers: OrganizationMembership[];
  role: UserRole;
  orgName: string;
}

const PIE_COLORS = [
  "#4F46E5",
  "#06B6D4",
  "#F59E0B",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
  "#64748B",
  "#14B8A6",
  "#16A34A",
  "#EF4444",
];

export function DashboardClient({
  initialMetrics,
  contacts,
  properties,
  teamMembers,
  role,
  orgName,
}: DashboardClientProps) {
  const router = useRouter();
  const [metrics, setMetrics] = useState(initialMetrics);

  // Quick Action Modal states
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddApptOpen, setIsAddApptOpen] = useState(false);

  // Form states
  const [leadForm, setLeadForm] = useState({
    title: "",
    contactId: contacts[0]?.id || "",
    propertyId: "",
    source: "Manual Entry",
    budgetMin: "",
    budgetMax: "",
    notes: "",
  });

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    contactType: "buyer",
    notes: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    contactId: contacts[0]?.id || "",
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    priority: "medium",
    description: "",
  });

  const [apptForm, setApptForm] = useState({
    title: "",
    contactId: contacts[0]?.id || "",
    propertyId: properties[0]?.id || "",
    appointmentType: "Site Visit",
    startTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    location: "On Site",
    durationMinutes: "45",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<any>(null);

  // Handlers
  const handleCreateLead = async (e: React.FormEvent, force = false) => {
    e.preventDefault();
    setIsLoading(true);
    setDuplicateWarning(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          budgetMin: leadForm.budgetMin ? Number(leadForm.budgetMin) : undefined,
          budgetMax: leadForm.budgetMax ? Number(leadForm.budgetMax) : undefined,
          forceCreate: force,
        }),
      });

      const data = await res.json();
      if (res.status === 409 && data.duplicateWarning) {
        setDuplicateWarning(data);
        return;
      }

      if (!res.ok) {
        toast.error(data.error || "Failed to create lead");
        return;
      }

      toast.success("Lead created successfully");
      setIsAddLeadOpen(false);
      router.refresh();
    } catch {
      toast.error("Error creating lead");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateContact = async (e: React.FormEvent, force = false) => {
    e.preventDefault();
    setIsLoading(true);
    setDuplicateWarning(null);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contactForm, forceCreate: force }),
      });

      const data = await res.json();
      if (res.status === 409 && data.duplicateWarning) {
        setDuplicateWarning(data);
        return;
      }

      if (!res.ok) {
        toast.error(data.error || "Failed to create contact");
        return;
      }

      toast.success("Contact created successfully");
      setIsAddContactOpen(false);
      router.refresh();
    } catch {
      toast.error("Error creating contact");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskForm),
      });
      if (!res.ok) throw new Error();
      toast.success("Task scheduled");
      setIsAddTaskOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...apptForm,
          durationMinutes: parseInt(apptForm.durationMinutes, 10),
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Appointment scheduled");
      setIsAddApptOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to schedule appointment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Cockpit & Quick Actions Bar */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Ambient interior lighting */}
        <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-bl from-indigo-500/10 via-cyan/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-navy-deep dark:text-white tracking-tight">
                Executive Cockpit
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-black shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                PKR · Asia/Karachi
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-primary dark:text-cyan border border-indigo-500/20 text-[11px] font-bold">
                RLS Multi-Tenant
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              Live operational metrics for <span className="font-extrabold text-navy-deep dark:text-white">{orgName}</span>.
            </p>
          </div>

          {/* Working Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button onClick={() => setIsAddLeadOpen(true)} size="sm" variant="primary" className="shadow-md shadow-indigo-600/25">
              <Plus className="w-4 h-4 mr-1.5" /> Add Lead
            </Button>
            <Button onClick={() => setIsAddContactOpen(true)} variant="secondary" size="sm">
              <Users className="w-4 h-4 mr-1.5 text-primary dark:text-cyan" /> New Contact
            </Button>
            <Button onClick={() => setIsAddApptOpen(true)} variant="secondary" size="sm">
              <CalendarCheck className="w-4 h-4 mr-1.5 text-amber-600 dark:text-amber-400" /> Site Visit
            </Button>
            <Button onClick={() => setIsAddTaskOpen(true)} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1.5" /> Task
            </Button>
          </div>
        </div>
      </div>

      {/* 5 Futuristic KPI Cards with Glowing Corner Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Leads */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-indigo-500/50">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              Total Inquiries
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-primary dark:text-indigo-400 flex items-center justify-center border border-indigo-200/50 dark:border-indigo-800/60 shadow-2xs">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-navy-deep dark:text-white tracking-tight">
              {metrics.totalLeads}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              +18% MoM
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">All time client pipeline</p>
        </div>

        {/* Card 2: New Leads */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-cyan/50">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan/10 dark:bg-cyan/20 rounded-full blur-xl group-hover:bg-cyan/30 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              New Leads
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-200/50 dark:border-cyan-800/60 shadow-2xs">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-primary dark:text-cyan tracking-tight">
              {metrics.newLeads}
            </span>
            <span className="text-[10px] font-bold text-primary dark:text-cyan bg-cyan/10 px-1.5 py-0.5 rounded">
              Pending
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Awaiting first contact</p>
        </div>

        {/* Card 3: Active Opportunities */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/50">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 dark:bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              Active Deals
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-gold flex items-center justify-center border border-amber-200/50 dark:border-amber-800/60 shadow-2xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600 dark:text-gold tracking-tight">
              {metrics.activeOpportunities}
            </span>
            <span className="text-[10px] font-bold text-amber-600 dark:text-gold bg-amber-500/10 px-1.5 py-0.5 rounded">
              In Talk
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Active negotiations</p>
        </div>

        {/* Card 4: Upcoming Appointments */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-violet-500/50">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-xl group-hover:bg-violet-500/30 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              Site Visits
            </span>
            <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-200/50 dark:border-violet-800/60 shadow-2xs">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-violet-600 dark:text-violet-400 tracking-tight">
              {metrics.upcomingAppointments}
            </span>
            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">
              Upcoming
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Scheduled on location</p>
        </div>

        {/* Card 5: Closed-Won Deals */}
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/50">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              Closed Won
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/60 shadow-2xs">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              {metrics.closedWonDeals}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Successful
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Executed transactions</p>
        </div>
      </div>

      {/* Visual Analytics Row: Pipeline Stages & Source Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Distribution Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 lg:col-span-2 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-4 border-b border-slate-100 dark:border-white/8">
            <div>
              <h3 className="text-base font-extrabold text-navy-deep dark:text-white">
                Sales Pipeline Flow & Velocity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Distribution of buyer inquiries across stages
              </p>
            </div>
            <Link href="/pipeline">
              <Button variant="ghost" size="sm" className="text-xs text-primary dark:text-cyan font-bold hover:bg-slate-100 dark:hover:bg-white/10">
                View Kanban Board <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="pt-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metrics.leadsByStage}
                  margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: "#94A3B8" }}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D1322",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: "12px",
                      color: "#FFF",
                      fontSize: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.6)",
                    }}
                  />
                  <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Lead Sources Pie Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 dark:border-white/8">
              <h3 className="text-base font-extrabold text-navy-deep dark:text-white">Inquiries by Channel</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Top acquisition streams</p>
            </div>
            <div className="pt-4">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metrics.leadsBySource}
                      dataKey="count"
                      nameKey="source"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {metrics.leadsBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0D1322",
                        borderRadius: "10px",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        color: "#FFF",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-1.5 max-h-28 overflow-y-auto pr-1">
            {metrics.leadsBySource.map((s, idx) => (
              <div key={s.source} className="flex items-center justify-between text-xs px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04]">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                  />
                  <span className="truncate">{s.source}</span>
                </span>
                <span className="font-extrabold text-navy-deep dark:text-white">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Leads & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="glass-panel rounded-3xl border border-slate-200/90 dark:border-white/10 lg:col-span-2 shadow-sm overflow-hidden">
          <div className="p-6 flex flex-row items-center justify-between border-b border-slate-100 dark:border-white/8">
            <div>
              <h3 className="text-base font-extrabold text-navy-deep dark:text-white">Recent Inquiries & Deals</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">High-intent client requests</p>
            </div>
            <Link href="/leads">
              <Button variant="ghost" size="sm" className="text-xs text-primary dark:text-cyan font-bold hover:bg-slate-100 dark:hover:bg-white/10">
                View All Leads <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/8 bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 pl-6">Inquiry Summary</th>
                    <th className="p-3.5">Client & Phone</th>
                    <th className="p-3.5">Acquisition</th>
                    <th className="p-3.5">Current Stage</th>
                    <th className="p-3.5 pr-6 text-right">Logged</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {metrics.recentLeads.map((lead) => {
                    const st = STAGE_CONFIG[lead.stage];
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors group">
                        <td className="p-3.5 pl-6">
                          <Link
                            href={`/leads/${lead.id}`}
                            className="font-bold text-navy-deep dark:text-white group-hover:text-primary dark:group-hover:text-cyan transition-colors block max-w-xs truncate"
                          >
                            {lead.title}
                          </Link>
                          {lead.property && (
                            <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                              🏢 {lead.property.title}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {lead.contact ? `${lead.contact.firstName} ${lead.contact.lastName}` : "—"}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{lead.contact?.phone}</p>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                            {lead.source}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold border text-[11px] inline-flex items-center gap-1.5 ${st?.bg} ${st?.color} ${st?.border}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {st?.label || lead.stage}
                          </span>
                        </td>
                        <td className="p-3.5 pr-6 text-right text-slate-500 dark:text-slate-400 font-medium">
                          {formatDate(lead.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments Agenda */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-row items-center justify-between pb-4 border-b border-slate-100 dark:border-white/8">
              <div>
                <h3 className="text-base font-extrabold text-navy-deep dark:text-white">Upcoming Visits</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">On-site meetings agenda</p>
              </div>
              <Link href="/tasks">
                <Button variant="ghost" size="sm" className="text-xs text-primary dark:text-cyan font-bold hover:bg-slate-100 dark:hover:bg-white/10">
                  Agenda <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="pt-4 space-y-3">
              {metrics.upcomingAppointmentsList.length === 0 ? (
                <div className="text-center py-10">
                  <CalendarCheck className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No scheduled visits for today.</p>
                </div>
              ) : (
                metrics.upcomingAppointmentsList.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-white/8 bg-slate-50/60 dark:bg-white/[0.03] hover:bg-slate-100/70 dark:hover:bg-white/[0.06] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-extrabold text-navy-deep dark:text-white">{appt.title}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-primary dark:text-cyan font-bold border border-indigo-500/20">
                        {appt.appointmentType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-2">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{formatDateTime(appt.startTime)}</span>
                    </div>
                    {appt.location && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{appt.location}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          QUICK ACTION MODALS WITH DUPLICATE HANDLING
          ======================================================== */}

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddLeadOpen}
        onClose={() => {
          setIsAddLeadOpen(false);
          setDuplicateWarning(null);
        }}
        title="Create New Lead Inquiry"
        description="Log an inquiry with interested project and budget parameters."
      >
        {duplicateWarning ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">Duplicate Contact Detected</p>
                <p className="text-xs text-amber-700 mt-0.5">{duplicateWarning.message}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDuplicateWarning(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={(e) => handleCreateLead(e, true)}
                isLoading={isLoading}
              >
                Proceed & Link to Existing Contact
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => handleCreateLead(e, false)} className="space-y-4">
            <Input
              id="leadTitle"
              label="Inquiry Summary / Title *"
              placeholder="e.g. Inquiring for 1-Kanal Villa in DHA Phase 6"
              value={leadForm.title}
              onChange={(e) => setLeadForm({ ...leadForm, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Associated Contact *</label>
                <select
                  value={leadForm.contactId}
                  onChange={(e) => setLeadForm({ ...leadForm, contactId: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {c.firstName} {c.lastName} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Interested Property</label>
                <select
                  value={leadForm.propertyId}
                  onChange={(e) => setLeadForm({ ...leadForm, propertyId: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">General Inquiry (No specific unit)</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {p.title} ({formatCurrency(p.price, p.currency)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Source</label>
                <select
                  value={leadForm.source}
                  onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Manual Entry">Manual Entry</option>
                  <option value="Website">Website</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Google">Google</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Property Portal">Property Portal</option>
                  <option value="Referral">Referral</option>
                  <option value="Phone Call">Phone Call</option>
                </select>
              </div>

              <Input
                id="budgetMin"
                label="Budget Min (PKR)"
                type="number"
                placeholder="e.g. 50000000"
                value={leadForm.budgetMin}
                onChange={(e) => setLeadForm({ ...leadForm, budgetMin: e.target.value })}
              />

              <Input
                id="budgetMax"
                label="Budget Max (PKR)"
                type="number"
                placeholder="e.g. 80000000"
                value={leadForm.budgetMax}
                onChange={(e) => setLeadForm({ ...leadForm, budgetMax: e.target.value })}
              />
            </div>

            <Textarea
              id="leadNotes"
              label="Notes / Client Preference"
              placeholder="Client requirements, preferred payment mode, family relocation timeline..."
              value={leadForm.notes}
              onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddLeadOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" isLoading={isLoading}>
                Create Lead
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Add Contact Modal */}
      <Modal
        isOpen={isAddContactOpen}
        onClose={() => {
          setIsAddContactOpen(false);
          setDuplicateWarning(null);
        }}
        title="Add New Contact"
        description="Add a buyer, seller, or investor to the agency database."
      >
        {duplicateWarning ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">Duplicate Contact Detected</p>
                <p className="text-xs text-amber-700 mt-0.5">{duplicateWarning.message}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDuplicateWarning(null)}>
                Edit Phone / Email
              </Button>
              <Button size="sm" onClick={(e) => handleCreateContact(e, true)} isLoading={isLoading}>
                Confirm Create Anyway
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => handleCreateContact(e, false)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="cFirst"
                label="First Name *"
                placeholder="e.g. Tariq"
                value={contactForm.firstName}
                onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                required
              />
              <Input
                id="cLast"
                label="Last Name *"
                placeholder="e.g. Mehmood"
                value={contactForm.lastName}
                onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                id="cPhone"
                label="Phone Number *"
                placeholder="+92 300 1234567"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                required
              />
              <Input
                id="cEmail"
                label="Email Address"
                type="email"
                placeholder="client@gmail.com"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Contact Type</label>
              <select
                value={contactForm.contactType}
                onChange={(e) => setContactForm({ ...contactForm, contactType: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="investor">Investor</option>
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
            </div>

            <Textarea
              id="cNotes"
              label="Notes"
              placeholder="Background notes, referral source, etc."
              value={contactForm.notes}
              onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddContactOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" isLoading={isLoading}>
                Save Contact
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Schedule Appointment Modal */}
      <Modal
        isOpen={isAddApptOpen}
        onClose={() => setIsAddApptOpen(false)}
        title="Schedule Site Visit / Meeting"
        description="Book a client site visit or office meeting in Asia/Karachi timezone."
      >
        <form onSubmit={handleCreateAppointment} className="space-y-4">
          <Input
            id="apptTitle"
            label="Meeting / Visit Title *"
            placeholder="e.g. Site Visit: DHA Villa with Dr. Salman"
            value={apptForm.title}
            onChange={(e) => setApptForm({ ...apptForm, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Contact</label>
              <select
                value={apptForm.contactId}
                onChange={(e) => setApptForm({ ...apptForm, contactId: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Property</label>
              <select
                value={apptForm.propertyId}
                onChange={(e) => setApptForm({ ...apptForm, propertyId: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Type</label>
              <select
                value={apptForm.appointmentType}
                onChange={(e) => setApptForm({ ...apptForm, appointmentType: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="Site Visit">Site Visit</option>
                <option value="Office Meeting">Office Meeting</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Online Meeting">Online Meeting</option>
              </select>
            </div>

            <Input
              id="apptStart"
              label="Date & Time *"
              type="datetime-local"
              value={apptForm.startTime}
              onChange={(e) => setApptForm({ ...apptForm, startTime: e.target.value })}
              required
            />

            <Input
              id="apptDuration"
              label="Duration (Mins)"
              type="number"
              value={apptForm.durationMinutes}
              onChange={(e) => setApptForm({ ...apptForm, durationMinutes: e.target.value })}
            />
          </div>

          <Input
            id="apptLoc"
            label="Location"
            placeholder="e.g. DHA Phase 6 Block J, Street 14"
            value={apptForm.location}
            onChange={(e) => setApptForm({ ...apptForm, location: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddApptOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isLoading}>
              Confirm Booking
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Task Modal */}
      <Modal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        title="Create Team Task"
        description="Add a task with deadline and priority."
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            id="taskTitle"
            label="Task Description *"
            placeholder="e.g. Collect property NOC documentation from SBCA"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              id="taskDue"
              label="Due Date & Time *"
              type="datetime-local"
              value={taskForm.dueDate}
              onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Priority</label>
              <select
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <Textarea
            id="taskDesc"
            label="Details / Instructions"
            placeholder="Any specific instructions..."
            value={taskForm.description}
            onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isLoading}>
              Save Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
