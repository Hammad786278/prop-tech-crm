"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Lock,
  Database,
  Key,
  Server,
  FileCheck,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Terminal,
  AlertTriangle,
  Layers,
  Cpu,
  RefreshCw,
} from "lucide-react";

export default function SecurityPage() {
  const securityPillars = [
    {
      icon: Database,
      title: "PostgreSQL Row-Level Security (RLS)",
      desc: "Every database query is cryptographically constrained by tenant organization ID at the database engine level. It is physically impossible for Agency A to query Agency B's leads.",
      code: "CREATE POLICY tenant_isolation_policy ON leads\n  FOR ALL TO authenticated\n  USING (organization_id = (SELECT org_id FROM user_profiles WHERE id = auth.uid()));",
    },
    {
      icon: Lock,
      title: "TLS 1.3 & AES-256 Encryption",
      desc: "All client phone numbers, deal amounts, and internal consultation notes are encrypted using industry-standard AES-256 at rest and transmitted over strict TLS 1.3 channels.",
      code: "Transport: TLS 1.3 / HSTS 31536000\nStorage: AES-256 Block Cipher Encryption\nCertificates: Automated ECDSA P-256",
    },
    {
      icon: EyeOff,
      title: "Field-Level Masking & RBAC Tiers",
      desc: "Junior agents and interns can only view leads explicitly assigned to them. Direct investor contact numbers can be masked behind proxy routing to prevent client poaching.",
      code: "Roles: [Agency Owner, Sales Director, Sales Agent, Property Manager]\nData Masking: Investor CNIC & Direct Mobile Numbers\nAudit: Immutable access change trail",
    },
    {
      icon: RefreshCw,
      title: "Point-in-Time Recovery & Redundant Backups",
      desc: "Continuous Write-Ahead Logging (WAL) and automated geo-redundant snapshots allow instantaneous point-in-time recovery to any second in the preceding 30 days.",
      code: "RPO (Recovery Point Objective): < 1 Second\nRTO (Recovery Time Objective): < 15 Minutes\nStorage: Geo-replicated disaster recovery nodes",
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
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Security Architecture & Trust Whitepaper
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight"
        >
          Cryptographic Multi-Tenancy &{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Zero-Trust Isolation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          In high-stakes real estate, client confidentiality is paramount. PropTech CRM was engineered to guarantee complete cryptographic separation between competing brokerages.
        </motion.p>
      </section>

      {/* Architecture Breakdown Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/90 dark:bg-[#070E22]/90 border border-slate-200/80 dark:border-white/10 shadow-xl backdrop-blur-2xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 text-emerald-400 p-4 font-mono text-[11px] leading-relaxed overflow-x-auto border border-emerald-950/40">
                  <pre>{pillar.code}</pre>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Strict Phase 1 MVP Commitment */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <FileCheck className="w-3.5 h-3.5" /> Engineering Transparency
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Strict Phase 1 MVP Boundary: Zero Hallucinated AI
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              Unlike platforms that prematurely attach unreliable AI wrappers over unverified databases, PropTech CRM Phase 1 maintains a strict boundary:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Production Verified Core
                </span>
                <p className="text-slate-400">
                  All lead filtering, Kanban status progression, Marla calculations, and CSV ingestions execute with deterministic precision.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Phase 2 Extension Ready
                </span>
                <p className="text-slate-400">
                  Clean interface abstractions ensure future Phase 2 automated WhatsApp AI bots can attach seamlessly without schema disruptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#040714] text-white shadow-2xl border border-emerald-400/40">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
              Your Brokerage Data Stays 100% Private
            </h2>
            <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Join leading agencies across Pakistan who trust PropTech CRM with their high-value investor records.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-base font-black bg-white text-emerald-950 hover:bg-emerald-50 shadow-2xl rounded-2xl border border-white">
                  Launch Demo Workspace <ArrowRight className="w-5 h-5 ml-2 text-emerald-700" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-black text-white border-white/40 hover:bg-white/15 rounded-2xl bg-white/10 backdrop-blur-md">
                  Request Security Audit Report
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
