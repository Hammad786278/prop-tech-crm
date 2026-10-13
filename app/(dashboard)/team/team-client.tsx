"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  UserPlus,
  Shield,
  ShieldCheck,
  Mail,
  CheckCircle2,
  XCircle,
  Users,
  Briefcase,
  KeyRound,
  Sparkles,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { formatDate, ROLE_LABELS } from "@/lib/utils";
import type { OrganizationMembership, UserRole } from "@/types";
import { toast } from "sonner";

interface TeamClientProps {
  initialMembers: OrganizationMembership[];
  currentUserId: string;
  role: UserRole;
}

export function TeamClient({ initialMembers, currentUserId, role }: TeamClientProps) {
  const router = useRouter();
  const [members, setMembers] = useState<OrganizationMembership[]>(initialMembers);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [inviteForm, setInviteForm] = useState({
    fullName: "",
    email: "",
    role: "sales_agent" as UserRole,
  });

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inviteForm),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to invite member");
        return;
      }

      toast.success("Team member invited successfully");
      setMembers([...members, data]);
      setIsInviteOpen(false);
      setInviteForm({ fullName: "", email: "", role: "sales_agent" });
      router.refresh();
    } catch {
      toast.error("Error sending invitation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (membershipId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "deactivated" : "active";
    try {
      const res = await fetch(`/api/team/${membershipId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) throw new Error();

      setMembers(
        members.map((m) => (m.id === membershipId ? { ...m, status: nextStatus as any } : m))
      );
      toast.success(`User membership ${nextStatus}`);
      router.refresh();
    } catch {
      toast.error("Failed to update member status");
    }
  };

  const activeCount = members.filter((m) => m.status === "active").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-[11px] font-bold text-indigo-700 dark:text-indigo-400 mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Multi-Tenant Access Control (RBAC)</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Users & Team Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Manage agency licenses, field sales agents, and property catalog management permissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm" className="rounded-xl border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40">
                <Globe className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Public Site
              </Button>
            </Link>

            <div className="px-4 py-2 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400">Roster Capacity</p>
              <p className="text-sm font-black text-slate-900 dark:text-white">{activeCount} / {members.length} Active</p>
            </div>

            {role === "agency_owner" && (
              <Button
                onClick={() => setIsInviteOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
              >
                <UserPlus className="w-4 h-4 mr-2" /> Invite Member
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Team Members List */}
      <div className="glass-panel rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Team Members</h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tenant workspace isolation enforced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="p-4 pl-6">Member Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">System Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined Date</th>
                {role === "agency_owner" && <th className="p-4 pr-6 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center uppercase shadow-sm">
                        {m.user?.fullName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">
                            {m.user?.fullName}
                          </span>
                          {m.userId === currentUserId && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/50 dark:border-indigo-800/50">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{m.user?.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                      {ROLE_LABELS[m.role]}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                        m.status === "active"
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${m.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{formatDate(m.createdAt)}</td>
                  {role === "agency_owner" && (
                    <td className="p-4 pr-6 text-right">
                      {m.userId !== currentUserId && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs font-semibold rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                          onClick={() => handleToggleStatus(m.id, m.status)}
                        >
                          {m.status === "active" ? "Deactivate" : "Reactivate"}
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Definitions Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">Agency Owner</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Full agency control, membership billing, invitations, role modifications, and audit logs.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">Sales Manager</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Lead assignment, pipeline inspection, deals monitoring, and agent workload analytics.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">Sales Agent</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Restricted strictly to personal assigned leads, client calls, site visits, and property units.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/70 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">Property Manager</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Maintains the inventory registry, unit dimensions (Marla/Kanal), pricing, and listing status.
          </p>
        </div>
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite New Team Member"
        description="Add a member to your agency workspace with designated role permissions."
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4 pt-2">
          <Input
            id="invName"
            label="Full Name *"
            placeholder="e.g. Asad Shah"
            value={inviteForm.fullName}
            onChange={(e) => setInviteForm({ ...inviteForm, fullName: e.target.value })}
            required
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />

          <Input
            id="invEmail"
            label="Email Address *"
            type="email"
            placeholder="asad@agency.pk"
            value={inviteForm.email}
            onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
            required
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Assigned Role *
            </label>
            <select
              value={inviteForm.role}
              onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as UserRole })}
              className="w-full h-10 px-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="sales_agent">Sales Agent</option>
              <option value="sales_manager">Sales Manager</option>
              <option value="property_manager">Property Manager</option>
              <option value="agency_owner">Agency Owner / Tenant Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsInviteOpen(false)}
              className="dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              isLoading={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
