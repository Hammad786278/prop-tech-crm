"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Kanban as KanbanIcon,
  Search,
  ArrowRight,
  TrendingUp,
  User,
  Building2,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  MoveRight,
  Sparkles,
  Home,
  ArrowUpRight,
  Plus,
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

const PIPELINE_COLUMNS: { stage: PipelineStage; label: string; accentColor: string }[] = [
  { stage: "new_lead", label: "New Lead", accentColor: "from-blue-500 to-indigo-500" },
  { stage: "contact_in_progress", label: "Contact in Progress", accentColor: "from-indigo-500 to-purple-500" },
  { stage: "contacted_qualified", label: "Contacted / Qualified", accentColor: "from-cyan-500 to-blue-500" },
  { stage: "visit_scheduled", label: "Visit Scheduled", accentColor: "from-amber-500 to-yellow-500" },
  { stage: "site_visit_completed", label: "Site Visit Completed", accentColor: "from-orange-500 to-amber-500" },
  { stage: "negotiation", label: "Negotiation", accentColor: "from-violet-500 to-fuchsia-500" },
  { stage: "booking_deposit_pending", label: "Booking Deposit Pending", accentColor: "from-emerald-500 to-teal-500" },
  { stage: "contract_issued", label: "Contract Issued", accentColor: "from-blue-600 to-emerald-600" },
  { stage: "closed_won", label: "Closed Won", accentColor: "from-emerald-400 to-green-600" },
  { stage: "closed_lost", label: "Closed Lost", accentColor: "from-rose-500 to-red-600" },
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

  const totalPipelineValue = leads.reduce((sum, l) => sum + (l.budgetMax || 0), 0);

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
      toast.error("Failed to update deal stage");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card with Return to Main Site Button */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              10-Stage Sales Kanban Funnel
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Live Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total active deal volume: <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalPipelineValue)}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Button to Return to Main Website */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 transition-all"
            >
              <Home className="w-3.5 h-3.5 text-emerald-500" />
              <span>Public Website</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </motion.div>
          </Link>

          <div className="w-full sm:w-72 relative">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search deals, clients, properties..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Kanban Board Container (Smooth horizontal scrollable columns) */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1 select-none">
        {PIPELINE_COLUMNS.map((col) => {
          const colLeads = filteredLeads.filter((l) => l.stage === col.stage);
          const colVolume = colLeads.reduce((acc, l) => acc + (l.budgetMax || 0), 0);
          const stCfg = STAGE_CONFIG[col.stage];

          return (
            <div
              key={col.stage}
              className="w-76 shrink-0 bg-slate-100/70 dark:bg-[#070D22]/90 rounded-3xl p-3.5 border border-slate-200/80 dark:border-white/8 flex flex-col max-h-[76vh] shadow-sm backdrop-blur-xl"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200 dark:border-white/8">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${stCfg?.color.replace("text-", "bg-")}`}
                  />
                  <h3 className="text-xs font-black text-slate-900 dark:text-white truncate">
                    {col.label}
                  </h3>
                </div>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-white dark:bg-white/10 text-slate-800 dark:text-slate-200 shadow-xs border border-slate-200 dark:border-white/10">
                  {colLeads.length}
                </span>
              </div>

              {colVolume > 0 && (
                <div className="px-1 py-1.5 text-[10px] font-extrabold text-slate-500 dark:text-slate-400">
                  Vol: {formatCurrency(colVolume)}
                </div>
              )}

              {/* Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 mt-2 pr-0.5">
                {colLeads.length === 0 ? (
                  <div className="py-12 text-center text-[11px] text-slate-400 font-medium">
                    No deals in this stage
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <motion.div
                      layout
                      whileHover={{ y: -3, scale: 1.02 }}
                      key={lead.id}
                      className="glossy-card p-4 rounded-2xl border border-slate-200/90 dark:border-white/8 bg-white dark:bg-[#0E1630]/90 shadow-sm space-y-2.5 group backdrop-blur-xl"
                    >
                      {/* Title & Link */}
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="font-black text-xs text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2 leading-tight"
                        >
                          {lead.title}
                        </Link>
                      </div>

                      {/* Buyer Contact */}
                      {lead.contact && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">
                            {lead.contact.firstName} {lead.contact.lastName}
                          </span>
                        </p>
                      )}

                      {/* Property */}
                      {lead.property && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{lead.property.title}</span>
                        </p>
                      )}

                      {/* Budget */}
                      {lead.budgetMax && (
                        <div className="pt-1">
                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(lead.budgetMax)}
                          </span>
                        </div>
                      )}

                      {/* Move Stage CTA */}
                      <div className="pt-2 border-t border-slate-100 dark:border-white/6 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {formatDate(lead.createdAt)}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleOpenMoveModal(lead)}
                          className="px-2.5 py-1 text-[10px] font-black rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white transition-all border border-emerald-500/25 flex items-center gap-1"
                        >
                          <span>Move</span>
                          <MoveRight className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Move Stage Modal */}
      <Modal
        isOpen={isMoveModalOpen}
        onClose={() => setIsMoveModalOpen(false)}
        title="Advance Deal Pipeline Stage"
        description={`Transition "${selectedLead?.title}" to the next pipeline milestone.`}
      >
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Target Stage</label>
            <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1">
              {PIPELINE_COLUMNS.map((col) => {
                const isSelected = targetStage === col.stage;
                return (
                  <button
                    key={col.stage}
                    type="button"
                    onClick={() => setTargetStage(col.stage)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left border transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30"
                        : "bg-slate-50 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    {col.label}
                  </button>
                );
              })}
            </div>
          </div>

          {targetStage === "closed_lost" && (
            <div className="space-y-1.5 animate-in fade-in">
              <label className="block text-xs font-bold text-rose-600 dark:text-rose-400">
                Reason for Closed Lost *
              </label>
              <Textarea
                placeholder="Why was this lead lost? (e.g. Budget mismatch, bought competitor property, unresponsive)"
                value={closedLostReason}
                onChange={(e) => setClosedLostReason(e.target.value)}
                required
                className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-white/10">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsMoveModalOpen(false)}
              className="dark:border-white/10 dark:text-slate-300"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              isLoading={isLoading}
              onClick={handleExecuteMove}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              Confirm Stage Move
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
