"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Person = {
  name: string;
  role: string;
  image: string;
  bio: string;
  subjects: string[];
  phone: string;
  email: string;
};

// Oster-Ei: 5x Rechtsklick binnen 5s (Desktop) bzw. 5x Antippen binnen 3s
// (Mobil) auf Werners Foto tauscht es 10s lang gegen das Karnevalsfoto.
const WERNER_SWAP_IMAGE = "/images/schulleitung/werner1.jpg";
const SWAP_DURATION_MS = 10_000;
const CLICKS_NEEDED = 5;
const DESKTOP_WINDOW_MS = 5_000;
const MOBILE_WINDOW_MS = 3_000;

export default function LeadershipCard({ person, index }: { person: Person; index: number }) {
  const isWerner = person.name.toLowerCase().includes("werner");
  const [swapped, setSwapped] = useState(false);
  const clickTimestamps = useRef<number[]>([]);
  const revertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (revertTimer.current) clearTimeout(revertTimer.current);
    };
  }, []);

  function registerClick(windowMs: number) {
    const now = Date.now();
    clickTimestamps.current = [...clickTimestamps.current.filter((t) => now - t < windowMs), now];
    if (clickTimestamps.current.length >= CLICKS_NEEDED) {
      clickTimestamps.current = [];
      setSwapped(true);
      if (revertTimer.current) clearTimeout(revertTimer.current);
      revertTimer.current = setTimeout(() => setSwapped(false), SWAP_DURATION_MS);
    }
  }

  function handleContextMenu(e: React.MouseEvent) {
    if (!isWerner) return;
    e.preventDefault();
    registerClick(DESKTOP_WINDOW_MS);
  }

  function handleTouchEnd() {
    if (!isWerner) return;
    registerClick(MOBILE_WINDOW_MS);
  }

  const imageSrc = isWerner && swapped ? WERNER_SWAP_IMAGE : person.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-0">
        <div
          className="relative h-72 sm:h-full min-h-[280px]"
          onContextMenu={handleContextMenu}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={imageSrc}
            alt={person.name}
            fill
            unoptimized={imageSrc.startsWith("data:")}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2447]/60 via-transparent to-transparent sm:bg-gradient-to-r" />
        </div>
        <div className="p-8 md:p-10">
          <div className="inline-block bg-[#1a3a6b] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            {person.role}
          </div>
          <h2 className="text-2xl font-black text-[#1a3a6b] mb-2">{person.name}</h2>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {person.subjects.map((s) => (
              <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">{s}</span>
            ))}
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">{person.bio}</p>
          <div className="space-y-2">
            <a href={`tel:0224177715`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#1a3a6b]">
              <Phone className="w-4 h-4 text-[#1a3a6b]" />{person.phone}
            </a>
            <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#1a3a6b]">
              <Mail className="w-4 h-4 text-[#1a3a6b]" />{person.email}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
