"use client";

import React, { useState } from "react";
import { Sparkles, TrendingUp, Clock, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RoiCalculator() {
  const [agents, setAgents] = useState(10);
  const [dealValueCr, setDealValueCr] = useState(3.5); // PKR in Crores

  // 1 Crore = 10,000,000 PKR
  const avgDealPKR = dealValueCr * 10000000;
  // Standard agency commission ~ 1% to 2% (say 1.5%)
  const commissionPerDeal = avgDealPKR * 0.015;
  // Estimated extra closed deals with automated pipeline & followups (~ 1.5 extra deals per agent per quarter)
  const extraDealsPerMonth = Math.round((agents * 0.5) * 10) / 10;
  const extraRevenuePerMonth = extraDealsPerMonth * commissionPerDeal;
  const hoursSavedPerMonth = agents * 18;

  const formatPKR = (val: number) => {
    if (val >= 10000000) {
      return `PKR ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `PKR ${(val / 100000).toFixed(1)} Lacs`;
    }
    return `PKR ${val.toLocaleString()}`;
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/90 dark:to-slate-950 p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-glass-dark">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200/50 dark:border-emerald-800/50 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Agency ROI Estimator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              See How Much Revenue Your Agency Is Leaving On The Table
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Slow manual follow-ups and unassigned WhatsApp inquiries cost typical real estate agencies 30% of potential commissions. Adjust the sliders to estimate your pipeline uplift.
            </p>
          </div>

          {/* Slider 1: Number of Active Sales Agents */}
          <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">Active Sales Agents</span>
              <span className="text-base font-black text-primary dark:text-cyan px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/80">
                {agents} Agents
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={agents}
              onChange={(e) => setAgents(Number(e.target.value))}
              className="w-full accent-indigo-600 dark:accent-cyan cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>2 Agents</span>
              <span>25 Agents</span>
              <span>50+ Agents</span>
            </div>
          </div>

          {/* Slider 2: Average Property Deal Value */}
          <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">Average Property Deal Value</span>
              <span className="text-base font-black text-amber-600 dark:text-gold px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/80">
                PKR {dealValueCr.toFixed(1)} Crore
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="25"
              step="0.5"
              value={dealValueCr}
              onChange={(e) => setDealValueCr(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>PKR 50 Lacs (5-7 Marla)</span>
              <span>PKR 10 Cr (Commercial / 2 Kanal)</span>
              <span>PKR 25 Cr+ (Luxury Highrise)</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border border-indigo-500/30 shadow-2xl space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan">
            Estimated Monthly Pipeline Gain
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              +{formatPKR(extraRevenuePerMonth)}
            </div>
            <p className="text-xs text-indigo-200">
              Projected net commission revenue unlocked per month
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Extra Deals
              </div>
              <div className="text-lg font-bold text-white mt-1">
                +{extraDealsPerMonth} / mo
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-cyan" />
                Time Saved
              </div>
              <div className="text-lg font-bold text-white mt-1">
                {hoursSavedPerMonth} hrs / mo
              </div>
            </div>
          </div>

          <Link href="/dashboard" className="block w-full">
            <Button variant="cyan" size="lg" className="w-full">
              Test In Real CRM <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
