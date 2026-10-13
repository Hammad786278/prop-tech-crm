// ============================================================================
// SkyVista CRM - Core Data Store & Multi-Tenant Engine
// Enforces Strict Organization Isolation, Role Checks, and Audit Logging
// ============================================================================

import type {
  Organization,
  UserProfile,
  OrganizationMembership,
  Contact,
  Property,
  Lead,
  LeadStageHistory,
  Task,
  Appointment,
  Activity,
  Notification,
  AuditEvent,
  DashboardMetrics,
  UserRole,
  PipelineStage,
  PropertyStatus,
  CSVImportRow,
  CSVImportResult,
} from "@/types";
import { normalizePhoneNumber, normalizeEmail, STAGE_CONFIG } from "@/lib/utils";
import { csvRowSchema } from "@/lib/validation/schemas";

// In-Memory Seed Storage for robust operation, isolated testing, and demo execution
interface InMemoryDatabase {
  organizations: Map<string, Organization>;
  profiles: Map<string, UserProfile>;
  memberships: Map<string, OrganizationMembership>;
  contacts: Map<string, Contact>;
  properties: Map<string, Property>;
  leads: Map<string, Lead>;
  leadStageHistories: Map<string, LeadStageHistory>;
  tasks: Map<string, Task>;
  appointments: Map<string, Appointment>;
  activities: Map<string, Activity>;
  notifications: Map<string, Notification>;
  auditEvents: Map<string, AuditEvent>;
}

