"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, ExternalLink } from "lucide-react";
import { schoolInfo } from "@/lib/data";
import { loadInstagramPosts, type InstagramTile } from "@/lib/instagram";
import InstagramPost from "./InstagramPost";
import InstagramLightbox from "./InstagramLightbox";

export default function InstagramSection() {
  const [posts, setPosts] = useState<InstagramTile[]>([]);
  const [activePost, setActivePost] = useState<InstagramTile | null>(null);

  useEffect(() => {
    loadInstagramPosts(10).then(setPosts);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="pb-24 bg-[#f0fffe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#e8442a] mb-2">
              Social Media
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#1DA499]">
              Neues aus unserem Feed
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://www.instagram.com/${schoolInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-4 py-2 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Folgen
            </a>
            <a
              href={`https://www.instagram.com/${schoolInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Profil öffnen
            </a>
          </div>
        </motion.div>

        {/* Kachel-Reihe */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {posts.map((post, i) => (
            <InstagramPost key={post.id} post={post} index={i} onOpen={() => setActivePost(post)} />
          ))}
        </div>
      </div>

      <InstagramLightbox
        post={activePost}
        instagramHandle={schoolInfo.instagram}
        onClose={() => setActivePost(null)}
      />
    </section>
  );
}
