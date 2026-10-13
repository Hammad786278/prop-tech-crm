"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  Lock,
  Globe,
  Coins,
  CheckCircle2,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-slate-50/90 dark:bg-[#030611] text-xs text-slate-500 dark:text-slate-400 relative z-10 transition-colors">
      {/* Top Banner Row */}
      <div className="border-b border-slate-200/70 dark:border-white/8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              Sovereign Multi-Tenant Data Protection
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              PostgreSQL Row-Level Security (RLS) ensures total cryptographic separation between competing brokerages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] border border-emerald-500/25">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
            All Tenant Services Operational
          </span>
        </div>
      </div>

      {/* Main 5-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">
        {/* Column 1: Brand Info */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <Logo variant="full" />
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            The next-generation Real Estate Customer Relationship Management platform built specifically for Pakistani brokerages and international agencies.
          </p>
          <div className="pt-2 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
            <p className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Islamabad & Karachi
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> support@proptechcrm.pk
            </p>
          </div>
        </div>

        {/* Column 2: Platform Modules */}
        <div className="space-y-3">
          <p className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            CRM Modules
          </p>
          <ul className="space-y-2 text-[11px]">
            <li>
              <Link href="/features#leads" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Leads & Inquiries Registry
              </Link>
            </li>
            <li>
              <Link href="/features#pipeline" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                10-Stage Sales Kanban
              </Link>
            </li>
            <li>
              <Link href="/features#properties" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Properties & Marla Matrix
              </Link>
            </li>
            <li>
              <Link href="/features#visits" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Site Visits & Agenda Cockpit
              </Link>
            </li>
            <li>
              <Link href="/features#rbac" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Team Roles & RBAC Matrix
              </Link>
            </li>
            <li>
              <Link href="/features#import" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                CSV Bulk Leads Ingestion
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Regional Societies */}
        <div className="space-y-3">
          <p className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Regional Standard
          </p>
          <ul className="space-y-2 text-[11px]">
            <li>
              <Link href="/#interactive-suite" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                DHA Lahore (225 sq ft Marla)
              </Link>
            </li>
            <li>
              <Link href="/#interactive-suite" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                CDA Islamabad (272 sq ft Marla)
              </Link>
            </li>
            <li>
              <Link href="/#societies" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Karachi Coastal & Clifton (Sq Yds)
              </Link>
            </li>
            <li>
              <Link href="/#societies" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Bahria Town Metropolis
              </Link>
            </li>
            <li>
              <Link href="/#societies" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Dubai & NRP Expat Corridor
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Security & Compliance */}
        <div className="space-y-3">
          <p className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Trust & Governance
          </p>
          <ul className="space-y-2 text-[11px]">
            <li>
              <Link href="/security" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-bold text-emerald-600 dark:text-emerald-400">
                Security & RLS Whitepaper
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Subscription Pricing & Plans
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Direct Support */}
        <div className="space-y-3">
          <p className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Direct Helpline
          </p>
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Dedicated customer onboarding specialists available 6 days a week across Pakistan standard time.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30 hover:bg-emerald-500/25 transition-all text-[11px]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp Support
            </a>
          </div>
          <div className="pt-1">
            <Link
              href="/contact"
              className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1"
            >
              Contact Sales Desk <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Currency Row */}
      <div className="border-t border-slate-200/70 dark:border-white/8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <p className="text-slate-500">
          © 2026 PropTech CRM. All rights reserved. Built with PostgreSQL RLS & Next.js App Router.
        </p>

        <div className="flex items-center gap-4 text-slate-500 font-semibold">
          <span className="flex items-center gap-1">
            <Coins className="w-3 h-3 text-amber-500" /> Currencies: PKR · AED · USD
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-cyan-500" /> Operational in PK & UAE
          </span>
        </div>
      </div>
    </footer>
  );
}
