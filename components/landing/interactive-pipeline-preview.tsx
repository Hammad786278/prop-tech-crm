"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Kanban,
  Building,
  TrendingUp,
  MapPin,
  Calendar,
  User,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DealItem {
  id: string;
  title: string;
  society: string;
  leadName: string;
  price: string;
  source: string;
  agent: string;
  stageIndex: number;
}

const INITIAL_DEALS: DealItem[] = [
  {
    id: "deal-1",
    title: "1 Kanal Designer Villa",
    society: "DHA Phase 6, Lahore",
    leadName: "Malik Usman",
    price: "PKR 8.5 Cr",
    source: "WhatsApp Lead",
    agent: "Hamza A.",
    stageIndex: 0,
  },
  {
    id: "deal-2",
    title: "10 Marla Commercial Plot",
    society: "Bahria Town Karachi",
    leadName: "Dr. Farhan Qazi",
    price: "PKR 6.0 Cr",
    source: "Zameen Portal",
    agent: "Ayesha K.",
    stageIndex: 0,
  },
  {
    id: "deal-3",
    title: "4-Bed Luxury Seafront Penthouse",
    society: "Clifton Block 4, Karachi",
    leadName: "Tariq Mansoor (Overseas PK)",
    price: "PKR 14.5 Cr",
    source: "Direct Referral",
    agent: "Zaid Khan",
    stageIndex: 1,
  },
  {
    id: "deal-4",
    title: "500 Sq Yd Residential Plot",
    society: "Sector F-7/2, Islamabad",
    leadName: "Chaudhry Nadeem",
    price: "PKR 7.5 Cr",
    source: "Facebook Campaign",
    agent: "Hamza A.",
    stageIndex: 1,
  },
  {
    id: "deal-5",
    title: "2 Kanal Farmhouse Estate",
    society: "Bedian Road, Lahore",
    leadName: "Brig. (R) Javed Akhtar",
    price: "PKR 18.2 Cr",
    source: "Walk-in VIP",
    agent: "Ayesha K.",
    stageIndex: 2,
  },
  {
    id: "deal-6",
    title: "Corporate Floor · 4,200 Sq Ft",
    society: "Blue Area, Islamabad",
    leadName: "Apex FinTech Group",
    price: "PKR 21.0 Cr",
    source: "B2B Contract",
    agent: "Hamza A.",
    stageIndex: 3,
  },
];

const STAGE_NAMES = [
  { name: "New Inquiries", color: "from-indigo-500 to-indigo-600", border: "border-indigo-500/40" },
  { name: "Site Visit Booked", color: "from-cyan-500 to-teal-500", border: "border-cyan-500/40" },
  { name: "Under Negotiation", color: "from-amber-500 to-orange-500", border: "border-amber-500/40" },
  { name: "Closed Won", color: "from-emerald-500 to-teal-600", border: "border-emerald-500/40" },
];

export function InteractivePipelinePreview() {
  const [deals, setDeals] = useState<DealItem[]>(INITIAL_DEALS);
  const [activeMobileTab, setActiveMobileTab] = useState(0);

  const moveDealNext = (dealId: string) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const nextStage = (d.stageIndex + 1) % STAGE_NAMES.length;
          return { ...d, stageIndex: nextStage };
        }
        return d;
      })
    );
  };

  return (
    <div className="rounded-3xl bg-[#060B1C]/90 border border-white/10 shadow-2xl p-4 sm:p-7 text-white overflow-hidden backdrop-blur-2xl relative">
      {/* Top Specular Sheen Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500" />
      
      {/* Browser Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-slate-400">
            app.proptechcrm.com/pipeline · Apex Real Estate (Karachi / Lahore)
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px] border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Interactive Motion Simulator
          </span>
          <span className="text-[10px] text-slate-400">Click &ldquo;Advance Stage&rdquo; to test deal velocity</span>
        </div>
      </div>

      {/* Mobile Stage Selector */}
      <div className="flex sm:hidden overflow-x-auto gap-2 py-3 border-b border-white/10">
        {STAGE_NAMES.map((st, i) => (
          <button
            key={i}
            onClick={() => setActiveMobileTab(i)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeMobileTab === i
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-white/[0.04] text-slate-400"
            }`}
          >
            {st.name}
          </button>
        ))}
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        {STAGE_NAMES.map((stage, sIdx) => {
          const isMobileVisible = activeMobileTab === sIdx;
          const stageDeals = deals.filter((d) => d.stageIndex === sIdx);

          return (
            <div
              key={sIdx}
              className={`flex flex-col bg-white/[0.03] rounded-3xl p-3.5 border border-white/8 ${
                isMobileVisible ? "block" : "hidden sm:flex"
              }`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/8">
                <div>
                  <h4 className="text-xs font-black text-white tracking-wide uppercase">
                    {stage.name}
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-400">
                    {stageDeals.length} Active Deals
                  </span>
                </div>
                <span className="w-6 h-6 rounded-xl bg-white/[0.06] text-slate-300 font-black text-[11px] flex items-center justify-center border border-white/5">
                  {stageDeals.length}
                </span>
              </div>

              {/* Deal Cards with Framer Motion Animation */}
              <div className="space-y-3 flex-1 min-h-[220px]">
                <AnimatePresence>
                  {stageDeals.map((deal) => (
                    <motion.div
                      layout
                      key={deal.id}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.25 }}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/8 hover:border-emerald-500/40 transition-all shadow-md group relative overflow-hidden backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {deal.source}
                        </span>
                        <span className="text-xs font-black text-emerald-400">
                          {deal.price}
                        </span>
                      </div>

                      <h5 className="font-black text-xs text-white leading-tight mb-1">
                        {deal.title}
                      </h5>

                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        <span className="truncate">{deal.society}</span>
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/6">
                        <span className="flex items-center gap-1 font-semibold text-slate-300">
                          <User className="w-3 h-3 text-cyan-400" /> {deal.leadName}
                        </span>
                        <span className="text-slate-400 font-bold">{deal.agent}</span>
                      </div>

                      {/* Interactive Stage Advance Button */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => moveDealNext(deal.id)}
                        className="mt-2.5 w-full py-1.5 px-2 rounded-xl text-[10px] font-black bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 transition-all flex items-center justify-center gap-1 group/btn"
                      >
                        <span>Advance Stage</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {stageDeals.length === 0 && (
                  <div className="h-full flex items-center justify-center py-8 text-center text-slate-500 text-xs font-medium border border-dashed border-white/5 rounded-2xl">
                    No deals in this stage.<br />Advance a deal to see it move here!
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          This live simulation mirrors the real 10-stage funnel inside your agency CRM.
        </p>
        <Link href="/dashboard">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-md">
              Open Full Live Pipeline <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
