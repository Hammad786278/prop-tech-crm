import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <Logo variant="full" className="mb-6" />
      <span className="text-4xl font-black text-primary">404</span>
      <h1 className="text-2xl font-bold text-navy-deep mt-2">Page or Record Not Found</h1>
      <p className="text-sm text-text-secondary max-w-sm mt-1 mb-6">
        The lead, property, or CRM page you requested could not be located or may belong to another agency.
      </p>
      <Link href="/dashboard">
        <Button size="sm">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
