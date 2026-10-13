"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, UserPlus, Shield, ShieldCheck, Mail, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-deep tracking-tight">Users & Team</h1>
          <p className="text-xs text-text-secondary mt-1">
            Manage agency permissions, sales agents, and property managers.
          </p>
        </div>

        {role === "agency_owner" && (
          <Button onClick={() => setIsInviteOpen(true)} size="sm">
            <UserPlus className="w-4 h-4 mr-1.5" /> Invite Team Member
          </Button>
        )}
      </div>

      {/* Team Members List */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                  <th className="p-3 pl-6">Member Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Joined Date</th>
                  {role === "agency_owner" && <th className="p-3 pr-6 text-right">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 pl-6 font-bold text-navy-deep text-sm">
                      {m.user?.fullName}
                      {m.userId === currentUserId && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-primary font-bold">
                          You
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{m.user?.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                        {ROLE_LABELS[m.role]}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                          m.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{formatDate(m.createdAt)}</td>
                    {role === "agency_owner" && (
                      <td className="p-3 pr-6 text-right">
                        {m.userId !== currentUserId && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
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
        </CardContent>
      </Card>

      {/* Role Definitions Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <p className="font-bold text-navy-deep">Agency Owner</p>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Full agency access, team management, billing settings, and audit log access.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <p className="font-bold text-navy-deep">Sales Manager</p>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Assigns leads to agents, oversees pipeline stages, manages team appointments & reports.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <p className="font-bold text-navy-deep">Sales Agent</p>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Restricted strictly to assigned leads, contacts, tasks, and property inventory catalogue.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
          <p className="font-bold text-navy-deep">Property Manager</p>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Maintains property inventory, creates listings, and updates availability status.
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
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <Input
            id="invName"
            label="Full Name *"
            placeholder="e.g. Asad Shah"
            value={inviteForm.fullName}
            onChange={(e) => setInviteForm({ ...inviteForm, fullName: e.target.value })}
            required
          />

          <Input
            id="invEmail"
            label="Email Address *"
            type="email"
            placeholder="asad@agency.pk"
            value={inviteForm.email}
            onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Role *</label>
            <select
              value={inviteForm.role}
              onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as UserRole })}
              className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg font-semibold"
            >
              <option value="sales_agent">Sales Agent</option>
              <option value="sales_manager">Sales Manager</option>
              <option value="property_manager">Property Manager</option>
              <option value="agency_owner">Agency Owner / Tenant Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isLoading}>
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
