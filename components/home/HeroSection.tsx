"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&h=1080&fit=crop"
          alt="Schule Gebäude"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2447]/90 via-[#1a3a6b]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2447]/50 via-transparent to-transparent" />
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
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 right-[10%] w-20 h-20 bg-[#f5a623]/20 rounded-3xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 right-[15%] w-14 h-14 bg-[#e8442a]/20 rounded-2xl hidden lg:block"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 bg-[#f5a623] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Schuljahr 2025/2026 · Troisdorf</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight"
          >
            Gemeinsam
            <br />
            <span className="text-[#f5a623]">wachsen.</span>
            <br />
            Zukunft
            <br />
            <span className="text-[#e8442a]">gestalten.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg"
          >
            Herzlich willkommen an der Realschule Am Heimbach – einer modernen Ganztagsschule
            in Troisdorf mit über 590 Schülerinnen und Schülern.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/unsere-schule"
              className="group inline-flex items-center gap-2 bg-[#e8442a] hover:bg-[#d43820] text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-[#e8442a]/30 hover:scale-105"
            >
              Unsere Schule entdecken
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/aktuelles"
              className="group inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="w-4 h-4" />
              Aktuelles
            </Link>
          </motion.div>
        </div>

        {/* Info cards floating bottom-right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-12 right-8 hidden xl:flex flex-col gap-3"
        >
          {[
            { label: "Schülerinnen & Schüler", value: "590+" },
            { label: "Lehrerinnen & Lehrer", value: "55" },
            { label: "Klassen", value: "24" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 flex items-center gap-4"
            >
              <span className="text-2xl font-black text-[#f5a623]">{stat.value}</span>
              <span className="text-white/80 text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
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
