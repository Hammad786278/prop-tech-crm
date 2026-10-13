import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkyVista CRM — Real Estate SaaS",
  description: "More Leads. Better Relationships. More Deals. The premium AI-ready real estate CRM for modern agencies.",
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased text-text-primary">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
