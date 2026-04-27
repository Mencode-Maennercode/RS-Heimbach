"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/215470.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a5a54]/92 via-[#1DA499]/78 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a5a54]/55 via-transparent to-transparent" />
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
              <span className="inline-block bg-gradient-to-r from-[#FFA726] via-[#FB8C00] to-[#F57C00] bg-clip-text text-transparent">Zukunft planen.</span>
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
            <Link
              href="/aktuelles"
              className="group inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 backdrop-blur-sm"
            >
              <Play className="w-4 h-4" />
              Aktuelles
            </Link>
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
