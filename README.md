# SkyVista CRM — AI-Ready Real Estate CRM SaaS
> **"More Leads. Better Relationships. More Deals."**

PropTech SaaS engineered specifically for modern real estate agencies, property consultants, sales managers, and inventory executives. Built with multi-tenant data isolation, strict role-based access control (RBAC), and localized defaults for the Pakistan market (PKR currency, Asia/Karachi timezone, Marla/Kanal units).

---

## 🌟 Executive Overview

- **Brand Name**: SkyVista CRM
- **Product Category**: Real Estate Customer Relationship Management SaaS
- **Target Market**: Initial launch in Pakistan (Karachi, Lahore, Islamabad) with full internationalization readiness
- **Architecture**: Modular Next.js Monolith with PostgreSQL & Supabase Row-Level Security (RLS)
- **Phase 1 Focus**: Complete human-driven real estate CRM MVP with **NO AI integration** (clean architectural interfaces reserved for Phase 2 WhatsApp Cloud API and qualification models)

---

## 🚀 Key Modules & Capabilities

1. **Multi-Tenant SaaS Foundation**:
   - Complete tenant isolation: every contact, inquiry, property, task, and appointment is strictly scoped to the active agency workspace.
   - Row-Level Security (RLS) policies and server-side membership validation prevent cross-tenant data leaks.
2. **Contact Management**:
   - Centralized buyer, seller, and investor profiles.
   - Associated inquiry history, client preferences, and interaction timeline.
   - Duplicate prevention with normalized phone (`+92`, `03xx`) and email matching.
3. **Leads & Inquiry Management**:
   - Track inquiries by source: Website, Facebook, Instagram, Google, WhatsApp, Portals, Referrals, Phone Calls.
   - Budget minimum/maximum, property type preference, and agent assignment.
   - Bulk CSV Import with preview, validation, and row-level duplicate reporting.
   - One-click CSV Export for permitted records.
4. **Properties & Inventory Management**:
   - Residential and commercial inventory: Apartments, Houses, Plots, Shops/Offices, Villas.
   - Native unit support: Marla, Kanal, Sq Ft, Sq Yds.
   - Live availability tracking: `Available`, `Reserved / On Hold`, `Sold / Unavailable`.
   - Grid and table views with detailed listing pages.
5. **Sales Pipeline (10-Stage Kanban)**:
   - Visual Kanban board with stage counts and real-time deal volume calculations.
   - Stages:
     1. New Lead
     2. Contact in Progress *(Phase 1 default, non-AI)*
     3. Contacted / Qualified
     4. Visit Scheduled
     5. Site Visit Completed
     6. Negotiation
     7. Booking / Deposit Pending
     8. Contract Issued
     9. Closed Won
     10. Closed Lost *(Captures mandatory closed-lost business reason)*
6. **Tasks & Appointments**:
   - Calendar agenda for site visits, phone calls, and office reviews.
   - Task follow-up lists with priority badges (High, Medium, Low) and due dates.
   - Formatted in the `Asia/Karachi` timezone.
7. **Dashboard & Analytics**:
   - Real database-computed summary cards: Total Leads, New Leads, Active Opportunities, Appointments, Closed Won.
   - Interactive Recharts for pipeline funnel distribution and acquisition channels.
   - Quick Action modals for rapid data entry.
8. **Users & Team Management**:
   - Role-Based Access Control (RBAC):
     - **Agency Owner**: Full workspace ownership, user invitation, settings, and audit logs.
     - **Sales Manager**: Lead assignment, agent workload monitoring, stage updates, reports.
     - **Sales Agent**: Strictly restricted to assigned inquiries, tasks, and property catalogue.
     - **Property Manager**: Inventory creation, specifications, and availability status updates.
9. **Security & Audit Logs**:
   - Immutable audit logging for critical status changes, role updates, and stage progressions.
   - Safe `/api/health` endpoint.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict mode, ES2022) |
| **Styling** | Tailwind CSS with custom design tokens |
| **Components** | Radix UI / custom shadcn-style component suite |
| **Icons** | Lucide React |
| **Animation** | Framer Motion (respects `prefers-reduced-motion`) |
| **Charts** | Recharts |
| **Forms & Validation** | React Hook Form + Zod |
| **Notifications** | Sonner |
| **Database** | PostgreSQL / Supabase + Row-Level Security (RLS) |
| **Testing** | Vitest (18 automated tests passing) |
| **Deployment** | Vercel |

---

## 📁 Repository Structure

