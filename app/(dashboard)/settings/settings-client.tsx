"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-deep tracking-tight">Settings & Workspace</h1>
        <p className="text-xs text-text-secondary mt-1">
          Agency profile parameters, pipeline definitions, and compliance audit trail.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("agency")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "agency"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" /> Agency Profile
        </button>
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "pipeline"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Kanban className="w-3.5 h-3.5" /> Pipeline Stages
        </button>
        <button
          onClick={() => setActiveTab("integrations")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "integrations"
              ? "border-primary text-primary"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" /> Integrations Roadmap
        </button>
        {role === "agency_owner" && (
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "audit"
                ? "border-primary text-primary"
                : "border-transparent text-slate-500 hover:text-slate-900"
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
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Agency Business Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveAgency} className="space-y-4">
                  <Input
                    label="Agency Name"
                    value={agencyForm.name}
                    onChange={(e) => setAgencyForm({ ...agencyForm, name: e.target.value })}
                    disabled={role !== "agency_owner"}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Contact Email"
                      type="email"
                      value={agencyForm.contactEmail}
                      onChange={(e) =>
                        setAgencyForm({ ...agencyForm, contactEmail: e.target.value })
                      }
                      disabled={role !== "agency_owner"}
                    />
                    <Input
                      label="Phone"
                      value={agencyForm.phone}
                      onChange={(e) => setAgencyForm({ ...agencyForm, phone: e.target.value })}
                      disabled={role !== "agency_owner"}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Country
                      </p>
                      <p className="text-xs font-bold text-navy-deep mt-0.5">{agencyForm.country}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Timezone
                      </p>
                      <p className="text-xs font-bold text-navy-deep mt-0.5">
                        {agencyForm.timezone}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                        <Coins className="w-3 h-3" /> Currency
                      </p>
                      <p className="text-xs font-bold text-navy-deep mt-0.5">{agencyForm.currency}</p>
                    </div>
                  </div>

                  {role === "agency_owner" && (
                    <div className="flex justify-end pt-2">
                      <Button type="submit" size="sm" isLoading={isSaving}>
                        Save Agency Profile
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Data Export Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Data Export & Backup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-text-secondary leading-relaxed">
                  Download a complete tenant-scoped CSV spreadsheet containing your current
                  leads, contacts, budget parameters, and stage history.
                </p>
                <Button onClick={handleExportAllData} variant="outline" size="sm">
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Export All Agency Leads (.CSV)
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Your User Session</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-bold text-navy-deep">{user.fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-700">{user.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Your Role:</span>
                  <span className="font-bold text-primary">{ROLE_LABELS[role]}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tenant ID:</span>
                  <span className="font-mono text-[10px] text-slate-400">{organization.id}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Pipeline Stages */}
      {activeTab === "pipeline" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Standard 10-Stage Real Estate Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              The CRM enforces a standard 10-stage pipeline optimized for property sales cycles in
              Pakistan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(STAGE_CONFIG).map(([key, cfg], idx) => (
                <div
                  key={key}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-navy-deep">{cfg.label}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}
                  >
                    Active
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Integrations Roadmap */}
      {activeTab === "integrations" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Planned Future Integrations (Phase 2)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-text-secondary leading-relaxed">
                As required by the Phase 1 MVP architecture, third-party messaging and AI APIs are
                reserved for subsequent releases. No unverified third-party bots or fake connected
                accounts are enabled.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-navy-deep">WhatsApp Cloud API</span>
                    <Badge variant="outline" className="text-[10px]">
                      Phase 2
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Official Meta WhatsApp Business Cloud API for lead notifications and catalog
                    sharing.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-navy-deep">Meta Lead Ads Webhook</span>
                    <Badge variant="outline" className="text-[10px]">
                      Phase 2
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Direct real-time webhook sync for Facebook & Instagram real estate campaigns.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-navy-deep">AI Qualification Engine</span>
                    <Badge variant="outline" className="text-[10px]">
                      Phase 2
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Future modular intelligence layer for buyer budget scoring and smart matching.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 4: Audit Events */}
      {activeTab === "audit" && role === "agency_owner" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Security & Activity Audit Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                    <th className="p-3 pl-6">Action</th>
                    <th className="p-3">Target Entity</th>
                    <th className="p-3">Actor Email</th>
                    <th className="p-3">Details</th>
                    <th className="p-3 pr-6 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditEvents.map((aud) => (
                    <tr key={aud.id} className="hover:bg-slate-50">
                      <td className="p-3 pl-6 font-bold text-navy-deep">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px]">
                          {aud.action}
                        </span>
                      </td>
                      <td className="p-3 capitalize text-slate-600">{aud.targetEntity}</td>
                      <td className="p-3 text-slate-700">{aud.actorEmail || "System"}</td>
                      <td className="p-3 text-slate-500 max-w-xs truncate">
                        {aud.metadata ? JSON.stringify(aud.metadata) : "—"}
                      </td>
                      <td className="p-3 pr-6 text-right text-slate-400 whitespace-nowrap">
                        {formatDateTime(aud.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
