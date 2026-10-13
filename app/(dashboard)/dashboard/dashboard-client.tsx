"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
import {
  TrendingUp,
  Users,
  Building2,
  CalendarCheck,
  Award,
  ArrowUpRight,
  Plus,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Compass,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  Home,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate, formatDateTime, STAGE_CONFIG } from "@/lib/utils";
import type {
  DashboardMetrics,
  Lead,
  Appointment,
  Property,
  Contact,
  OrganizationMembership,
  UserRole,
  PipelineStage,
} from "@/types";
import { toast } from "sonner";

interface DashboardClientProps {
  initialMetrics: DashboardMetrics;
  contacts: Contact[];
  properties: Property[];
  teamMembers: OrganizationMembership[];
  role: UserRole;
  orgName: string;
}

const DONUT_COLORS = ["#10B981", "#06B6D4", "#6366F1", "#F59E0B", "#EC4899", "#8B5CF6"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export function DashboardClient({
  initialMetrics,
  contacts,
  properties,
  teamMembers,
  role,
  orgName,
}: DashboardClientProps) {
  const router = useRouter();
  const [metrics] = useState<DashboardMetrics>(initialMetrics);
  const [isQuickLeadOpen, setIsQuickLeadOpen] = useState(false);
  const [quickLeadForm, setQuickLeadForm] = useState({
    title: "",
    firstName: "",
    lastName: "",
    phone: "",
    source: "whatsapp",
    budgetMax: "",
  });

  const handleQuickLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: quickLeadForm.title,
          source: quickLeadForm.source,
          budgetMax: quickLeadForm.budgetMax ? Number(quickLeadForm.budgetMax) : null,
          contact: {
            firstName: quickLeadForm.firstName,
            lastName: quickLeadForm.lastName,
            phone: quickLeadForm.phone,
          },
        }),
      });

      if (!res.ok) throw new Error();
      toast.success("Inquiry registered in live pipeline!");
      setIsQuickLeadOpen(false);
      setQuickLeadForm({
        title: "",
        firstName: "",
        lastName: "",
        phone: "",
        source: "whatsapp",
        budgetMax: "",
      });
      router.refresh();
    } catch {
      toast.error("Failed to register lead");
    }
  };

  const wonDealsCount = metrics.closedWonDeals || 0;
  const wonRate = metrics.totalLeads > 0 ? Math.round((wonDealsCount / metrics.totalLeads) * 100) : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 animate-in fade-in duration-300"
    >
      {/* Top Cockpit Header Banner with Quick Website Return */}
      <motion.div
        variants={itemVariants}
        className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-white/80 dark:bg-[#070D22]/85 border border-white/60 dark:border-white/10 shadow-xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-indigo-500/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
                Live Asia/Karachi · PK Operational Hours
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25">
                Executive Cockpit
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {orgName} Mission Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              High-velocity deal monitoring, multi-tenant property conversions, and live agent workload.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* PROMINENT BUTTON TO RETURN TO PUBLIC WEBSITE */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20 hover:from-emerald-500/30 hover:via-teal-500/25 hover:to-cyan-500/30 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 shadow-lg shadow-emerald-950/20 transition-all group"
              >
                <Home className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>Return to Main Website</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.div>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsQuickLeadOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all"
            >
              <Plus className="w-4 h-4" /> Quick Lead Intake
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 5 GLOWING KPI METRIC CARDS WITH MOTION HOVER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Inquiries */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6, scale: 1.02 }}
          className="glossy-card p-5 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 shadow-md relative overflow-hidden group cursor-default"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Inquiries</span>
            <span className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-3 tracking-tight">
            {metrics.totalLeads}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active Buyer Inquiries</span>
          </div>
        </motion.div>

        {/* KPI 2: Won Deals */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6, scale: 1.02 }}
          className="glossy-card p-5 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 shadow-md relative overflow-hidden group cursor-default"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Won Deals</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-3 tracking-tight">
            {wonDealsCount}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Final Contracts Closed</span>
          </div>
        </motion.div>

        {/* KPI 3: Active Opportunities */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6, scale: 1.02 }}
          className="glossy-card p-5 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 shadow-md relative overflow-hidden group cursor-default"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Active Pipeline</span>
            <span className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mt-3 tracking-tight">
            {metrics.activeOpportunities}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-cyan-600 dark:text-cyan-400 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Opportunities in funnel</span>
          </div>
        </motion.div>

        {/* KPI 4: Inventory Units */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6, scale: 1.02 }}
          className="glossy-card p-5 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 shadow-md relative overflow-hidden group cursor-default"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Available Units</span>
            <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-3 tracking-tight">
            {metrics.availableProperties}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-bold">
            <span>{metrics.totalProperties} total portfolio units</span>
          </div>
        </motion.div>

        {/* KPI 5: Conversion Rate */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6, scale: 1.02 }}
          className="glossy-card p-5 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 shadow-md relative overflow-hidden group cursor-default"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-500/20 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Win Rate</span>
            <span className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400 mt-3 tracking-tight">
            {wonRate}%
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-rose-600 dark:text-rose-400 font-bold">
            <span>Inquiry-to-contract</span>
          </div>
        </motion.div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Distribution Bar Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-7 border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 shadow-md"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Pipeline Stage Inquiries</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time count of deals progressing across each sales funnel stage</p>
            </div>
            <Link href="/pipeline" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              View Board <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.leadsByStage} margin={{ bottom: 25, left: -20, top: 10 }}>
                <defs>
                  <linearGradient id="dashboardBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: "#94A3B8" }}
                  tickFormatter={(val: string) => val?.slice(0, 10) || val}
                  angle={-25}
                  textAnchor="end"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(16, 185, 129, 0.06)" }}
                  contentStyle={{
                    backgroundColor: "#060A17",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#FFF",
                    fontSize: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
                  }}
                  formatter={(val: any, name: any, item: any) => [
                    `${val} leads`,
                    item.payload.label || "Stage",
                  ]}
                />
                <Bar dataKey="count" fill="url(#dashboardBarGrad)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Acquisition Channel Donut Chart */}
        <motion.div
          variants={itemVariants}
          className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Inquiry Acquisition</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Top digital & referral channels</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.leadsBySource}
                  dataKey="count"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                >
                  {metrics.leadsBySource.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#060A17",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#FFF",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs mt-2">
            {metrics.leadsBySource.map((s, idx) => (
              <span key={s.source} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 text-[11px] font-semibold capitalize">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }} />
                {s.source} ({s.count})
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* TABLES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* High-Intent Inquiries Feed */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 glass-panel rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 overflow-hidden shadow-md"
        >
          <div className="p-6 border-b border-slate-100 dark:border-white/8 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Buyer Inquiries</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">High-intent client requests awaiting action</p>
            </div>
            <Link href="/leads">
              <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold border-slate-200 dark:border-white/10">
                View All Leads
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/8 bg-slate-50/50 dark:bg-white/[0.02] text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="p-4 pl-6">Client / Inquiry</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4">Target Unit</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/6">
                {(metrics.recentLeads || []).slice(0, 5).map((l) => {
                  const cfg = STAGE_CONFIG[l.stage];
                  const cleanPhone = l.contact?.phone?.replace(/[^0-9]/g, "") || "";
                  return (
                    <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.03] transition-colors">
                      <td className="p-4 pl-6">
                        <Link href={`/leads/${l.id}`} className="font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors block text-sm">
                          {l.title}
                        </Link>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          {l.contact ? `${l.contact.firstName} ${l.contact.lastName}` : "Direct Lead"} • {l.source}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg?.bg} ${cfg?.color} ${cfg?.border}`}>
                          {cfg?.label || l.stage}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {l.property ? l.property.title : l.preferredLocation || "General"}
                      </td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        {l.budgetMax ? formatCurrency(l.budgetMax) : "Flexible"}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <Link href={`/leads/${l.id}`}>
                            <Button variant="ghost" size="sm" className="h-7 text-xs font-bold text-slate-500 hover:text-white">
                              Open
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Scheduled Site Visits Agenda */}
        <motion.div
          variants={itemVariants}
          className="glass-panel rounded-3xl p-6 border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 shadow-md space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-emerald-500" />
              <span>Upcoming Visits</span>
            </h2>
            <Link href="/tasks" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              All Visits
            </Link>
          </div>

          <div className="space-y-3">
            {(!metrics.upcomingAppointmentsList || metrics.upcomingAppointmentsList.length === 0) ? (
              <p className="text-xs text-slate-400 py-8 text-center">No site visits scheduled for today.</p>
            ) : (
              metrics.upcomingAppointmentsList.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-100 dark:border-white/8 space-y-1.5 text-xs hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{a.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 capitalize">
                      {a.appointmentType}
                    </span>
                  </div>
                  <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3 text-emerald-500" />
                    <span>{formatDateTime(a.startTime)}</span>
                  </p>
                  {a.location && (
                    <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span className="truncate">{a.location}</span>
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* QUICK INTAKE MODAL */}
      <Modal
        isOpen={isQuickLeadOpen}
        onClose={() => setIsQuickLeadOpen(false)}
        title="Quick Client Intake"
        description="Rapidly register a buyer inquiry into your isolated tenant pipeline."
      >
        <form onSubmit={handleQuickLeadSubmit} className="space-y-4 pt-2">
          <Input
            label="Inquiry Headline *"
            placeholder="e.g. 1 Kanal Villa Inquiry in DHA Phase 6"
            value={quickLeadForm.title}
            onChange={(e) => setQuickLeadForm({ ...quickLeadForm, title: e.target.value })}
            required
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Buyer First Name *"
              placeholder="e.g. Tariq"
              value={quickLeadForm.firstName}
              onChange={(e) => setQuickLeadForm({ ...quickLeadForm, firstName: e.target.value })}
              required
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
            <Input
              label="Last Name *"
              placeholder="e.g. Mansoor"
              value={quickLeadForm.lastName}
              onChange={(e) => setQuickLeadForm({ ...quickLeadForm, lastName: e.target.value })}
              required
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="WhatsApp / Phone *"
              placeholder="+92 300 1234567"
              value={quickLeadForm.phone}
              onChange={(e) => setQuickLeadForm({ ...quickLeadForm, phone: e.target.value })}
              required
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
            <Input
              label="Maximum Budget (PKR)"
              type="number"
              placeholder="e.g. 85000000"
              value={quickLeadForm.budgetMax}
              onChange={(e) => setQuickLeadForm({ ...quickLeadForm, budgetMax: e.target.value })}
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-white/10">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsQuickLeadOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              Save to Pipeline
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
