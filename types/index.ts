// ============================================================================
// SkyVista CRM - Domain Models and TypeScript Interfaces
// Multi-Tenant SaaS with Strict RBAC
// ============================================================================

export type UserRole = 'agency_owner' | 'sales_manager' | 'sales_agent' | 'property_manager';

export type MembershipStatus = 'active' | 'deactivated' | 'invited';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  contactEmail: string;
  phone?: string;
  country: string;
  timezone: string;
  currency: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMembership {
  id: string;
  organizationId: string;
  userId: string;
  role: UserRole;
  status: MembershipStatus;
  invitedEmail?: string;
  user?: UserProfile;
  organization?: Organization;
  createdAt: string;
  updatedAt: string;
}

export type ContactType = 'buyer' | 'seller' | 'investor' | 'tenant' | 'landlord' | 'other';

export interface Contact {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneNormalized: string;
  email?: string;
  emailNormalized?: string;
  contactType: ContactType;
  companyName?: string;
  preferredLanguage: string;
  notes?: string;
  isArchived: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  // Computed / expanded
  leadsCount?: number;
}

export type PropertyType =
  | 'Apartment'
  | 'House'
  | 'Residential Plot'
  | 'Commercial Property'
  | 'Shop/Office'
  | 'Villa'
  | 'Other';

export type PropertySizeUnit = 'Marla' | 'Kanal' | 'Sq Ft' | 'Sq Yds';

export type PropertyStatus = 'available' | 'reserved' | 'sold';

export interface Property {
  id: string;
  organizationId: string;
  title: string;
  listingReference: string;
  projectName?: string;
  propertyType: PropertyType;
  description?: string;
  city: string;
  area: string;
  address?: string;
  size: number;
  sizeUnit: PropertySizeUnit;
  bedrooms?: number | null;
  bathrooms?: number | null;
  price: number;
  currency: string;
  paymentPlanNotes?: string;
  developerName?: string;
  features: string[];
  status: PropertyStatus;
  coverImageUrl?: string;
  isArchived: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  lastAvailabilityUpdate?: string;
}

export type LeadSource =
  | 'Manual Entry'
  | 'Website'
  | 'Facebook'
  | 'Instagram'
  | 'Google'
  | 'WhatsApp'
  | 'Property Portal'
  | 'Referral'
  | 'Phone Call'
  | 'Other';

export type PipelineStage =
  | 'new_lead'
  | 'contact_in_progress'
  | 'contacted_qualified'
  | 'visit_scheduled'
  | 'site_visit_completed'
  | 'negotiation'
  | 'booking_deposit_pending'
  | 'contract_issued'
  | 'closed_won'
  | 'closed_lost';

export interface Lead {
  id: string;
  organizationId: string;
  contactId: string;
  contact?: Contact;
  title: string;
  source: LeadSource;
  sourceDetails?: string;
  campaignName?: string;
  propertyId?: string;
  property?: Property;
  propertyTypePreference?: PropertyType;
  budgetMin?: number | null;
  budgetMax?: number | null;
  preferredLocation?: string | null;
  intendedUse?: 'investment' | 'personal_use' | 'other' | null;
  purchaseTimeline?: 'immediate' | '1_to_3_months' | '3_to_6_months' | 'exploring' | null;
  financingPreference?: 'cash' | 'installments' | 'bank_loan' | 'flexible' | null;
  stage: PipelineStage;
  closedLostReason?: string | null;
  assignedAgentId?: string | null;
  assignedAgent?: UserProfile;
  notes?: string | null;
  isArchived: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadStageHistory {
  id: string;
  organizationId: string;
  leadId: string;
  fromStage?: PipelineStage;
  toStage: PipelineStage;
  reason?: string;
  changedBy?: string;
  changerName?: string;
  createdAt: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  organizationId: string;
  title: string;
  description?: string;
  contactId?: string;
  contact?: Contact;
  leadId?: string;
  lead?: Lead;
  assignedUserId?: string;
  assignedUser?: UserProfile;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentType = 'Site Visit' | 'Phone Call' | 'Office Meeting' | 'Online Meeting' | 'Other';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';

export interface Appointment {
  id: string;
  organizationId: string;
  title: string;
  contactId?: string;
  contact?: Contact;
  leadId?: string;
  lead?: Lead;
  propertyId?: string;
  property?: Property;
  assignedAgentId?: string;
  assignedAgent?: UserProfile;
  appointmentType: AppointmentType;
  startTime: string;
  durationMinutes: number;
  location?: string;
  status: AppointmentStatus;
  outcomeNotes?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  organizationId: string;
  actorId?: string;
  actorName?: string;
  entityType: 'lead' | 'contact' | 'property' | 'task' | 'appointment' | 'organization';
  entityId: string;
  activityType: 'created' | 'stage_changed' | 'status_changed' | 'assigned' | 'note_added' | 'appointment_scheduled' | 'task_completed';
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Notification {
  id: string;
  organizationId: string;
  recipientId: string;
  title: string;
  message: string;
  entityType?: string;
  entityId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  organizationId: string;
  actorId?: string;
  actorEmail?: string;
  action: string;
  targetEntity: string;
  targetId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  activeOpportunities: number;
  upcomingAppointments: number;
  closedWonDeals: number;
  totalProperties: number;
  availableProperties: number;
  leadsByStage: { stage: PipelineStage; label: string; count: number }[];
  leadsBySource: { source: LeadSource; count: number }[];
  recentLeads: Lead[];
  upcomingAppointmentsList: Appointment[];
}

export interface CSVImportRow {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  leadTitle: string;
  source?: string;
  budgetMin?: number;
  budgetMax?: number;
  propertyType?: string;
  preferredLocation?: string;
  notes?: string;
}

export interface CSVImportResult {
  totalRows: number;
  importedCount: number;
  duplicateCount: number;
  errorCount: number;
  errors: { row: number; field: string; message: string }[];
  duplicates: { row: number; phone: string; existingContactId: string; contactName: string }[];
}
