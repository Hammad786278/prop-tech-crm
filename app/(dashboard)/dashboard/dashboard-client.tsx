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
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-deep tracking-tight">
              Agency Overview
            </h1>
            <Badge variant="gold" className="font-bold">
              PKR • Asia/Karachi
            </Badge>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Welcome back. Real-time metrics for <span className="font-semibold text-slate-800">{orgName}</span>.
          </p>
        </div>

        {/* Working Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setIsAddLeadOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Lead
          </Button>
          <Button onClick={() => setIsAddContactOpen(true)} variant="secondary" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Contact
          </Button>
          <Button onClick={() => setIsAddApptOpen(true)} variant="secondary" size="sm">
            <CalendarCheck className="w-4 h-4 mr-1" /> Site Visit
          </Button>
          <Button onClick={() => setIsAddTaskOpen(true)} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Task
          </Button>
        </div>
      </div>

      {/* 5 Real DB Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Leads */}
        <Card className="hover:shadow-premium transition-all">
          <CardHeader className="p-4 pb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-navy-deep">{metrics.totalLeads}</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">All time customer inquiries</p>
          </CardContent>
        </Card>

        {/* Card 2: New Leads */}
        <Card className="hover:shadow-premium transition-all">
          <CardHeader className="p-4 pb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Leads</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-primary">{metrics.newLeads}</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-primary font-semibold mt-2">Awaiting first contact</p>
          </CardContent>
        </Card>

        {/* Card 3: Active Opportunities */}
        <Card className="hover:shadow-premium transition-all">
          <CardHeader className="p-4 pb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Deals</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-600">{metrics.activeOpportunities}</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">In qualification or negotiation</p>
          </CardContent>
        </Card>

        {/* Card 4: Upcoming Appointments */}
        <Card className="hover:shadow-premium transition-all">
          <CardHeader className="p-4 pb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Appointments</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-cyan-600">{metrics.upcomingAppointments}</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Scheduled site visits & calls</p>
          </CardContent>
        </Card>

        {/* Card 5: Closed-Won Deals */}
        <Card className="hover:shadow-premium transition-all">
          <CardHeader className="p-4 pb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Closed Won</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-600">{metrics.closedWonDeals}</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-2">Successful transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Analytics Row: Pipeline Stages & Source Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Distribution Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Sales Pipeline Distribution</CardTitle>
              <p className="text-xs text-text-secondary mt-1">
                Volume of inquiries distributed across active sales stages
              </p>
            </div>
            <Link href="/pipeline">
              <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">
                View Kanban <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metrics.leadsByStage}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#64748B" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0B1220",
                      borderColor: "#1E293B",
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

        {/* Lead Sources Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Inquiries by Source</CardTitle>
            <p className="text-xs text-text-secondary mt-1">Acquisition channels</p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.leadsBySource}
                    dataKey="count"
                    nameKey="source"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {metrics.leadsBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
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
            <div className="mt-2 space-y-1 max-h-24 overflow-y-auto pr-1">
              {metrics.leadsBySource.map((s, idx) => (
                <div key={s.source} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                    />
                    {s.source}
                  </span>
                  <span className="font-bold text-navy-deep">{s.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row: Recent Leads & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recent Leads & Inquiries</CardTitle>
              <p className="text-xs text-text-secondary mt-1">Latest customer interactions</p>
            </div>
            <Link href="/leads">
              <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-500 font-semibold">
                    <th className="p-3 pl-6">Inquiry Summary</th>
                    <th className="p-3">Buyer Contact</th>
                    <th className="p-3">Source</th>
                    <th className="p-3">Current Stage</th>
                    <th className="p-3 pr-6 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {metrics.recentLeads.map((lead) => {
                    const st = STAGE_CONFIG[lead.stage];
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 pl-6">
                          <Link
                            href={`/leads/${lead.id}`}
                            className="font-bold text-navy-deep hover:text-primary transition-colors block max-w-xs truncate"
                          >
                            {lead.title}
                          </Link>
                          {lead.property && (
                            <span className="text-[11px] text-slate-500 truncate block">
                              Prop: {lead.property.title}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <p className="font-semibold text-slate-800">
                            {lead.contact ? `${lead.contact.firstName} ${lead.contact.lastName}` : "—"}
                          </p>
                          <p className="text-[11px] text-slate-500">{lead.contact?.phone}</p>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {lead.source}
                          </span>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold border ${st?.bg} ${st?.color} ${st?.border}`}
                          >
                            {st?.label || lead.stage}
                          </span>
                        </td>
                        <td className="p-3 pr-6 text-right text-slate-500">
                          {formatDate(lead.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments Agenda */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Upcoming Visits</CardTitle>
              <p className="text-xs text-text-secondary mt-1">Scheduled site meetings</p>
            </div>
            <Link href="/tasks">
              <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">
                Agenda <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {metrics.upcomingAppointmentsList.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No scheduled visits.</p>
              ) : (
                metrics.upcomingAppointmentsList.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-bold text-navy-deep">{appt.title}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-primary font-bold">
                        {appt.appointmentType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{formatDateTime(appt.startTime)}</span>
                    </div>
                    {appt.location && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{appt.location}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
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
                <label className="block text-xs font-semibold text-slate-700">Associated Contact *</label>
                <select
                  value={leadForm.contactId}
                  onChange={(e) => setLeadForm({ ...leadForm, contactId: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName} {c.lastName} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Interested Property</label>
                <select
                  value={leadForm.propertyId}
                  onChange={(e) => setLeadForm({ ...leadForm, propertyId: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">General Inquiry (No specific unit)</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({formatCurrency(p.price, p.currency)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Source</label>
                <select
                  value={leadForm.source}
                  onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
