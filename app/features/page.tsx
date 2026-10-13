"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import {
  Users2,
  Kanban,
  Building2,
  CalendarCheck,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Layers,
  Compass,
  Calculator,
  Lock,
  Clock,
  PhoneCall,
  MapPin,
  ChevronRight,
  Database,
  Sliders,
  DollarSign,
  BarChart3,
  BadgeCheck,
} from "lucide-react";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<string>("pipeline");

  const coreModules = [
    {
      id: "leads",
      badge: "Inquiries & Intake",
      title: "Omnichannel Lead Ingestion & Intelligent Triage",
      description:
        "Consolidate incoming buyer and seller inquiries from portals, social ads, walk-ins, and direct calls into a unified, deduplicated agency registry.",
      icon: Users2,
      gradient: "from-emerald-500 to-teal-600",
      stats: "0.2s Ingestion Latency",
      capabilities: [
        "Automatic duplicate detection by phone number and CNIC",
        "Lead classification: Hot, Warm, Cold, Qualified, and Inactive",
        "Property preference tagging: DHA, Bahria, Capital Smart City, Gulberg",
        "Budget qualification with automatic PKR Crores & Lacs brackets",
        "Instant agent round-robin distribution with notification pings",
      ],
      sampleData: {
        title: "Recent Incoming Leads",
        items: [
          { name: "Brig. Tariq Mansoor", loc: "DHA Phase 6, Lahore", budget: "PKR 6.5 Crore", status: "Hot Lead" },
          { name: "Dr. Ayesha Siddiqa", loc: "Bahria Town Phase 8, RWP", budget: "PKR 3.2 Crore", status: "Site Visit Scheduled" },
          { name: "Malik Shahryar Khan", loc: "Gulberg Greens, Islamabad", budget: "PKR 14.8 Crore", status: "In Negotiation" },
        ],
      },
    },
    {
      id: "pipeline",
      badge: "Revenue Engine",
      title: "10-Stage Real Estate Sales Kanban",
      description:
        "Eliminate stalled property negotiations with an interactive visual Kanban pipeline specifically adapted to the Pakistani and Gulf real estate closing lifecycles.",
      icon: Kanban,
      gradient: "from-cyan-500 to-blue-600",
      stats: "10 Distinct Pipeline Stages",
      capabilities: [
        "Drag-and-drop deal movement with dynamic deal valuation updates",
        "Stage-by-stage probability weighting and commission forecasting",
        "Token money (Biyana) and transfer fee milestone tracking",
        "Comprehensive deal timeline logs and sales agent accountability",
        "One-click won/lost disposition with mandatory reason tagging",
      ],
      sampleData: {
        title: "Active Pipeline Stages",
        items: [
          { name: "1. New Discovery", loc: "12 Inquiries", budget: "PKR 48.5 Cr", status: "Unassigned" },
          { name: "4. Token / Biyana Paid", loc: "4 Active Deals", budget: "PKR 26.0 Cr", status: "Escrow Pending" },
          { name: "7. Transfer Scheduled", loc: "2 Closings Today", budget: "PKR 18.2 Cr", status: "NDC Cleared" },
        ],
      },
    },
    {
      id: "properties",
      badge: "Inventory & Area Engine",
      title: "Native Pakistani Unit Matrix (Marla & Kanal)",
      description:
        "No more messy Excel conversions or unit confusion. PropTech CRM natively recognizes local society standards (225 sq ft vs 272 sq ft Marla variants) and multi-block sectors.",
      icon: Building2,
      gradient: "from-purple-500 to-indigo-600",
      stats: "Marla, Kanal, Sq Yd, Sq Ft",
      capabilities: [
        "Automatic conversion between Marla, Kanal, Square Yards, and Square Feet",
        "Lahore/DHA Standard (225 sq ft) vs Traditional Revenue Standard (272.25 sq ft)",
        "Structured hierarchy: City → Housing Authority → Phase → Sector → Block → Plot",
        "Categorization: Residential Plots, Commercial Plazas, Luxury Villas, Farmhouses",
        "Live inventory status: Available, Token Received, Booked, or Sold Out",
      ],
      sampleData: {
        title: "Society Inventory Records",
        items: [
          { name: "1 Kanal Corner Plot", loc: "DHA Phase 7, Sector Y, Plot 142", budget: "PKR 4.25 Crore", status: "Available" },
          { name: "10 Marla Luxury Villa", loc: "Bahria Phase 4, Overseas Enclave", budget: "PKR 3.80 Crore", status: "Under Offer" },
          { name: "4 Kanal Commercial Plaza", loc: "Blue Area, Islamabad", budget: "PKR 45.0 Crore", status: "Exclusive Listing" },
        ],
      },
    },
    {
      id: "visits",
      badge: "Field Operations",
      title: "Site Visits & Showing Cockpit",
      description:
        "Turn casual inquiries into serious buyers through coordinated physical property viewings, GPS location pins, and verified client feedback records.",
      icon: CalendarCheck,
      gradient: "from-amber-500 to-orange-600",
      stats: "98% Visit Completion Rate",
      capabilities: [
        "Instant visit scheduling linked directly to client and property records",
        "Automated WhatsApp & SMS appointment reminders to buyers and sellers",
        "Mobile check-in notes for sales agents conducting on-site inspections",
        "Post-visit feedback recording (Price objection, location issue, interest level)",
        "Calendar synchronization with Google Calendar and Outlook",
      ],
      sampleData: {
        title: "Today's Showing Schedule",
        items: [
          { name: "DHA Phase 5 Villa Tour", loc: "Client: Col. Hamid", budget: "11:30 AM", status: "Confirmed" },
          { name: "Bahria Golf City Inspection", loc: "Client: Sarah Sheikh", budget: "03:00 PM", status: "Agent En Route" },
          { name: "Gulberg Heights Penthouse", loc: "Client: Kamran Enterprise", budget: "05:30 PM", status: "Pending Feedback" },
        ],
      },
    },
    {
      id: "rbac",
      badge: "Security & Governance",
      title: "Enterprise Multi-Tenant Row-Level Security",
      description:
        "Grant agents the exact data they need while locking down sensitive financial margins, client phone registries, and commission calculations.",
      icon: ShieldCheck,
      gradient: "from-emerald-600 to-teal-700",
      stats: "Strict PostgreSQL RLS",
      capabilities: [
        "4 Predefined Role Tiers: Agency Owner, Sales Director, Sales Agent, Inventory Mgr",
        "Zero cross-tenant leakage: Complete database isolation via cryptographic tenant IDs",
        "Restricted phone and CNIC masking for junior consultants and interns",
        "Granular audit trails: Every view, export, and status change is logged",
        "Automated session termination on suspicious location anomalies",
      ],
      sampleData: {
        title: "Role Permission Tiers",
        items: [
          { name: "Agency Owner", loc: "Full Workspace Access", budget: "Unlimited", status: "Super Admin" },
          { name: "Sales Director", loc: "Branch Team Lead", budget: "Assigned Branch", status: "Manager" },
          { name: "Sales Agent", loc: "Assigned Deals Only", budget: "Private Leads", status: "Field Agent" },
        ],
      },
    },
    {
      id: "import",
      badge: "Data Migration",
      title: "High-Speed CSV Bulk Leads Ingestion",
      description:
        "Migrate tens of thousands of client contacts from legacy spreadsheets, portal downloads (Zameen, Graana), or phone address books in seconds.",
      icon: FileSpreadsheet,
      gradient: "from-blue-600 to-indigo-700",
      stats: "5,000 Rows in 3 Seconds",
      capabilities: [
        "Interactive header mapping wizard with smart field recognition",
        "Client-side schema validation preventing corrupted phone numbers and emails",
        "Instant deduplication engine matching existing agency database records",
        "Downloadable error log with precise row and column problem descriptions",
        "Zero-loss undo capability for bulk uploads conducted in error",
      ],
      sampleData: {
        title: "CSV Parser Diagnostic",
        items: [
          { name: "Zameen_Leads_Sept.csv", loc: "1,420 Valid Records", budget: "100% Parsed", status: "Import Complete" },
          { name: "Facebook_Campaign_Leads.csv", loc: "650 Valid Records", budget: "12 Duplicates Skipped", status: "Import Complete" },
          { name: "Exhibition_Contacts.csv", loc: "340 Valid Records", budget: "99.4% Valid", status: "Import Complete" },
        ],
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#040714] text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-black transition-colors duration-300 relative bg-grid-pattern overflow-x-hidden">
      {/* Global Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-500/20 via-purple-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Unified Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider mb-6 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          Comprehensive Real Estate CRM Architecture
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12]"
        >
          Built for High-Velocity Deals in{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Pakistan & International Markets
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          From Marla-to-Kanal inventory matrices to a 10-stage sales kanban, site visit tracking, and PostgreSQL row-level security — explore the complete toolset designed for top brokerages.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="h-12 sm:h-14 px-8 text-sm sm:text-base font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-xl shadow-emerald-950/40 rounded-2xl border border-emerald-400/30">
              Launch Live Workspace <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="h-12 sm:h-14 px-8 text-sm sm:text-base font-black text-slate-800 dark:text-white border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl">
              Compare Agency Tiers
            </Button>
          </Link>
        </motion.div>

        {/* Feature Quick Stats Ribbon */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">10 Stages</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Full Deal Lifecycle Kanban</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
            <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">Marla & Kanal</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Native Society Units</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">100% RLS</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Multi-Tenant Cryptographic Isolation</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">5k Rows / 3s</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Instant CSV Bulk Ingestion</div>
          </div>
        </div>
      </section>

      {/* Deep Feature Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 relative z-10">
        {coreModules.map((module, idx) => {
          const Icon = module.icon;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={module.id}
              id={module.id}
              className={`scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Content Column */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider">
                  <Icon className="w-3.5 h-3.5 text-emerald-500" />
                  {module.badge}
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {module.title}
                </h2>

                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {module.description}
                </p>

                <ul className="space-y-3 pt-2">
                  {module.capabilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 flex items-center gap-4">
                  <Link href="/dashboard">
                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs px-5 h-10 shadow-md">
                      Test in Live CRM <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {module.stats}
                  </span>
                </div>
              </div>

              {/* Visual Card / Mock Console Column */}
              <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                <div className="rounded-3xl p-6 sm:p-8 bg-white/90 dark:bg-[#070E22]/90 border border-slate-200/80 dark:border-white/15 shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
                  {/* Decorative glowing gradient backdrop */}
                  <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${module.gradient} opacity-20 rounded-full blur-3xl`} />

                  <div className="relative z-10 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${module.gradient} text-white flex items-center justify-center shadow-md`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">
                            {module.sampleData.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            PropTech CRM Enterprise Console
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Live Database
                      </span>
                    </div>

                    {/* Mock records */}
                    <div className="space-y-3">
                      {module.sampleData.items.map((row, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-3 text-xs hover:border-emerald-500/40 transition-colors"
                        >
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-900 dark:text-white">{row.name}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-emerald-500 shrink-0" /> {row.loc}
                            </p>
                          </div>
                          <div className="text-right space-y-0.5 shrink-0">
                            <p className="font-black text-emerald-600 dark:text-emerald-400">{row.budget}</p>
                            <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                              {row.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-500" /> PostgreSQL RLS Protected
                      </span>
                      <span className="font-mono">Org_ID: PK-DHA-9081</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Interactive Tool Teaser Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl p-8 sm:p-12 bg-white/90 dark:bg-[#070D22]/90 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-black uppercase tracking-wider mb-3 inline-block">
              Interactive Test Bench
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Test Our Pakistani Dimension & ROI Engines
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Try the Marla-to-Kanal converter and agency commission ROI calculator directly on the homepage interactive suite.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/#interactive-suite">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-black rounded-2xl h-12 px-8 text-sm">
                Open Marla Calculator Suite <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="font-black rounded-2xl h-12 px-8 text-sm">
                View Subscription Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* High-Contrast CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#040714] text-white shadow-2xl border border-emerald-400/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-xs font-black mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Waiting Period</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-sm">
              Empower Your Agency with PropTech CRM
            </h2>

            <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Start closing higher-value deals today with instant access to the demo workspace.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-base font-black bg-white text-emerald-950 hover:bg-emerald-50 shadow-2xl shadow-black/40 rounded-2xl border border-white">
                  Launch Live CRM <ArrowRight className="w-5 h-5 ml-2 text-emerald-700" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-black text-white border-white/40 hover:bg-white/15 hover:text-white rounded-2xl bg-white/10 backdrop-blur-md">
                  Request Agency Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Unified Footer */}
      <SiteFooter />
    </div>
  );
}