function createSeedDatabase(): InMemoryDatabase {
  const db: InMemoryDatabase = {
    organizations: new Map(),
    profiles: new Map(),
    memberships: new Map(),
    contacts: new Map(),
    properties: new Map(),
    leads: new Map(),
    leadStageHistories: new Map(),
    tasks: new Map(),
    appointments: new Map(),
    activities: new Map(),
    notifications: new Map(),
    auditEvents: new Map(),
  };

  // --- 1. Organizations ---
  const orgSkyline: Organization = {
    id: "org-skyline-pk",
    name: "Skyline Horizon Real Estate",
    slug: "skyline-horizon",
    contactEmail: "info@skylinehorizon.pk",
    phone: "+92 42 35789000",
    country: "Pakistan",
    timezone: "Asia/Karachi",
    currency: "PKR",
    createdAt: new Date("2026-01-10T10:00:00Z").toISOString(),
    updatedAt: new Date("2026-01-10T10:00:00Z").toISOString(),
  };

  const orgApex: Organization = {
    id: "org-apex-isb",
    name: "Apex Towers Realty",
    slug: "apex-towers",
    contactEmail: "contact@apextowers.pk",
    phone: "+92 51 2289000",
    country: "Pakistan",
    timezone: "Asia/Karachi",
    currency: "PKR",
    createdAt: new Date("2026-02-01T10:00:00Z").toISOString(),
    updatedAt: new Date("2026-02-01T10:00:00Z").toISOString(),
  };

  db.organizations.set(orgSkyline.id, orgSkyline);
  db.organizations.set(orgApex.id, orgApex);

  // --- 2. User Profiles ---
  const users: UserProfile[] = [
    {
      id: "user-owner-1",
      fullName: "Hammad Hussain (Owner)",
      email: "owner@skylinehorizon.pk",
      phone: "+92 300 8472910",
      createdAt: new Date("2026-01-10T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-10T10:00:00Z").toISOString(),
    },
    {
      id: "user-manager-1",
      fullName: "Bilal Tariq (Sales Manager)",
      email: "manager@skylinehorizon.pk",
      phone: "+92 321 4455667",
      createdAt: new Date("2026-01-11T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-11T10:00:00Z").toISOString(),
    },
    {
      id: "user-agent-1",
      fullName: "Ayesha Khan (Sales Agent)",
      email: "agent@skylinehorizon.pk",
      phone: "+92 333 9876543",
      createdAt: new Date("2026-01-12T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-12T10:00:00Z").toISOString(),
    },
    {
      id: "user-propman-1",
      fullName: "Tariq Mehmood (Property Manager)",
      email: "properties@skylinehorizon.pk",
      phone: "+92 345 1122334",
      createdAt: new Date("2026-01-13T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-13T10:00:00Z").toISOString(),
    },
    // Second tenant user for isolation tests
    {
      id: "user-apex-owner",
      fullName: "Kamran Siddiqui",
      email: "owner@apextowers.pk",
      phone: "+92 301 5556677",
      createdAt: new Date("2026-02-01T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-01T10:00:00Z").toISOString(),
    },
  ];

  users.forEach((u) => db.profiles.set(u.id, u));

  // --- 3. Memberships ---
  const memberships: OrganizationMembership[] = [
    {
      id: "mem-1",
      organizationId: orgSkyline.id,
      userId: "user-owner-1",
      role: "agency_owner",
      status: "active",
      createdAt: new Date("2026-01-10T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-10T10:00:00Z").toISOString(),
    },
    {
      id: "mem-2",
      organizationId: orgSkyline.id,
      userId: "user-manager-1",
      role: "sales_manager",
      status: "active",
      createdAt: new Date("2026-01-11T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-11T10:00:00Z").toISOString(),
    },
    {
      id: "mem-3",
      organizationId: orgSkyline.id,
      userId: "user-agent-1",
      role: "sales_agent",
      status: "active",
      createdAt: new Date("2026-01-12T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-12T10:00:00Z").toISOString(),
    },
    {
      id: "mem-4",
      organizationId: orgSkyline.id,
      userId: "user-propman-1",
      role: "property_manager",
      status: "active",
      createdAt: new Date("2026-01-13T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-13T10:00:00Z").toISOString(),
    },
    {
      id: "mem-5",
      organizationId: orgApex.id,
      userId: "user-apex-owner",
      role: "agency_owner",
      status: "active",
      createdAt: new Date("2026-02-01T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-01T10:00:00Z").toISOString(),
    },
  ];

  memberships.forEach((m) => db.memberships.set(m.id, m));

  // --- 4. Properties ---
  const properties: Property[] = [
    {
      id: "prop-1",
      organizationId: orgSkyline.id,
      title: "Luxury 3-Bed Penthouse overlooking Sea View",
      listingReference: "SKY-KHI-001",
      projectName: "The Crest Oceanfront",
      propertyType: "Apartment",
      description: "Premium triplex penthouse with private terrace and panoramic Arabian Sea views in Clifton Block 4.",
      city: "Karachi",
      area: "Clifton Block 4",
      address: "Marine Drive, Clifton, Karachi",
      size: 4200,
      sizeUnit: "Sq Ft",
      bedrooms: 3,
      bathrooms: 4,
      price: 85000000, // PKR 8.5 Crore
      currency: "PKR",
      paymentPlanNotes: "20% Down Payment, 16 quarterly installments over 4 years.",
      developerName: "Crest Development Group",
      features: ["Sea View", "Private Elevator", "Smart Home Automation", "3 Reserved Car Parkings", "Infinity Pool"],
      status: "available",
      coverImageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      isArchived: false,
      createdBy: "user-propman-1",
      createdAt: new Date("2026-01-15T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-15T10:00:00Z").toISOString(),
    },
    {
      id: "prop-2",
      organizationId: orgSkyline.id,
      title: "Modern Designer 1-Kanal Spanish Villa",
      listingReference: "SKY-LHE-002",
      projectName: "DHA Phase 6 Premium Enclave",
      propertyType: "House",
      description: "Brand new architect-designed 1-Kanal villa with imported Spanish tiles, solid teak woodwork, and full basement.",
      city: "Lahore",
      area: "DHA Phase 6 Block J",
      address: "Sector J, Street 14, DHA Phase 6, Lahore",
      size: 1,
      sizeUnit: "Kanal",
      bedrooms: 5,
      bathrooms: 6,
      price: 135000000, // PKR 13.5 Crore
      currency: "PKR",
      paymentPlanNotes: "Ready for possession on 100% payment or 6-month structured payment.",
      developerName: "Al-Haram Builders",
      features: ["Basement Cinema", "Rooftop Garden", "Solar Powered 15kW", "Servant Quarters", "Double Height Lobby"],
      status: "available",
      coverImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      isArchived: false,
      createdBy: "user-propman-1",
      createdAt: new Date("2026-01-16T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-16T10:00:00Z").toISOString(),
    },
    {
      id: "prop-3",
      organizationId: orgSkyline.id,
      title: "Prime Commercial Corner Plot (10 Marla)",
      listingReference: "SKY-ISB-003",
      projectName: "Bahria Town Commercial Hub",
      propertyType: "Commercial Property",
      description: "Main Boulevard corner plot approved for G+7 commercial plaza construction.",
      city: "Islamabad",
      area: "Bahria Town Phase 7",
      address: "Main Commercial Boulevard, Phase 7, Rawalpindi / Islamabad",
      size: 10,
      sizeUnit: "Marla",
      price: 52000000, // PKR 5.2 Crore
      currency: "PKR",
      paymentPlanNotes: "Ready transfer with clean title deed.",
      developerName: "Bahria Town Private Ltd",
      features: ["Main Boulevard", "Corner Facing", "Underground Electricity", "Immediate Possession"],
      status: "reserved",
      coverImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      isArchived: false,
      createdBy: "user-propman-1",
      createdAt: new Date("2026-01-18T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-18T10:00:00Z").toISOString(),
    },
    {
      id: "prop-4",
      organizationId: orgSkyline.id,
      title: "Executive 2-Bed Luxury Suite in Gulberg",
      listingReference: "SKY-LHE-004",
      projectName: "The Mall of Gulberg Residences",
      propertyType: "Apartment",
      description: "High-yield rental apartment with guaranteed 10% annual rental return.",
      city: "Lahore",
      area: "Gulberg III",
      address: "Main Boulevard Gulberg, Lahore",
      size: 1350,
      sizeUnit: "Sq Ft",
      bedrooms: 2,
      bathrooms: 2,
      price: 29500000, // PKR 2.95 Crore
      currency: "PKR",
      paymentPlanNotes: "10% booking, 30-month payment plan.",
      developerName: "Apex Urban Properties",
      features: ["Gymnasium", "24/7 Security", "Central HVAC", "Standby Generator"],
      status: "sold",
      coverImageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      isArchived: false,
      createdBy: "user-propman-1",
      createdAt: new Date("2026-01-20T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-20T10:00:00Z").toISOString(),
    },
    // Property for Org 2 (Apex) to verify tenant isolation
    {
      id: "prop-apex-1",
      organizationId: orgApex.id,
      title: "Apex Horizon Corporate Suite",
      listingReference: "APX-ISB-101",
      projectName: "Apex Blue Area Tower",
      propertyType: "Shop/Office",
      city: "Islamabad",
      area: "Blue Area",
      size: 2500,
      sizeUnit: "Sq Ft",
      price: 60000000,
      currency: "PKR",
      features: ["Corner Office", "Metro Station Access"],
      status: "available",
      isArchived: false,
      createdAt: new Date("2026-02-05T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-05T10:00:00Z").toISOString(),
    },
  ];

  properties.forEach((p) => db.properties.set(p.id, p));

  // --- 5. Contacts ---
  const contacts: Contact[] = [
    {
      id: "contact-1",
      organizationId: orgSkyline.id,
      firstName: "Dr. Salman",
      lastName: "Raza",
      phone: "+92 300 8456123",
      phoneNormalized: normalizePhoneNumber("+92 300 8456123"),
      email: "dr.salman.raza@gmail.com",
      emailNormalized: normalizeEmail("dr.salman.raza@gmail.com"),
      contactType: "buyer",
      companyName: "Raza Cardiology Associates",
      preferredLanguage: "Urdu",
      notes: "Seeking luxury villa in DHA Phase 6 Lahore for immediate family relocation from UK.",
      isArchived: false,
      createdBy: "user-owner-1",
      createdAt: new Date("2026-01-22T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-22T10:00:00Z").toISOString(),
    },
    {
      id: "contact-2",
      organizationId: orgSkyline.id,
      firstName: "Farhan",
      lastName: "Qureshi",
      phone: "+92 321 9988776",
      phoneNormalized: normalizePhoneNumber("+92 321 9988776"),
      email: "farhan.qureshi@textiles.com.pk",
      emailNormalized: normalizeEmail("farhan.qureshi@textiles.com.pk"),
      contactType: "investor",
      companyName: "Qureshi Textiles Group",
      preferredLanguage: "English",
      notes: "High net-worth investor focused on seafront penthouses in Clifton and commercial plots.",
      isArchived: false,
      createdBy: "user-manager-1",
      createdAt: new Date("2026-01-25T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-25T10:00:00Z").toISOString(),
    },
    {
      id: "contact-3",
      organizationId: orgSkyline.id,
      firstName: "Zainab",
      lastName: "Malik",
      phone: "+92 334 5123456",
      phoneNormalized: normalizePhoneNumber("+92 334 5123456"),
      email: "zainab.malik@outlook.com",
      emailNormalized: normalizeEmail("zainab.malik@outlook.com"),
      contactType: "buyer",
      preferredLanguage: "Urdu",
      notes: "Looking for 2-bed apartment in Gulberg Lahore for son's university residence.",
      isArchived: false,
      createdBy: "user-agent-1",
      createdAt: new Date("2026-02-01T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-01T10:00:00Z").toISOString(),
    },
    {
      id: "contact-4",
      organizationId: orgSkyline.id,
      firstName: "Omar",
      lastName: "Farooq",
      phone: "+92 345 7766554",
      phoneNormalized: normalizePhoneNumber("+92 345 7766554"),
      email: "omar.farooq@techlogix.pk",
      emailNormalized: normalizeEmail("omar.farooq@techlogix.pk"),
      contactType: "seller",
      companyName: "Techlogix Solutions",
      preferredLanguage: "English",
      notes: "Owner of commercial plot in Bahria Town Phase 7 Rawalpindi.",
      isArchived: false,
      createdBy: "user-owner-1",
      createdAt: new Date("2026-02-03T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-03T10:00:00Z").toISOString(),
    },
    // Org 2 contact
    {
      id: "contact-apex-1",
      organizationId: orgApex.id,
      firstName: "Rashid",
      lastName: "Minhas",
      phone: "+92 302 4433221",
      phoneNormalized: normalizePhoneNumber("+92 302 4433221"),
      email: "rashid@minhascorp.pk",
      emailNormalized: normalizeEmail("rashid@minhascorp.pk"),
      contactType: "investor",
      preferredLanguage: "Urdu",
      isArchived: false,
      createdAt: new Date("2026-02-06T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-06T10:00:00Z").toISOString(),
    },
  ];

  contacts.forEach((c) => db.contacts.set(c.id, c));

  // --- 6. Leads (Inquiries) ---
  const leads: Lead[] = [
    {
      id: "lead-1",
      organizationId: orgSkyline.id,
      contactId: "contact-1",
      title: "Inquiry for 1-Kanal Designer Villa in DHA Phase 6",
      source: "Website",
      propertyId: "prop-2",
      propertyTypePreference: "House",
      budgetMin: 120000000,
      budgetMax: 140000000,
      preferredLocation: "DHA Phase 6 Lahore",
      intendedUse: "personal_use",
      purchaseTimeline: "immediate",
      financingPreference: "cash",
      stage: "negotiation",
      assignedAgentId: "user-agent-1",
      notes: "Client completed physical site visit. Negotiating on final fixtures and possession timeline.",
      isArchived: false,
      createdBy: "user-owner-1",
      createdAt: new Date("2026-01-23T11:00:00Z").toISOString(),
      updatedAt: new Date("2026-01-28T14:30:00Z").toISOString(),
    },
    {
      id: "lead-2",
      organizationId: orgSkyline.id,
      contactId: "contact-2",
      title: "Inquiry for Oceanfront Penthouse in Clifton Block 4",
      source: "Property Portal",
      propertyId: "prop-1",
      propertyTypePreference: "Apartment",
      budgetMin: 80000000,
      budgetMax: 90000000,
      preferredLocation: "Clifton Karachi",
      intendedUse: "investment",
      purchaseTimeline: "1_to_3_months",
      financingPreference: "installments",
      stage: "site_visit_completed",
      assignedAgentId: "user-agent-1",
      notes: "Interested in the 4-year installment plan. Requested developer layout approvals.",
      isArchived: false,
      createdBy: "user-manager-1",
      createdAt: new Date("2026-01-26T09:15:00Z").toISOString(),
      updatedAt: new Date("2026-01-29T16:00:00Z").toISOString(),
    },
    {
      id: "lead-3",
      organizationId: orgSkyline.id,
      contactId: "contact-3",
      title: "Student Residence 2-Bed Flat in Gulberg III",
      source: "Phone Call",
      propertyId: "prop-4",
      propertyTypePreference: "Apartment",
      budgetMin: 25000000,
      budgetMax: 30000000,
      preferredLocation: "Gulberg Lahore",
      intendedUse: "personal_use",
      purchaseTimeline: "immediate",
      financingPreference: "cash",
      stage: "closed_won",
      assignedAgentId: "user-agent-1",
      notes: "Deal finalized! Down payment cleared and token deposit received.",
      isArchived: false,
      createdBy: "user-agent-1",
      createdAt: new Date("2026-02-01T11:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-04T12:00:00Z").toISOString(),
    },
    {
      id: "lead-4",
      organizationId: orgSkyline.id,
      contactId: "contact-4",
      title: "Commercial Plot Plaza Development Joint Venture",
      source: "Referral",
      propertyId: "prop-3",
      propertyTypePreference: "Commercial Property",
      budgetMin: 50000000,
      budgetMax: 60000000,
      preferredLocation: "Bahria Town Rawalpindi",
      intendedUse: "investment",
      purchaseTimeline: "3_to_6_months",
      stage: "contact_in_progress",
      assignedAgentId: "user-manager-1",
      notes: "Initial discussion held regarding soil testing and building bylaws.",
      isArchived: false,
      createdBy: "user-owner-1",
      createdAt: new Date("2026-02-04T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-04T10:00:00Z").toISOString(),
    },
    {
      id: "lead-5",
      organizationId: orgSkyline.id,
      contactId: "contact-1",
      title: "Second Inquiry: Holiday Farmhouse Plot in Bedian",
      source: "WhatsApp",
      propertyTypePreference: "Residential Plot",
      budgetMin: 35000000,
      budgetMax: 45000000,
      preferredLocation: "Bedian Road Lahore",
      intendedUse: "investment",
      stage: "new_lead",
      assignedAgentId: "user-agent-1",
      notes: "Dr. Salman asked for available 4-Kanal farmhouse options during yesterday's meeting.",
      isArchived: false,
      createdBy: "user-agent-1",
      createdAt: new Date("2026-02-05T15:30:00Z").toISOString(),
      updatedAt: new Date("2026-02-05T15:30:00Z").toISOString(),
    },
    // Org 2 lead
    {
      id: "lead-apex-1",
      organizationId: orgApex.id,
      contactId: "contact-apex-1",
      title: "Blue Area Office Inquiry",
      source: "Manual Entry",
      propertyId: "prop-apex-1",
      stage: "new_lead",
      isArchived: false,
      createdAt: new Date("2026-02-06T10:30:00Z").toISOString(),
      updatedAt: new Date("2026-02-06T10:30:00Z").toISOString(),
    },
  ];

  leads.forEach((l) => db.leads.set(l.id, l));

  // --- 7. Tasks ---
  const tasks: Task[] = [
    {
      id: "task-1",
      organizationId: orgSkyline.id,
      title: "Send revised payment schedule to Dr. Salman",
      description: "Prepare customized 1-Kanal villa transfer paperwork and include stamp duty calculations.",
      contactId: "contact-1",
      leadId: "lead-1",
      assignedUserId: "user-agent-1",
      dueDate: new Date(Date.now() + 86400000 * 1).toISOString(), // Tomorrow
      priority: "high",
      status: "pending",
      createdBy: "user-manager-1",
      createdAt: new Date("2026-02-04T09:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-04T09:00:00Z").toISOString(),
    },
    {
      id: "task-2",
      organizationId: orgSkyline.id,
      title: "Verify NOC clearance for Crest Oceanfront Penthouse",
      description: "Collect copy of Sindh Building Control Authority (SBCA) approved architectural plan for Mr. Farhan Qureshi.",
      contactId: "contact-2",
      leadId: "lead-2",
      assignedUserId: "user-propman-1",
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      priority: "medium",
      status: "in_progress",
      createdBy: "user-manager-1",
      createdAt: new Date("2026-02-03T11:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-03T11:00:00Z").toISOString(),
    },
  ];

  tasks.forEach((t) => db.tasks.set(t.id, t));

  // --- 8. Appointments ---
  const appointments: Appointment[] = [
    {
      id: "app-1",
      organizationId: orgSkyline.id,
      title: "Site Visit: 1-Kanal Designer Villa with Dr. Salman",
      contactId: "contact-1",
      leadId: "lead-1",
      propertyId: "prop-2",
      assignedAgentId: "user-agent-1",
      appointmentType: "Site Visit",
      startTime: new Date(Date.now() + 86400000 * 1 + 3600000 * 3).toISOString(), // Tomorrow at 3pm
      durationMinutes: 60,
      location: "Sector J, Street 14, DHA Phase 6, Lahore",
      status: "scheduled",
      outcomeNotes: "Meeting buyer and interior designer at the villa entrance.",
      createdBy: "user-agent-1",
      createdAt: new Date("2026-02-04T10:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-04T10:00:00Z").toISOString(),
    },
    {
      id: "app-2",
      organizationId: orgSkyline.id,
      title: "Office Meeting: Investment Portfolio Review with Farhan Qureshi",
      contactId: "contact-2",
      leadId: "lead-2",
      propertyId: "prop-1",
      assignedAgentId: "user-manager-1",
      appointmentType: "Office Meeting",
      startTime: new Date(Date.now() + 86400000 * 3).toISOString(),
      durationMinutes: 45,
      location: "Skyline Horizon Executive Suite, Main Boulevard Gulberg",
      status: "scheduled",
      createdBy: "user-manager-1",
      createdAt: new Date("2026-02-03T14:00:00Z").toISOString(),
      updatedAt: new Date("2026-02-03T14:00:00Z").toISOString(),
    },
  ];

  appointments.forEach((a) => db.appointments.set(a.id, a));

  // --- 9. Notifications ---
  const notifications: Notification[] = [
    {
      id: "notif-1",
      organizationId: orgSkyline.id,
      recipientId: "user-owner-1",
      title: "New Lead Assigned",
      message: "Dr. Salman Raza submitted a new inquiry for Bedian Road Farmhouse Plot.",
      entityType: "lead",
      entityId: "lead-5",
      isRead: false,
      createdAt: new Date("2026-02-05T15:35:00Z").toISOString(),
    },
    {
      id: "notif-2",
      organizationId: orgSkyline.id,
      recipientId: "user-owner-1",
      title: "Deal Closed Won!",
      message: "Lead 'Student Residence 2-Bed Flat in Gulberg III' marked Closed Won (PKR 2.95 Crore).",
      entityType: "lead",
      entityId: "lead-3",
      isRead: true,
      createdAt: new Date("2026-02-04T12:05:00Z").toISOString(),
    },
  ];

  notifications.forEach((n) => db.notifications.set(n.id, n));

  return db;
}

