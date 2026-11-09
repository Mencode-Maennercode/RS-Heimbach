"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { getEnrollmentInfo } from "@/lib/schoolYear";

// Anmelde-Banner direkt unter der Navbar, nur waehrend der Anmeldephase
// (1. November - 1. April). Wegklicken gilt nur bis zum Neuladen der Seite.
export default function EnrollmentBanner() {
  const { isOpen, schoolYearLabel } = getEnrollmentInfo();
  const [dismissed, setDismissed] = useState(false);
  if (!isOpen || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-[#e8442a] via-[#f08a3a] to-[#f5a623] text-white">
      <div className="max-w-7xl mx-auto pl-4 pr-12 sm:px-6 lg:px-8 py-2.5 relative flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
        <span className="font-bold">Anmeldung Schuljahr {schoolYearLabel}</span>
        <span className="hidden md:inline text-white/90">Jetzt informieren und Ihr Kind an der Schule anmelden.</span>
        <Link
          href="/anmeldung"
          className="inline-flex items-center gap-1.5 bg-white text-[#e8442a] px-4 py-1.5 rounded-full font-bold text-xs hover:shadow-lg transition-shadow whitespace-nowrap"
        >
          Jetzt anmelden <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hinweis schließen"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
