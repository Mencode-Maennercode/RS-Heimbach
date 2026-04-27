"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, BookOpen, Award, Heart } from "lucide-react";

function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  {
    icon: Users,
    value: 590,
    suffix: "+",
    label: "Schülerinnen & Schüler",
    description: "aus Troisdorf und Umgebung",
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    icon: BookOpen,
    value: 55,
    suffix: "",
    label: "Lehrerinnen & Lehrer",
    description: "plus 5 Sonderpädagog*innen",
    color: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    icon: Award,
    value: 24,
    suffix: "",
    label: "Klassen",
    description: "von Jahrgang 5 bis 10",
    color: "from-orange-500 to-orange-700",
    bg: "bg-orange-50",
    text: "text-orange-700",
  },
  {
    icon: Heart,
    value: 1975,
    suffix: "",
    label: "Gegründet",
    description: "50 Jahre Bildungstradition",
    color: "from-rose-500 to-rose-700",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-3">
            Unsere Zahlen
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#1DA499] mb-4">
            Die Realschule Am Heimbach
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Eine lebendige Schulgemeinschaft im Herzen von Troisdorf – seit über 50 Jahren.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${stat.bg} -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500`} />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-5xl font-black mb-1 ${stat.text}`}>
                  <CountUp target={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-slate-800 font-bold text-base mb-1">{stat.label}</div>
                <div className="text-slate-500 text-sm">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