// Global store singleton
const globalStore: InMemoryDatabase = createSeedDatabase();

// ============================================================================
// DATA ACCESS & BUSINESS LOGIC METHODS
// ============================================================================

export class CrmStore {
  // ---------------- ORGANIZATIONS & MEMBERSHIPS ----------------
  static async getOrganization(orgId: string): Promise<Organization | null> {
    return globalStore.organizations.get(orgId) || null;
  }

  static async getMembershipsForUser(userId: string): Promise<OrganizationMembership[]> {
    const list: OrganizationMembership[] = [];
    for (const mem of globalStore.memberships.values()) {
      if (mem.userId === userId && mem.status === "active") {
        const org = globalStore.organizations.get(mem.organizationId);
        const user = globalStore.profiles.get(mem.userId);
        list.push({ ...mem, organization: org, user });
      }
    }
    return list;
  }

  static async getOrganizationMembers(orgId: string): Promise<OrganizationMembership[]> {
    const list: OrganizationMembership[] = [];
    for (const mem of globalStore.memberships.values()) {
      if (mem.organizationId === orgId) {
        const user = globalStore.profiles.get(mem.userId);
        list.push({ ...mem, user });
      }
    }
    return list;
  }

  static async inviteMember(
    orgId: string,
    email: string,
    fullName: string,
    role: UserRole
  ): Promise<OrganizationMembership> {
    const existingUser = Array.from(globalStore.profiles.values()).find((u) => u.email === email);
    let userId = existingUser?.id;

    if (!userId) {
      userId = `user-${Date.now()}`;
      const newProfile: UserProfile = {
        id: userId,
        fullName,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      globalStore.profiles.set(userId, newProfile);
    }

    const membershipId = `mem-${Date.now()}`;
    const newMembership: OrganizationMembership = {
      id: membershipId,
      organizationId: orgId,
      userId,
      role,
      status: "active",
      invitedEmail: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    globalStore.memberships.set(membershipId, newMembership);

    await this.logAuditEvent({
      organizationId: orgId,
      action: "USER_INVITED",
      targetEntity: "organization_membership",
      targetId: membershipId,
      metadata: { email, role },
    });

    return { ...newMembership, user: globalStore.profiles.get(userId) };
  }

  static async updateMemberStatus(
    orgId: string,
    membershipId: string,
    status: "active" | "deactivated"
  ): Promise<OrganizationMembership> {
    const mem = globalStore.memberships.get(membershipId);
    if (!mem || mem.organizationId !== orgId) {
      throw new Error("Membership not found in this organization");
    }
    mem.status = status;
    mem.updatedAt = new Date().toISOString();
    globalStore.memberships.set(membershipId, mem);

    await this.logAuditEvent({
      organizationId: orgId,
      action: "MEMBERSHIP_STATUS_UPDATED",
      targetEntity: "organization_membership",
      targetId: membershipId,
      metadata: { status },
    });

    return mem;
  }

  // ---------------- CONTACTS ----------------
  static async getContacts(
    orgId: string,
    options?: {
      search?: string;
      contactType?: string;
      page?: number;
      limit?: number;
      includeArchived?: boolean;
    }
  ): Promise<{ contacts: Contact[]; total: number }> {
    const search = options?.search?.toLowerCase();
    const type = options?.contactType;
    const includeArchived = options?.includeArchived ?? false;
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 20;

    let items = Array.from(globalStore.contacts.values()).filter(
      (c) => c.organizationId === orgId && (includeArchived ? true : !c.isArchived)
    );

    if (type && type !== "all") {
      items = items.filter((c) => c.contactType === type);
    }

    if (search) {
      items = items.filter(
        (c) =>
          c.firstName.toLowerCase().includes(search) ||
          c.lastName.toLowerCase().includes(search) ||
          c.phone.includes(search) ||
          (c.email && c.email.toLowerCase().includes(search)) ||
          (c.companyName && c.companyName.toLowerCase().includes(search))
      );
    }

    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Enrich with leads count
    const enriched = items.map((contact) => {
      const leadsCount = Array.from(globalStore.leads.values()).filter(
        (l) => l.organizationId === orgId && l.contactId === contact.id && !l.isArchived
      ).length;
      return { ...contact, leadsCount };
    });

    const total = enriched.length;
    const startIndex = (page - 1) * limit;
    const contacts = enriched.slice(startIndex, startIndex + limit);

    return { contacts, total };
  }

  static async getContactById(orgId: string, contactId: string): Promise<Contact | null> {
    const contact = globalStore.contacts.get(contactId);
    if (!contact || contact.organizationId !== orgId) return null;
    return contact;
  }

  static async findDuplicateContact(
    orgId: string,
    phone: string,
    email?: string,
    excludeContactId?: string
  ): Promise<Contact | null> {
    const normPhone = normalizePhoneNumber(phone);
    const normEmail = normalizeEmail(email);

    for (const c of globalStore.contacts.values()) {
      if (c.organizationId !== orgId || c.isArchived) continue;
      if (excludeContactId && c.id === excludeContactId) continue;

      if (normPhone && c.phoneNormalized === normPhone) {
        return c;
      }
      if (normEmail && c.emailNormalized && c.emailNormalized === normEmail) {
        return c;
      }
    }
    return null;
  }

  static async createContact(
    orgId: string,
    data: Omit<Contact, "id" | "organizationId" | "phoneNormalized" | "emailNormalized" | "createdAt" | "updatedAt" | "isArchived">,
    actorId?: string
  ): Promise<Contact> {
    const id = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const phoneNormalized = normalizePhoneNumber(data.phone);
    const emailNormalized = normalizeEmail(data.email);

    const contact: Contact = {
      ...data,
      id,
      organizationId: orgId,
      phoneNormalized,
      emailNormalized: emailNormalized || undefined,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    globalStore.contacts.set(id, contact);

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "CONTACT_CREATED",
      targetEntity: "contact",
      targetId: id,
      metadata: { name: `${contact.firstName} ${contact.lastName}`, phone: contact.phone },
    });

    return contact;
  }

  static async updateContact(
    orgId: string,
    contactId: string,
    data: Partial<Contact>,
    actorId?: string
  ): Promise<Contact> {
    const contact = globalStore.contacts.get(contactId);
    if (!contact || contact.organizationId !== orgId) {
      throw new Error("Contact not found in organization");
    }

    const updated: Contact = {
      ...contact,
      ...data,
      phoneNormalized: data.phone ? normalizePhoneNumber(data.phone) : contact.phoneNormalized,
      emailNormalized: data.email !== undefined ? normalizeEmail(data.email) : contact.emailNormalized,
      updatedAt: new Date().toISOString(),
    };

    globalStore.contacts.set(contactId, updated);

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "CONTACT_UPDATED",
      targetEntity: "contact",
      targetId: contactId,
    });

