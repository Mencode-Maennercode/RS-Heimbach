import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Phone, Search } from "lucide-react";
import { navItems, schoolInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  description:
    "Diese Seite der Realschule Am Heimbach Troisdorf existiert nicht (mehr). Hier finden Sie die Startseite, den Kontakt und alle Bereiche der Website.",
  robots: { index: false, follow: true },
};

/**
 * 404-Seite.
 *
 * Wichtig beim Umzug von der alten Website: Besucher, die ueber ein altes
 * Google-Ergebnis oder ein Lesezeichen auf einer entfallenen URL landen, sollen
 * nicht in einer Sackgasse stehen, sondern die passende neue Seite finden. Die
 * Links hier geben Suchmaschinen ausserdem einen Weg zurueck in die Seite.
 */
export default function NotFound() {
  const sections = navItems.filter((item) => item.children);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#1DA499] mb-3">Fehler 404</p>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0a5a54] mb-4">
            Diese Seite gibt es nicht mehr
          </h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Vielleicht hat sich die Adresse beim Relaunch unserer Website geändert. Über die
            Bereiche unten finden Sie schnell zum Ziel.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#0a5a54] text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Home className="w-4 h-4" /> Zur Startseite
          </Link>
          <a
            href={schoolInfo.phoneLink}
            className="flex items-center gap-2 bg-[#f8f9ff] text-[#0a5a54] px-7 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#f0fffe] transition-colors"
          >
            <Phone className="w-4 h-4" /> {schoolInfo.phone}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div key={section.label} className="bg-[#f8f9ff] rounded-3xl p-6">
              <h2 className="text-sm font-bold text-[#0a5a54] uppercase tracking-widest mb-4">
                {section.label}
              </h2>
              <ul className="space-y-2.5">
                {section.children!.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-slate-600 text-sm hover:text-[#1DA499] transition-colors"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
