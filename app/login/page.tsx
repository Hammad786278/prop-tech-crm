"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ArrowRight, UserCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Signed in successfully");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (userId: string, roleName: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, orgId: "org-skyline-pk" }),
      });
      toast.success(`Signed in as ${roleName}`);
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Failed to switch demo role");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Logo variant="full" showTagline />
        </div>
        <h2 className="text-2xl font-extrabold text-navy-deep tracking-tight">
          Sign In to Your Agency
        </h2>
        <p className="mt-2 text-xs text-text-secondary">
          Enter your credentials or test any team role using the instant demo switcher below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-premium rounded-2xl border border-slate-200 sm:px-10 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              id="email"
              label="Agency Email Address"
              type="email"
              placeholder="e.g. owner@skylinehorizon.pk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div>
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end mt-1">
                <Link
                  href="/recover-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full font-bold">
              Sign In to SkyVista
            </Button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
              Instant One-Click Demo Logins
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-owner-1", "Agency Owner")}
                className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-primary hover:bg-indigo-50/50 transition-all text-xs group"
              >
                <p className="font-bold text-slate-900 group-hover:text-primary">Agency Owner</p>
                <p className="text-[10px] text-slate-500">Hammad Hussain</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-manager-1", "Sales Manager")}
                className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-primary hover:bg-indigo-50/50 transition-all text-xs group"
              >
                <p className="font-bold text-slate-900 group-hover:text-primary">Sales Manager</p>
                <p className="text-[10px] text-slate-500">Bilal Tariq</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-agent-1", "Sales Agent")}
                className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-primary hover:bg-indigo-50/50 transition-all text-xs group"
              >
                <p className="font-bold text-slate-900 group-hover:text-primary">Sales Agent</p>
                <p className="text-[10px] text-slate-500">Ayesha Khan</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-propman-1", "Property Manager")}
                className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-primary hover:bg-indigo-50/50 transition-all text-xs group"
              >
                <p className="font-bold text-slate-900 group-hover:text-primary">Property Mgr</p>
                <p className="text-[10px] text-slate-500">Tariq Mehmood</p>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/onboarding"
              className="text-xs text-slate-500 hover:text-primary font-medium"
            >
              Need to register a new agency? <span className="text-primary font-bold">Start Onboarding</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
