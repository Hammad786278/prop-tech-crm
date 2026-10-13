"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
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
    // In Phase 1 MVP, we simulate registration and login to the demo workspace
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Agency registered successfully!");
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Logo variant="full" showTagline />
        </div>
        <h2 className="text-2xl font-extrabold text-navy-deep tracking-tight">
          Create Your Agency Workspace
        </h2>
        <p className="mt-2 text-xs text-text-secondary">
          Set up an isolated multi-tenant CRM environment for your real estate team.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-premium rounded-2xl border border-slate-200 sm:px-10">
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
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Country</p>
                <p className="text-xs font-bold text-navy-deep mt-0.5">Pakistan</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Timezone</p>
                <p className="text-xs font-bold text-navy-deep mt-0.5">Asia/Karachi</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Currency</p>
                <p className="text-xs font-bold text-navy-deep mt-0.5">PKR</p>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full font-bold mt-4">
              Complete Setup & Open Workspace
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary font-medium"
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
