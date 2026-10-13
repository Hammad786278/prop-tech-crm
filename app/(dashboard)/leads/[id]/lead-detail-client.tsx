"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  Building,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  AlertTriangle,
  History,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatDateTime, formatCurrency, STAGE_CONFIG } from "@/lib/utils";
import type { Lead, LeadStageHistory, Activity, OrganizationMembership, Property, PipelineStage, UserRole } from "@/types";
import { toast } from "sonner";

interface LeadDetailClientProps {
  lead: Lead;
  stageHistory: LeadStageHistory[];
  activities: Activity[];
  teamMembers: OrganizationMembership[];
  properties: Property[];
  role: UserRole;
}

const ALL_STAGES: PipelineStage[] = [
  "new_lead",
  "contact_in_progress",
  "contacted_qualified",
  "visit_scheduled",
  "site_visit_completed",
  "negotiation",
  "booking_deposit_pending",
  "contract_issued",
  "closed_won",
  "closed_lost",
];

export function LeadDetailClient({
  lead: initialLead,
  stageHistory,
  activities,
  teamMembers,
  properties,
  role,
}: LeadDetailClientProps) {
  const router = useRouter();
  const [lead, setLead] = useState<Lead>(initialLead);
  const [currentStage, setCurrentStage] = useState<PipelineStage>(initialLead.stage);
  const [pendingStage, setPendingStage] = useState<PipelineStage | null>(null);
  const [closedLostReason, setClosedLostReason] = useState("");
  const [isClosedLostModalOpen, setIsClosedLostModalOpen] = useState(false);
  const [isUpdatingStage, setIsUpdatingStage] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "messages">("overview");

  const [notes, setNotes] = useState(lead.notes || "");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Stage change trigger
  const handleStageSelect = async (newStage: PipelineStage) => {
    if (newStage === currentStage) return;

    if (newStage === "closed_lost") {
      setPendingStage("closed_lost");
      setIsClosedLostModalOpen(true);
      return;
    }

    await executeStageChange(newStage);
  };

  const executeStageChange = async (targetStage: PipelineStage, reason?: string) => {
    setIsUpdatingStage(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}/stage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: targetStage, reason }),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();
      setLead(updated);
      setCurrentStage(targetStage);
      setIsClosedLostModalOpen(false);
      setClosedLostReason("");
      toast.success(`Pipeline updated: ${STAGE_CONFIG[targetStage]?.label}`);
      router.refresh();
    } catch {
      toast.error("Failed to update pipeline stage");
    } finally {
      setIsUpdatingStage(false);
    }
  };

  const handleAgentReassign = async (agentId: string) => {
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedAgentId: agentId || null }),
      });
      if (!res.ok) throw new Error();
      toast.success("Lead reassigned");
      router.refresh();
    } catch {
      toast.error("Failed to reassign agent");
    }
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error();
      toast.success("Notes saved");
      router.refresh();
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const activeStageConfig = STAGE_CONFIG[currentStage];
  const cleanPhone = lead.contact?.phone?.replace(/[^0-9]/g, "") || "";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/leads"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inquiries Matrix
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Current Funnel Stage:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${activeStageConfig?.bg} ${activeStageConfig?.color} ${activeStageConfig?.border}`}
          >
            {activeStageConfig?.label || currentStage}
          </span>
        </div>
      </div>

      {/* Main Glass Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50">
              Source: {lead.source}
            </span>
            <span className="text-xs text-slate-400 font-medium">• Logged {formatDate(lead.createdAt)}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{lead.title}</h1>
          {lead.closedLostReason && (
            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Lost Reason: {lead.closedLostReason}
            </p>
          )}
        </div>

        {/* Assigned Agent Selector & WhatsApp Quick Action */}
        <div className="flex items-center gap-3">
          {cleanPhone && (
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          )}

          <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-slate-400 pl-2 whitespace-nowrap">
              Agent:
            </span>
            <select
              value={lead.assignedAgentId || ""}
              onChange={(e) => handleAgentReassign(e.target.value)}
              disabled={role === "sales_agent"}
              className="h-8 px-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-semibold disabled:opacity-60 focus:outline-none"
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
      </div>

      {/* Interactive Pipeline Stage Transition Stepper */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Pipeline Funnel Progression
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {ALL_STAGES.map((st) => {
            const cfg = STAGE_CONFIG[st];
            const isSelected = currentStage === st;
            return (
              <button
                key={st}
                disabled={isUpdatingStage}
                onClick={() => handleStageSelect(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isSelected
                    ? `${cfg.bg} ${cfg.color} ${cfg.border} ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 shadow-sm`
                    : "bg-slate-50/80 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Layout: Info Cards + Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Contact Card & Interested Property Card */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Buyer Contact Profile</h2>
            <div className="text-xs space-y-3">
              {lead.contact ? (
                <div>
                  <Link
                    href={`/contacts/${lead.contact.id}`}
                    className="font-bold text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                  >
                    {lead.contact.firstName} {lead.contact.lastName}
                  </Link>
                  <div className="space-y-2 mt-2">
                    <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                      <Phone className="w-3.5 h-3.5 text-indigo-500" /> {lead.contact.phone}
                    </p>
                    {lead.contact.email && (
                      <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {lead.contact.email}
                      </p>
                    )}
                    {lead.contact.companyName && (
                      <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Building className="w-3.5 h-3.5 text-slate-400" /> {lead.contact.companyName}
                      </p>
                    )}
                  </div>
                  <div className="pt-3">
                    <Link href={`/contacts/${lead.contact.id}`}>
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        View Directory Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400">No contact associated.</p>
              )}
            </div>
          </div>

          {/* Interested Property Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Target Listing</h2>
            <div className="text-xs space-y-2">
              {lead.property ? (
                <div>
                  <Link
                    href={`/properties/${lead.property.id}`}
                    className="font-bold text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                  >
                    {lead.property.title}
                  </Link>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">
                    {lead.property.city} • {lead.property.area} (Ref: {lead.property.listingReference})
                  </p>
                  <p className="text-base font-black text-indigo-600 dark:text-indigo-400 mt-2">
                    {formatCurrency(lead.property.price, lead.property.currency)}
                  </p>
                  <div className="pt-3">
                    <Link href={`/properties/${lead.property.id}`}>
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        View Property Listing
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-slate-600 dark:text-slate-400">
                    General preference: {lead.propertyTypePreference || "Any Property Type"}
                  </p>
                  {lead.preferredLocation && (
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      Target Area: {lead.preferredLocation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Budget & Parameters */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Deal Parameters</h2>
            <div className="text-xs space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Budget Bracket:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {lead.budgetMax
                    ? `${formatCurrency(lead.budgetMin || 0)} - ${formatCurrency(lead.budgetMax)}`
                    : "Flexible"}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Timeline:</span>
                <span className="capitalize font-semibold text-slate-800 dark:text-slate-200">
                  {lead.purchaseTimeline?.replace(/_/g, " ") || "Exploring"}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Financing Mode:</span>
                <span className="capitalize font-semibold text-slate-800 dark:text-slate-200">
                  {lead.financingPreference || "Cash / Ready Funds"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 w-fit">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "overview"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Notes & Negotiation
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "history"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <History className="w-3.5 h-3.5" /> Stage History ({stageHistory.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "messages"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Channel History
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Internal Deal Notes */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Internal Deal Notes</h3>
                <Textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record confidential notes on negotiation terms, customer preferences, or follow-up schedule..."
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleSaveNotes}
                    isLoading={isSavingNotes}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                  >
                    Save Notes
                  </Button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Audit & Interaction Timeline</h3>
                {activities.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No recorded activity yet.</p>
                ) : (
                  <div className="space-y-3.5">
                    {activities.map((act) => (
                      <div key={act.id} className="flex items-start gap-3 text-xs">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-slate-800 dark:text-slate-200 font-medium">{act.description}</p>
                          <span className="text-[10px] text-slate-400">
                            {formatDateTime(act.createdAt)} {act.actorName ? `• by ${act.actorName}` : ""}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Pipeline Stage Transition Audit Trail
              </h3>
              <div className="space-y-3 pt-2">
                {stageHistory.map((hist) => {
                  const toCfg = STAGE_CONFIG[hist.toStage];
                  return (
                    <div
                      key={hist.id}
                      className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold border text-[11px] ${toCfg?.bg} ${toCfg?.color} ${toCfg?.border}`}
                        >
                          {toCfg?.label || hist.toStage}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatDateTime(hist.createdAt)}
                        </span>
                      </div>
                      {hist.fromStage && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Moved from: {STAGE_CONFIG[hist.fromStage]?.label || hist.fromStage}
                        </p>
                      )}
                      {hist.reason && (
                        <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                          Reason: {hist.reason}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                WhatsApp Cloud API & Lead Ads Integration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Planned for Phase 2 roadmap. Official WhatsApp Business Cloud API and Meta Lead Ads integration
                modules are reserved without adding unverified AI bots.
              </p>
              <Badge variant="outline" className="text-xs text-slate-500 border-slate-300 dark:border-slate-700 font-semibold">
                Phase 2 Roadmap Feature — AI Automation Not Active
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Closed Lost Reason Modal */}
      <Modal
        isOpen={isClosedLostModalOpen}
        onClose={() => setIsClosedLostModalOpen(false)}
        title="Reason for Marking Closed Lost"
        description="Record the business reason why this deal or inquiry was lost."
      >
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Select Common Reason</label>
            <select
              value={closedLostReason}
              onChange={(e) => setClosedLostReason(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Choose reason --</option>
              <option value="Budget Mismatch">Budget Mismatch</option>
              <option value="Bought Competitor Project">Bought Competitor Project</option>
              <option value="Unresponsive / Inactive">Unresponsive / Inactive</option>
              <option value="Location Not Preferred">Location Not Preferred</option>
              <option value="Delayed Investment Decision">Delayed Investment Decision</option>
            </select>
          </div>

          <Textarea
            label="Additional Context"
            placeholder="Detailed feedback or reason..."
            value={closedLostReason}
            onChange={(e) => setClosedLostReason(e.target.value)}
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsClosedLostModalOpen(false)}
              className="dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              isLoading={isUpdatingStage}
              onClick={() => executeStageChange("closed_lost", closedLostReason || "Closed Lost")}
            >
              Confirm Closed Lost
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
