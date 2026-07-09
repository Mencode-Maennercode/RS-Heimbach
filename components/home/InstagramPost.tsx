"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle, Play, Film, Layers } from "lucide-react";
import type { InstagramTile } from "@/lib/instagram";

interface InstagramPostProps {
  post: InstagramTile;
  index: number;
  onOpen: () => void;
}

export default function InstagramPost({ post, index, onOpen }: InstagramPostProps) {
  const hasVideo = post.mediaKinds?.[0] === "video";

  const MediaTypeIcon =
    post.type === "reel" ? Film : post.type === "carousel" ? Layers : null;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 overflow-hidden rounded-2xl bg-slate-200 snap-start"
    >
      <Image
        src={post.thumbnail}
        alt={post.caption}
        fill
        className="object-cover"
        sizes="144px"
        priority={index < 5}
        loading={index < 5 ? undefined : "lazy"}
      />

      {hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-4 h-4 text-black ml-0.5" />
          </div>
        </div>
      )}

      {MediaTypeIcon && (
        <div className="absolute top-1.5 right-1.5 bg-black/50 backdrop-blur-sm rounded-full p-1 text-white">
          <MediaTypeIcon className="w-3 h-3" />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 text-white text-xs font-bold">
        <span className="flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-white" />
          {post.likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          {post.commentsCount}
        </span>
      </div>
    </motion.button>
  );
}
