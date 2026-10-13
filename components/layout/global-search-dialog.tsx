"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Search, User, Building, TrendingUp, Loader2 } from "lucide-react";
import type { Contact, Lead, Property } from "@/types";

interface GlobalSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchDialog({ isOpen, onClose }: GlobalSearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    contacts: Contact[];
    leads: Lead[];
    properties: Property[];
  }>({ contacts: [], leads: [], properties: [] });

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults({ contacts: [], leads: [], properties: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const [cRes, lRes, pRes] = await Promise.all([
          fetch(`/api/contacts?search=${encodeURIComponent(query)}&limit=4`),
          fetch(`/api/leads?search=${encodeURIComponent(query)}&limit=4`),
          fetch(`/api/properties?search=${encodeURIComponent(query)}&limit=4`),
        ]);

        const cData = await cRes.json();
        const lData = await lRes.json();
        const pData = await pRes.json();

        setResults({
          contacts: cData.contacts || [],
          leads: lData.leads || [],
          properties: pData.properties || [],
        });
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (path: string) => {
    onClose();
    router.push(path);
  };

  const hasAnyResults =
    results.contacts.length > 0 || results.leads.length > 0 || results.properties.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads, contacts, or properties..."
            className="w-full pl-11 pr-10 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-navy-deep placeholder:text-slate-400 transition-all"
          />
          {isLoading && (
            <Loader2 className="absolute right-3.5 top-3.5 w-4 h-4 animate-spin text-primary" />
          )}
        </div>

        <div className="min-h-[180px] max-h-[360px] overflow-y-auto space-y-4 pt-1">
          {query.length >= 2 && !isLoading && !hasAnyResults && (
            <p className="text-center text-sm text-text-secondary py-8">
              No matching records found for "{query}".
            </p>
          )}

          {results.leads.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-primary" /> Leads & Inquiries
              </p>
              <div className="space-y-1">
                {results.leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => handleSelect(`/leads/${lead.id}`)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-sm transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-primary">
                        {lead.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {lead.contact ? `${lead.contact.firstName} ${lead.contact.lastName}` : "No contact"} •{" "}
                        {lead.source}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-primary border border-indigo-100">
                      View Lead
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.contacts.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" /> Contacts
              </p>
              <div className="space-y-1">
                {results.contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => handleSelect(`/contacts/${contact.id}`)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-sm transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-primary">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {contact.phone} {contact.companyName ? `• ${contact.companyName}` : ""}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      View Profile
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.properties.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-600" /> Properties
              </p>
              <div className="space-y-1">
                {results.properties.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => handleSelect(`/properties/${prop.id}`)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-sm transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-primary">
                        {prop.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {prop.city} • {prop.area} • Ref: {prop.listingReference}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                      View Property
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
