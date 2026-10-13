"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors relative">
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/login" className="inline-flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Sign In
        </Link>
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mt-6">
        <div className="flex justify-center mb-4">
          <Logo variant="full" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Reset Your Password
        </h2>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Enter your agency email to receive a secure password recovery link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl dark:shadow-glass-dark rounded-3xl border border-slate-200 dark:border-slate-800 sm:px-10 transition-colors">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recovery Link Dispatched</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                If an account exists for <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span>,
                you will receive instructions within 2 minutes.
              </p>
              <div className="pt-4">
                <Link href="/login">
                  <Button variant="secondary" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="email"
                label="Registered Agency Email"
                type="email"
                placeholder="agent@youragency.pk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" variant="primary" size="lg" className="w-full font-bold">
                Send Recovery Instructions
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-cyan font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
