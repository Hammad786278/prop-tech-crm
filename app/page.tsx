import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Building2,
  Kanban,
  CalendarCheck,
  ShieldCheck,
  Users2,
  ArrowRight,
  CheckCircle2,
  BarChart4,
  Layers,
  Sparkles,
  HelpCircle,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-primary selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo variant="full" showTagline />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pipeline" className="hover:text-primary transition-colors">
              Pipeline
            </a>
            <a href="#benefits" className="hover:text-primary transition-colors">
              Why SkyVista
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                Open CRM <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-radial from-indigo-50/50 via-slate-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-primary text-xs font-bold uppercase tracking-wider mb-6 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>AI-Ready Real Estate CRM SaaS — Phase 1 MVP</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-navy-deep tracking-tight max-w-4xl mx-auto leading-[1.1]">
            More Leads. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-violet">
              Better Relationships.
            </span>{" "}
            More Deals.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Centralize your property inventory, buyer inquiries, sales pipeline, and site visits
            in one high-performance platform engineered specifically for modern real estate agencies.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-bold shadow-premium">
                Launch Live Demo <ArrowRight className="w-5 h-5 ml-1.5" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto font-semibold">
                Agency Login
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Preloaded with realistic Pakistan agency data (Karachi, Lahore & Islamabad). No setup required.
          </p>

          {/* Interactive Hero UI Preview Card */}
          <div className="mt-16 max-w-5xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-slate-200/60 to-slate-300/40 border border-slate-300/60 shadow-2xl">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-inner text-left">
              {/* Fake Chrome header */}
              <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-500 ml-2">
                    skyvista.app/dashboard
                  </span>
                </div>
                <span className="text-xs font-bold text-navy-deep px-2.5 py-0.5 rounded bg-white border border-slate-200">
                  Skyline Horizon Real Estate • PKR
                </span>
              </div>

              {/* Dashboard Snapshot */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Metric Cards Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500">Total Inquiries</p>
                    <p className="text-2xl font-black text-navy-deep mt-1">128</p>
                    <span className="text-[10px] text-emerald-600 font-bold">100% Real Queries</span>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                    <p className="text-xs font-semibold text-indigo-700">Active Deals</p>
                    <p className="text-2xl font-black text-primary mt-1">42</p>
                    <span className="text-[10px] text-primary font-bold">In Negotiation</span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                    <p className="text-xs font-semibold text-amber-700">Site Visits</p>
                    <p className="text-2xl font-black text-amber-900 mt-1">18</p>
                    <span className="text-[10px] text-amber-700 font-bold">This Week</span>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <p className="text-xs font-semibold text-emerald-700">Closed Volume</p>
                    <p className="text-2xl font-black text-emerald-900 mt-1">Rs 28.5 Cr</p>
                    <span className="text-[10px] text-emerald-700 font-bold">Verified Deals</span>
                  </div>
                </div>

                {/* Pipeline Snippet */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-700">New Leads</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white font-bold text-slate-600 border border-slate-200">
                        8
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1">
                      <p className="text-xs font-bold text-navy-deep">Penthouse in Clifton Block 4</p>
                      <p className="text-[11px] text-slate-500">Farhan Qureshi • Portal Inquiry</p>
                      <div className="flex justify-between items-center text-[10px] font-semibold text-primary pt-1">
                        <span>Budget: Rs 8.5 Crore</span>
                        <span>Assign: Ayesha K.</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/30 border border-indigo-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-primary">Site Visit Scheduled</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white font-bold text-primary border border-indigo-200">
                        5
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-indigo-200 shadow-2xs space-y-1">
                      <p className="text-xs font-bold text-navy-deep">1-Kanal Villa DHA Phase 6</p>
                      <p className="text-[11px] text-slate-500">Dr. Salman Raza • Site Visit Tomorrow</p>
                      <div className="flex justify-between items-center text-[10px] font-semibold text-indigo-700 pt-1">
                        <span>Rs 13.5 Crore</span>
                        <span className="text-amber-600 font-bold">3:00 PM (Karachi)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-emerald-800">Closed Won</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white font-bold text-emerald-800 border border-emerald-200">
                        12
                      </span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1">
                      <p className="text-xs font-bold text-navy-deep">Gulberg Luxury Residence</p>
                      <p className="text-[11px] text-slate-500">Zainab Malik • Token Cleared</p>
                      <div className="flex justify-between items-center text-[10px] font-bold text-emerald-700 pt-1">
                        <span>Rs 2.95 Crore</span>
                        <span className="text-emerald-600">✓ Contract Issued</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section id="features" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              Everything Your Agency Needs
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
              A Complete CRM Built For Real Estate Realities
            </p>
            <p className="mt-4 text-base text-text-secondary leading-relaxed">
              No generic spreadsheets or clunky administrative forms. SkyVista CRM gives your sales
              agents and managers an intuitive operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all hover:shadow-card group">
              <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-deep">Lead & Inquiry Management</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Log inquiries by source (Portals, WhatsApp, Referrals, Website). Smart duplicate
                detection automatically checks normalized phone and email addresses before inserting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all hover:shadow-card group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-deep">Property & Inventory Management</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Manage residential plots, commercial spaces, apartments, and villas. Native support
                for Marla, Kanal, Sq Ft units with live availability status (Available, Reserved, Sold).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all hover:shadow-card group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Kanban className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-deep">Interactive Sales Pipeline</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Kanban view across 10 defined stages from New Lead to Site Visit, Negotiation, and
                Closed Won. Complete audit trail of stage changes and closed-lost reason capture.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all hover:shadow-card group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-deep">Tasks & Appointments Agenda</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Schedule site visits, buyer meetings, and follow-ups in the Asia/Karachi timezone.
                Assign to specific agents and track completion with zero friction.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all hover:shadow-card group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-deep">Role-Based Team Workspaces</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Strict server-enforced roles: Agency Owner, Sales Manager, Sales Agent, and Property
                Manager. Agents only access assigned leads, while owners maintain full audit control.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all hover:shadow-card group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-deep">Multi-Tenant Isolation</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Shared cloud efficiency with complete cryptographic tenant data isolation. Each
                agency's leads, properties, and contacts remain strictly confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section id="benefits" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Designed for Agency Owners & Sales Teams
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep mt-2 leading-tight">
                Stop Losing High-Value Property Buyers to Forgotten Follow-ups
              </h2>
              <p className="mt-4 text-base text-text-secondary leading-relaxed">
                In real estate, timing is everything. When an investor asks about a commercial plot
                or luxury apartment, their inquiry must be assigned, qualified, and followed up
                immediately.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-navy-deep">Organized Contact History</p>
                    <p className="text-xs text-text-secondary">
                      Keep multiple property inquiries under the same investor contact record without
                      duplication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-navy-deep">Full Inventory Visibility</p>
                    <p className="text-xs text-text-secondary">
                      Agents can immediately match buyer budgets with available inventory in Karachi,
                      Lahore, or Islamabad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-navy-deep">Clear Manager Oversight</p>
                    <p className="text-xs text-text-secondary">
                      Monitor agent workloads, pending site visits, and won deals in real time from
                      the dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/dashboard">
                  <Button size="lg" className="font-semibold">
                    Explore All Features
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-premium space-y-4">
              <h4 className="text-sm font-bold text-navy-deep uppercase tracking-wider text-slate-400">
                Phase 1 MVP Highlights
              </h4>
              <div className="divide-y divide-slate-100">
                <div className="py-3 flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Database Engine</span>
                  <span className="font-bold text-navy-deep">PostgreSQL / Supabase + RLS</span>
                </div>
                <div className="py-3 flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Localization</span>
                  <span className="font-bold text-navy-deep">Pakistan (PKR, Asia/Karachi)</span>
                </div>
                <div className="py-3 flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">AI Integration</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Phase 2 Roadmap Ready
                  </span>
                </div>
                <div className="py-3 flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Data Import / Export</span>
                  <span className="font-bold text-emerald-700">CSV Bulk Import with Preview</span>
                </div>
                <div className="py-3 flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Deployment</span>
                  <span className="font-bold text-primary">Vercel 1-Click Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-3xl font-extrabold text-navy-deep tracking-tight">
              Everything You Need to Know
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-navy-deep">
                Is AI included in this Phase 1 release?
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                No. As planned in our engineering roadmap, Phase 1 delivers a robust, real, human-driven
                CRM foundation without LLM dependencies. Application interfaces and database models
                are structured cleanly so that Phase 2 AI qualification and WhatsApp automation can be
                plugged in without refactoring the CRM.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-navy-deep">
                How does multi-tenant data isolation work?
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Every record is scoped with an organization ID verified on the server. Row-Level
                Security (RLS) policies and server-side membership checks ensure that users from Agency
                A can never query or mutate data belonging to Agency B.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-navy-deep">
                Does SkyVista support Pakistan real estate conventions?
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Yes. SkyVista CRM natively supports Marla, Kanal, Sq Ft, and Sq Yds for property sizes,
                formats currency in Crores, Lakhs, and PKR, and defaults to the Asia/Karachi timezone
                for tasks and appointments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-navy-deep">
                Can I bulk import existing leads from Excel or portal CSVs?
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Yes. SkyVista features a built-in CSV import engine that parses files, validates required
                fields, checks for duplicate phone numbers and emails, and gives you a row-by-row
                preview before committing to the database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-white border-t border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo variant="monochrome-dark" showTagline />
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} SkyVista CRM. Built for high-growth real estate agencies.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link href="/login" className="hover:text-white transition-colors">
              Agency Sign In
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Live Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