```
prop-tech-crm/
├── app/                        # Next.js App Router
│   ├── (dashboard)/            # Authenticated application shell
│   │   ├── dashboard/          # Real-time metrics & Recharts analytics
│   │   ├── contacts/           # Contact list & detail pages
│   │   ├── leads/              # Lead management, CSV import/export, detail view
│   │   ├── properties/         # Property catalogue, grid/list view, inventory
│   │   ├── pipeline/           # 10-stage Kanban board
│   │   ├── tasks/              # Site visits & task schedule
│   │   ├── reports/            # Analytics & agent performance
│   │   ├── team/               # Team members & invitations
│   │   └── settings/           # Agency profile & audit events
│   ├── api/                    # Secure Route Handlers
│   │   ├── auth/               # Login, logout, role switching
│   │   ├── contacts/           # Contact CRUD
│   │   ├── leads/              # Lead CRUD & stage transitions
│   │   ├── properties/         # Property inventory & status updates
│   │   ├── tasks/              # Task CRUD
│   │   ├── appointments/       # Appointment booking
│   │   ├── import/csv/         # Bulk CSV validation & import
│   │   ├── export/csv/         # CSV export
│   │   ├── notifications/      # Real-time in-app notification center
│   │   ├── team/               # Membership management
│   │   └── health/             # Safe healthcheck
│   ├── login/                  # Authentication page with demo switcher
│   ├── onboarding/             # Agency workspace registration
│   ├── recover-password/       # Password recovery flow
│   ├── unauthorized/           # 403 Access Denied
│   ├── not-found.tsx           # 404 Not Found
│   ├── layout.tsx              # Root layout with Inter font & Sonner
│   ├── page.tsx                # High-converting Public Landing Page
│   └── globals.css             # Tailwind design tokens
├── components/
│   ├── brand/logo.tsx          # Scalable architectural SVG logo
│   ├── layout/                 # Sidebar, TopNav, AppShell, GlobalSearch
│   └── ui/                     # Button, Card, Modal, Input, Badge, EmptyState
├── lib/
│   ├── auth/session.ts         # Server-side auth & role verification
│   ├── database/               # Supabase client & CrmStore engine
│   ├── validation/schemas.ts   # Zod validation schemas
│   └── utils.ts                # PKR currency & Pakistan normalizers
├── public/brand/               # SVG logo assets (Primary, Icon, Monochrome)
├── supabase/migrations/        # Complete SQL migration with RLS policies
├── tests/                      # Automated Vitest test suite
├── .env.example                # Environment variable template
└── vitest.config.ts            # Vitest configuration
```

---

## 🧪 Automated Testing Suite

The codebase includes an automated test suite verifying tenant isolation, security boundaries, and CRM logic:

```bash
npm run test
```

### Verified Test Results (18/18 Passing):
- `tests/tenant-isolation.test.ts` (5 tests)
  - Organization A cannot read or list Organization B contacts
  - Cross-tenant contact mutations are rejected
  - Organization A cannot access or alter Organization B property inventory
  - Cross-tenant lead operations are rejected
  - Duplicate contact checks are strictly tenant-scoped
- `tests/duplicate-detection.test.ts` (5 tests)
  - Normalizes Pakistan phone numbers (`+92 300...`, `0300-...`, `0092...`)
  - Normalizes email addresses
  - Detects duplicate contacts by phone
  - Detects duplicate contacts by email
  - Returns clean null for new inquiries
- `tests/roles-and-permissions.test.ts` (4 tests)
  - Agency Owner administrative privileges
  - Sales Agent restrictions on security & team settings
  - Sales Manager pipeline and assignment authority
  - Property Manager inventory management authority
- `tests/pipeline-stages.test.ts` (2 tests)
  - Lead stage transition persistence & stage history audit trail
  - Closed-Lost business reason capture
- `tests/property-status.test.ts` (1 test)
  - Property lifecycle transitions (`available` → `reserved` → `sold`) and audit logging
- `tests/csv-import.test.ts` (1 test)
  - Valid row parsing, duplicate phone resolution, and row-level error reporting

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/prop-tech-crm.git
   cd prop-tech-crm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   *(The application functions seamlessly out of the box with zero external dependencies for local testing, and automatically connects to live Supabase Postgres when credentials are provided!)*

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Test credentials & instant demo switching**:
   - The `/login` page includes **One-Click Demo Switchers** allowing instant switching between:
     - **Agency Owner** (`owner@skylinehorizon.pk`)
     - **Sales Manager** (`manager@skylinehorizon.pk`)
     - **Sales Agent** (`agent@skylinehorizon.pk`)
     - **Property Manager** (`properties@skylinehorizon.pk`)

---

## 🗄️ Supabase Database & Migration Guide

1. Create a new project in the [Supabase Dashboard](https://supabase.com).
2. Navigate to **SQL Editor**.
3. Open and run the migration file provided at:
   ```
   supabase/migrations/20261013000000_init_skyvista_crm.sql
   ```
   This script creates all tables, indexes, triggers, Row-Level Security (RLS) policies, and default security helper functions (`is_member_of_org`).
4. In your Supabase Project Settings, copy:
   - `Project URL`
   - `anon public key`
   - `service_role secret key` (keep private!)

---

## ☁️ Vercel Deployment Instructions

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete SkyVista CRM Phase 1 MVP"
   git push origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your `prop-tech-crm` repository.
   - Framework Preset: **Next.js** (App Router).

3. **Set Environment Variables in Vercel**:
   Under **Project Settings > Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL (e.g. `https://your-project.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon public key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (Server-only)
   - `NEXT_PUBLIC_APP_URL`: Your production URL (e.g. `https://prop-tech-crm.vercel.app`)
   - `NEXT_PUBLIC_DEFAULT_CURRENCY`: `PKR`
   - `NEXT_PUBLIC_DEFAULT_TIMEZONE`: `Asia/Karachi`
   - `NEXT_PUBLIC_DEFAULT_COUNTRY`: `Pakistan`

4. **Deploy**:
   - Click **Deploy**. Vercel will run `npm run build`, generating the optimized production application.

---

## 🗺️ Roadmap & Phase Boundaries

- **Phase 1 MVP (Delivered)**:
  - Multi-tenant isolated workspace
  - Role-based access control (Owner, Manager, Agent, Property Manager)
  - Contacts & Leads management with duplicate checking
  - Property Inventory with Marla/Kanal & PKR formatting
  - 10-Stage Pipeline Kanban with deal volume tracking
  - Site visits agenda & task deadlines
  - CSV bulk import with error reporting & CSV export
  - In-app notification center & security audit logs
- **Phase 2 (Future Roadmap)**:
  - Official Meta WhatsApp Cloud API integration
  - Meta Lead Ads webhook synchronization
  - Property portal two-way feed sync (Zameen, Graana)
  - AI-assisted lead scoring and smart matching
