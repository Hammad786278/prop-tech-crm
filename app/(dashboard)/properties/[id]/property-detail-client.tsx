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
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inventory Matrix
        </Link>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${statusCfg.bg} ${statusCfg.color}`}
        >
          {statusCfg.label}
        </span>
      </div>

      {/* Main Property Overview Glass Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50">
              Ref: {property.listingReference}
            </span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">• {property.propertyType}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{property.title}</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-2">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>
              {property.area}, {property.city} {property.address ? `• ${property.address}` : ""}
            </span>
          </p>
        </div>

        {/* Status Transition Control */}
        {role !== "sales_agent" && (
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl">
            <span className="text-xs font-bold text-slate-400 pl-2 pr-1">Status:</span>
            {(["available", "reserved", "sold"] as PropertyStatus[]).map((st) => (
              <button
                key={st}
                disabled={isUpdatingStatus}
                onClick={() => handleStatusChange(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  property.status === st
                    ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 space-y-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Property Specifications</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Asking Price</p>
                <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-1">
                  {formatCurrency(property.price, property.currency)}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dimensions</p>
                <p className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {property.size} {property.sizeUnit}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bedrooms</p>
                <p className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {property.bedrooms ? `${property.bedrooms} Beds` : "—"}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bathrooms</p>
                <p className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {property.bathrooms ? `${property.bathrooms} Baths` : "—"}
                </p>
              </div>
            </div>

            {property.description && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Description & Specifications
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/80 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
                  {property.description}
                </p>
              </div>
            )}

            {property.paymentPlanNotes && (
              <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 space-y-1.5">
                <h3 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Structured Payment Plan
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {property.paymentPlanNotes}
                </p>
              </div>
            )}

            {property.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Features & Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Associated Inquiries List */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Buyer Inquiries on this Unit ({leads.length})
            </h2>

            {leads.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No active buyer leads targeted to this listing.
              </p>
            ) : (
              <div className="space-y-2.5">
                {leads.map((l) => (
                  <div
                    key={l.id}
                    className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <Link
                        href={`/leads/${l.id}`}
                        className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block text-sm"
                      >
                        {l.title}
                      </Link>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        Buyer: {l.contact ? `${l.contact.firstName} ${l.contact.lastName}` : "—"} • {l.source}
                      </p>
                    </div>
                    <Link href={`/leads/${l.id}`}>
                      <Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        Open Deal <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project Info & Activity Feed */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Development Project
            </h2>
            <div className="text-xs space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800">
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Project / Society:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {property.projectName || "Independent Build"}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Developer / Owner:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {property.developerName || "Private Owner"}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 dark:text-slate-400">Inventory Listed:</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{formatDate(property.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Audit & Lifecycle Log
            </h2>
            {activities.length === 0 ? (
              <p className="text-slate-400 text-xs py-4 text-center">No recent status updates.</p>
            ) : (
              <div className="space-y-3 pt-1">
                {activities.map((act) => (
                  <div key={act.id} className="flex items-start gap-2.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{act.description}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{formatDateTime(act.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
