"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const MOCK_PIPELINE_STAGES = [
  {
    name: "New Inquiries",
    count: 3,
    totalPKR: "PKR 14.5 Cr",
    deals: [
      {
        title: "1 Kanal Designer Villa",
        society: "DHA Phase 6, Lahore",
        leadName: "Malik Usman",
        price: "PKR 8.5 Cr",
        source: "WhatsApp Lead",
        agent: "Hamza A.",
      },
      {
        title: "10 Marla Commercial Plot",
        society: "Bahria Town Karachi",
        leadName: "Dr. Farhan Qazi",
        price: "PKR 6.0 Cr",
        source: "Zameen Portal",
        agent: "Ayesha K.",
      },
    ],
  },
  {
    name: "Site Visit Booked",
    count: 2,
    totalPKR: "PKR 22.0 Cr",
    deals: [
      {
        title: "4-Bed Luxury Seafront Penthouse",
        society: "Clifton Block 4, Karachi",
        leadName: "Tariq Mansoor (Overseas PK)",
        price: "PKR 14.5 Cr",
        source: "Direct Referral",
        agent: "Zaid Khan",
      },
      {
        title: "500 Sq Yd Residential Plot",
        society: "Sector F-7/2, Islamabad",
        leadName: "Chaudhry Nadeem",
        price: "PKR 7.5 Cr",
        source: "Facebook Campaign",
        agent: "Hamza A.",
      },
    ],
  },
  {
    name: "Under Negotiation",
    count: 2,
    totalPKR: "PKR 18.2 Cr",
    deals: [
      {
        title: "2 Kanal Farmhouse Estate",
        society: "Bedian Road, Lahore",
        leadName: "Brig. (R) Javed Akhtar",
        price: "PKR 18.2 Cr",
        source: "Walk-in VIP",
        agent: "Ayesha K.",
      },
    ],
  },
  {
    name: "Closed Won",
    count: 4,
    totalPKR: "PKR 35.8 Cr",
    deals: [
      {
        title: "Corporate Floor · 4,200 Sq Ft",
        society: "Blue Area, Islamabad",
        leadName: "Apex FinTech Group",
        price: "PKR 21.0 Cr",
        source: "B2B Contract",
        agent: "Hamza A.",
      },
      {
        title: "8 Marla Luxury Duplex",
        society: "DHA Phase 5, Karachi",
        leadName: "Mrs. Bilquis Rauf",
        price: "PKR 14.8 Cr",
        source: "Website Direct",
        agent: "Zaid Khan",
      },
    ],
  },
];

export function InteractivePipelinePreview() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="rounded-3xl bg-slate-900/95 dark:bg-[#0B1120] border border-indigo-500/30 shadow-2xl p-4 sm:p-6 text-white overflow-hidden backdrop-blur-xl">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-slate-400">
            app.proptechcrm.com/pipeline · Skyline Properties (Karachi/Lahore)
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
            Live Database Connected (PKR)
          </span>
          <span className="text-[10px] text-slate-400">Updated seconds ago</span>
        </div>
      </div>

      {/* Stage Selector Tabs (Mobile & Tablet) */}
      <div className="flex sm:hidden overflow-x-auto gap-2 py-3 border-b border-slate-800">
        {MOCK_PIPELINE_STAGES.map((st, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === i
                ? "bg-primary text-white"
                : "bg-slate-800/80 text-slate-400"
            }`}
          >
            {st.name} ({st.count})
          </button>
        ))}
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
        {MOCK_PIPELINE_STAGES.map((stage, sIdx) => {
          // On mobile, only show the active tab
          const isMobileVisible = activeTab === sIdx;

          return (
            <div
              key={sIdx}
              className={`flex flex-col bg-slate-950/70 rounded-2xl p-3 border border-slate-800/90 ${
                isMobileVisible ? "block" : "hidden sm:flex"
              }`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-200 tracking-wide uppercase">
                    {stage.name}
                  </h4>
                  <span className="text-[10px] font-bold text-cyan">
                    {stage.totalPKR}
                  </span>
                </div>
                <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 font-bold text-[10px] flex items-center justify-center">
                  {stage.count}
                </span>
              </div>

              {/* Deal Cards */}
              <div className="space-y-2.5 flex-1">
                {stage.deals.map((deal, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800/80 hover:border-indigo-500/50 transition-all shadow-sm group cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-xs font-bold text-white group-hover:text-cyan transition-colors leading-tight">
                        {deal.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan transition-colors shrink-0" />
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{deal.society}</span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-gold">
                        {deal.price}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[9px]">
                        {deal.agent}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar CTA */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Multi-tenant encrypted · Zero competitor data leaks</span>
        </div>
        <Link
          href="/pipeline"
          className="font-bold text-cyan hover:underline flex items-center gap-1"
        >
          Open Full Interactive Pipeline & Board <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
