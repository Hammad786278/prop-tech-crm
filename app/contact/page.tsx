"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Building,
  Send,
} from "lucide-react";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid work email"),
  phone: z.string().min(8, "Valid phone number is required"),
  agencyName: z.string().min(2, "Agency name is required"),
  teamSize: z.string().min(1, "Please select team size"),
  message: z.string().min(5, "Please describe your agency requirements"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      agencyName: "",
      teamSize: "5-20 agents",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate real network request
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitted(true);
    toast.success("Inquiry Submitted Successfully!", {
      description: `Thank you, ${data.fullName}. Our PropTech enterprise consultant will reach out via ${data.phone} within 2 hours.`,
    });
    reset();
  };

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
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-primary dark:text-cyan text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/60 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Agency Consultation & Enterprise Sales
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Let&apos;s Accelerate Your Agency&apos;s Revenue
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Have questions about migrating your current spreadsheets or legacy CRM? Need a custom multi-branch setup? Our real estate technology specialists are ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-glass-dark">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Consultation Request Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  A dedicated PropTech CRM implementation manager has been assigned to your agency and will contact you promptly with customized walkthrough details.
                </p>
                <div className="pt-4">
                  <Button variant="primary" onClick={() => setIsSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name *"
                    placeholder="e.g. Asad Siddiqui"
                    error={errors.fullName?.message}
                    {...register("fullName")}
                  />
                  <Input
                    label="Work Email *"
                    type="email"
                    placeholder="asad@premierproperties.pk"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Direct Phone / WhatsApp *"
                    placeholder="+92 300 1234567"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                  <Input
                    label="Agency / Company Name *"
                    placeholder="e.g. Skyline Realty Pakistan"
                    error={errors.agencyName?.message}
                    {...register("agencyName")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Team Size / Active Agents *
                  </label>
                  <select
                    {...register("teamSize")}
                    className="flex h-10 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-cyan transition-all"
                  >
                    <option value="1-5 agents">1 - 5 Agents (Boutique Brokerage)</option>
                    <option value="5-20 agents">5 - 20 Agents (Growth Agency)</option>
                    <option value="20-50 agents">20 - 50 Agents (Multi-Branch)</option>
                    <option value="50+ agents">50+ Agents (Enterprise Developer)</option>
                  </select>
                </div>

                <Textarea
                  label="Tell us about your agency's goals *"
                  placeholder="What is your current pipeline bottleneck? How many listings do you actively manage?"
                  rows={4}
                  error={errors.message?.message}
                  {...register("message")}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Request Private Demo & Walkthrough
                </Button>

                <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
                  🔒 Zero spam guarantee. Your contact details remain 100% confidential under our Privacy Policy.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Direct Office Cards & Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Contact Badge */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-950 text-white shadow-xl border border-indigo-500/20">
              <h3 className="text-lg font-bold">Direct Channels</h3>
              <p className="text-xs text-indigo-200 mt-1">Available Mon–Sat · 9:00 AM to 7:00 PM PKT</p>

              <div className="mt-5 space-y-3.5">
                <a
                  href="mailto:contact@proptechcrm.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 text-xs font-semibold"
                >
                  <Mail className="w-4 h-4 text-cyan" />
                  <span>contact@proptechcrm.com</span>
                </a>
                <a
                  href="tel:+922135849000"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 text-xs font-semibold"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>+92 (21) 3584-9000</span>
                </a>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10 text-xs font-semibold"
                >
                  <Building className="w-4 h-4 text-amber-300" />
                  <span>WhatsApp Business Desk: +92 300 1234567</span>
                </a>
              </div>
            </div>

            {/* Office Locations */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary dark:text-cyan" />
                Regional Centers
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <strong className="block text-slate-900 dark:text-white font-bold">Karachi (Headquarters)</strong>
                  <span className="text-slate-500 dark:text-slate-400">Level 14, Ocean Tower, Clifton Block 9, Karachi</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <strong className="block text-slate-900 dark:text-white font-bold">Lahore Technology Hub</strong>
                  <span className="text-slate-500 dark:text-slate-400">Mall 1, Main Boulevard, Gulberg III, Lahore</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <strong className="block text-slate-900 dark:text-white font-bold">Islamabad Capital Office</strong>
                  <span className="text-slate-500 dark:text-slate-400">ISE Towers, Jinnah Avenue, Blue Area, Islamabad</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <strong className="block text-slate-900 dark:text-white font-bold">Dubai Expansion Center</strong>
                  <span className="text-slate-500 dark:text-slate-400">The Opus by Omniyat, Business Bay, Downtown Dubai, UAE</span>
                </div>
              </div>
            </div>
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
