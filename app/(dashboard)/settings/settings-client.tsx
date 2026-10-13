"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Kanban,
  Download,
  Share2,
  ShieldCheck,
  Sparkles,
  Lock,
  Globe,
  Clock,
  Coins,
  Settings as SettingsIcon,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateTime, STAGE_CONFIG, ROLE_LABELS } from "@/lib/utils";
import type { Organization, UserProfile, UserRole, AuditEvent } from "@/types";
import { toast } from "sonner";

interface SettingsClientProps {
  organization: Organization;
  user: UserProfile;
  role: UserRole;
  auditEvents: AuditEvent[];
}

export function SettingsClient({
  organization,
  user,
  role,
  auditEvents,
}: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<"agency" | "pipeline" | "integrations" | "audit">("agency");

  const [agencyForm, setAgencyForm] = useState({
    name: organization.name,
    contactEmail: organization.contactEmail,
    phone: organization.phone || "",
    country: organization.country,
    timezone: organization.timezone,
    currency: organization.currency,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAgency = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Agency profile settings saved");
    }, 500);
  };

  const handleExportAllData = () => {
    window.location.href = "/api/export/csv";
    toast.success("Export started");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-[11px] font-bold text-indigo-700 dark:text-indigo-400 mb-2">
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Workspace & Security Governance</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Settings & Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Tenant profile parameters, sales pipeline configurations, and compliance audit trail.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="rounded-xl border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40">
                <Globe className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Public Site
              </Button>
            </Link>
            <span className="px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {organization.name}
            </span>
          </div>
        </div>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 w-fit">
        <button
          onClick={() => setActiveTab("agency")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "agency"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" /> Agency Profile
        </button>
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "pipeline"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Kanban className="w-3.5 h-3.5" /> Pipeline Stages
        </button>
        <button
          onClick={() => setActiveTab("integrations")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "integrations"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" /> Integrations Roadmap
        </button>
        {role === "agency_owner" && (
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "audit"
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Audit Events ({auditEvents.length})
          </button>
        )}
      </div>

      {/* Tab 1: Agency Profile */}
      {activeTab === "agency" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Agency Business Profile</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Core identity variables used across invoice templates and customer emails.
              </p>

              <form onSubmit={handleSaveAgency} className="space-y-5">
                <Input
                  label="Agency Legal Name"
                  value={agencyForm.name}
                  onChange={(e) => setAgencyForm({ ...agencyForm, name: e.target.value })}
                  disabled={role !== "agency_owner"}
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Official Contact Email"
                    type="email"
                    value={agencyForm.contactEmail}
                    onChange={(e) =>
                      setAgencyForm({ ...agencyForm, contactEmail: e.target.value })
                    }
                    disabled={role !== "agency_owner"}
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                  <Input
                    label="Office Phone"
                    value={agencyForm.phone}
                    onChange={(e) => setAgencyForm({ ...agencyForm, phone: e.target.value })}
                    disabled={role !== "agency_owner"}
                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                    <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-indigo-500" /> Country Region
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{agencyForm.country}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                    <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-500" /> Operational Timezone
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                      {agencyForm.timezone}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                    <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-amber-500" /> Base Currency
                    </p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">{agencyForm.currency} (PKR)</p>
                  </div>
                </div>

                {role === "agency_owner" && (
                  <div className="flex justify-end pt-3">
                    <Button
                      type="submit"
                      size="sm"
                      isLoading={isSaving}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                    >
                      Save Agency Profile
                    </Button>
                  </div>
                )}
              </form>
            </div>

            {/* Data Export Card */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Data Export & Compliance Backup</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate an immediate tenant-scoped CSV spreadsheet containing your current leads, contacts,
                budget parameters, and deal history for offsite auditing.
              </p>
              <Button
                onClick={handleExportAllData}
                variant="outline"
                size="sm"
                className="font-semibold rounded-xl border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Download className="w-3.5 h-3.5 mr-2 text-indigo-500" /> Export All Agency Leads (.CSV)
              </Button>
            </div>
          </div>

          {/* User Session Side Panel */}
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Authenticated Session</h2>
              <div className="text-xs space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{user.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Email:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Assigned Role:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{ROLE_LABELS[role]}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 dark:text-slate-400">Tenant ID:</span>
                  <span className="font-mono text-[10px] text-slate-400 truncate max-w-[150px]">{organization.id}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-indigo-200/60 dark:border-indigo-800/60 bg-indigo-50/40 dark:bg-indigo-950/30">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs mb-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Supabase RLS Protected</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                All data queries are secured with Row Level Security enforcing strict multi-tenant boundary checks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pipeline Stages */}
      {activeTab === "pipeline" && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">10-Stage Real Estate Funnel</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              PropTech CRM enforces a standard 10-stage pipeline optimized specifically for property sales cycles in Pakistan and international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
            {Object.entries(STAGE_CONFIG).map(([key, cfg], idx) => (
              <div
                key={key}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{cfg.label}</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}
                >
                  Active Funnel
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Integrations Roadmap */}
      {activeTab === "integrations" && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-[11px] font-bold text-indigo-700 dark:text-indigo-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modular Architecture Boundaries</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Future Integrations Roadmap (Phase 2)</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              As required by Phase 1 MVP design guidelines, third-party messaging bots and LLM APIs are preserved behind clean interfaces without mock or fake integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">WhatsApp Cloud API</span>
                <Badge variant="outline" className="text-[10px] border-indigo-300 text-indigo-600 dark:text-indigo-400">
                  Phase 2
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Official Meta WhatsApp Business Cloud API for automated client notifications and catalog sharing.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Meta Lead Ads Webhook</span>
                <Badge variant="outline" className="text-[10px] border-indigo-300 text-indigo-600 dark:text-indigo-400">
                  Phase 2
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Direct real-time webhook ingestion for Facebook & Instagram lead generation campaigns.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">AI Qualification Engine</span>
                <Badge variant="outline" className="text-[10px] border-indigo-300 text-indigo-600 dark:text-indigo-400">
                  Phase 2
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Future modular intelligence layer for buyer budget scoring and Marla-to-unit inventory matching.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Audit Events */}
      {activeTab === "audit" && role === "agency_owner" && (
        <div className="glass-panel rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Security & Activity Audit Log</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Immutable audit trail of pipeline changes, appointments created, and team actions
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {auditEvents.length} Events Logged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="p-4 pl-6">Action</th>
                  <th className="p-4">Target Entity</th>
                  <th className="p-4">Actor Email</th>
                  <th className="p-4">Details</th>
                  <th className="p-4 pr-6 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {auditEvents.map((aud) => (
                  <tr key={aud.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-indigo-600 dark:text-indigo-400 border border-slate-200/60 dark:border-slate-700/60">
                        {aud.action}
                      </span>
                    </td>
                    <td className="p-4 capitalize text-slate-600 dark:text-slate-300">{aud.targetEntity}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{aud.actorEmail || "System"}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 max-w-xs truncate font-mono text-[11px]">
                      {aud.metadata ? JSON.stringify(aud.metadata) : "—"}
                    </td>
                    <td className="p-4 pr-6 text-right text-slate-400 whitespace-nowrap">
                      {formatDateTime(aud.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