    return updated;
  }

  // ---------------- PROPERTIES ----------------
  static async getProperties(
    orgId: string,
    options?: {
      search?: string;
      status?: string;
      propertyType?: string;
      city?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ properties: Property[]; total: number }> {
    const search = options?.search?.toLowerCase();
    const status = options?.status;
    const propertyType = options?.propertyType;
    const city = options?.city;
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 20;

    let items = Array.from(globalStore.properties.values()).filter(
      (p) => p.organizationId === orgId && !p.isArchived
    );

    if (status && status !== "all") {
      items = items.filter((p) => p.status === status);
    }
    if (propertyType && propertyType !== "all") {
      items = items.filter((p) => p.propertyType === propertyType);
    }
    if (city && city !== "all") {
      items = items.filter((p) => p.city.toLowerCase() === city.toLowerCase());
    }
    if (search) {
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.listingReference.toLowerCase().includes(search) ||
          p.area.toLowerCase().includes(search) ||
          p.city.toLowerCase().includes(search) ||
          (p.projectName && p.projectName.toLowerCase().includes(search))
      );
    }

    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = items.length;
    const startIndex = (page - 1) * limit;
    const properties = items.slice(startIndex, startIndex + limit);

    return { properties, total };
  }

  static async getPropertyById(orgId: string, propertyId: string): Promise<Property | null> {
    const prop = globalStore.properties.get(propertyId);
    if (!prop || prop.organizationId !== orgId) return null;
    return prop;
  }

  static async createProperty(
    orgId: string,
    data: Omit<Property, "id" | "organizationId" | "createdAt" | "updatedAt" | "isArchived">,
    actorId?: string
  ): Promise<Property> {
    const id = `prop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const property: Property = {
      ...data,
      id,
      organizationId: orgId,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    globalStore.properties.set(id, property);

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "PROPERTY_CREATED",
      targetEntity: "property",
      targetId: id,
      metadata: { title: property.title, ref: property.listingReference },
    });

    return property;
  }

  static async updatePropertyStatus(
    orgId: string,
    propertyId: string,
    newStatus: PropertyStatus,
    actorId?: string
  ): Promise<Property> {
    const prop = globalStore.properties.get(propertyId);
    if (!prop || prop.organizationId !== orgId) {
      throw new Error("Property not found in organization");
    }

    const oldStatus = prop.status;
    prop.status = newStatus;
    prop.lastAvailabilityUpdate = new Date().toISOString();
    prop.updatedAt = new Date().toISOString();
    globalStore.properties.set(propertyId, prop);

    // Audit and activity
    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "PROPERTY_STATUS_CHANGED",
      targetEntity: "property",
      targetId: propertyId,
      metadata: { from: oldStatus, to: newStatus },
    });

    await this.createActivity({
      organizationId: orgId,
      actorId,
      entityType: "property",
      entityId: propertyId,
      activityType: "status_changed",
      description: `Property status changed from ${oldStatus} to ${newStatus}`,
    });

    return prop;
  }

  // ---------------- LEADS & PIPELINE ----------------
  static async getLeads(
    orgId: string,
    options?: {
      search?: string;
      stage?: string;
      source?: string;
      agentId?: string;
      propertyId?: string;
      contactId?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ leads: Lead[]; total: number }> {
    const search = options?.search?.toLowerCase();
    const stage = options?.stage;
    const source = options?.source;
    const agentId = options?.agentId;
    const propertyId = options?.propertyId;
    const contactId = options?.contactId;
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 50;

    let items = Array.from(globalStore.leads.values()).filter(
      (l) => l.organizationId === orgId && !l.isArchived
    );

    if (stage && stage !== "all") {
      items = items.filter((l) => l.stage === stage);
    }
    if (source && source !== "all") {
      items = items.filter((l) => l.source === source);
    }
    if (agentId && agentId !== "all") {
      items = items.filter((l) => l.assignedAgentId === agentId);
    }
    if (propertyId && propertyId !== "all") {
      items = items.filter((l) => l.propertyId === propertyId);
    }
    if (contactId) {
      items = items.filter((l) => l.contactId === contactId);
    }

    // Enrich relations
    const enriched = items.map((lead) => {
      const contact = globalStore.contacts.get(lead.contactId);
      const property = lead.propertyId ? globalStore.properties.get(lead.propertyId) : undefined;
      const agent = lead.assignedAgentId ? globalStore.profiles.get(lead.assignedAgentId) : undefined;
      return { ...lead, contact, property, assignedAgent: agent };
    });

    if (search) {
      items = enriched.filter(
        (l) =>
          l.title.toLowerCase().includes(search) ||
          (l.contact &&
            (l.contact.firstName.toLowerCase().includes(search) ||
              l.contact.lastName.toLowerCase().includes(search) ||
              l.contact.phone.includes(search))) ||
          (l.property && l.property.title.toLowerCase().includes(search))
      );
    } else {
      items = enriched;
    }

    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = items.length;
    const startIndex = (page - 1) * limit;
    const leads = items.slice(startIndex, startIndex + limit);

    return { leads, total };
  }

  static async getLeadById(orgId: string, leadId: string): Promise<Lead | null> {
    const lead = globalStore.leads.get(leadId);
    if (!lead || lead.organizationId !== orgId) return null;

    const contact = globalStore.contacts.get(lead.contactId);
    const property = lead.propertyId ? globalStore.properties.get(lead.propertyId) : undefined;
    const agent = lead.assignedAgentId ? globalStore.profiles.get(lead.assignedAgentId) : undefined;

    return { ...lead, contact, property, assignedAgent: agent };
  }

  static async createLead(
    orgId: string,
    data: Omit<Lead, "id" | "organizationId" | "createdAt" | "updatedAt" | "isArchived">,
    actorId?: string
  ): Promise<Lead> {
    const id = `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const lead: Lead = {
      ...data,
      id,
      organizationId: orgId,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    globalStore.leads.set(id, lead);

    // Initial stage history
    const historyId = `hist-${Date.now()}`;
    globalStore.leadStageHistories.set(historyId, {
      id: historyId,
      organizationId: orgId,
      leadId: id,
      toStage: lead.stage,
      reason: "Initial lead inquiry creation",
      changedBy: actorId,
      createdAt: new Date().toISOString(),
    });

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "LEAD_CREATED",
      targetEntity: "lead",
      targetId: id,
      metadata: { title: lead.title, stage: lead.stage, source: lead.source },
    });

    await this.createActivity({
      organizationId: orgId,
      actorId,
      entityType: "lead",
      entityId: id,
      activityType: "created",
      description: `New lead created: ${lead.title} (${STAGE_CONFIG[lead.stage]?.label || lead.stage})`,
    });

    return lead;
  }

  static async updateLead(
    orgId: string,
    leadId: string,
    data: Partial<Lead>,
    actorId?: string
  ): Promise<Lead> {
    const lead = globalStore.leads.get(leadId);
    if (!lead || lead.organizationId !== orgId) {
      throw new Error("Lead not found in organization");
    }

    const updated: Lead = {
      ...lead,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    globalStore.leads.set(leadId, updated);

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "LEAD_UPDATED",
      targetEntity: "lead",
      targetId: leadId,
    });

    return updated;
  }

  static async updateLeadStage(
    orgId: string,
    leadId: string,
    newStage: PipelineStage,
    reason?: string,
    actorId?: string
  ): Promise<Lead> {
    const lead = globalStore.leads.get(leadId);
    if (!lead || lead.organizationId !== orgId) {
      throw new Error("Lead not found in organization");
    }

    const fromStage = lead.stage;
    lead.stage = newStage;
    if (newStage === "closed_lost" && reason) {
      lead.closedLostReason = reason;
    }
    lead.updatedAt = new Date().toISOString();
    globalStore.leads.set(leadId, lead);

    // Record stage history
    const historyId = `hist-${Date.now()}`;
    const actor = actorId ? globalStore.profiles.get(actorId) : undefined;
    globalStore.leadStageHistories.set(historyId, {
      id: historyId,
      organizationId: orgId,
      leadId,
      fromStage,
      toStage: newStage,
      reason,
      changedBy: actorId,
      changerName: actor?.fullName,
      createdAt: new Date().toISOString(),
    });

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "LEAD_STAGE_CHANGED",
      targetEntity: "lead",
      targetId: leadId,
      metadata: { fromStage, toStage: newStage, reason },
    });

    await this.createActivity({
      organizationId: orgId,
      actorId,
      entityType: "lead",
      entityId: leadId,
      activityType: "stage_changed",
      description: `Stage updated from "${STAGE_CONFIG[fromStage]?.label}" to "${STAGE_CONFIG[newStage]?.label}"${reason ? ` (${reason})` : ""}`,
    });

    return lead;
  }

  static async getLeadStageHistory(orgId: string, leadId: string): Promise<LeadStageHistory[]> {
    return Array.from(globalStore.leadStageHistories.values())
      .filter((h) => h.organizationId === orgId && h.leadId === leadId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // ---------------- TASKS & APPOINTMENTS ----------------
  static async getTasks(
    orgId: string,
    options?: { assignedUserId?: string; status?: string; page?: number; limit?: number }
  ): Promise<Task[]> {
    let items = Array.from(globalStore.tasks.values()).filter((t) => t.organizationId === orgId);
    if (options?.assignedUserId && options.assignedUserId !== "all") {
      items = items.filter((t) => t.assignedUserId === options.assignedUserId);
    }
    if (options?.status && options.status !== "all") {
      items = items.filter((t) => t.status === options.status);
    }
    return items
      .map((t) => ({
        ...t,
        contact: t.contactId ? globalStore.contacts.get(t.contactId) : undefined,
        lead: t.leadId ? globalStore.leads.get(t.leadId) : undefined,
        assignedUser: t.assignedUserId ? globalStore.profiles.get(t.assignedUserId) : undefined,
      }))
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  static async createTask(
    orgId: string,
    data: Omit<Task, "id" | "organizationId" | "createdAt" | "updatedAt">,
    actorId?: string
  ): Promise<Task> {
    const id = `task-${Date.now()}`;
    const task: Task = {
      ...data,
      id,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    globalStore.tasks.set(id, task);

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "TASK_CREATED",
      targetEntity: "task",
      targetId: id,
      metadata: { title: task.title, due: task.dueDate },
    });

    return task;
  }

  static async updateTask(
    orgId: string,
    taskId: string,
    data: Partial<Task>,
    actorId?: string
  ): Promise<Task> {
    const task = globalStore.tasks.get(taskId);
    if (!task || task.organizationId !== orgId) {
      throw new Error("Task not found in organization");
    }
    const updated: Task = {
      ...task,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    globalStore.tasks.set(taskId, updated);
    return updated;
  }

  static async getAppointments(
    orgId: string,
    options?: { assignedAgentId?: string; status?: string }
  ): Promise<Appointment[]> {
    let items = Array.from(globalStore.appointments.values()).filter((a) => a.organizationId === orgId);
    if (options?.assignedAgentId && options.assignedAgentId !== "all") {
      items = items.filter((a) => a.assignedAgentId === options.assignedAgentId);
    }
    if (options?.status && options.status !== "all") {
      items = items.filter((a) => a.status === options.status);
    }
    return items
      .map((a) => ({
        ...a,
        contact: a.contactId ? globalStore.contacts.get(a.contactId) : undefined,
        lead: a.leadId ? globalStore.leads.get(a.leadId) : undefined,
        property: a.propertyId ? globalStore.properties.get(a.propertyId) : undefined,
        assignedAgent: a.assignedAgentId ? globalStore.profiles.get(a.assignedAgentId) : undefined,
      }))
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }

  static async createAppointment(
    orgId: string,
    data: Omit<Appointment, "id" | "organizationId" | "createdAt" | "updatedAt">,
    actorId?: string
  ): Promise<Appointment> {
    const id = `app-${Date.now()}`;
    const appointment: Appointment = {
      ...data,
      id,
      organizationId: orgId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    globalStore.appointments.set(id, appointment);

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "APPOINTMENT_SCHEDULED",
      targetEntity: "appointment",
      targetId: id,
      metadata: { title: appointment.title, time: appointment.startTime },
    });

    return appointment;
  }

  // ---------------- CSV IMPORT / EXPORT ----------------
  static async importCSV(
    orgId: string,
    rows: CSVImportRow[],
    actorId?: string
  ): Promise<CSVImportResult> {
    const result: CSVImportResult = {
      totalRows: rows.length,
      importedCount: 0,
      duplicateCount: 0,
      errorCount: 0,
      errors: [],
      duplicates: [],
    };

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      const rowNumber = index + 1;

      // 1. Validation check
      const parsed = csvRowSchema.safeParse(row);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          result.errors.push({
            row: rowNumber,
            field: issue.path.join("."),
            message: issue.message,
          });
        }
        result.errorCount++;
        continue;
      }

      // 2. Duplicate check
      const duplicateContact = await this.findDuplicateContact(orgId, row.phone, row.email);
      if (duplicateContact) {
        result.duplicates.push({
          row: rowNumber,
          phone: row.phone,
          existingContactId: duplicateContact.id,
          contactName: `${duplicateContact.firstName} ${duplicateContact.lastName}`,
        });
        result.duplicateCount++;
        // Create inquiry under existing contact
        await this.createLead(
          orgId,
          {
            contactId: duplicateContact.id,
            title: row.leadTitle,
            source: (row.source as any) || "Property Portal",
            budgetMin: row.budgetMin,
            budgetMax: row.budgetMax,
            propertyTypePreference: row.propertyType as any,
            preferredLocation: row.preferredLocation,
            stage: "new_lead",
            notes: row.notes,
          },
          actorId
        );
        result.importedCount++;
        continue;
      }

      // 3. Create fresh contact and lead
      const contact = await this.createContact(
        orgId,
        {
          firstName: row.firstName,
          lastName: row.lastName,
          phone: row.phone,
          email: row.email,
          contactType: "buyer",
          preferredLanguage: "Urdu",
          notes: row.notes,
        },
        actorId
      );

      await this.createLead(
        orgId,
        {
          contactId: contact.id,
          title: row.leadTitle,
          source: (row.source as any) || "Property Portal",
          budgetMin: row.budgetMin,
          budgetMax: row.budgetMax,
          propertyTypePreference: row.propertyType as any,
          preferredLocation: row.preferredLocation,
          stage: "new_lead",
          notes: row.notes,
        },
        actorId
      );

      result.importedCount++;
    }

    await this.logAuditEvent({
      organizationId: orgId,
      actorId,
      action: "CSV_IMPORT_COMPLETED",
      targetEntity: "lead",
      metadata: {
        total: result.totalRows,
        imported: result.importedCount,
        duplicates: result.duplicateCount,
        errors: result.errorCount,
      },
    });

    return result;
  }

  // ---------------- DASHBOARD METRICS ----------------
  static async getDashboardMetrics(orgId: string): Promise<DashboardMetrics> {
    const leads = Array.from(globalStore.leads.values()).filter(
      (l) => l.organizationId === orgId && !l.isArchived
    );
    const properties = Array.from(globalStore.properties.values()).filter(
      (p) => p.organizationId === orgId && !p.isArchived
    );
    const appointments = Array.from(globalStore.appointments.values()).filter(
      (a) => a.organizationId === orgId && a.status === "scheduled"
    );

    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.stage === "new_lead").length;
    const activeOpportunities = leads.filter(
      (l) => l.stage !== "closed_won" && l.stage !== "closed_lost"
    ).length;
    const closedWonDeals = leads.filter((l) => l.stage === "closed_won").length;
    const upcomingAppointments = appointments.length;

    const totalProperties = properties.length;
    const availableProperties = properties.filter((p) => p.status === "available").length;

    // Leads by Stage
    const stages: PipelineStage[] = [
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
    ];
    const leadsByStage = stages.map((st) => ({
      stage: st,
      label: STAGE_CONFIG[st].label,
      count: leads.filter((l) => l.stage === st).length,
    }));

    // Leads by Source
    const sourcesMap = new Map<string, number>();
    leads.forEach((l) => {
      sourcesMap.set(l.source, (sourcesMap.get(l.source) || 0) + 1);
    });
    const leadsBySource = Array.from(sourcesMap.entries()).map(([source, count]) => ({
      source: source as any,
      count,
    }));

    // Recent leads
    const { leads: recentLeads } = await this.getLeads(orgId, { limit: 5 });
    const upcomingAppointmentsList = await this.getAppointments(orgId, { status: "scheduled" });

    return {
      totalLeads,
      newLeads,
      activeOpportunities,
      upcomingAppointments,
      closedWonDeals,
      totalProperties,
      availableProperties,
      leadsByStage,
      leadsBySource,
      recentLeads,
      upcomingAppointmentsList: upcomingAppointmentsList.slice(0, 5),
    };
  }

  // ---------------- NOTIFICATIONS, ACTIVITIES & AUDIT ----------------
  static async getNotifications(orgId: string, recipientId: string): Promise<Notification[]> {
    return Array.from(globalStore.notifications.values())
      .filter((n) => n.organizationId === orgId && n.recipientId === recipientId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async markNotificationRead(notificationId: string): Promise<void> {
    const notif = globalStore.notifications.get(notificationId);
    if (notif) {
      notif.isRead = true;
      globalStore.notifications.set(notificationId, notif);
    }
  }

  static async markAllNotificationsRead(orgId: string, recipientId: string): Promise<void> {
    for (const notif of globalStore.notifications.values()) {
      if (notif.organizationId === orgId && notif.recipientId === recipientId) {
        notif.isRead = true;
      }
    }
  }

  static async createActivity(data: Omit<Activity, "id" | "createdAt">): Promise<void> {
    const id = `act-${Date.now()}`;
    const actor = data.actorId ? globalStore.profiles.get(data.actorId) : undefined;
    globalStore.activities.set(id, {
      ...data,
      id,
      actorName: actor?.fullName,
      createdAt: new Date().toISOString(),
    });
  }

  static async getActivities(orgId: string, entityId?: string): Promise<Activity[]> {
    let items = Array.from(globalStore.activities.values()).filter((a) => a.organizationId === orgId);
    if (entityId) {
      items = items.filter((a) => a.entityId === entityId);
    }
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async logAuditEvent(data: Omit<AuditEvent, "id" | "createdAt">): Promise<void> {
    const id = `aud-${Date.now()}`;
    const actor = data.actorId ? globalStore.profiles.get(data.actorId) : undefined;
    globalStore.auditEvents.set(id, {
      ...data,
      id,
      actorEmail: actor?.email,
      createdAt: new Date().toISOString(),
    });
  }

  static async getAuditEvents(orgId: string): Promise<AuditEvent[]> {
    return Array.from(globalStore.auditEvents.values())
      .filter((a) => a.organizationId === orgId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Helper for test resets
  static _resetForTesting(): void {
    const fresh = createSeedDatabase();
    globalStore.organizations = fresh.organizations;
    globalStore.profiles = fresh.profiles;
    globalStore.memberships = fresh.memberships;
    globalStore.contacts = fresh.contacts;
    globalStore.properties = fresh.properties;
    globalStore.leads = fresh.leads;
    globalStore.leadStageHistories = fresh.leadStageHistories;
    globalStore.tasks = fresh.tasks;
    globalStore.appointments = fresh.appointments;
    globalStore.activities = fresh.activities;
    globalStore.notifications = fresh.notifications;
    globalStore.auditEvents = fresh.auditEvents;
  }
}
