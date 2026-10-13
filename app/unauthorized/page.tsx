import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <Logo variant="full" className="mb-6" />
      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 border border-rose-200">
        <ShieldAlert className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-bold text-navy-deep">Access Restricted</h1>
      <p className="text-sm text-text-secondary max-w-sm mt-1 mb-6">
        Your current role does not have authorization to access this administrative module or record.
      </p>
      <Link href="/dashboard">
        <Button size="sm">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
