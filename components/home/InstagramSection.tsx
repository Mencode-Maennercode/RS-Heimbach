"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import { instagramPosts, schoolInfo } from "@/lib/data";

export default function InstagramSection() {
  return (
    <section className="py-24 bg-[#f8f9ff]">
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
          <h2 className="text-4xl sm:text-5xl font-black text-[#1a3a6b] mb-3">
            Folgt uns auf Instagram
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Einblicke in den Schulalltag, Projekte und besondere Momente – direkt aus der RS Heimbach.
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-2 sm:gap-3 mb-10">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={`https://www.instagram.com/${schoolInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-xl bg-slate-200 ${
                i === 0 ? "lg:col-span-3 lg:row-span-2" :
                i === 1 ? "lg:col-span-3" :
                i === 2 ? "lg:col-span-3" :
                "lg:col-span-3"
              }`}
              style={{ aspectRatio: i === 0 ? "1/1" : "1/1" }}
            >
              <div className="relative w-full h-full" style={{ paddingBottom: "100%" }}>
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-3">
                <div className="flex items-center gap-4 text-white text-sm font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    {post.comments}
                  </span>
                </div>
                <p className="text-white/80 text-xs mt-2 line-clamp-2 text-center">
                  {post.caption}
                </p>
              </div>
            </motion.a>
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
            Profil auf Instagram besuchen
          </a>
        </motion.div>
      </div>
    </section>
  );
}
