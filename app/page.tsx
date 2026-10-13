"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Compass,
  ArrowUpRight,
  Home,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<"pipeline" | "marla" | "roi">("pipeline");

  const faqs = [
    {
      q: "Does PropTech CRM natively support Pakistan property sizes like Marla and Kanal?",
      a: "Yes. PropTech CRM natively handles Marla, Kanal, Square Yards (Gaz), and Square Feet. You can enter, filter, and convert property dimensions seamlessly, with automatic Pakistani Rupee (PKR) valuations formatted in Crores and Lacs.",
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
      a: "Yes. While Phase 1 delivers the core operational CRM, the system has been architected with clean modular boundaries so that WhatsApp AI auto-responses, automated lead scoring, and intelligent property matching can plug in seamlessly in Phase 2.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#040714] text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-black transition-colors duration-300 relative bg-grid-pattern overflow-x-hidden">
      {/* Multi-Layered Glowing Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-500/20 via-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#040714]/80 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo variant="full" showTagline />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              Features
            </a>
            <a href="#interactive-suite" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              Marla & Pipeline Engine
            </a>
            <a href="#societies" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              Societies Matrix
            </a>
            <Link href="/faq" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-bold">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black shadow-lg shadow-emerald-950/40 border border-emerald-400/30 rounded-2xl px-5">
                  Launch CRM Console <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </motion.div>
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#070D22] px-6 py-6 space-y-4 shadow-2xl backdrop-blur-3xl"
            >
              <nav className="flex flex-col space-y-3 text-base font-bold text-slate-700 dark:text-slate-200">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500">Features</a>
                <a href="#interactive-suite" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500">Marla & Pipeline Engine</a>
                <a href="#societies" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500">Societies Matrix</a>
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500">FAQs</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-500">Contact</Link>
              </nav>
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col gap-2">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl">
                    Launch CRM Console
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full font-bold rounded-xl">
                    Agency Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION WITH MOTION UI & GLOSSY LEVITATING BADGES */}
      <section className="relative z-10 pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Floating Top Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glossy-pill text-xs font-black text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-8 shadow-lg shadow-emerald-950/20"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981] animate-pulse" />
          <span>Real Estate CRM Built for Pakistan & Global Brokerages</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
            Phase 1 Live
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.1]"
        >
          Close High-Value Deals Faster with{" "}
          <span className="text-gradient-emerald">
            Sovereign Intelligence
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Built natively for Pakistani agencies managing <span className="font-bold text-slate-900 dark:text-white">Marla & Kanal</span> inventory across DHA, Bahria Town, and Gulberg. Isolated tenant security, 10-stage funnel velocity, and direct WhatsApp actions.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Button size="lg" className="h-14 px-8 text-base font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-2xl shadow-emerald-900/50 rounded-2xl border border-emerald-400/40">
                Launch Live CRM Console <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </Link>

          <Link href="#interactive-suite">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-black rounded-2xl border-slate-300 dark:border-white/15 dark:bg-white/[0.04] backdrop-blur-xl hover:border-emerald-500">
                Explore Marla Engine <Calculator className="w-5 h-5 ml-2 text-emerald-500" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Live Social Proof Floating Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Tenant RLS Isolated
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Marla & Kanal Native Standard
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1-Click WhatsApp Client Action
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 10-Stage Pipeline Enforcement
          </span>
        </motion.div>
      </section>

      {/* INTERACTIVE SUITE: PIPELINE VS MARLA ENGINE VS ROI CALCULATOR */}
      <section id="interactive-suite" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glossy-pill text-xs font-black text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mb-3">
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            <span>Interactive Operational Demonstrations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered for Ground-Level Real Estate
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Switch between our real-time Deal Funnel, Pakistani Land Unit Engine, and Agency Growth Model.
          </p>

          {/* Interactive Tool Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/10 mt-8 w-fit mx-auto backdrop-blur-xl">
            <button
              onClick={() => setActiveInteractiveTool("pipeline")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeInteractiveTool === "pipeline"
                  ? "bg-white dark:bg-[#070D22] text-emerald-600 dark:text-emerald-400 shadow-md border border-emerald-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Kanban className="w-4 h-4" /> Live Deal Pipeline
            </button>
            <button
              onClick={() => setActiveInteractiveTool("marla")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeInteractiveTool === "marla"
                  ? "bg-white dark:bg-[#070D22] text-emerald-600 dark:text-emerald-400 shadow-md border border-emerald-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Calculator className="w-4 h-4" /> Marla & Kanal Calculator
            </button>
            <button
              onClick={() => setActiveInteractiveTool("roi")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeInteractiveTool === "roi"
                  ? "bg-white dark:bg-[#070D22] text-emerald-600 dark:text-emerald-400 shadow-md border border-emerald-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Revenue Growth Simulator
            </button>
          </div>
        </div>

        {/* Tab Content Display with Animation */}
        <AnimatePresence mode="wait">
          {activeInteractiveTool === "pipeline" && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <InteractivePipelinePreview />
            </motion.div>
          )}

          {activeInteractiveTool === "marla" && (
            <motion.div
              key="marla"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MarlaCalculator />
            </motion.div>
          )}

          {activeInteractiveTool === "roi" && (
            <motion.div
              key="roi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RoiCalculator />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SOCIETIES & REGIONAL COVERAGE MATRIX */}
      <section id="societies" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glossy-pill text-xs font-black text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-500" />
            <span>Regional Territory Mapping</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Societies & High-Yield Corridor Coverage
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Pre-configured metadata for property dimensions, CDA/DHA standards, and luxury sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Karachi Coastal */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="glossy-card p-6 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 space-y-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-cyan-500 tracking-wider">Sindh Metropolis</span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Karachi Coastal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">DHA Phases 1-8, Clifton, Emaar Oceanfront, Bahria Town Karachi</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-white/8 text-[11px] font-bold text-slate-600 dark:text-slate-300 space-y-1">
              <p>• Sq Yards (120, 240, 500, 1000)</p>
              <p>• Commercial plot files & Seafront Penthouses</p>
            </div>
          </motion.div>

          {/* Card 2: Lahore Metropolis */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="glossy-card p-6 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 space-y-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-500 tracking-wider">Punjab Capital</span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Lahore Urban Hub</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">DHA Phases 1-9 Prism, Gulberg III, Lake City, Bahria Town, Bedian Farmhouses</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-white/8 text-[11px] font-bold text-slate-600 dark:text-slate-300 space-y-1">
              <p>• 5, 10 Marla & 1, 2 Kanal designer villas</p>
              <p>• 225 Sq Ft urban Marla standard native</p>
            </div>
          </motion.div>

          {/* Card 3: Islamabad & Rawalpindi */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="glossy-card p-6 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 space-y-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">Federal Capital</span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Twin Cities Corridor</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sectors F-6 to F-8, Blue Area, Bahria Town, DHA Islamabad, Gulberg Greens</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-white/8 text-[11px] font-bold text-slate-600 dark:text-slate-300 space-y-1">
              <p>• CDA Sector plot dimensions</p>
              <p>• Corporate office towers & Agro Farmhouses</p>
            </div>
          </motion.div>

          {/* Card 4: Dubai Overseas PK */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="glossy-card p-6 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 space-y-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Global Expat Corridor</span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Dubai & Overseas</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Downtown Dubai, Business Bay, Dubai Marina, Gwadar Port Marine Drive</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-white/8 text-[11px] font-bold text-slate-600 dark:text-slate-300 space-y-1">
              <p>• Multi-currency: AED, USD, PKR</p>
              <p>• Non-Resident Pakistani (NRP) buyer profiles</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glossy-pill text-xs font-black text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Complete SaaS Feature Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Built for Modern Brokerages & Agencies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Everything your sales managers and consultants need to manage inventory and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -6 }} className="glossy-card p-7 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
              <Kanban className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">10-Stage Pipeline Engine</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enforce strict qualification stages from initial WhatsApp inquiry through site visits, negotiation, and contract closing.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="glossy-card p-7 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Architectural Inventory Matrix</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Track available, reserved, and sold properties with full Marla, Kanal, and Sq Yard specifications, price rates, and amenities.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="glossy-card p-7 rounded-3xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Row-Level Security (RLS)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Full PostgreSQL tenant isolation. Agency Owners, Sales Managers, and Field Agents access only their authorized workspace records.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clear answers on multi-tenancy, regional unit support, and data privacy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glossy-card rounded-2xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#070D22]/80 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-black text-slate-900 dark:text-white transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-emerald-500 transition-transform duration-200 shrink-0 ${
                    activeFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/6 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-br from-emerald-600/90 via-teal-700/90 to-slate-900 text-white shadow-2xl border border-emerald-400/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Ready to Supercharge Your Real Estate Sales Team?
          </h2>
          <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
            Experience the full multi-tenant CRM right now with instant one-click demo credentials.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="h-14 px-8 text-base font-black bg-white text-slate-900 hover:bg-slate-100 shadow-xl rounded-2xl">
                  Open Live CRM Workspace <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-black text-white border-white/30 hover:bg-white/10 rounded-2xl">
                Agency Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#030611] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo variant="full" />
          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-emerald-500 transition-colors">Terms of Service</Link>
            <Link href="/faq" className="hover:text-emerald-500 transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-emerald-500 transition-colors">Support & Contact</Link>
          </div>
          <p className="text-[11px]">© 2026 PropTech CRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
