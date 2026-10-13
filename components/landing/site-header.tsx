"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Layers,
  Compass,
  Calculator,
  Lock,
} from "lucide-react";

interface SiteHeaderProps {
  activeSection?: string;
}

export function SiteHeader({ activeSection }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "/features" },
    { label: "Marla Engine", href: "/#interactive-suite" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security & RLS", href: "/security" },
    { label: "About", href: "/about" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 dark:bg-[#040714]/85 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo variant="full" showTagline href="/" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 relative py-1 ${
                  isActive ? "text-emerald-600 dark:text-emerald-400 font-black" : ""
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400">
              Agency Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black shadow-lg shadow-emerald-950/40 border border-emerald-400/30 rounded-2xl px-5 h-10 text-xs">
                Launch Live CRM <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#070D22]/95 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-3xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-3 text-base font-bold text-slate-800 dark:text-slate-200">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col gap-2.5">
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl h-11">
                  Launch Live CRM Console
                </Button>
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full font-bold rounded-xl h-11 border-slate-300 dark:border-white/10">
                  Agency Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
