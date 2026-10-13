import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] flex flex-col items-center justify-center p-4 text-center transition-colors relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <Logo variant="full" className="mb-6" />
      <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 border border-rose-200 dark:border-rose-800">
        <ShieldAlert className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-bold text-navy-deep dark:text-white">Access Restricted</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6">
        Your current role does not have authorization to access this administrative module or record.
      </p>
      <Link href="/dashboard">
        <Button variant="primary" size="sm">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
