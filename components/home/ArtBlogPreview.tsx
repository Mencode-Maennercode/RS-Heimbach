"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Palette, Tag } from "lucide-react";
import { artBlogPosts } from "@/lib/data";

export default function ArtBlogPreview() {
  return (
    <section className="py-24 bg-[#0f2447] relative overflow-hidden">
      {/* decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1a3a6b] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#1a3a6b] rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-5 h-5 text-[#f5a623]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#f5a623]">Kreativität</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">Kunst-Blog</h2>
            <p className="text-white/60 mt-2 max-w-lg">
              Entdecken Sie die kreative Welt unserer Schülerinnen und Schüler.
            </p>
          </div>
          <Link
            href="/kunst-blog"
            className="flex items-center gap-2 text-[#f5a623] font-bold text-sm hover:gap-3 transition-all duration-200 whitespace-nowrap"
          >
            Alle Kunstprojekte <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artBlogPosts.slice(0, 3).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-400"
            >
              <Link href={`/kunst-blog`}>
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2447]/80 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 bg-[#f5a623]/20 text-[#f5a623] border border-[#f5a623]/30 text-xs font-bold px-2.5 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white/50 text-xs font-medium mb-1">{post.artist}</p>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#f5a623] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-white/10 text-white/60 px-2.5 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
