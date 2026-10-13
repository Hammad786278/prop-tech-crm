"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users2,
  Kanban,
  HelpCircle,
  Zap,
  CreditCard,
  Lock,
  Headphones,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pricingTiers = [
    {
      id: "starter",
      name: "Starter Agency",
      tagline: "Ideal for boutique brokerages and independent real estate consultants.",
      priceMonthly: "14,999",
      priceAnnual: "11,999",
      seats: "Up to 5 Agents",
      popular: false,
      badge: null,
      ctaText: "Start Starter Plan",
      ctaHref: "/dashboard",
      features: [
        "Up to 5 Team Seats",
        "1,000 Active Inquiries & Contacts",
        "10-Stage Visual Sales Kanban",
        "Native Marla & Kanal Converter",
        "Standard CSV Lead Import",
        "Site Visit Agenda Logging",
        "Email Support (24h SLA)",
      ],
      notIncluded: [
        "Advanced Commission Forecasting",
        "Multi-Branch Society Matrix",
        "Dedicated Database Instance",
        "Custom Roles & Audit Logs",
      ],
    },
    {
      id: "growth",
      name: "Growth Brokerage",
      tagline: "For high-velocity agencies with growing sales teams across major housing societies.",
      priceMonthly: "34,999",
      priceAnnual: "27,999",
      seats: "Up to 20 Agents",
      popular: true,
      badge: "Most Popular Choice",
      ctaText: "Launch Growth Workspace",
      ctaHref: "/dashboard",
      features: [
        "Up to 20 Team Seats",
        "15,000 Active Inquiries & Contacts",
        "10-Stage Visual Sales Kanban",
        "Native Marla & Kanal Converter",
        "Advanced Commission Forecasting",
        "Multi-Branch Society Matrix (DHA, Bahria)",
        "High-Speed CSV Engine (5k rows/min)",
        "Granular RBAC (4 Security Tiers)",
        "Priority WhatsApp & Phone Support",
      ],
      notIncluded: [
        "Dedicated Database Instance",
        "Custom SLA & Audit Retention",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise & Developers",
      tagline: "For major property developers, mega-franchises, and international real estate groups.",
      priceMonthly: "74,999",
      priceAnnual: "59,999",
      seats: "Unlimited Team Seats",
      popular: false,
      badge: "Full Sovereign Suite",
      ctaText: "Talk to Enterprise Sales",
      ctaHref: "/contact",
      features: [
        "Unlimited Team Seats & Branches",
        "Unlimited Contacts & Inquiries",
        "Full Multi-Tenant Database Isolation",
        "Native Marla & Kanal Sizing Engine",
        "Custom Society Schema Tailoring",
        "Dedicated PostgreSQL Instance Option",
        "Enterprise RBAC & Custom Security Roles",
        "Dedicated Account Director in PK/UAE",
        "99.95% Guaranteed SLA Uptime",
        "Direct Engineering Onboarding Desk",
      ],
      notIncluded: [],
    },
  ];

  const comparisonCategories = [
    {
      title: "Core CRM & Pipeline Capabilities",
      rows: [
        { feature: "Active Team Seats", starter: "5", growth: "20", enterprise: "Unlimited" },
        { feature: "Active Contacts & Inquiries", starter: "1,000", growth: "15,000", enterprise: "Unlimited" },
        { feature: "10-Stage Sales Kanban", starter: true, growth: true, enterprise: true },
        { feature: "Deal Valuation in PKR (Crores & Lacs)", starter: true, growth: true, enterprise: true },
        { feature: "Site Visit Scheduling & Agenda", starter: true, growth: true, enterprise: true },
        { feature: "Commission & Revenue Forecasting", starter: false, growth: true, enterprise: true },
      ],
    },
    {
      title: "Pakistani Property Market Conventions",
      rows: [
        { feature: "Marla & Kanal Dimension Engine", starter: true, growth: true, enterprise: true },
        { feature: "225 vs 272.25 Sq Ft Marla Variants", starter: true, growth: true, enterprise: true },
        { feature: "Major Societies (DHA, Bahria, Gulberg)", starter: "Standard", growth: "All Societies", enterprise: "Custom Masterplans" },
        { feature: "Pakistani Phone (+92) & CNIC Parser", starter: true, growth: true, enterprise: true },
        { feature: "Token Money (Biyana) Milestone Tracker", starter: false, growth: true, enterprise: true },
      ],
    },
    {
      title: "Security, Compliance & Infrastructure",
      rows: [
        { feature: "Multi-Tenant Row-Level Security (RLS)", starter: true, growth: true, enterprise: true },
        { feature: "AES-256 Encryption at Rest & TLS 1.3", starter: true, growth: true, enterprise: true },
        { feature: "Role-Based Access Control (RBAC)", starter: "Standard (2 Roles)", growth: "Full (4 Roles)", enterprise: "Custom Roles" },
        { feature: "Audit Trails & Activity Logs", starter: "7 Days", growth: "90 Days", enterprise: "Unlimited Retention" },
        { feature: "Dedicated Database Instance", starter: false, growth: false, enterprise: true },
      ],
    },
    {
      title: "Support & Onboarding",
      rows: [
        { feature: "CSV Bulk Leads Migration Engine", starter: true, growth: true, enterprise: true },
        { feature: "Support Channels", starter: "Email", growth: "WhatsApp + Email", enterprise: "24/7 Dedicated Slack/WhatsApp" },
        { feature: "Dedicated Implementation Manager", starter: false, growth: false, enterprise: true },
        { feature: "Uptime Service Level Agreement", starter: "99.5%", growth: "99.9%", enterprise: "99.95% Contractual" },
      ],
    },
  ];

  const pricingFaqs = [
    {
      q: "Can we pay via Pakistani Bank Transfer (IBFT) or Raast?",
      a: "Yes. In addition to international Visa and MasterCard payments, we accept direct local Pakistani IBFT bank transfers to our corporate account in Karachi/Islamabad, as well as Raast instant payments. Tax invoices (with NTN) are issued immediately.",
    },
    {
      q: "Are prices inclusive of sales tax / PRA / SRB / FBR?",
      a: "Listed prices are base SaaS licensing rates. For registered corporate agencies requiring formal withholding tax deduction or SRB/PRA sales tax invoices, our finance department coordinates directly upon contract issuance.",
    },
    {
      q: "Can we add more agent seats mid-month as our brokerage expands?",
      a: "Absolutely. You can scale your user seats at any time from your billing settings. Upgrades take effect immediately and are prorated for the remainder of your billing cycle.",
    },
    {
      q: "Is there any setup fee or long-term lock-in contract?",
      a: "No setup fees whatsoever. You can choose monthly pay-as-you-go billing with complete freedom to cancel at any time, or choose annual billing to save 20%.",
    },
    {
      q: "How easily can we export our client records if we decide to leave?",
      a: "Your data belongs 100% to your agency. At any point, an Agency Owner can export the entire lead registry, client histories, and property inventory to CSV with a single click.",
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
      <section className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider mb-6 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          Transparent Brokerage Pricing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight"
        >
          Predictable Pricing for{" "}
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Agencies of Any Scale
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal"
        >
          Choose the plan that fits your brokerage. From boutique agencies in DHA to multi-branch enterprises across Islamabad, Lahore, and Karachi.
        </motion.p>

        {/* Annual vs Monthly Toggle */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${!annualBilling ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className="w-14 h-8 rounded-full bg-slate-200 dark:bg-white/10 p-1 relative transition-colors focus:outline-none"
            aria-label="Toggle Annual Billing"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-6 h-6 rounded-full bg-emerald-500 shadow-md ${annualBilling ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${annualBilling ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase border border-emerald-500/30">
              Save 20%
            </span>
          </span>
        </div>
      </section>

      {/* 3 Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const price = annualBilling ? tier.priceAnnual : tier.priceMonthly;

            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? "bg-gradient-to-b from-white via-white to-emerald-50/40 dark:from-[#081128] dark:via-[#070D22] dark:to-[#05211b] border-2 border-emerald-500/70 shadow-2xl shadow-emerald-950/20 scale-[1.02] z-10"
                    : "bg-white/90 dark:bg-[#070E22]/90 border border-slate-200/80 dark:border-white/10 shadow-lg"
                }`}
              >
                {/* Popular Pill */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider shadow-lg">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[36px]">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">PKR</span>
                      <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        {price}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">/ month</span>
                    </div>
                    <div className="mt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Users2 className="w-3.5 h-3.5" /> {tier.seats}
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-black uppercase text-slate-400 tracking-wider">
                      Included Capabilities
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {tier.notIncluded.length > 0 && (
                      <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-2.5 text-xs text-slate-400 dark:text-slate-500">
                        {tier.notIncluded.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <X className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-6 border-t border-slate-100 dark:border-white/10">
                  <Link href={tier.ctaHref} className="block w-full">
                    <Button
                      size="lg"
                      className={`w-full font-black rounded-2xl h-12 text-sm shadow-md ${
                        tier.popular
                          ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white border border-emerald-400/30"
                          : "bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200"
                      }`}
                    >
                      {tier.ctaText} <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Methods Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Pakistani & International Payment Methods
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Direct IBFT Corporate Transfers, Raast, Visa, MasterCard, and Wire Transfer with official FBR tax receipts.
              </p>
            </div>
          </div>
          <Link href="/contact">
            <Button variant="outline" size="sm" className="font-bold text-xs shrink-0 rounded-xl">
              Pay via IBFT / Raast
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Detailed Plan Comparison
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            Everything your agency needs to evaluate technical specifications and compliance tiers.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#070E22]/90 shadow-xl backdrop-blur-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/75 dark:bg-white/5">
                <th className="py-5 px-6 font-black text-slate-900 dark:text-white text-sm w-2/5">
                  Feature / Capability
                </th>
                <th className="py-5 px-6 font-black text-slate-900 dark:text-white text-center w-1/5">
                  Starter Agency
                </th>
                <th className="py-5 px-6 font-black text-emerald-600 dark:text-emerald-400 text-center w-1/5">
                  Growth Brokerage
                </th>
                <th className="py-5 px-6 font-black text-slate-900 dark:text-white text-center w-1/5">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonCategories.map((category, cIdx) => (
                <React.Fragment key={cIdx}>
                  <tr className="bg-slate-100/60 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/10">
                    <td colSpan={4} className="py-3 px-6 font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                      {category.title}
                    </td>
                  </tr>
                  {category.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3.5 px-6 font-medium text-slate-800 dark:text-slate-200">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-6 text-center text-slate-600 dark:text-slate-400">
                        {typeof row.starter === "boolean" ? (
                          row.starter ? (
                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="font-bold">{row.starter}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-center text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
                        {typeof row.growth === "boolean" ? (
                          row.growth ? (
                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="font-black">{row.growth}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-center text-slate-600 dark:text-slate-400">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? (
                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="font-bold">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Billing Questions
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Everything you need to know about invoices, local currency payments, and contract flexibility.
          </p>
        </div>

        <div className="space-y-4">
          {pricingFaqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-emerald-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* High Contrast CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#040714] text-white shadow-2xl border border-emerald-400/40">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-sm">
              Upgrade Your Real Estate Sales Engine Today
            </h2>
            <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Start with our full-featured demo workspace right away. No credit card required.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-base font-black bg-white text-emerald-950 hover:bg-emerald-50 shadow-2xl shadow-black/40 rounded-2xl border border-white">
                  Launch Demo Workspace <ArrowRight className="w-5 h-5 ml-2 text-emerald-700" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-black text-white border-white/40 hover:bg-white/15 hover:text-white rounded-2xl bg-white/10 backdrop-blur-md">
                  Contact Sales Desk
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
