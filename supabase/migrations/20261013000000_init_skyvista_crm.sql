-- ============================================================================
-- SkyVista CRM - Phase 1 MVP Database Schema & Row-Level Security (RLS)
-- Multi-Tenant Architecture with Role-Based Access Control
-- Target Initial Market: Pakistan (Asia/Karachi, PKR)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations (Tenants)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    country VARCHAR(100) DEFAULT 'Pakistan',
    timezone VARCHAR(100) DEFAULT 'Asia/Karachi',
    currency VARCHAR(10) DEFAULT 'PKR',
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Organization Memberships (User-to-Tenant relationship with RBAC)
CREATE TABLE IF NOT EXISTS organization_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('agency_owner', 'sales_manager', 'sales_agent', 'property_manager')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'deactivated', 'invited')),
    invited_email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_org UNIQUE (organization_id, user_id)
);

-- 4. Contacts
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    phone_normalized VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    email_normalized VARCHAR(255),
    contact_type VARCHAR(50) DEFAULT 'buyer' CHECK (contact_type IN ('buyer', 'seller', 'investor', 'tenant', 'landlord', 'other')),
    company_name VARCHAR(255),
    preferred_language VARCHAR(50) DEFAULT 'Urdu',
    notes TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Properties (Inventory)
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    listing_reference VARCHAR(100) NOT NULL,
    project_name VARCHAR(255),
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('Apartment', 'House', 'Residential Plot', 'Commercial Property', 'Shop/Office', 'Villa', 'Other')),
    description TEXT,
    city VARCHAR(100) NOT NULL,
    area VARCHAR(150) NOT NULL,
    address TEXT,
    size NUMERIC(12, 2) NOT NULL,
    size_unit VARCHAR(50) NOT NULL DEFAULT 'Marla' CHECK (size_unit IN ('Marla', 'Kanal', 'Sq Ft', 'Sq Yds')),
    bedrooms INTEGER,
    bathrooms INTEGER,
    price NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'PKR',
    payment_plan_notes TEXT,
    developer_name VARCHAR(255),
    features TEXT[] DEFAULT '{}',
    status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
    cover_image_url TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Leads (Inquiries & Opportunities)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    source VARCHAR(50) NOT NULL DEFAULT 'Manual Entry' CHECK (source IN (
        'Manual Entry', 'Website', 'Facebook', 'Instagram', 'Google',
        'WhatsApp', 'Property Portal', 'Referral', 'Phone Call', 'Other'
    )),
    source_details TEXT,
    campaign_name VARCHAR(255),
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    property_type_preference VARCHAR(50),
    budget_min NUMERIC(15, 2),
    budget_max NUMERIC(15, 2),
    preferred_location VARCHAR(255),
    intended_use VARCHAR(50) CHECK (intended_use IN ('investment', 'personal_use', 'other')),
    purchase_timeline VARCHAR(50) CHECK (purchase_timeline IN ('immediate', '1_to_3_months', '3_to_6_months', 'exploring')),
    financing_preference VARCHAR(50) CHECK (financing_preference IN ('cash', 'installments', 'bank_loan', 'flexible')),
    stage VARCHAR(50) NOT NULL DEFAULT 'new_lead' CHECK (stage IN (
        'new_lead',
        'contact_in_progress',
        'contacted_qualified',
        'visit_scheduled',
        'site_visit_completed',
        'negotiation',
        'booking_deposit_pending',
        'contract_issued',
        'closed_won',
        'closed_lost'
    )),
    closed_lost_reason TEXT,
    assigned_agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Lead Stage History
CREATE TABLE IF NOT EXISTS lead_stage_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    from_stage VARCHAR(50),
    to_stage VARCHAR(50) NOT NULL,
    reason TEXT,
    changed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tasks
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    assigned_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ NOT NULL,
    priority VARCHAR(50) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    assigned_agent_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    appointment_type VARCHAR(50) NOT NULL DEFAULT 'Site Visit' CHECK (appointment_type IN (
        'Site Visit', 'Phone Call', 'Office Meeting', 'Online Meeting', 'Other'
    )),
    start_time TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 45,
    location TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'scheduled' CHECK (status IN (
        'scheduled', 'completed', 'cancelled', 'rescheduled', 'no_show'
    )),
    outcome_notes TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Activities Stream
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Audit Events
CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    target_entity VARCHAR(50) NOT NULL,
    target_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR HIGH-PERFORMANCE TENANT-SCOPED QUERIES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_memberships_user ON organization_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_org ON organization_memberships(organization_id);

CREATE INDEX IF NOT EXISTS idx_contacts_org ON contacts(organization_id);
CREATE INDEX IF NOT EXISTS idx_contacts_phone_norm ON contacts(organization_id, phone_normalized);
CREATE INDEX IF NOT EXISTS idx_contacts_email_norm ON contacts(organization_id, email_normalized);

