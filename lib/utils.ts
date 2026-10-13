import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PipelineStage, PropertyStatus, UserRole } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes phone numbers for accurate duplicate detection.
 * Handles Pakistan formatting (+92, 0092, 03xx) and international formats.
 * Example: "+92 300 1234567" -> "923001234567"
 * Example: "0300-1234567" -> "923001234567"
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "").trim();
  if (cleaned.startsWith("+92")) {
    return "92" + cleaned.slice(3);
  }
  if (cleaned.startsWith("0092")) {
    return "92" + cleaned.slice(4);
  }
  if (cleaned.startsWith("03")) {
    return "923" + cleaned.slice(2);
  }
  if (cleaned.startsWith("+")) {
    return cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Normalizes email address for duplicate checking
 */
export function normalizeEmail(email?: string): string {
  if (!email) return "";
  return email.trim().toLowerCase();
}

/**
 * Real estate currency formatting with support for PKR Crores and Lakhs
 */
export function formatCurrency(amount: number, currency: string = "PKR"): string {
  if (isNaN(amount)) return "0";

  if (currency === "PKR") {
    if (amount >= 10000000) {
      const crore = (amount / 10000000).toFixed(2);
      return `Rs ${crore.replace(/\.00$/, "")} Crore`;
    }
    if (amount >= 100000) {
      const lakh = (amount / 100000).toFixed(2);
      return `Rs ${lakh.replace(/\.00$/, "")} Lakh`;
    }
    return `PKR ${amount.toLocaleString("en-PK")}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date | undefined): string {
  if (!dateString) return "—";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(date);
}

export function formatDateTime(dateString: string | Date | undefined): string {
  if (!dateString) return "—";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Karachi",
  }).format(date);
}

export const STAGE_CONFIG: Record<
  PipelineStage,
  { label: string; color: string; bg: string; border: string }
> = {
  new_lead: {
    label: "New Lead",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  contact_in_progress: {
    label: "Contact in Progress",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
  contacted_qualified: {
    label: "Contacted / Qualified",
    color: "text-cyan-700",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
  },
  visit_scheduled: {
    label: "Visit Scheduled",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  site_visit_completed: {
    label: "Site Visit Completed",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  negotiation: {
    label: "Negotiation",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  booking_deposit_pending: {
    label: "Booking / Deposit Pending",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  contract_issued: {
    label: "Contract Issued",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  closed_won: {
    label: "Closed Won",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  closed_lost: {
    label: "Closed Lost",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  agency_owner: "Agency Owner",
  sales_manager: "Sales Manager",
  sales_agent: "Sales Agent",
  property_manager: "Property Manager",
};

export const PROPERTY_STATUS_CONFIG: Record<
  PropertyStatus,
  { label: string; color: string; bg: string }
> = {
  available: { label: "Available", color: "text-emerald-700", bg: "bg-emerald-50" },
  reserved: { label: "Reserved", color: "text-amber-700", bg: "bg-amber-50" },
  sold: { label: "Sold / Unavailable", color: "text-slate-700", bg: "bg-slate-100" },
};
