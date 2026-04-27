"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap, Instagram } from "lucide-react";
import { navItems, schoolInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur",
        scrolled
          ? "bg-white/95 shadow-lg shadow-teal-900/10"
          : "bg-white/80"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#1DA499] flex items-center justify-center shadow-lg group-hover:shadow-[#1DA499]/30 transition-all duration-300 group-hover:scale-105">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#1DA499] leading-none">Realschule</p>
              <p className="text-lg font-black text-[#1DA499] leading-none tracking-tight">Am Heimbach</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                    pathname === item.href
                      ? "bg-[#1DA499] text-white"
                      : "text-slate-700 hover:bg-[#1DA499]/8 hover:text-[#1DA499]"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        activeDropdown === item.label ? "rotate-180" : ""
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-[#1DA499] hover:text-white transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA + Instagram */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://www.instagram.com/${schoolInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Link
              href="/kontakt"
              className="px-5 py-2.5 bg-[#1DA499] hover:bg-[#17a89d] text-white text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#1DA499]/25"
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-800 font-semibold hover:bg-[#1DA499] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-[#1DA499] hover:bg-teal-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <Link
                  href="/kontakt"
                  className="flex items-center justify-center py-3 gradient-hero text-white font-bold rounded-xl"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
