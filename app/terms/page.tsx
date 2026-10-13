import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale, ShieldAlert, Cpu, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service — PropTech CRM",
  description: "Terms of service, licensing, user seats, and service level agreements for PropTech CRM SaaS.",
};

export default function TermsPage() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200/60 dark:border-amber-800/60 mb-6">
          <Scale className="w-3.5 h-3.5" />
          Master Subscription Agreement
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-base">
          Effective date: <span className="font-semibold text-slate-700 dark:text-slate-300">{lastUpdated}</span>
        </p>

        {/* Content Body */}
        <div className="mt-12 space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By registering an agency workspace or inviting team members to <strong>PropTech CRM</strong>, your company (&quot;Subscriber&quot;) enters into a binding software agreement with PropTech CRM SaaS (&quot;Provider&quot;). If you are acting on behalf of an agency, you confirm that you possess full administrative authorization to bind that legal entity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. SaaS Subscription & User Seats</h2>
            <p>
              PropTech CRM grants Subscriber a non-exclusive, non-transferable right to access and utilize the Platform during the subscription term. Subscriptions are billed per agency workspace with permitted user seats (Agency Owner, Sales Managers, Sales Agents, Property Managers).
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>User accounts may not be shared concurrently between multiple physical persons.</li>
              <li>Agency owners remain responsible for all activity conducted under their workspace credentials.</li>
              <li>Role-based permissions (RBAC) must be configured in accordance with your internal business requirements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Customer Data & Intellectual Property</h2>
            <p>
              <strong>Subscriber retains all ownership, title, and intellectual property rights</strong> to all customer contacts, lead details, private inventory listings, and sales pipeline data uploaded to PropTech CRM.
            </p>
            <p>
              Provider retains all proprietary rights, copyright, and patent rights in the CRM application, code, interface designs, algorithms, and documentation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Acceptable Use Policy</h2>
            <p>Subscriber agrees not to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Upload fraudulent real estate listings or deceptive property ownership records.</li>
              <li>Reverse engineer, decompile, or copy the architectural workflows of the CRM platform.</li>
              <li>Attempt to breach or probe tenant isolation boundaries or bypass database Row-Level Security.</li>
              <li>Use the application to distribute unsolicited spam or harass consumers in violation of telecommunication regulations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Service Level Agreement (SLA) & Uptime</h2>
            <p>
              We target <strong>99.9% monthly service availability</strong> for the core CRM interface, API route endpoints, and persistent database services, excluding scheduled maintenance windows announced at least 48 hours in advance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Limitation of Liability</h2>
            <p>
              In no event shall PropTech CRM be liable for indirect, incidental, or consequential damages resulting from real estate market fluctuations, failed client negotiations, or loss of profits. Provider’s maximum aggregate liability shall not exceed the subscription fees paid by Subscriber during the twelve (12) months preceding the claim.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, without regard to conflict of law principles. Any dispute shall be resolved through arbitration in Karachi, Pakistan.
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
