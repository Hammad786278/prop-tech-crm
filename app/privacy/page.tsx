import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Database, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — PropTech CRM",
  description: "PropTech CRM privacy policy, multi-tenant security architecture, and data protection compliance.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 14, 2026";

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-cyan text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/60 mb-6">
          <Shield className="w-3.5 h-3.5" />
          Enterprise Data Protection
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-base">
          Last revised: <span className="font-semibold text-slate-700 dark:text-slate-300">{lastUpdated}</span>
        </p>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs">
            <Database className="w-6 h-6 text-primary dark:text-cyan mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Strict Tenant Isolation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Every agency workspace is cryptographically separated via Row-Level Security (RLS). No data crosses agency boundaries.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs">
            <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">End-to-End Encryption</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              TLS 1.3 in transit and AES-256 encryption at rest for customer records, phone numbers, and financial deals.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs">
            <Eye className="w-6 h-6 text-amber-500 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zero Data Selling</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              We never monetize, train external public AI on, or share your agency leads, inventory, or contact databases.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-primary dark:text-cyan flex items-center justify-center text-xs font-black">
                1
              </span>
              Overview & Scope
            </h2>
            <p>
              This Privacy Policy explains how <strong>PropTech CRM</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) collects, processes, and protects information when real estate agencies, brokers, consultants, and agents use our multi-tenant SaaS application.
            </p>
            <p>
              By accessing PropTech CRM, your agency consents to the data handling practices described in this document. We adhere to applicable regional data protection guidelines, including the Pakistan Personal Data Protection frameworks and international standards for enterprise SaaS multi-tenancy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-primary dark:text-cyan flex items-center justify-center text-xs font-black">
                2
              </span>
              Information We Collect
            </h2>
            <p>To deliver real estate CRM features, we process three categories of data:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <strong>Agency & Account Information:</strong> Agency company name, business registration, billing details, owner and agent names, professional emails, and role assignments.
              </li>
              <li>
                <strong>CRM Operational Data:</strong> Client contact information (names, phone numbers, CNIC/national IDs if recorded by you), lead records, property inventory (locations, dimensions, pricing), pipeline stages, and appointment notes.
              </li>
              <li>
                <strong>Technical & Usage Metrics:</strong> Device IP addresses, browser types, session cookies, timestamp logs, and audit logs of critical actions (e.g. CSV lead exports, user permission updates).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-primary dark:text-cyan flex items-center justify-center text-xs font-black">
                3
              </span>
              Multi-Tenant Architecture & Data Segregation
            </h2>
            <p>
              PropTech CRM operates on an isolated multi-tenant architecture. Every query to our database enforces strict <code>organization_id</code> partition filters and Row-Level Security (RLS) policies at the database engine level.
            </p>
            <p>
              Agents from Agency A can never view, search, export, or modify leads, properties, or revenue figures belonging to Agency B. Only designated Agency Owners have the administrative permission to export or delete their agency’s data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-primary dark:text-cyan flex items-center justify-center text-xs font-black">
                4
              </span>
              Subprocessors & Service Providers
            </h2>
            <p>
              We partner with industry-leading infrastructure providers to host and secure your data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white text-xs block">Vercel Inc.</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Global edge hosting and application runtime (ISO 27001 & SOC 2 Type II certified).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white text-xs block">Supabase Inc. / AWS</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Managed PostgreSQL database with automatic point-in-time backups and SSL encryption.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-primary dark:text-cyan flex items-center justify-center text-xs font-black">
                5
              </span>
              Data Retention & Your Rights
            </h2>
            <p>
              Your agency owns 100% of your data. You may export your entire contact and lead registry to standard CSV at any time from the CRM dashboard. If you cancel your subscription, your agency records are retained for 30 days to facilitate recovery, after which you may request complete permanent purging.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Our Privacy Officer</h2>
            <p>
              For data protection questions, compliance verifications, or enterprise privacy agreements, contact our dedicated privacy desk at:
            </p>
            <p className="font-semibold text-primary dark:text-cyan">
              privacy@proptechcrm.com · +92 (21) 3584-9000
            </p>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} PropTech CRM. All rights reserved.
      </footer>
    </div>
  );
}
