import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  phone: z.string().min(7, "Valid phone number is required").max(30),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  contactType: z.enum(["buyer", "seller", "investor", "tenant", "landlord", "other"]).default("buyer"),
  companyName: z.string().max(255).optional().or(z.literal("")),
  preferredLanguage: z.string().default("Urdu"),
  notes: z.string().optional().or(z.literal("")),
});

export const propertySchema = z.object({
  title: z.string().min(3, "Property title is required").max(255),
  listingReference: z.string().min(2, "Listing reference is required").max(100),
  projectName: z.string().max(255).optional().or(z.literal("")),
  propertyType: z.enum([
    "Apartment",
    "House",
    "Residential Plot",
    "Commercial Property",
    "Shop/Office",
    "Villa",
    "Other",
  ]),
  description: z.string().optional().or(z.literal("")),
  city: z.string().min(1, "City is required").max(100),
  area: z.string().min(1, "Area or locality is required").max(150),
  address: z.string().optional().or(z.literal("")),
  size: z.coerce.number().positive("Size must be greater than 0"),
  sizeUnit: z.enum(["Marla", "Kanal", "Sq Ft", "Sq Yds"]).default("Marla"),
  bedrooms: z.coerce.number().int().min(0).optional().nullable(),
  bathrooms: z.coerce.number().int().min(0).optional().nullable(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  currency: z.string().default("PKR"),
  paymentPlanNotes: z.string().optional().or(z.literal("")),
  developerName: z.string().optional().or(z.literal("")),
  features: z.array(z.string()).default([]),
  status: z.enum(["available", "reserved", "sold"]).default("available"),
  coverImageUrl: z.string().optional().or(z.literal("")),
});

export const leadSchema = z.object({
  contactId: z.string().uuid("Please select a valid contact").optional(),
  // Can create contact inline if needed
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),

  title: z.string().min(2, "Lead inquiry title is required").max(255),
  source: z.enum([
    "Manual Entry",
    "Website",
    "Facebook",
    "Instagram",
    "Google",
    "WhatsApp",
    "Property Portal",
    "Referral",
    "Phone Call",
    "Other",
  ]).default("Manual Entry"),
  sourceDetails: z.string().optional().or(z.literal("")),
  campaignName: z.string().optional().or(z.literal("")),
  propertyId: z.string().uuid().optional().or(z.literal("")).nullable(),
  propertyTypePreference: z.string().optional().or(z.literal("")),
  budgetMin: z.coerce.number().min(0).optional().nullable(),
  budgetMax: z.coerce.number().min(0).optional().nullable(),
  preferredLocation: z.string().optional().or(z.literal("")),
  intendedUse: z.enum(["investment", "personal_use", "other"]).optional().nullable(),
  purchaseTimeline: z.enum(["immediate", "1_to_3_months", "3_to_6_months", "exploring"]).optional().nullable(),
  financingPreference: z.enum(["cash", "installments", "bank_loan", "flexible"]).optional().nullable(),
  stage: z.enum([
    "new_lead",
    "contact_in_progress",
    "contacted_qualified",
    "visit_scheduled",
    "site_visit_completed",
    "negotiation",
    "booking_deposit_pending",
    "contract_issued",
    "closed_won",
    "closed_lost",
  ]).default("new_lead"),
  closedLostReason: z.string().optional().or(z.literal("")),
  assignedAgentId: z.string().uuid().optional().or(z.literal("")).nullable(),
  notes: z.string().optional().or(z.literal("")),
});

export const taskSchema = z.object({
  title: z.string().min(2, "Task title is required").max(255),
  description: z.string().optional().or(z.literal("")),
  contactId: z.string().uuid().optional().or(z.literal("")).nullable(),
  leadId: z.string().uuid().optional().or(z.literal("")).nullable(),
  assignedUserId: z.string().uuid().optional().or(z.literal("")).nullable(),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]).default("pending"),
});

export const appointmentSchema = z.object({
  title: z.string().min(2, "Appointment title is required").max(255),
  contactId: z.string().uuid().optional().or(z.literal("")).nullable(),
  leadId: z.string().uuid().optional().or(z.literal("")).nullable(),
  propertyId: z.string().uuid().optional().or(z.literal("")).nullable(),
  assignedAgentId: z.string().uuid().optional().or(z.literal("")).nullable(),
  appointmentType: z.enum([
    "Site Visit",
    "Phone Call",
    "Office Meeting",
    "Online Meeting",
    "Other",
  ]).default("Site Visit"),
  startTime: z.string().min(1, "Start time is required"),
  durationMinutes: z.coerce.number().int().min(5).max(480).default(45),
  location: z.string().optional().or(z.literal("")),
  status: z.enum(["scheduled", "completed", "cancelled", "rescheduled", "no_show"]).default("scheduled"),
  outcomeNotes: z.string().optional().or(z.literal("")),
});

export const organizationSchema = z.object({
  name: z.string().min(2, "Agency name is required").max(255),
  contactEmail: z.string().email("Valid email required"),
  phone: z.string().optional().or(z.literal("")),
  country: z.string().default("Pakistan"),
  timezone: z.string().default("Asia/Karachi"),
  currency: z.string().default("PKR"),
});

export const inviteUserSchema = z.object({
  email: z.string().email("Valid email required"),
  fullName: z.string().min(2, "Full name is required"),
  role: z.enum(["agency_owner", "sales_manager", "sales_agent", "property_manager"]),
});

export const csvRowSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  leadTitle: z.string().min(1, "Inquiry summary/title is required"),
  source: z.string().optional(),
  budgetMin: z.coerce.number().optional(),
  budgetMax: z.coerce.number().optional(),
  propertyType: z.string().optional(),
  preferredLocation: z.string().optional(),
  notes: z.string().optional(),
});
