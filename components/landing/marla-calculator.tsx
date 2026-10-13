"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Calculator, ArrowRightLeft, Sparkles, CheckCircle2, Coins, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MarlaCalculator() {
  const [unitType, setUnitType] = useState<"marla" | "kanal">("kanal");
  const [size, setSize] = useState<number>(1);
  const [standard, setStandard] = useState<"lahore" | "standard">("lahore"); // Lahore/DHA = 225 sq ft/marla, CDA/Rawalpindi = 250 or 272 sq ft
  const [ratePerUnit, setRatePerUnit] = useState<number>(65000000); // 6.5 Crore for 1 Kanal in DHA Phase 6

  const sqFtPerMarla = standard === "lahore" ? 225 : 272.25;
  const marlaCount = unitType === "kanal" ? size * 20 : size;
  const totalSqFt = marlaCount * sqFtPerMarla;
  const totalSqYards = Math.round(totalSqFt / 9);
  const totalCrores = (ratePerUnit / 10000000).toFixed(2);
  const ratePerMarla = (ratePerUnit / marlaCount).toLocaleString("en-PK", { maximumFractionDigits: 0 });

  return (
    <div className="rounded-3xl bg-[#060B1C]/90 border border-white/10 shadow-2xl p-6 sm:p-8 text-white backdrop-blur-2xl relative overflow-hidden">
      {/* Top Specular Sheen Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Calculator className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              Pakistan Land Dimensions & Valuation Engine
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time conversions between Marla, Kanal, Square Yards (Gaz), and Crores / Lacs.
          </p>
        </div>

        {/* Standard Selector */}
        <div className="flex items-center p-1 rounded-2xl bg-white/[0.04] border border-white/10 text-xs">
          <button
            onClick={() => setStandard("lahore")}
            className={`px-3.5 py-1.5 rounded-xl font-black transition-all ${
              standard === "lahore" 
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            DHA / Lahore (225 sq ft)
          </button>
          <button
            onClick={() => setStandard("standard")}
            className={`px-3.5 py-1.5 rounded-xl font-black transition-all ${
              standard === "standard" 
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            CDA / Revenue (272 sq ft)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Unit Type & Size Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2.5">
              <span>Dimension Input</span>
              <span className="text-emerald-400 font-mono text-sm font-black">
                {size} {unitType.toUpperCase()} ({marlaCount} Marlas)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={() => {
                  setUnitType("kanal");
                  setSize(1);
                  setRatePerUnit(65000000);
                }}
                className={`py-2.5 rounded-2xl text-xs font-black border transition-all ${
                  unitType === "kanal"
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30"
                    : "bg-white/[0.03] text-slate-400 border-white/8 hover:bg-white/[0.06]"
                }`}
              >
                Kanal (20 Marla)
              </button>
              <button
                onClick={() => {
                  setUnitType("marla");
                  setSize(10);
                  setRatePerUnit(35000000);
                }}
                className={`py-2.5 rounded-2xl text-xs font-black border transition-all ${
                  unitType === "marla"
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30"
                    : "bg-white/[0.03] text-slate-400 border-white/8 hover:bg-white/[0.06]"
                }`}
              >
                Marla
              </button>
            </div>
            <input
              type="range"
              min={unitType === "kanal" ? 1 : 2}
              max={unitType === "kanal" ? 8 : 40}
              step={unitType === "kanal" ? 0.5 : 1}
              value={size}
              onChange={(e) => setSize(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-white/10 rounded-lg"
            />
          </div>

          {/* Rate Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2.5">
              <span>Estimated Market Valuation</span>
              <span className="text-amber-400 font-mono text-sm font-black">
                PKR {totalCrores} Crores
              </span>
            </div>
            <input
              type="range"
              min={10000000}
              max={250000000}
              step={2500000}
              value={ratePerUnit}
              onChange={(e) => setRatePerUnit(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-white/10 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>PKR 1.0 Cr</span>
              <span>PKR 12.5 Cr</span>
              <span>PKR 25.0 Cr</span>
            </div>
          </div>
        </div>

        {/* Live Converted Output Cards */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-4 rounded-3xl bg-white/[0.03] border border-white/8 backdrop-blur-xl">
            <span className="text-[10px] uppercase font-black text-slate-400">Total Square Feet</span>
            <p className="text-2xl font-black text-cyan-400 mt-1">
              {totalSqFt.toLocaleString()} <span className="text-xs font-medium text-slate-400">sq ft</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Based on {sqFtPerMarla} sq ft/marla</p>
          </motion.div>

          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-4 rounded-3xl bg-white/[0.03] border border-white/8 backdrop-blur-xl">
            <span className="text-[10px] uppercase font-black text-slate-400">Square Yards (Gaz)</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">
              {totalSqYards.toLocaleString()} <span className="text-xs font-medium text-slate-400">Sq Yds</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Sindh & Karachi standard</p>
          </motion.div>

          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-4 rounded-3xl bg-white/[0.03] border border-white/8 backdrop-blur-xl">
            <span className="text-[10px] uppercase font-black text-slate-400">Rate per Marla</span>
            <p className="text-xl font-black text-amber-400 mt-1">
              PKR {ratePerMarla}
            </p>
            <p className="text-[10px] text-slate-400 mt-1">Calculated unit rate</p>
          </motion.div>

          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-4 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-teal-950/40 to-slate-950 border border-emerald-500/30 backdrop-blur-xl">
            <span className="text-[10px] uppercase font-black text-emerald-300">Total Valuation</span>
            <p className="text-2xl font-black text-white mt-1">
              ₨ {totalCrores} <span className="text-xs font-medium text-emerald-200">Crores</span>
            </p>
            <p className="text-[10px] text-emerald-300 mt-1">Synced to active CRM inventory</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
