"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Building, Check } from "lucide-react";
import { toast } from "sonner";

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    agencyName: "",
    ownerName: "",
    contactEmail: "",
    phone: "",
    country: "Pakistan",
    timezone: "Asia/Karachi",
    currency: "PKR",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agencyName || !formData.contactEmail || !formData.ownerName) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Agency registered successfully!");
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors relative">
      {/* Top Bar with ThemeToggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
        </Link>
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mt-6">
        <div className="flex justify-center mb-4">
          <Logo variant="full" showTagline />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Create Agency Workspace
        </h2>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Set up an isolated multi-tenant PropTech CRM environment for your real estate team.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl dark:shadow-glass-dark rounded-3xl border border-slate-200 dark:border-slate-800 sm:px-10 transition-colors">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="agencyName"
              label="Agency Name *"
              placeholder="e.g. Skyline Horizon Real Estate"
              value={formData.agencyName}
              onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="ownerName"
                label="Your Full Name (Owner) *"
                placeholder="e.g. Hammad Hussain"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                required
              />
              <Input
                id="contactEmail"
                label="Owner Email Address *"
                type="email"
                placeholder="owner@agency.pk"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                required
              />
            </div>

            <Input
              id="phone"
              label="Agency Phone Number"
              placeholder="+92 300 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Country</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Pakistan</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Timezone</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Asia/Karachi</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Currency</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">PKR</p>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full font-bold mt-4">
              Complete Setup & Open Workspace
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-cyan font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Already have an account? Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
