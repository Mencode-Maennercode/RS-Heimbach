"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Palette, Tag, User, Calendar } from "lucide-react";
import { artBlogPosts } from "@/lib/data";

export default function KunstBlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-[#0f2447] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=500&fit=crop" alt="" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2447]/90 to-[#0f2447]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-5 h-5 text-[#f5a623]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#f5a623]">Kreativität</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Kunst-Blog</h1>
            <p className="text-white/70 text-xl max-w-xl">
              Einblicke in die kreative Welt unserer Schülerinnen und Schüler –
              von Graffiti über Modellbau bis zur Schülerzeitung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-[#f8f9ff] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 lg:h-full min-h-[320px] overflow-hidden">
                <Image src={artBlogPosts[0].image} alt={artBlogPosts[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 bg-[#f5a623]/15 text-[#f5a623] border border-[#f5a623]/30 text-xs font-bold px-3 py-1 rounded-full">
                    <Tag className="w-3 h-3" />{artBlogPosts[0].category}
                  </span>
                  <span className="text-slate-500 text-xs">⭐ Highlight</span>
                </div>
                <h2 className="text-3xl font-black text-[#1a3a6b] mb-3 leading-tight">{artBlogPosts[0].title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{artBlogPosts[0].artist}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />
                    {new Date(artBlogPosts[0].date).toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed mb-5">{artBlogPosts[0].excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {artBlogPosts[0].tags.map((tag) => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artBlogPosts.slice(1).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-[#f8f9ff] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2447]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <User className="w-3 h-3" />{post.artist}
                  </div>
                  <h3 className="font-black text-lg text-[#1a3a6b] mb-2 group-hover:text-[#e8442a] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-white border border-slate-200 text-slate-500 px-2.5 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0f2447]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Palette className="w-12 h-12 text-[#f5a623] mx-auto mb-5" />
          <h2 className="text-3xl font-black text-white mb-3">Kreativität kennt keine Grenzen</h2>
          <p className="text-white/70 mb-6 max-w-lg mx-auto">
            Haben Sie Interesse daran, Kunstprojekte an unserer Schule zu unterstützen? Werden Sie Mitglied im Förderverein!
          </p>
          <a
            href="/foerderverein"
            className="inline-flex items-center gap-2 bg-[#f5a623] text-white px-7 py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Zum Förderverein
          </a>
        </div>
      </section>
    </>
  );
}
