"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Search,
  Building,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    category: "Pakistan Market Conventions",
    question: "Does PropTech CRM natively support local Pakistan property units like Marla and Kanal?",
    answer: "Yes, completely. PropTech CRM was engineered specifically with Pakistan real estate conventions in mind. It natively supports Marla, Kanal, Square Feet, and Square Yards with automatic size conversions, alongside Pakistani Rupee (PKR) valuations with Crores and Lacs formatting, Pakistani phone numbers (+92), and CNIC validation.",
  },
  {
    category: "Pakistan Market Conventions",
    question: "Can our agency track inventory across multiple housing societies (DHA, Bahria, Gulberg)?",
    answer: "Yes. The property inventory engine allows you to tag properties by city (Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Faisalabad, Multan), housing authority, sector, phase, block, and plot number. You can filter inventory instantaneously by commercial vs residential, plot vs constructed, and size bracket.",
  },
  {
    category: "Data Security & Multi-Tenancy",
    question: "How is our client data isolated from competitor agencies using the software?",
    answer: "PropTech CRM uses enterprise multi-tenant database partitioning powered by Supabase Row-Level Security (RLS). Every single query executed in the database is cryptographically filtered by your agency's organization ID. No other agency or consultant on the platform can ever view, search, or export your contacts, leads, or commission splits.",
  },
  {
    category: "Data Security & Multi-Tenancy",
    question: "Who owns our client and leads data? Can we export it?",
    answer: "Your agency owns 100% of all data. Agency owners have access to an instant CSV Export engine at any time, allowing you to download your complete database of contacts, inquiry notes, and deals with one click. We never sell, share, or train public AI models on your private database.",
  },
  {
    category: "Features & Workflow",
    question: "How does the Visual Kanban Pipeline work for our sales agents?",
    answer: "The visual sales pipeline lets your sales team drag-and-drop deals across 5 key conversion stages: New Lead → Contacted → Site Visit Scheduled → Negotiation → Closed Won (or Closed Lost). When deals move, deal metrics, commission forecasts, and team quotas update in real-time.",
  },
  {
    category: "Features & Workflow",
    question: "Can we import our existing leads from Excel or Google Sheets?",
    answer: "Yes! PropTech CRM features a built-in CSV bulk import wizard with client-side validation. You can upload a spreadsheet of hundreds of leads, preview parsed records, auto-map columns, and import them with duplicate phone number detection in seconds.",
  },
  {
    category: "Roles & Permissions",
    question: "What user roles are available in PropTech CRM?",
    answer: "The platform supports 4 distinct role-based access tiers: (1) Agency Owner with full oversight, financial analytics, and team management; (2) Sales Manager with pipeline auditing and agent assignment; (3) Sales Agent with targeted lead tracking and appointment scheduling; and (4) Property Manager focused on unit availability and listing status.",
  },
  {
    category: "Future Roadmap",
    question: "Is PropTech CRM ready for future AI features like WhatsApp bots?",
    answer: "Yes. PropTech CRM was architected from day one with clean modular boundaries so that Phase 2 enhancements—such as WhatsApp conversational AI, automatic lead qualification, and smart property matching—can attach directly to current data models without rebuilding the core CRM.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#070B14]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo variant="full" showTagline />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-cyan text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/60 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base & Frequently Asked Questions
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Everything You Need to Know
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Clear answers about PropTech CRM architecture, Pakistan localization, data privacy, and agency workflow optimization.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search FAQs (e.g. Marla, WhatsApp, Security, Roles)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-cyan shadow-sm transition-all"
            />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-12 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No matching questions found for &ldquo;{searchQuery}&rdquo;.
              </p>
              <Link href="/contact" className="mt-4 inline-block">
                <Button variant="primary" size="sm">Ask Our Team Directly</Button>
              </Link>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-cyan block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary dark:text-cyan" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions CTA card */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white text-center border border-indigo-500/20 shadow-xl space-y-4">
          <h3 className="text-2xl font-bold">Have a specific question about your agency?</h3>
          <p className="text-sm text-indigo-200 max-w-lg mx-auto">
            Our real estate tech consultants can review your existing spreadsheet or database and provide a free migration roadmap.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <Button variant="gold" size="lg">
                Contact Sales Team <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} PropTech CRM. All rights reserved.
      </footer>
    </div>
  );
}
