"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Search, Filter, Phone, Mail, Building, ArrowRight, UserCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils";
import type { Contact, UserRole } from "@/types";
import { toast } from "sonner";

interface ContactsClientProps {
  initialContacts: Contact[];
  total: number;
  currentPage: number;
  role: UserRole;
}

export function ContactsClient({
  initialContacts,
  total,
  currentPage,
  role,
}: ContactsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [contactType, setContactType] = useState(searchParams.get("type") || "all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<any>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    contactType: "buyer",
    companyName: "",
    preferredLanguage: "Urdu",
    notes: "",
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (contactType && contactType !== "all") params.set("type", contactType);
    params.set("page", "1");
    router.push(`/contacts?${params.toString()}`);
  };

  const handleTypeChange = (type: string) => {
    setContactType(type);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type !== "all") params.set("type", type);
    params.set("page", "1");
    router.push(`/contacts?${params.toString()}`);
  };

  const handleCreateContact = async (e: React.FormEvent, force = false) => {
    e.preventDefault();
    setIsLoading(true);
    setDuplicateWarning(null);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, forceCreate: force }),
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

      toast.success("Contact added successfully");
      setIsCreateOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        contactType: "buyer",
        companyName: "",
        preferredLanguage: "Urdu",
        notes: "",
      });
      router.refresh();
    } catch {
      toast.error("Error creating contact");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-deep tracking-tight">Contacts</h1>
          <p className="text-xs text-text-secondary mt-1">
            Manage buyers, sellers, and property investors with unified lead inquiry history.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} size="sm">
          <Plus className="w-4 h-4 mr-1.5" /> Add Contact
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <Card>
        <CardContent className="p-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, phone (+92...), email, or company..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={contactType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="h-9 px-3 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Contact Types</option>
                <option value="buyer">Buyers</option>
                <option value="seller">Sellers</option>
                <option value="investor">Investors</option>
                <option value="tenant">Tenants</option>
                <option value="landlord">Landlords</option>
              </select>

              <Button type="submit" variant="secondary" size="sm">
                Filter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      {initialContacts.length === 0 ? (
        <EmptyState
          icon={UserCheck}
          title="No contacts found"
          description={
            search
              ? "No contacts match your current search criteria."
              : "Start by adding your first client or investor to the system."
          }
          actionLabel="Add Contact"
          onAction={() => setIsCreateOpen(true)}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 font-semibold">
                    <th className="p-3 pl-6">Contact Name</th>
                    <th className="p-3">Phone & Email</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Company / Notes</th>
                    <th className="p-3 text-center">Inquiries</th>
                    <th className="p-3">Added</th>
                    <th className="p-3 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {initialContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 pl-6">
                        <Link
                          href={`/contacts/${contact.id}`}
                          className="font-bold text-navy-deep hover:text-primary transition-colors block text-sm"
                        >
                          {contact.firstName} {contact.lastName}
                        </Link>
                        <span className="text-[11px] text-slate-400">
                          Pref: {contact.preferredLanguage}
                        </span>
                      </td>
                      <td className="p-3 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{contact.phone}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="capitalize px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700">
                          {contact.contactType}
                        </span>
                      </td>
                      <td className="p-3 max-w-xs">
                        {contact.companyName && (
                          <p className="font-semibold text-slate-800 flex items-center gap-1">
                            <Building className="w-3 h-3 text-slate-400" /> {contact.companyName}
                          </p>
                        )}
                        {contact.notes && (
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {contact.notes}
                          </p>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-primary font-bold">
                          {contact.leadsCount || 0}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 whitespace-nowrap">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="p-3 pr-6 text-right">
                        <Link href={`/contacts/${contact.id}`}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold">
                            View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Contact Modal with Duplicate Detection Warning */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setDuplicateWarning(null);
        }}
        title="Add New Contact"
        description="Add a client record with automated phone and email duplicate checks."
      >
        {duplicateWarning ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-900">Duplicate Contact Warning</p>
                <p className="text-xs text-amber-700 mt-1">{duplicateWarning.message}</p>
                <div className="mt-3 p-2 rounded bg-white border border-amber-200 text-xs">
                  <p className="font-bold text-slate-800">
                    Existing Record: {duplicateWarning.duplicateContact?.firstName}{" "}
                    {duplicateWarning.duplicateContact?.lastName}
                  </p>
                  <p className="text-slate-500">Phone: {duplicateWarning.duplicateContact?.phone}</p>
                  {duplicateWarning.duplicateContact?.email && (
                    <p className="text-slate-500">Email: {duplicateWarning.duplicateContact?.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDuplicateWarning(null)}
              >
                Review & Edit
              </Button>
              <Button
                size="sm"
                onClick={(e) => handleCreateContact(e, true)}
                isLoading={isLoading}
              >
                Force Create Duplicate
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => handleCreateContact(e, false)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="firstName"
                label="First Name *"
                placeholder="e.g. Farhan"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <Input
                id="lastName"
                label="Last Name *"
                placeholder="e.g. Qureshi"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                id="phone"
                label="Phone Number *"
                placeholder="+92 321 9988776"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Input
                id="email"
                label="Email Address"
                type="email"
                placeholder="client@textiles.com.pk"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">Contact Type</label>
                <select
                  value={formData.contactType}
                  onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
                  className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="investor">Investor</option>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </select>
              </div>

              <Input
                id="companyName"
                label="Company / Affiliation"
                placeholder="e.g. Qureshi Textiles Group"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <Textarea
              id="notes"
              label="Client Background / Preferences"
              placeholder="Investment goals, family requirements, timeline..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" isLoading={isLoading}>
                Save Contact
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
