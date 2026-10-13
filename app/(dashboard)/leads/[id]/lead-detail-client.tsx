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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

  return (
    <div className="space-y-6">
      {/* Top Navigation & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/leads"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-deep transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Leads
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Current Stage:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${activeStageConfig?.bg} ${activeStageConfig?.color} ${activeStageConfig?.border}`}
          >
            {activeStageConfig?.label || currentStage}
          </span>
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
              Source: {lead.source}
            </span>
            <span className="text-xs text-slate-400">• Created {formatDate(lead.createdAt)}</span>
          </div>
          <h1 className="text-2xl font-black text-navy-deep tracking-tight">{lead.title}</h1>
          {lead.closedLostReason && (
            <p className="text-xs font-semibold text-rose-600 mt-1">
              Lost Reason: {lead.closedLostReason}
            </p>
          )}
        </div>

        {/* Assigned Agent Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Assigned Agent:
          </span>
          <select
            value={lead.assignedAgentId || ""}
            onChange={(e) => handleAgentReassign(e.target.value)}
            disabled={role === "sales_agent"}
            className="h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold disabled:opacity-60"
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

      {/* Interactive Pipeline Stage Transition Stepper */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
            Move Pipeline Stage
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
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
                      ? `${cfg.bg} ${cfg.color} ${cfg.border} ring-2 ring-primary ring-offset-1`
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detail Layout: Info Cards + Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Contact Card & Interested Property Card */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Buyer Contact</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-xs space-y-3">
              {lead.contact ? (
                <div>
                  <Link
                    href={`/contacts/${lead.contact.id}`}
                    className="font-bold text-sm text-navy-deep hover:text-primary transition-colors block"
                  >
                    {lead.contact.firstName} {lead.contact.lastName}
                  </Link>
                  <div className="space-y-1.5 mt-2">
                    <p className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Phone className="w-3.5 h-3.5 text-primary" /> {lead.contact.phone}
                    </p>
                    {lead.contact.email && (
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {lead.contact.email}
                      </p>
                    )}
                    {lead.contact.companyName && (
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <Building className="w-3.5 h-3.5 text-slate-400" /> {lead.contact.companyName}
                      </p>
                    )}
                  </div>
                  <div className="pt-3">
                    <Link href={`/contacts/${lead.contact.id}`}>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View Full Contact Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400">No contact associated.</p>
              )}
            </CardContent>
          </Card>

          {/* Interested Property Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Target Property</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-xs space-y-2">
              {lead.property ? (
                <div>
                  <Link
                    href={`/properties/${lead.property.id}`}
                    className="font-bold text-sm text-navy-deep hover:text-primary transition-colors block"
                  >
                    {lead.property.title}
                  </Link>
                  <p className="text-slate-500 mt-1">
                    {lead.property.city} • {lead.property.area} (Ref: {lead.property.listingReference})
                  </p>
                  <p className="text-sm font-extrabold text-primary mt-2">
                    {formatCurrency(lead.property.price, lead.property.currency)}
                  </p>
                  <div className="pt-3">
                    <Link href={`/properties/${lead.property.id}`}>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View Property Listing
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-slate-500">
                    General preference: {lead.propertyTypePreference || "Any Property Type"}
                  </p>
                  {lead.preferredLocation && (
                    <p className="text-slate-500 mt-1">
                      Target Area: {lead.preferredLocation}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Budget & Parameters */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Inquiry Parameters</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-xs space-y-2 divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Budget Range:</span>
                <span className="font-semibold text-slate-800">
                  {lead.budgetMax
                    ? `${formatCurrency(lead.budgetMin || 0)} - ${formatCurrency(lead.budgetMax)}`
                    : "Flexible"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Timeline:</span>
                <span className="capitalize font-semibold text-slate-800">
                  {lead.purchaseTimeline?.replace(/_/g, " ") || "Exploring"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Financing:</span>
                <span className="capitalize font-semibold text-slate-800">
                  {lead.financingPreference || "Cash / Flexible"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Tabbed Interface (Overview/Notes, Stage History, Future Messaging) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              Notes & Requirements
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === "history"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <History className="w-3.5 h-3.5" /> Stage History & Audit ({stageHistory.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === "messages"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Conversations
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Internal Deal Notes</CardTitle>
                </CardHeader>
                <CardContent className="pt-2 space-y-3">
                  <Textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Record notes on negotiation terms, site visit feedback, or next steps..."
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleSaveNotes}
                      isLoading={isSavingNotes}
                    >
                      Save Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Activity Feed</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  {activities.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4 text-center">No recorded activity yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {activities.map((act) => (
                        <div key={act.id} className="flex items-start gap-3 text-xs">
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-slate-800 font-medium">{act.description}</p>
                            <span className="text-[10px] text-slate-400">
                              {formatDateTime(act.createdAt)} {act.actorName ? `• by ${act.actorName}` : ""}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "history" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pipeline Stage Transition Audit Trail</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-3">
                  {stageHistory.map((hist) => {
                    const toCfg = STAGE_CONFIG[hist.toStage];
                    return (
                      <div
                        key={hist.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold border ${toCfg?.bg} ${toCfg?.color} ${toCfg?.border}`}
                          >
                            {toCfg?.label || hist.toStage}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {formatDateTime(hist.createdAt)}
                          </span>
                        </div>
                        {hist.fromStage && (
                          <p className="text-[11px] text-slate-500">
                            Moved from: {STAGE_CONFIG[hist.fromStage]?.label || hist.fromStage}
                          </p>
                        )}
                        {hist.reason && (
                          <p className="text-[11px] font-medium text-slate-700 bg-white p-2 rounded border border-slate-200">
                            Reason: {hist.reason}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "messages" && (
            <Card>
              <CardContent className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-base font-bold text-navy-deep">
                  WhatsApp & Messaging Integrations
                </h3>
                <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
                  Planned for future Phase 2 roadmap. Official WhatsApp Cloud API and Meta Lead Ads
                  integration modules are reserved here without impacting the CRM core.
                </p>
                <Badge variant="outline" className="text-xs text-slate-500 font-semibold">
                  Phase 2 Roadmap Feature — AI Automation Not Active
                </Badge>
              </CardContent>
            </Card>
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
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Select Common Reason</label>
            <select
              value={closedLostReason}
              onChange={(e) => setClosedLostReason(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
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
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsClosedLostModalOpen(false)}
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
