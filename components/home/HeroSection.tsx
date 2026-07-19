"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {
  const [showCallPopup, setShowCallPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowCallPopup(false);
      }
    }
    if (showCallPopup) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCallPopup]);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background: handgezeichnete Schul-Skizze als Blueprint/Kreidetafel-Effekt */}
      <div className="absolute inset-0 z-0 bg-[#083f3a]">
        {/* Deep-Teal Grundflaeche, damit die invertierte Skizze markengetreu wirkt */}
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover mix-blend-screen [filter:invert(1)_contrast(1.05)_brightness(1.1)]"
        >
          <source src="/hero-school-sketch.mp4" type="video/mp4" />
        </video>
        {/* Teal-Wash tont den Hintergrund einheitlich in Markenfarbe */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a5a54]/60 via-[#0f6b63]/35 to-[#1DA499]/20 mix-blend-multiply" />
        {/* Links abdunkeln fuer Text-Kontrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062f2b]/90 via-[#0a5a54]/55 to-transparent" />
        {/* Unten leicht abdunkeln fuer Scroll-Indikator */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062f2b]/60 via-transparent to-transparent" />
      </div>

      {/* Floating shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-[20%] w-64 h-64 border border-white/10 rounded-full hidden xl:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 right-[22%] w-44 h-44 border border-white/10 rounded-full hidden xl:block"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-24 right-[30%] w-28 h-28 border border-white/10 rounded-full hidden xl:block"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-3 tracking-tight"
          >
            Realschule
            <br />
            <span className="text-white">Am Heimbach</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-8"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight">
              <span className="inline-block bg-gradient-to-r from-[#FF6B9D] via-[#C44569] to-[#FF6B9D] bg-clip-text text-transparent">Vielfalt leben.</span>{" "}
              <span className="inline-block bg-gradient-to-r from-[#FFD93D] via-[#FFA726] to-[#FF8C42] bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">Gemeinsam wachsen.</span>{" "}
              <span className="inline-block bg-gradient-to-r from-[#FFA726] via-[#FB8C00] to-[#F57C00] bg-clip-text text-transparent">Zukunft gestalten!</span>
            </p>
            <div className="mt-4 h-1 w-32 rounded-full bg-gradient-to-r from-[#FF6B9D] via-[#FFD93D] to-[#FFA726]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-white/85 text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
          >
            Herzlich willkommen an unserer modernen Ganztagsschule in Troisdorf –
            mit über 590 Schülerinnen und Schülern, die hier jeden Tag wachsen, lachen und ihre Zukunft gestalten.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/unsere-schule"
              className="group inline-flex items-center gap-2 bg-[#1DA499] hover:bg-[#17a89d] text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-[#1DA499]/30 hover:scale-105"
            >
              Unsere Schule entdecken
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="relative" ref={popupRef}>
              <button
                onClick={() => setShowCallPopup((v) => !v)}
                className="group inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                Anrufen
              </button>

              <AnimatePresence>
                {showCallPopup && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-0 mb-3 z-50"
                  >
                    <div className="bg-white rounded-xl shadow-2xl px-4 py-3 flex items-center gap-3 whitespace-nowrap">
                      <a
                        href="tel:+49224177715"
                        className="flex items-center gap-2 text-[#0a5a54] font-bold text-base hover:text-[#1DA499] transition-colors"
                      >
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        02241 – 77715
                      </a>
                    </div>
                    {/* arrow */}
                    <div className="w-3 h-3 bg-white rotate-45 ml-6 -mt-1.5 shadow-md" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Mehr entdecken</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