CREATE INDEX IF NOT EXISTS idx_properties_org ON properties(organization_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(organization_id, property_type);

CREATE INDEX IF NOT EXISTS idx_leads_org ON leads(organization_id);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(organization_id, stage);
CREATE INDEX IF NOT EXISTS idx_leads_agent ON leads(organization_id, assigned_agent_id);
CREATE INDEX IF NOT EXISTS idx_leads_contact ON leads(contact_id);

CREATE INDEX IF NOT EXISTS idx_tasks_org ON tasks(organization_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(organization_id, assigned_user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due ON tasks(organization_id, due_date);

CREATE INDEX IF NOT EXISTS idx_appointments_org ON appointments(organization_id);
CREATE INDEX IF NOT EXISTS idx_appointments_time ON appointments(organization_id, start_time);
CREATE INDEX IF NOT EXISTS idx_appointments_agent ON appointments(organization_id, assigned_agent_id);

CREATE INDEX IF NOT EXISTS idx_activities_org ON activities(organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id, is_read);
CREATE INDEX IF NOT EXISTS idx_audit_events_org ON audit_events(organization_id, created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_stage_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an active member of organization
CREATE OR REPLACE FUNCTION is_member_of_org(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE organization_id = org_id
          AND user_id = auth.uid()
          AND status = 'active'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: users can read all profiles in their tenant organizations, edit only their own
CREATE POLICY "Users can view members of their organizations" ON profiles
    FOR SELECT USING (
        id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM organization_memberships m1
            JOIN organization_memberships m2 ON m1.organization_id = m2.organization_id
            WHERE m1.user_id = auth.uid() AND m2.user_id = profiles.id AND m1.status = 'active'
        )
    );

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (id = auth.uid());

-- Organization Memberships: accessible by members
CREATE POLICY "Members can view tenant memberships" ON organization_memberships
    FOR SELECT USING (is_member_of_org(organization_id));

-- Contacts: tenant scoped
CREATE POLICY "Contacts tenant select" ON contacts
    FOR SELECT USING (is_member_of_org(organization_id));
CREATE POLICY "Contacts tenant insert" ON contacts
    FOR INSERT WITH CHECK (is_member_of_org(organization_id));
CREATE POLICY "Contacts tenant update" ON contacts
    FOR UPDATE USING (is_member_of_org(organization_id));
CREATE POLICY "Contacts tenant delete" ON contacts
    FOR DELETE USING (is_member_of_org(organization_id));

-- Properties: tenant scoped
CREATE POLICY "Properties tenant select" ON properties
    FOR SELECT USING (is_member_of_org(organization_id));
CREATE POLICY "Properties tenant insert" ON properties
    FOR INSERT WITH CHECK (is_member_of_org(organization_id));
CREATE POLICY "Properties tenant update" ON properties
    FOR UPDATE USING (is_member_of_org(organization_id));
CREATE POLICY "Properties tenant delete" ON properties
    FOR DELETE USING (is_member_of_org(organization_id));

-- Leads: tenant scoped (Agents see their assigned leads or all permitted leads)
CREATE POLICY "Leads tenant select" ON leads
    FOR SELECT USING (is_member_of_org(organization_id));
CREATE POLICY "Leads tenant insert" ON leads
    FOR INSERT WITH CHECK (is_member_of_org(organization_id));
CREATE POLICY "Leads tenant update" ON leads
    FOR UPDATE USING (is_member_of_org(organization_id));
CREATE POLICY "Leads tenant delete" ON leads
    FOR DELETE USING (is_member_of_org(organization_id));

-- Tasks: tenant scoped
CREATE POLICY "Tasks tenant select" ON tasks
    FOR SELECT USING (is_member_of_org(organization_id));
CREATE POLICY "Tasks tenant insert" ON tasks
    FOR INSERT WITH CHECK (is_member_of_org(organization_id));
CREATE POLICY "Tasks tenant update" ON tasks
    FOR UPDATE USING (is_member_of_org(organization_id));
CREATE POLICY "Tasks tenant delete" ON tasks
    FOR DELETE USING (is_member_of_org(organization_id));

-- Appointments: tenant scoped
CREATE POLICY "Appointments tenant select" ON appointments
    FOR SELECT USING (is_member_of_org(organization_id));
CREATE POLICY "Appointments tenant insert" ON appointments
    FOR INSERT WITH CHECK (is_member_of_org(organization_id));
CREATE POLICY "Appointments tenant update" ON appointments
    FOR UPDATE USING (is_member_of_org(organization_id));
CREATE POLICY "Appointments tenant delete" ON appointments
    FOR DELETE USING (is_member_of_org(organization_id));

-- Notifications: recipient scoped
CREATE POLICY "Notifications recipient select" ON notifications
    FOR SELECT USING (recipient_id = auth.uid());
CREATE POLICY "Notifications recipient update" ON notifications
    FOR UPDATE USING (recipient_id = auth.uid());
