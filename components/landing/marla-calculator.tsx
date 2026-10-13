"use client";

import React, { useState } from "react";
import { Building2, Calculator, ArrowRightLeft, Sparkles, CheckCircle2 } from "lucide-react";
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
    <div className="rounded-3xl bg-slate-900/95 dark:bg-[#0B1120] border border-indigo-500/30 shadow-2xl p-6 sm:p-8 text-white backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-cyan">
              <Calculator className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              Pakistan Land Dimensions & Valuation Engine
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Instant conversions between Marla, Kanal, Square Yards (Gaz), and Crores / Lacs.
          </p>
        </div>

        {/* Standard Selector */}
        <div className="flex items-center p-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
          <button
            onClick={() => setStandard("lahore")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              standard === "lahore" ? "bg-primary text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            DHA / Lahore (225 sq ft)
          </button>
          <button
            onClick={() => setStandard("standard")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              standard === "standard" ? "bg-primary text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            CDA / Revenue (272 sq ft)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Unit Type & Size Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
              <span>Dimension Input</span>
              <span className="text-cyan font-mono text-sm">
                {size} {unitType.toUpperCase()} ({marlaCount} Marlas)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  setUnitType("kanal");
                  setSize(1);
                  setRatePerUnit(65000000);
                }}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  unitType === "kanal"
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800"
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
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  unitType === "marla"
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800"
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
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Rate Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
              <span>Market Valuation</span>
              <span className="text-gold font-mono text-sm">
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
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
              <span>PKR 1.0 Cr</span>
              <span>PKR 12.5 Cr</span>
              <span>PKR 25.0 Cr</span>
            </div>
          </div>
        </div>

        {/* Live Converted Output Cards */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Square Feet</span>
            <p className="text-2xl font-black text-cyan mt-1">
              {totalSqFt.toLocaleString()} <span className="text-xs font-medium text-slate-400">sq ft</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Based on {sqFtPerMarla} sq ft/marla</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Square Yards (Gaz)</span>
            <p className="text-2xl font-black text-emerald-400 mt-1">
              {totalSqYards.toLocaleString()} <span className="text-xs font-medium text-slate-400">Sq Yds</span>
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Karachi & Sindh official unit</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400">Rate per Marla</span>
            <p className="text-xl font-black text-gold mt-1">
              PKR {ratePerMarla}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Net unit rate</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-slate-950 border border-indigo-500/30">
            <span className="text-[10px] uppercase font-bold text-indigo-300">Total Valuation</span>
            <p className="text-2xl font-black text-white mt-1">
              ₨ {totalCrores} <span className="text-xs font-medium text-indigo-200">Crores</span>
            </p>
            <p className="text-[10px] text-indigo-300 mt-1">Automatic CRM inventory sync</p>
          </div>
        </div>
      </div>
    </div>
  );
}
