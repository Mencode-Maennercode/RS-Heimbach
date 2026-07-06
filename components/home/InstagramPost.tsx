"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle, Play, Film } from "lucide-react";
import { useState } from "react";

interface InstagramPostProps {
  post: {
    id: string | number;
    type: "photo" | "reel" | "carousel";
    media: string | string[];
    mediaKinds?: Array<"image" | "video">;
    thumbnail: string;
    caption: string;
    likes: number;
    comments: number;
    timestamp: string;
    url: string;
  };
  index: number;
  isLarge?: boolean;
}

export default function InstagramPost({ post, index, isLarge = false }: InstagramPostProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const mediaArray = Array.isArray(post.media) ? post.media : [post.media];

  const handleMediaClick = (e: React.MouseEvent) => {
    if (post.type === "reel" && !isVideoPlaying) {
      e.preventDefault();
      setIsVideoPlaying(true);
    }
  };

  const renderMedia = () => {
    const currentMedia = mediaArray[currentMediaIndex];
    const isVideo = post.mediaKinds
      ? post.mediaKinds[currentMediaIndex] === "video"
      : currentMedia.endsWith('.mp4');

    if (isVideo) {
      return (
        <div className="relative w-full h-full">
          <video
            className={`w-full h-full object-cover ${isVideoPlaying ? '' : 'opacity-90'}`}
            autoPlay={isVideoPlaying}
            muted
            loop
            playsInline
            onClick={handleMediaClick}
          >
            <source src={currentMedia} type="video/mp4" />
          </video>
          {!isVideoPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-black ml-1" />
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Image
        src={currentMedia}
        alt={post.caption}
        fill
        className="object-cover"
      />
    );
  };

  const getMediaIcon = () => {
    switch (post.type) {
      case "reel":
        return <Film className="w-3 h-3" />;
      case "carousel":
        return <div className="flex gap-0.5">
          {[...Array(Math.min(3, mediaArray.length))].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>;
      default:
        return null;
    }
  };

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-xl bg-slate-200 ${
        isLarge ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-3"
      }`}
      style={{ aspectRatio: "1/1" }}
    >
      {/* Media */}
      <div className="relative w-full h-full">
        {renderMedia()}
        
        {/* Media type indicator */}
        {post.type !== "photo" && (
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 text-white">
            {getMediaIcon()}
          </div>
        )}

        {/* Carousel navigation */}
        {post.type === "carousel" && mediaArray.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {mediaArray.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentMediaIndex(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentMediaIndex ? "bg-white w-3" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
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
  );
}
