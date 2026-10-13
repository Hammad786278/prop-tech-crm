import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PropTech CRM — Ultra-Premium Real Estate SaaS",
  description: "More Leads. Better Relationships. More Deals. The high-growth AI-ready real estate CRM for modern agencies, brokerages, and consultants.",
  icons: {
    icon: "/brand/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B14] font-sans antialiased text-text-primary dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
