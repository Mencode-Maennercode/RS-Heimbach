"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Phone, Mail, Instagram, Facebook, Youtube, ArrowRight } from "lucide-react";
import { schoolInfo } from "@/lib/data";

const footerLinks = {
  "Unsere Schule": [
    { label: "Über uns", href: "/unsere-schule" },
    { label: "Schulleitung", href: "/unsere-schule/schulleitung" },
    { label: "Kollegium", href: "/lehrer" },
    { label: "Sekretariat", href: "/unsere-schule/sekretariat" },
    { label: "Schulprogramm", href: "/unsere-schule/schulprogramm" },
  ],
  Unterricht: [
    { label: "Schulzeiten & Raster", href: "/unterricht/schulzeiten" },
    { label: "Fächer & Differenzierung", href: "/unterricht/faecher" },
    { label: "Ganztag & AGs", href: "/ganztag" },
    { label: "Mensa", href: "/unterricht/mensa" },
  ],
  Service: [
    { label: "Aktuelles", href: "/aktuelles" },
    { label: "Termine", href: "/veranstaltungen" },
    { label: "Beratung", href: "/beratung" },
    { label: "Eltern", href: "/eltern" },
    { label: "Förderverein", href: "/foerderverein" },
    { label: "Downloads", href: "/service" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a5a54] text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#e8442a] via-[#f08a3a] to-[#f5a623]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-1">Anmeldung Schuljahr 2026/27</h3>
              <p className="text-white/90 text-sm">Jetzt informieren und Ihrem Kind die beste Schule sichern.</p>
            </div>
            <Link
              href="/kontakt"
              className="flex items-center gap-2 bg-white text-[#e8442a] px-7 py-3.5 rounded-2xl font-bold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              Jetzt anmelden <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">Städtische</p>
                <p className="text-lg font-black text-white leading-tight">Realschule Am Heimbach</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Gebundene Ganztagsschule in Troisdorf. Wir begleiten {schoolInfo.students}+ Schülerinnen und Schüler
              auf ihrem Weg in die Zukunft.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#f5a623] shrink-0" />
                <span>{schoolInfo.address}, {schoolInfo.city}</span>
              </div>
              <a href={schoolInfo.phoneLink} className="flex items-center gap-2.5 text-white/60 hover:text-[#f5a623] text-sm transition-colors">
                <Phone className="w-4 h-4 text-[#f5a623] shrink-0" />
                <span>{schoolInfo.phone}</span>
              </a>
              <a href={`mailto:${schoolInfo.email}`} className="flex items-center gap-2.5 text-white/60 hover:text-[#f5a623] text-sm transition-colors break-all">
                <Mail className="w-4 h-4 text-[#f5a623] shrink-0" />
                <span>{schoolInfo.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={`https://www.instagram.com/${schoolInfo.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-[#f5a623] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Realschule Am Heimbach, Troisdorf. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="text-white/40 text-xs hover:text-white/70 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="text-white/40 text-xs hover:text-white/70 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
