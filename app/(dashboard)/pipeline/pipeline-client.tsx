"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Kanban as KanbanIcon,
  Search,
  ArrowRight,
  TrendingUp,
  User,
  Building,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  MoveRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate, STAGE_CONFIG } from "@/lib/utils";
import type { Lead, PipelineStage, UserRole } from "@/types";
import { toast } from "sonner";

interface PipelineClientProps {
  initialLeads: Lead[];
  role: UserRole;
}

const PIPELINE_COLUMNS: { stage: PipelineStage; label: string }[] = [
  { stage: "new_lead", label: "New Lead" },
  { stage: "contact_in_progress", label: "Contact in Progress" },
  { stage: "contacted_qualified", label: "Contacted / Qualified" },
  { stage: "visit_scheduled", label: "Visit Scheduled" },
  { stage: "site_visit_completed", label: "Site Visit Completed" },
  { stage: "negotiation", label: "Negotiation" },
  { stage: "booking_deposit_pending", label: "Booking / Deposit Pending" },
  { stage: "contract_issued", label: "Contract Issued" },
  { stage: "closed_won", label: "Closed Won" },
  { stage: "closed_lost", label: "Closed Lost" },
];

export function PipelineClient({ initialLeads, role }: PipelineClientProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");

  // Modal to move stage
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [targetStage, setTargetStage] = useState<PipelineStage | null>(null);
  const [closedLostReason, setClosedLostReason] = useState("");
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredLeads = leads.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      (l.contact &&
        `${l.contact.firstName} ${l.contact.lastName}`.toLowerCase().includes(search.toLowerCase())) ||
      (l.property && l.property.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenMoveModal = (lead: Lead) => {
    setSelectedLead(lead);
    setTargetStage(lead.stage);
    setIsMoveModalOpen(true);
  };

  const handleExecuteMove = async () => {
    if (!selectedLead || !targetStage) return;

    if (targetStage === "closed_lost" && !closedLostReason.trim()) {
      toast.error("Please provide a reason for marking Closed Lost");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}/stage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage: targetStage,
          reason: targetStage === "closed_lost" ? closedLostReason : undefined,
        }),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? updated : l)));
      setIsMoveModalOpen(false);
      setSelectedLead(null);
      setClosedLostReason("");
      toast.success(`Deal moved to ${STAGE_CONFIG[targetStage]?.label}`);
      router.refresh();
    } catch {
      toast.error("Failed to update pipeline stage");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-deep tracking-tight">Sales Pipeline</h1>
          <p className="text-xs text-text-secondary mt-1">
            Kanban workflow with 10 defined stages and live deal volume calculations.
          </p>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pipeline cards..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
          />
        </div>
      </div>

      {/* Kanban Board Container (Smooth horizontal scrollable columns) */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x select-none">
        {PIPELINE_COLUMNS.map((col) => {
          const colLeads = filteredLeads.filter((l) => l.stage === col.stage);
          const colVolume = colLeads.reduce((acc, l) => acc + (l.budgetMax || 0), 0);
          const stCfg = STAGE_CONFIG[col.stage];

          return (
            <div
              key={col.stage}
              className="w-72 shrink-0 bg-slate-100/75 rounded-2xl p-3 border border-slate-200/90 flex flex-col max-h-[75vh]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${stCfg?.color.replace("text-", "bg-")}`}
                  />
                  <h3 className="text-xs font-bold text-navy-deep truncate max-w-[170px]">
                    {col.label}
                  </h3>
                </div>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-2xs border border-slate-200">
                  {colLeads.length}
                </span>
              </div>

              {colVolume > 0 && (
                <div className="px-1 py-1.5 text-[10px] font-bold text-slate-500">
                  Vol: {formatCurrency(colVolume)}
                </div>
              )}

              {/* Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 mt-2 pr-0.5">
                {colLeads.length === 0 ? (
                  <div className="py-8 text-center text-[11px] text-slate-400 font-medium">
                    No deals in this stage
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-card hover:shadow-premium hover:border-primary/40 transition-all space-y-2 group"
                    >
                      {/* Title & Link */}
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="font-bold text-xs text-navy-deep group-hover:text-primary transition-colors line-clamp-2 leading-tight"
                        >
                          {lead.title}
                        </Link>
                      </div>

                      {/* Buyer Contact */}
                      {lead.contact && (
                        <p className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                          <User className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">
                            {lead.contact.firstName} {lead.contact.lastName}
                          </span>
                        </p>
                      )}

                      {/* Property */}
                      {lead.property && (
                        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <Building className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{lead.property.title}</span>
                        </p>
                      )}

                      {/* Budget */}
                      {lead.budgetMax && (
                        <p className="text-xs font-black text-primary">
                          {formatCurrency(lead.budgetMax)}
                        </p>
                      )}

                      {/* Footer: Agent & Stage Mover Button */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="truncate max-w-[120px]">
                          {lead.assignedAgent?.fullName ? `Agent: ${lead.assignedAgent.fullName.split(" ")[0]}` : "Unassigned"}
                        </span>

                        <button
                          onClick={() => handleOpenMoveModal(lead)}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-primary hover:text-white font-bold text-slate-600 transition-colors flex items-center gap-1"
                          title="Move stage"
                        >
                          Move <MoveRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Move Stage Dialog */}
      <Modal
        isOpen={isMoveModalOpen}
        onClose={() => setIsMoveModalOpen(false)}
        title="Move Pipeline Stage"
        description={selectedLead ? `Update status for: "${selectedLead.title}"` : ""}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Select New Stage</label>
            <select
              value={targetStage || ""}
              onChange={(e) => setTargetStage(e.target.value as PipelineStage)}
              className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg font-semibold"
            >
              {PIPELINE_COLUMNS.map((col) => (
                <option key={col.stage} value={col.stage}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          {targetStage === "closed_lost" && (
            <div className="space-y-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
              <label className="block text-xs font-bold text-rose-900">Closed Lost Reason *</label>
              <Textarea
                placeholder="Reason why this inquiry was lost (e.g. Budget mismatch, bought another project)..."
                value={closedLostReason}
                onChange={(e) => setClosedLostReason(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMoveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleExecuteMove} isLoading={isLoading}>
              Update Stage
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
