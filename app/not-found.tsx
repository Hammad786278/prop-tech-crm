import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] flex flex-col items-center justify-center p-4 text-center transition-colors relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <Logo variant="full" className="mb-6" />
      <span className="text-5xl font-black text-primary dark:text-cyan">404</span>
      <h1 className="text-2xl font-bold text-navy-deep dark:text-white mt-2">Page or Record Not Found</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6">
        The lead, property, or CRM page you requested could not be located or may belong to another agency.
      </p>
      <Link href="/dashboard">
        <Button variant="primary" size="sm">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
