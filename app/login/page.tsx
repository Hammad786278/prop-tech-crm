"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ArrowRight, UserCircle2, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors relative">
      {/* Top Bar with ThemeToggle & Home Link */}
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
          Sign In to PropTech CRM
        </h2>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Enter your agency credentials or test any team role using the instant demo switcher below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl dark:shadow-glass-dark rounded-3xl border border-slate-200 dark:border-slate-800 sm:px-10 space-y-6 transition-colors">
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
                  className="text-xs text-primary dark:text-cyan hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full font-bold">
              Sign In to PropTech CRM
            </Button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 text-center">
              Instant One-Click Demo Logins
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-owner-1", "Agency Owner")}
                className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-cyan hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 transition-all text-xs group"
              >
                <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan">Agency Owner</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Hammad Hussain</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-manager-1", "Sales Manager")}
                className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-cyan hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 transition-all text-xs group"
              >
                <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan">Sales Manager</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Bilal Tariq</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-agent-1", "Sales Agent")}
                className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-cyan hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 transition-all text-xs group"
              >
                <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan">Sales Agent</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Ayesha Khan</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-propman-1", "Property Manager")}
                className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-cyan hover:bg-indigo-50/50 dark:hover:bg-slate-800/80 transition-all text-xs group"
              >
                <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan">Property Mgr</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Tariq Mehmood</p>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/onboarding"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-cyan font-medium"
            >
              Need to register a new agency? <span className="text-primary dark:text-cyan font-bold">Start Onboarding</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
