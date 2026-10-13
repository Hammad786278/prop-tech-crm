"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Upload, Download, AlertTriangle, CheckCircle2, FileText, Loader2 } from "lucide-react";
import type { CSVImportRow, CSVImportResult } from "@/types";
import { toast } from "sonner";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CSVImportModal({ isOpen, onClose, onSuccess }: ImportModalProps) {
  const [step, setStep] = useState<"upload" | "preview" | "result">("upload");
  const [parsedRows, setParsedRows] = useState<CSVImportRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [importResult, setImportResult] = useState<CSVImportResult | null>(null);

  // Template download
  const handleDownloadTemplate = () => {
    const csvContent =
      "firstName,lastName,phone,email,leadTitle,source,budgetMin,budgetMax,propertyType,preferredLocation,notes\n" +
      "Ahmed,Khan,+92 300 1122334,ahmed.khan@example.com,Inquiry for 10-Marla Plot in DHA,Property Portal,35000000,45000000,Residential Plot,DHA Phase 6,Urgent buyer with ready cash\n" +
      "Sara,Ali,+92 321 9988776,sara.ali@example.com,Looking for 2-Bed Luxury Flat,Website,20000000,28000000,Apartment,Gulberg III,Looking for installment payment plan\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "proptech_leads_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
      if (lines.length <= 1) {
        toast.error("CSV file contains no data rows");
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim());
      const rows: CSVImportRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
        if (values.length < 3) continue;

        rows.push({
          firstName: values[0] || "",
          lastName: values[1] || "",
          phone: values[2] || "",
          email: values[3] || undefined,
          leadTitle: values[4] || `Lead from CSV Row ${i}`,
          source: values[5] || "Property Portal",
          budgetMin: values[6] ? Number(values[6]) : undefined,
          budgetMax: values[7] ? Number(values[7]) : undefined,
          propertyType: values[8] || undefined,
          preferredLocation: values[9] || undefined,
          notes: values[10] || undefined,
        });
      }

      setParsedRows(rows);
      setStep("preview");
    };

    reader.readAsText(file);
  };

  // Submit Import to API
  const handleConfirmImport = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/import/csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: parsedRows }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to import CSV");
        return;
      }

      setImportResult(data);
      setStep("result");
      toast.success(`Import complete! ${data.importedCount} records processed.`);
      onSuccess();
    } catch {
      toast.error("Import request failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep("upload");
    setParsedRows([]);
    setFileName("");
    setImportResult(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Bulk Import Leads via CSV"
      description="Upload leads with automated row validation and duplicate phone detection."
      maxWidth="2xl"
    >
      {step === "upload" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-navy-deep">Download Official CSV Template</p>
              <p className="text-xs text-slate-500">
                Pre-formatted columns for names, phone (+92), budgets, and locations.
              </p>
            </div>
            <Button onClick={handleDownloadTemplate} variant="secondary" size="sm">
              <Download className="w-3.5 h-3.5 mr-1" /> Template .CSV
            </Button>
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50/50 transition-colors">
            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-bold text-navy-deep">Upload CSV File</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Drag and drop your prepared spreadsheet or browse from your computer.
            </p>
            <label className="cursor-pointer inline-flex items-center justify-center font-medium rounded-lg text-xs px-4 py-2 bg-primary text-white hover:bg-primary-hover shadow-sm">
              Select CSV File
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      )}

      {step === "preview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-slate-900">{fileName}</span>
            </div>
            <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
              {parsedRows.length} Rows Detected
            </span>
          </div>

          {/* Preview Table */}
          <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-500 font-semibold sticky top-0">
                  <th className="p-2 pl-3">Row</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Inquiry Title</th>
                  <th className="p-2">Location</th>
                  <th className="p-2 pr-3">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parsedRows.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-2 pl-3 font-mono text-slate-400">{i + 1}</td>
                    <td className="p-2 font-bold text-slate-900">
                      {r.firstName} {r.lastName}
                    </td>
                    <td className="p-2">{r.phone}</td>
                    <td className="p-2 max-w-xs truncate">{r.leadTitle}</td>
                    <td className="p-2">{r.preferredLocation || "—"}</td>
                    <td className="p-2 pr-3">{r.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setStep("upload")}>
              Re-upload File
            </Button>
            <Button size="sm" onClick={handleConfirmImport} isLoading={isLoading}>
              Proceed with Import ({parsedRows.length} rows)
            </Button>
          </div>
        </div>
      )}

      {step === "result" && importResult && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-emerald-900">Import Processing Complete</p>
              <p className="text-xs text-emerald-700 mt-1">
                Successfully processed {importResult.importedCount} inquiries into the database.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-400 uppercase text-[10px]">Total Rows</p>
              <p className="text-lg font-black text-navy-deep mt-0.5">{importResult.totalRows}</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
              <p className="font-bold text-primary uppercase text-[10px]">Linked Duplicates</p>
              <p className="text-lg font-black text-primary mt-0.5">{importResult.duplicateCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-400 uppercase text-[10px]">Errors</p>
              <p className="text-lg font-black text-slate-700 mt-0.5">{importResult.errorCount}</p>
            </div>
          </div>

          {importResult.duplicates.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
              <p className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Duplicate Contacts Matched
              </p>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {importResult.duplicates.map((d, i) => (
                  <p key={i} className="text-[11px] text-amber-800">
                    Row {d.row}: {d.phone} was automatically attached to existing contact "{d.contactName}".
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button size="sm" onClick={handleReset}>
              Done
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
