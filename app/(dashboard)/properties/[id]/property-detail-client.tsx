"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building,
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Tag,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate, formatDateTime, PROPERTY_STATUS_CONFIG } from "@/lib/utils";
import type { Property, Lead, Activity, PropertyStatus, UserRole } from "@/types";
import { toast } from "sonner";

interface PropertyDetailClientProps {
  property: Property;
  leads: Lead[];
  activities: Activity[];
  role: UserRole;
}

export function PropertyDetailClient({
  property: initialProperty,
  leads,
  activities,
  role,
}: PropertyDetailClientProps) {
  const router = useRouter();
  const [property, setProperty] = useState<Property>(initialProperty);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus: PropertyStatus) => {
    if (newStatus === property.status) return;

    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update status");
      }

      const updated = await res.json();
      setProperty(updated);
      toast.success(`Inventory status updated to ${PROPERTY_STATUS_CONFIG[newStatus].label}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const statusCfg = PROPERTY_STATUS_CONFIG[property.status];

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-deep transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${statusCfg.bg} ${statusCfg.color}`}
        >
          {statusCfg.label}
        </span>
      </div>

      {/* Main Property Overview Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
              Ref: {property.listingReference}
            </span>
            <span className="text-xs text-slate-400 font-semibold">• {property.propertyType}</span>
          </div>
          <h1 className="text-2xl font-black text-navy-deep tracking-tight">{property.title}</h1>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {property.area}, {property.city} {property.address ? `(${property.address})` : ""}
            </span>
          </p>
        </div>

        {/* Status Transition Control (Owner, Sales Manager, Property Manager) */}
        {role !== "sales_agent" && (
          <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-bold text-slate-500 pl-2">Status:</span>
            {(["available", "reserved", "sold"] as PropertyStatus[]).map((st) => (
              <button
                key={st}
                disabled={isUpdatingStatus}
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  property.status === st
                    ? "bg-navy-deep text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                {PROPERTY_STATUS_CONFIG[st].label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid: Specifications & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Specs & Features */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Property Specifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Asking Price</p>
                  <p className="text-base font-black text-navy-deep mt-0.5">
                    {formatCurrency(property.price, property.currency)}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Size</p>
                  <p className="text-base font-black text-navy-deep mt-0.5">
                    {property.size} {property.sizeUnit}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Bedrooms</p>
                  <p className="text-base font-black text-navy-deep mt-0.5">
                    {property.bedrooms ? `${property.bedrooms} Beds` : "—"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Bathrooms</p>
                  <p className="text-base font-black text-navy-deep mt-0.5">
                    {property.bathrooms ? `${property.bathrooms} Baths` : "—"}
                  </p>
                </div>
              </div>

              {property.description && (
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Description
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {property.description}
                  </p>
                </div>
              )}

              {property.paymentPlanNotes && (
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                  <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Payment Plan Details
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {property.paymentPlanNotes}
                  </p>
                </div>
              )}

              {property.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Features & Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Associated Inquiries List */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Buyer Inquiries on this Unit ({leads.length})</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {leads.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No leads currently targeted to this listing.
                </p>
              ) : (
                <div className="space-y-2">
                  {leads.map((l) => (
                    <div
                      key={l.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <Link
                          href={`/leads/${l.id}`}
                          className="font-bold text-navy-deep hover:text-primary transition-colors block"
                        >
                          {l.title}
                        </Link>
                        <p className="text-slate-500 text-[11px]">
                          Buyer: {l.contact ? `${l.contact.firstName} ${l.contact.lastName}` : "—"} •{" "}
                          {l.source}
                        </p>
                      </div>
                      <Link href={`/leads/${l.id}`}>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Open <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Project Info & Activity Feed */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Development Project</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-xs space-y-2 divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Project Name:</span>
                <span className="font-semibold text-slate-800">
                  {property.projectName || "Independent Build"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Developer:</span>
                <span className="font-semibold text-slate-800">
                  {property.developerName || "Private Owner"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Registered:</span>
                <span className="text-slate-700">{formatDate(property.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Activity feed */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Status History</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 text-xs">
              {activities.length === 0 ? (
                <p className="text-slate-400 py-4 text-center">No recent status updates.</p>
              ) : (
                <div className="space-y-3">
                  {activities.map((act) => (
                    <div key={act.id} className="flex items-start gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <div>
                        <p className="text-slate-800 font-medium">{act.description}</p>
                        <p className="text-[10px] text-slate-400">{formatDateTime(act.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
