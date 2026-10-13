"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Users2,
  Layers,
  ArrowRight,
  Compass,
  Lock,
  Zap,
  Globe,
  Award,
  Terminal,
} from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: Building2,
      title: "Engineered for Pakistan First",
      desc: "Built from ground up to natively handle Marla, Kanal, Square Yards (Gaz), PKR Crores & Lacs, and local society hierarchies like DHA, Bahria Town, and CDA.",
    },
    {
      icon: ShieldCheck,
      title: "Sovereign Cryptographic Isolation",
      desc: "We enforce PostgreSQL Row-Level Security (RLS) directly at the database engine. Your agency contacts and commissions can never leak to a competitor.",
    },
    {
      icon: Zap,
      title: "High-Velocity Motion Experience",
      desc: "Designed with hardware-accelerated animations, glossy glassmorphic layers, and instant client-side responses that feel snappy on both mobile 4G and desktop setups.",
    },
    {
      icon: Lock,
      title: "100% Agency Data Ownership",
      desc: "Your database is never sold, shared, or used to train third-party AI models. You can export your full records to CSV at any moment without penalty.",
    },
  ];

  const milestones = [
    {
      year: "Phase 1: Architecture",
      title: "Foundation & Sovereign Multi-Tenancy",
      desc: "Architected multi-tenant data structures, Supabase RLS security policies, 10-stage sales Kanban, and Pakistani dimension converters.",
    },
    {
      year: "Phase 1: Regional Suite",
      title: "Inventory & Field Cockpit",
      desc: "Shipped society matrix engines (DHA, Bahria, Gulberg), site visit coordination desk, client agenda tracking, and high-throughput CSV bulk ingestion.",
    },
    {
      year: "Phase 2: Roadmap",
      title: "WhatsApp & Mobile Integrations",
      desc: "Prepared modular clean interfaces for automated WhatsApp lead updates, mobile agent apps, and real-time portal synchronization.",
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider mb-6 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          Our Mission & Technology
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight"
        >
          Transforming Pakistani Real Estate with{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Institutional-Grade Software
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Pakistan&apos;s real estate market represents over $1.5 Trillion in asset value, yet the majority of brokerages run on messy WhatsApp chats and unencrypted spreadsheets. We built PropTech CRM to give brokers the unfair advantage they deserve.
        </motion.p>
      </section>

      {/* Why We Built PropTech CRM Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
              The Fundamental Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Why Foreign CRMs Fail in Pakistan
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              When Pakistani agencies try using Salesforce, HubSpot, or Zoho, they hit immediate roadblocks:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">No Local Property Units</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Foreign software only understands Acres and Square Feet. Brokers are forced into manual math for 5 Marla, 10 Marla, and 1 Kanal plots.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Broken Currency Notations</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Displaying 5 Crore as &ldquo;50,000,000 PKR&rdquo; confuses sales agents and clients during fast-paced phone negotiations.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Wrong Sales Stages</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Pakistani deals follow specific protocols: Token money (Biyana), NDC clearance, Housing Authority file verification, and physical transfer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-950 via-[#064E3B] to-[#040714] text-white border border-emerald-400/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  <Award className="w-3.5 h-3.5" /> PropTech CRM Solution
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Crafted by Real Estate & Software Veterans
                </h3>

                <p className="text-emerald-100 text-sm leading-relaxed">
                  We engineered PropTech CRM from day one specifically for how real estate deals actually happen across Karachi, Lahore, Islamabad, Rawalpindi, and overseas diaspora hubs like Dubai and London.
                </p>

                <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="block text-2xl font-black text-white">100%</span>
                    <span className="text-emerald-200">Local Unit Compatibility</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white">PKR Cr/Lac</span>
                    <span className="text-emerald-200">Native Valuation Formatting</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white">10 Stages</span>
                    <span className="text-emerald-200">Biyana to Transfer Lifecycle</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white">0% Leaks</span>
                    <span className="text-emerald-200">PostgreSQL Row-Level Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Our Architectural Pillars
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            The core technical principles that guarantee speed, confidentiality, and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4 hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Roadmap & Evolution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Platform Roadmap & Evolution
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Strict engineering integrity today, with clean modularity for the future.
          </p>
        </div>

        <div className="space-y-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  {m.year}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
              <div className="shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#040714] text-white shadow-2xl border border-emerald-400/40">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
              Join the Leading Brokerages Across Pakistan
            </h2>
            <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Experience the platform live right now with instant test credentials.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-base font-black bg-white text-emerald-950 hover:bg-emerald-50 shadow-2xl rounded-2xl border border-white">
                  Launch Demo Workspace <ArrowRight className="w-5 h-5 ml-2 text-emerald-700" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-black text-white border-white/40 hover:bg-white/15 rounded-2xl bg-white/10 backdrop-blur-md">
                  Contact Our Leadership Desk
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
