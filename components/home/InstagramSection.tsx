"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { instagramPosts, schoolInfo } from "@/lib/data";
import InstagramPost from "./InstagramPost";

export default function InstagramSection() {
  return (
    <section className="py-24 bg-[#f0fffe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-bold mb-4">
            <Instagram className="w-4 h-4" />
            @{schoolInfo.instagram}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#1DA499] mb-3">
            Folgt uns auf Instagram
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Einblicke in den Schulalltag, Projekte und besondere Momente – direkt aus der RS Heimbach.
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-2 sm:gap-3 mb-10">
          {instagramPosts.map((post, i) => (
            <InstagramPost
              key={post.id}
              post={post}
              index={i}
              isLarge={i === 0}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href={`https://www.instagram.com/${schoolInfo.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:opacity-90 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            @{schoolInfo.instagram} auf Instagram besuchen
          </a>
        </motion.div>
      </div>
    </section>
  );
}
