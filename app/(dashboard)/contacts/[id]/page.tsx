import { getCurrentSession } from "@/lib/auth/session";
import { CrmStore } from "@/lib/database/store";
import { AppShell } from "@/components/layout/app-shell";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, Building, TrendingUp, Calendar, Clock, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateTime, STAGE_CONFIG, formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Contact Details — PropTech CRM",
};

export default async function ContactDetailPage({ params }: { params: { id: string } }) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const contact = await CrmStore.getContactById(session.organization.id, params.id);
  if (!contact) notFound();

  const { leads } = await CrmStore.getLeads(session.organization.id, { contactId: params.id });
  const activities = await CrmStore.getActivities(session.organization.id, params.id);

  return (
    <AppShell
      user={session.user}
      organization={session.organization}
      role={session.role}
    >
      <div className="space-y-6">
        {/* Back Link & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/contacts"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-deep transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Contacts
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 font-bold text-slate-700 capitalize">
              {contact.contactType}
            </span>
          </div>
        </div>

        {/* Top Info Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-navy-deep text-white text-xl font-black flex items-center justify-center shadow-md">
              {contact.firstName[0]}
              {contact.lastName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-black text-navy-deep tracking-tight">
                {contact.firstName} {contact.lastName}
              </h1>
              {contact.companyName && (
                <p className="text-xs text-text-secondary font-medium flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" /> {contact.companyName}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-primary" /> {contact.phone}
                </span>
                {contact.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {contact.email}
                  </span>
                )}
                <span className="text-slate-400">• Added {formatDate(contact.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Details: Associated Inquiries vs Client Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Associated Leads Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Property Inquiries ({leads.length})</CardTitle>
                  <p className="text-xs text-text-secondary mt-1">
                    All inquiries and deals associated with this contact
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                {leads.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No active property inquiries recorded for this contact yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leads.map((lead) => {
                      const st = STAGE_CONFIG[lead.stage];
                      return (
                        <div
                          key={lead.id}
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <Link
                              href={`/leads/${lead.id}`}
                              className="font-bold text-navy-deep hover:text-primary transition-colors text-sm"
                            >
                              {lead.title}
                            </Link>
                            {lead.property && (
                              <p className="text-xs text-slate-500">
                                Interested in:{" "}
                                <span className="font-semibold text-slate-700">
                                  {lead.property.title}
                                </span>{" "}
                                ({formatCurrency(lead.property.price, lead.property.currency)})
                              </p>
                            )}
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                              <span>Source: {lead.source}</span>
                              {lead.budgetMax && (
                                <span>Budget: {formatCurrency(lead.budgetMax)}</span>
                              )}
                              <span>Created {formatDate(lead.createdAt)}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-bold border ${st?.bg} ${st?.color} ${st?.border}`}
                            >
                              {st?.label || lead.stage}
                            </span>
                            <Link href={`/leads/${lead.id}`}>
                              <Button variant="outline" size="sm" className="h-8 text-xs">
                                Open Deal
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Client Notes</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 text-xs text-slate-700 leading-relaxed space-y-3">
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {contact.notes || "No notes added for this contact."}
                </p>
                <div className="pt-2 space-y-1.5 text-slate-500">
                  <div className="flex justify-between">
                    <span>Preferred Language:</span>
                    <span className="font-semibold text-slate-800">{contact.preferredLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact ID:</span>
                    <span className="font-mono text-[10px] text-slate-400">{contact.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
