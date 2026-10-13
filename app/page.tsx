"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { RoiCalculator } from "@/components/landing/roi-calculator";
import { InteractivePipelinePreview } from "@/components/landing/interactive-pipeline-preview";
import { MarlaCalculator } from "@/components/landing/marla-calculator";
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
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  Star,
  FileSpreadsheet,
  Globe,
  Calculator,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<"pipeline" | "marla" | "roi">("pipeline");

  const faqs = [
    {
      q: "Does PropTech CRM natively support Pakistan property sizes like Marla and Kanal?",
      a: "Yes. PropTech CRM natively handles Marla, Kanal, Square Yards, and Square Feet. You can enter and filter property dimensions seamlessly with automatic conversions, alongside Pakistani Rupee (PKR) valuations with Crores and Lacs formatting.",
    },
    {
      q: "How does the software isolate our agency data from competitors?",
      a: "We implement strict multi-tenant Row-Level Security (RLS) policies at the PostgreSQL database level. Your agency data is fully encrypted, cryptographically separated by organization ID, and inaccessible to any other subscriber.",
    },
    {
      q: "Can we import our existing leads and client lists from Excel / CSV?",
      a: "Yes. PropTech CRM features a built-in CSV bulk import engine with pre-validation. You can upload hundreds of contacts or leads in seconds, map columns, and verify duplicates before saving.",
    },
    {
      q: "Is PropTech CRM ready for future AI WhatsApp integrations?",
      a: "Yes. While Phase 1 delivers the core operational CRM, the system has been architected with modular boundaries so that WhatsApp AI auto-responses, automated lead scoring, and intelligent property matching can plug in without rewriting the platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060911] text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white transition-colors duration-200 relative bg-grid-pattern">
      {/* Glow ambient background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan/10 dark:bg-cyan/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      {/* Top Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#060911]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo variant="full" showTagline />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-primary dark:hover:text-cyan transition-colors">
              Features
            </a>
            <a href="#pipeline" className="hover:text-primary dark:hover:text-cyan transition-colors">
              Interactive Tools
            </a>
            <a href="#testimonials" className="hover:text-primary dark:hover:text-cyan transition-colors">
              Agencies
            </a>
            <Link href="/faq" className="hover:text-primary dark:hover:text-cyan transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-primary dark:hover:text-cyan transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm" className="shadow-md shadow-indigo-600/25">
                Launch CRM <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1322] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-3 text-base font-semibold text-slate-700 dark:text-slate-200">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-primary"
              >
                Features
              </a>
              <a
                href="#pipeline"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-primary"
              >
                Interactive Tools
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-primary"
              >
                Testimonials
              </a>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-primary"
              >
                Knowledge Base & FAQ
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-primary"
              >
                Contact & Book Demo
              </Link>
            </nav>
            <div className="pt-4 border-t border-slate-100 dark:border-white/8 flex flex-col gap-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full">
                <Button variant="primary" className="w-full">
                  Open CRM Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900/90 border border-indigo-200/80 dark:border-indigo-900/80 shadow-md shadow-indigo-500/5 text-xs font-bold text-slate-800 dark:text-slate-200 animate-in fade-in duration-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-primary dark:text-cyan font-bold">PropTech CRM v1.0</span>
            <span className="text-slate-400">·</span>
            <span>Pakistan & Emerging Markets Specialized</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Close High-Value Property Deals{" "}
            <span className="text-gradient-primary">3x Faster.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The ultra-premium CRM built for real estate brokerages, housing consultants, and property inventory managers. Unify Marla & Kanal inventory, visual Kanban stages, WhatsApp inquiries, and commission splits in one platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-600/30">
                Launch Live Demo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <PhoneCall className="w-4 h-4 mr-2 text-primary dark:text-cyan" />
                Book Agency Walkthrough
              </Button>
            </Link>
          </div>

          {/* Trust Ticker Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-white/8 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white block">
                PKR 48.5B+
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Inventory Managed
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-white/8 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-primary dark:text-cyan block">
                450+
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Active Brokerages
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-white/8 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 block">
                38%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Faster Conversion
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-white/8 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-amber-500 block">
                99.98%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Enterprise Uptime
              </span>
            </div>
          </div>
        </div>

        {/* Live Interactive CRM Suite & Tab Switcher */}
        <div id="pipeline" className="mt-16 sm:mt-24 scroll-mt-24 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-primary dark:text-cyan">
              Interactive System Preview
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Experience The Regional Real Estate Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Select an interactive demo tool below to see live calculations and workflows in action.
            </p>

            {/* Pill Tab Switcher */}
            <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-white/[0.06] border border-slate-300/80 dark:border-white/10 gap-1.5 shadow-inner">
              <button
                onClick={() => setActiveInteractiveTool("pipeline")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeInteractiveTool === "pipeline"
                    ? "bg-white dark:bg-indigo-600 text-navy-deep dark:text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-navy-deep dark:hover:text-white"
                }`}
              >
                <Kanban className="w-3.5 h-3.5 text-primary dark:text-cyan" />
                Sales Pipeline
              </button>

              <button
                onClick={() => setActiveInteractiveTool("marla")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeInteractiveTool === "marla"
                    ? "bg-white dark:bg-indigo-600 text-navy-deep dark:text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-navy-deep dark:hover:text-white"
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-500" />
                Marla & Kanal Engine
              </button>

              <button
                onClick={() => setActiveInteractiveTool("roi")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeInteractiveTool === "roi"
                    ? "bg-white dark:bg-indigo-600 text-navy-deep dark:text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-navy-deep dark:hover:text-white"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                Commission ROI Calculator
              </button>
            </div>
          </div>

          {/* Dynamic Active Tool Renderer */}
          <div className="transition-all duration-300">
            {activeInteractiveTool === "pipeline" && <InteractivePipelinePreview />}
            {activeInteractiveTool === "marla" && <MarlaCalculator />}
            {activeInteractiveTool === "roi" && <RoiCalculator />}
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-cyan">
            Engineered For Modern Brokerages
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Everything Real Estate Teams Need To Scale
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            No messy WhatsApp chat histories or lost Excel sheets. Consolidate your inventory, inquiries, agent tasks, and commissions into one high-performance dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-glass-dark transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-primary dark:text-cyan flex items-center justify-center border border-indigo-200/60 dark:border-indigo-800/60 mb-5 group-hover:scale-110 transition-transform">
              <Kanban className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Visual Kanban Sales Pipeline
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Drag-and-drop deals across 5 conversion stages: New Lead → Contacted → Site Visit → Negotiation → Closed. Instantly forecast agency commission totals per stage.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-glass-dark transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/60 mb-5 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Marla, Kanal & Unit Inventory
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Natively engineered for Pakistan societies (DHA, Bahria, Gulberg, Capital Smart City). Filter residential plots, commercial floors, and constructed villas with live availability indicators.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-glass-dark transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-200/60 dark:border-cyan-800/60 mb-5 group-hover:scale-110 transition-transform">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Multi-Channel Lead Capture
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Consolidate inquiries from WhatsApp, Zameen portal, Facebook Ads, and office walk-ins. Automatically assign leads to agents based on budget tier and location.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-glass-dark transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-gold flex items-center justify-center border border-amber-200/60 dark:border-amber-800/60 mb-5 group-hover:scale-110 transition-transform">
              <BarChart4 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Agent Leaderboards & Quotas
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Track closing ratios, site visits performed, and monthly sales quotas per agent. Calculate commission splits transparently without spreadsheet disputes.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-glass-dark transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-200/60 dark:border-violet-800/60 mb-5 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Site Visits & Follow-Up Reminders
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Automated notifications ensure no high-intent lead goes cold. Schedule on-site property walkthroughs with calendar sync and meeting outcome logs.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-glass-dark transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200/60 dark:border-rose-800/60 mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Cryptographic Multi-Tenant Isolation
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Supabase Row-Level Security (RLS) guarantees that your leads, client phone numbers, and property files are strictly isolated from all other agencies.
            </p>
          </div>
        </div>
      </section>

      {/* Regional Real Estate Coverage Matrix */}
      <section id="coverage" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-cyan">
            Regional Society Intelligence
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Pre-Configured For Prime Real Estate Sectors
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            PropTech CRM comes pre-loaded with society zoning standards, land dimensions, and currency units for all major metropolitan areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Karachi Hub */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/8 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-primary dark:text-cyan uppercase tracking-wider">Sindh Hub</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-primary dark:text-cyan text-[10px] font-extrabold">Sq Yds (Gaz)</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Karachi Coastal</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Clifton Blocks, DHA Phases 1–8, Emaar Crescent Bay, and Bahria Town Karachi.
            </p>
            <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-1.5">✓ High-Rise Seafront Apartments</p>
              <p className="flex items-center gap-1.5">✓ 500 & 1000 Sq Yd Luxury Plots</p>
              <p className="flex items-center gap-1.5">✓ Commercial Showrooms & Plazas</p>
            </div>
          </div>

          {/* Lahore Hub */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/8 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Punjab Hub</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-gold text-[10px] font-extrabold">225 Sq Ft / Marla</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Lahore Metropolis</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              DHA Lahore Phases 5 to 9 Prism, Gulberg III, Lake City, and Bahria Town Lahore.
            </p>
            <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-1.5">✓ 1 & 2 Kanal Designer Villas</p>
              <p className="flex items-center gap-1.5">✓ 10 Marla Constructed Houses</p>
              <p className="flex items-center gap-1.5">✓ Commercial Main Boulevard Plots</p>
            </div>
          </div>

          {/* Islamabad Hub */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/8 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Federal Capital</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold">CDA & Revenue</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Islamabad / Twin Cities</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Blue Area Corporate, Sectors F-6/F-7/F-8, DHA Islamabad, and Bahria Phase 8.
            </p>
            <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-1.5">✓ Diplomatic Enclave & F Sectors</p>
              <p className="flex items-center gap-1.5">✓ Corporate Tower Office Spaces</p>
              <p className="flex items-center gap-1.5">✓ Expressway Mega-Developments</p>
            </div>
          </div>

          {/* Dubai & Overseas Hub */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/8 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-cyan uppercase tracking-wider">GCC Corridor</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan/10 text-cyan text-[10px] font-extrabold">AED & USD Multi-Curr</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Overseas Investor Desk</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Cross-border investment tracking for Pakistani expatriates in UAE, UK, and North America.
            </p>
            <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-1.5">✓ Multi-Currency Valuation Matrix</p>
              <p className="flex items-center gap-1.5">✓ Overseas WhatsApp Inquiry Sync</p>
              <p className="flex items-center gap-1.5">✓ Remote Power of Attorney Tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Agency Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-cyan">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Trusted By Top Real Estate Brokerages
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Hear how leading property consultants in Karachi, Lahore, Islamabad, and Dubai accelerated their sales cycles with PropTech CRM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;Before PropTech CRM, our 18 agents were losing overseas client inquiries in unstructured WhatsApp chats. Within our first 60 days on the platform, our DHA Lahore closing velocity went up by 42%.&rdquo;
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-bold flex items-center justify-center text-xs">
                MZ
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Mian Zafar Iqbal</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Managing Director · Zafar Estate (DHA Lahore)</p>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;Managing commercial floors and high-rise apartments in Clifton and Emaar Karachi requires fast unit lookup. PropTech CRM’s inventory matrix is the best regional software we have used.&rdquo;
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-bold flex items-center justify-center text-xs">
                SK
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Shahid Khan</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Principal Broker · Blue Sapphire Realty (Clifton, Karachi)</p>
              </div>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                &ldquo;The multi-tenant data privacy gave us 100% peace of mind. We have 35 agents across Islamabad and Dubai, and our pipeline reporting has never been this accurate or transparent.&rdquo;
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 text-white font-bold flex items-center justify-center text-xs">
                AR
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Adeel Rasheed</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">CEO · Capital Skyline Properties (Blue Area, Islamabad)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* On-Page FAQs Accordion */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-cyan">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about setting up PropTech CRM for your agency.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((f, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pr-4">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary dark:text-cyan" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-150">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-xs font-bold text-primary dark:text-cyan hover:underline inline-flex items-center gap-1"
          >
            Browse Full Knowledge Base & FAQ Center <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 p-8 sm:p-14 text-white text-center border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready To Supercharge Your Real Estate Pipeline?
            </h2>
            <p className="text-sm sm:text-base text-indigo-200">
              Join 450+ forward-thinking real estate agencies across Pakistan and the Middle East managing their leads with zero friction.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full sm:w-auto">
                  Launch Free Interactive CRM <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full sm:w-auto">
                  Talk to Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Luxury Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#070B14]/90 backdrop-blur-md pt-16 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <Logo variant="full" showTagline />
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                PropTech CRM is the dedicated real estate customer relationship management SaaS engineered for high-growth brokerages, agencies, and property consultants.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational (99.98% SLA)</span>
              </div>
            </div>

            {/* Col 2: Product */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/pipeline" className="hover:text-primary dark:hover:text-cyan">
                    Sales Pipeline
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="hover:text-primary dark:hover:text-cyan">
                    Property Matrix
                  </Link>
                </li>
                <li>
                  <Link href="/leads" className="hover:text-primary dark:hover:text-cyan">
                    Lead Management
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="hover:text-primary dark:hover:text-cyan">
                    Analytics & Reports
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Resources & Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Resources
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/faq" className="hover:text-primary dark:hover:text-cyan">
                    FAQ Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary dark:hover:text-cyan">
                    Schedule Agency Demo
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-primary dark:hover:text-cyan">
                    Interactive Preview
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@proptechcrm.com" className="hover:text-primary dark:hover:text-cyan">
                    Technical Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal & Offices */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Legal & Centers
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/privacy" className="hover:text-primary dark:hover:text-cyan font-medium">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary dark:hover:text-cyan font-medium">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <span className="text-slate-500">Karachi · Lahore · Islamabad · Dubai</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} PropTech CRM SaaS. Built for premier real estate enterprises.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
