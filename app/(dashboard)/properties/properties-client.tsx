"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Building,
  LayoutGrid,
  List,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ArrowRight,
  ShieldAlert,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, PROPERTY_STATUS_CONFIG } from "@/lib/utils";
import type { Property, PropertyType, PropertyStatus, UserRole } from "@/types";
import { toast } from "sonner";

interface PropertiesClientProps {
  initialProperties: Property[];
  total: number;
  currentPage: number;
  role: UserRole;
}

export function PropertiesClient({
  initialProperties,
  total,
  currentPage,
  role,
}: PropertiesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "all");
  const [city, setCity] = useState(searchParams.get("city") || "all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    listingReference: "",
    projectName: "",
    propertyType: "Apartment" as PropertyType,
    city: "Karachi",
    area: "",
    address: "",
    size: "",
    sizeUnit: "Marla",
    bedrooms: "",
    bathrooms: "",
    price: "",
    currency: "PKR",
    paymentPlanNotes: "",
    developerName: "",
    description: "",
    status: "available" as PropertyStatus,
  });

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "all") params.set("status", status);
    if (propertyType !== "all") params.set("type", propertyType);
    if (city !== "all") params.set("city", city);
    params.set("page", "1");
    router.push(`/properties?${params.toString()}`);
  };

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          size: Number(formData.size),
          price: Number(formData.price),
          bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
          bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create property");
        return;
      }

      toast.success("Property listing created");
      setIsCreateOpen(false);
      router.refresh();
    } catch {
      toast.error("Error creating property");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-navy-deep dark:text-white tracking-tight">
              Properties & Inventory Matrix
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-primary dark:text-cyan font-extrabold text-xs border border-indigo-500/20">
              {total} Units
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track real estate inventory, project allotments, and valuations in PKR.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid / List View Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 rounded-2xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === "grid" ? "bg-white dark:bg-white/10 text-navy-deep dark:text-white shadow-2xs" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-xl transition-all ${
                viewMode === "list" ? "bg-white dark:bg-white/10 text-navy-deep dark:text-white shadow-2xs" : "text-slate-400 hover:text-slate-700 dark:hover:text-white"
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Link href="/">
            <Button variant="outline" size="sm" className="rounded-xl border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Public Site
            </Button>
          </Link>

          {role !== "sales_agent" && (
            <Button onClick={() => setIsCreateOpen(true)} size="sm" variant="primary" className="shadow-md shadow-indigo-600/25">
              <Plus className="w-4 h-4 mr-1.5" /> Add Property
            </Button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-xs">
        <form
          onSubmit={handleFilterSubmit}
          className="flex flex-col lg:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, listing ref, locality, or project..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-9 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved / On Hold</option>
              <option value="sold">Sold / Unavailable</option>
            </select>

            {/* Type */}
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="h-9 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Property Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Residential Plot">Residential Plot</option>
              <option value="Commercial Property">Commercial Property</option>
              <option value="Shop/Office">Shop / Office</option>
              <option value="Villa">Villa</option>
            </select>

            {/* City */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-9 px-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Cities</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
            </select>

            <Button type="submit" variant="secondary" size="sm">
              Filter
            </Button>
          </div>
        </form>
      </div>

      {/* Grid or List Display */}
      {initialProperties.length === 0 ? (
        <EmptyState
          icon={Building}
          title="No properties in catalogue"
          description={
            search || status !== "all"
              ? "No inventory matches your current filters."
              : "Add your first real estate listing to begin managing deals."
          }
          actionLabel={role !== "sales_agent" ? "Add Property" : undefined}
          onAction={() => setIsCreateOpen(true)}
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialProperties.map((prop) => {
            const st = PROPERTY_STATUS_CONFIG[prop.status];
            return (
              <div
                key={prop.id}
                className="glass-card rounded-3xl overflow-hidden hover:shadow-2xl dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Property Image Cover */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    {prop.coverImageUrl ? (
                      <img
                        src={prop.coverImageUrl}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-slate-400 p-4 text-center">
                        <Building className="w-9 h-9 mb-1.5 text-primary/70 animate-pulse" />
                        <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">{prop.propertyType}</span>
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-black shadow-md ${st.bg} ${st.color}`}
                    >
                      {st.label}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono text-white border border-white/10">
                      Ref: {prop.listingReference}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <p className="text-xs font-extrabold text-primary dark:text-cyan">{prop.propertyType}</p>
                    <Link
                      href={`/properties/${prop.id}`}
                      className="font-extrabold text-base text-navy-deep dark:text-white group-hover:text-primary dark:group-hover:text-cyan transition-colors line-clamp-1 block"
                    >
                      {prop.title}
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {prop.area}, {prop.city}
                      </span>
                    </p>

                    <div className="pt-2.5 flex items-center justify-between border-t border-slate-100 dark:border-white/8 text-xs text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                        <Maximize2 className="w-3.5 h-3.5 text-primary dark:text-cyan" />
                        {prop.size} {prop.sizeUnit}
                      </span>
                      {prop.bedrooms && (
                        <span className="flex items-center gap-1 font-semibold">
                          <Bed className="w-3.5 h-3.5 text-slate-400" />
                          {prop.bedrooms} Bed
                        </span>
                      )}
                      {prop.bathrooms && (
                        <span className="flex items-center gap-1 font-semibold">
                          <Bath className="w-3.5 h-3.5 text-slate-400" />
                          {prop.bathrooms} Bath
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-white/8">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-extrabold">Asking Valuation</span>
                    <p className="text-lg font-black text-navy-deep dark:text-white">
                      {formatCurrency(prop.price, prop.currency)}
                    </p>
                  </div>
                  <Link href={`/properties/${prop.id}`}>
                    <Button variant="outline" size="sm" className="text-xs font-bold">
                      Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode */
        <div className="glass-panel rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/8 bg-slate-50/70 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5 pl-6">Listing Reference & Title</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Dimensions</th>
                    <th className="p-3.5">Valuation</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {initialProperties.map((prop) => {
                    const st = PROPERTY_STATUS_CONFIG[prop.status];
                    return (
                      <tr key={prop.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors group">
                        <td className="p-3.5 pl-6">
                          <Link
                            href={`/properties/${prop.id}`}
                            className="font-extrabold text-navy-deep dark:text-white group-hover:text-primary dark:group-hover:text-cyan transition-colors block text-sm max-w-sm truncate"
                          >
                            {prop.title}
                          </Link>
                          <span className="text-[11px] text-slate-400">
                            Ref: {prop.listingReference} {prop.projectName ? `• ${prop.projectName}` : ""}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">
                          {prop.area}, {prop.city}
                        </td>
                        <td className="p-3.5 font-bold text-slate-800 dark:text-slate-200">{prop.propertyType}</td>
                        <td className="p-3.5 font-bold text-slate-800 dark:text-slate-200">
                          {prop.size} {prop.sizeUnit}
                        </td>
                        <td className="p-3.5 font-black text-navy-deep dark:text-white text-sm">
                          {formatCurrency(prop.price, prop.currency)}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${st.bg} ${st.color}`}>
                            {st.label}
                          </span>
                        </td>
                        <td className="p-3.5 pr-6 text-right">
                          <Link href={`/properties/${prop.id}`}>
                            <Button variant="ghost" size="sm" className="h-7 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/10">
                              View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create Property Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Real Estate Property"
        description="Create a residential or commercial inventory item."
        maxWidth="xl"
      >
        <form onSubmit={handleCreateProperty} className="space-y-4">
          <Input
            id="pTitle"
            label="Property Title *"
            placeholder="e.g. 1-Kanal Designer Villa in DHA Phase 6"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              id="pRef"
              label="Listing Reference *"
              placeholder="e.g. SKY-LHE-005"
              value={formData.listingReference}
              onChange={(e) => setFormData({ ...formData, listingReference: e.target.value })}
              required
            />
            <Input
              id="pProject"
              label="Project / Development"
              placeholder="e.g. DHA Phase 6 Enclave"
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Property Type</label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Commercial Property">Commercial Property</option>
                <option value="Shop/Office">Shop / Office</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">City *</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>

            <Input
              id="pArea"
              label="Locality / Sector *"
              placeholder="e.g. DHA Phase 6 Block J"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              id="pSize"
              label="Size Number *"
              type="number"
              placeholder="e.g. 1"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Size Unit</label>
              <select
                value={formData.sizeUnit}
                onChange={(e) => setFormData({ ...formData, sizeUnit: e.target.value })}
                className="w-full h-10 px-3 text-xs bg-white border border-slate-300 rounded-lg"
              >
                <option value="Marla">Marla</option>
                <option value="Kanal">Kanal</option>
                <option value="Sq Ft">Sq Ft</option>
                <option value="Sq Yds">Sq Yds</option>
              </select>
            </div>

            <Input
              id="pPrice"
              label="Price (PKR) *"
              type="number"
              placeholder="e.g. 135000000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              id="pBeds"
              label="Bedrooms (Optional)"
              type="number"
              placeholder="5"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            />
            <Input
              id="pBaths"
              label="Bathrooms (Optional)"
              type="number"
              placeholder="6"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
            />
          </div>

          <Textarea
            id="pDesc"
            label="Description & Highlights"
            placeholder="Property description, finishes, possession status..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" isLoading={isLoading}>
              Save Property
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
