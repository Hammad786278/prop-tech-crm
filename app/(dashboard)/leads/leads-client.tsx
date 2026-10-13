"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Download,
  Upload,
  ArrowRight,
  TrendingUp,
  Filter,
  AlertTriangle,
  Building,
  User,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { CSVImportModal } from "./import-modal";
import { formatDate, formatCurrency, STAGE_CONFIG } from "@/lib/utils";
import type { Lead, Contact, Property, OrganizationMembership, UserRole } from "@/types";
import { toast } from "sonner";

interface LeadsClientProps {
  initialLeads: Lead[];
  total: number;
  currentPage: number;
  contacts: Contact[];
  properties: Property[];
  teamMembers: OrganizationMembership[];
  role: UserRole;
}

export function LeadsClient({
  initialLeads,
  total,
  currentPage,
  contacts,
  properties,
  teamMembers,
  role,
}: LeadsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [stage, setStage] = useState(searchParams.get("stage") || "all");
  const [source, setSource] = useState(searchParams.get("source") || "all");
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<any>(null);

  const [leadForm, setLeadForm] = useState({
    title: "",
    contactId: contacts[0]?.id || "",
    // Inline contact creation if no contacts selected
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    propertyId: "",
    source: "Manual Entry",
    budgetMin: "",
    budgetMax: "",
    preferredLocation: "",
    assignedAgentId: "",
    notes: "",
  });

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (stage !== "all") params.set("stage", stage);
    if (source !== "all") params.set("source", source);
    params.set("page", "1");
    router.push(`/leads?${params.toString()}`);
  };

  const handleExportCSV = () => {
    window.location.href = "/api/export/csv";
  };

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
      toast.error("Failed to create lead");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-navy-deep dark:text-white tracking-tight">
              Leads & Inquiries Registry
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs border border-emerald-500/20">
              {total} Inquiries
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track inquiries, buyer requirements, and assigned agents across all sales stages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/">
            <Button variant="outline" size="sm" className="rounded-xl border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Public Site
            </Button>
          </Link>
          {role !== "sales_agent" && (
            <Button onClick={() => setIsImportOpen(true)} variant="secondary" size="sm">
              <Upload className="w-3.5 h-3.5 mr-1.5 text-primary dark:text-cyan" /> Import CSV
            </Button>
          )}
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
          </Button>
          <Button onClick={() => setIsAddLeadOpen(true)} size="sm" variant="primary" className="shadow-md shadow-indigo-600/25">
            <Plus className="w-4 h-4 mr-1.5" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-xs">
        <form
          onSubmit={handleFilterSubmit}
          className="flex flex-col md:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries, client names, or properties..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Stage Filter */}
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="h-9 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Stages</option>
              <option value="new_lead">New Lead</option>
              <option value="contact_in_progress">Contact in Progress</option>
              <option value="contacted_qualified">Contacted / Qualified</option>
              <option value="visit_scheduled">Visit Scheduled</option>
              <option value="site_visit_completed">Site Visit Completed</option>
              <option value="negotiation">Negotiation</option>
              <option value="booking_deposit_pending">Booking / Deposit Pending</option>
              <option value="contract_issued">Contract Issued</option>
              <option value="closed_won">Closed Won</option>
              <option value="closed_lost">Closed Lost</option>
            </select>

            {/* Source Filter */}
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="h-9 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Sources</option>
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

            <Button type="submit" variant="secondary" size="sm">
              Filter
            </Button>
          </div>
        </form>
      </div>

      {/* Leads Table */}
      {initialLeads.length === 0 ? (
        <EmptyState
          icon={TrendingUp}
          title="No leads found"
          description={
            search || stage !== "all" || source !== "all"
              ? "No inquiries match your current filter parameters."
              : "Create your first lead inquiry or import via CSV."
          }
          actionLabel="Add Lead"
          onAction={() => setIsAddLeadOpen(true)}
        />
      ) : (
        <div className="glass-panel rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/8 bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 pl-6">Inquiry Summary</th>
                    <th className="p-3.5">Client & WhatsApp</th>
                    <th className="p-3.5">Interested Property</th>
                    <th className="p-3.5">Budget</th>
                    <th className="p-3.5">Stage</th>
                    <th className="p-3.5">Assigned Agent</th>
                    <th className="p-3.5">Source</th>
                    <th className="p-3.5 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {initialLeads.map((lead) => {
                    const st = STAGE_CONFIG[lead.stage];
                    const cleanPhone = lead.contact?.phone.replace(/\D/g, "");
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors group">
                        <td className="p-3.5 pl-6">
                          <Link
                            href={`/leads/${lead.id}`}
                            className="font-extrabold text-navy-deep dark:text-white group-hover:text-primary dark:group-hover:text-cyan transition-colors block text-sm max-w-xs truncate"
                          >
                            {lead.title}
                          </Link>
                          <span className="text-[11px] text-slate-400">
                            Created {formatDate(lead.createdAt)}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {lead.contact ? (
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">
                                {lead.contact.firstName} {lead.contact.lastName}
                              </p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{lead.contact.phone}</span>
                                {cleanPhone && (
                                  <a
                                    href={`https://wa.me/${cleanPhone}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                                    title="Open WhatsApp chat"
                                  >
                                    💬
                                  </a>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="p-3.5 max-w-[200px]">
                          {lead.property ? (
                            <Link
                              href={`/properties/${lead.property.id}`}
                              className="font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-cyan transition-colors block truncate"
                            >
                              🏢 {lead.property.title}
                            </Link>
                          ) : (
                            <span className="text-slate-400">
                              {lead.propertyTypePreference || "General Project"}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-extrabold text-navy-deep dark:text-white whitespace-nowrap">
                          {lead.budgetMax
                            ? formatCurrency(lead.budgetMax)
                            : lead.budgetMin
                            ? `Min: ${formatCurrency(lead.budgetMin)}`
                            : "Flexible"}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold border whitespace-nowrap text-[11px] inline-flex items-center gap-1.5 ${st?.bg} ${st?.color} ${st?.border}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {st?.label || lead.stage}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                          {lead.assignedAgent?.fullName || "Unassigned"}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                            {lead.source}
                          </span>
                        </td>
                        <td className="p-3.5 pr-6 text-right">
                          <Link href={`/leads/${lead.id}`}>
                            <Button variant="ghost" size="sm" className="h-7 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/10">
                              Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      <CSVImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={() => {
          setIsImportOpen(false);
          router.refresh();
        }}
      />

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddLeadOpen}
        onClose={() => {
          setIsAddLeadOpen(false);
          setDuplicateWarning(null);
        }}
        title="Create New Lead Inquiry"
        description="Log buyer details, property preferences, and budget limits."
      >
        {duplicateWarning ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">Duplicate Contact Detected</p>
                <p className="text-xs text-amber-700 mt-1">{duplicateWarning.message}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDuplicateWarning(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={(e) => handleCreateLead(e, true)} isLoading={isLoading}>
                Proceed & Link Inquiry
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => handleCreateLead(e, false)} className="space-y-4">
            <Input
              id="leadTitle"
              label="Inquiry Title / Project Preference *"
              placeholder="e.g. Inquiring for 3-Bed Penthouse in Clifton"
              value={leadForm.title}
              onChange={(e) => setLeadForm({ ...leadForm, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Select Existing Contact</label>
                <select
                  value={leadForm.contactId}
                  onChange={(e) => setLeadForm({ ...leadForm, contactId: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
                >
                  <option value="">-- Or enter new contact below --</option>
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName} {c.lastName} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Specific Property</label>
                <select
                  value={leadForm.propertyId}
                  onChange={(e) => setLeadForm({ ...leadForm, propertyId: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
                >
                  <option value="">General Project / Location</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({formatCurrency(p.price, p.currency)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inline contact inputs if no contactId selected */}
            {!leadForm.contactId && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase">New Contact Details</p>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="First Name *"
                    value={leadForm.firstName}
                    onChange={(e) => setLeadForm({ ...leadForm, firstName: e.target.value })}
                    required={!leadForm.contactId}
                  />
                  <Input
                    placeholder="Last Name *"
                    value={leadForm.lastName}
                    onChange={(e) => setLeadForm({ ...leadForm, lastName: e.target.value })}
                    required={!leadForm.contactId}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Phone (+92...) *"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    required={!leadForm.contactId}
                  />
                  <Input
                    placeholder="Email Address"
                    type="email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Source</label>
                <select
                  value={leadForm.source}
                  onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
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
                label="Budget Min (PKR)"
                type="number"
                placeholder="e.g. 50000000"
                value={leadForm.budgetMin}
                onChange={(e) => setLeadForm({ ...leadForm, budgetMin: e.target.value })}
              />

              <Input
                label="Budget Max (PKR)"
                type="number"
                placeholder="e.g. 80000000"
                value={leadForm.budgetMax}
                onChange={(e) => setLeadForm({ ...leadForm, budgetMax: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Preferred Location"
                placeholder="e.g. DHA Phase 6 or Clifton"
                value={leadForm.preferredLocation}
                onChange={(e) => setLeadForm({ ...leadForm, preferredLocation: e.target.value })}
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Assign to Agent</label>
                <select
                  value={leadForm.assignedAgentId}
                  onChange={(e) => setLeadForm({ ...leadForm, assignedAgentId: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
                >
                  <option value="">Unassigned</option>
                  {teamMembers.map((m) => (
                    <option key={m.userId} value={m.userId}>
                      {m.user?.fullName} ({m.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Textarea
              label="Notes"
              placeholder="Client requirements, payment terms..."
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
    </div>
  );
}
