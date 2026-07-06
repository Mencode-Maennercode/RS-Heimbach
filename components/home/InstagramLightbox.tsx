"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X, Instagram, ExternalLink, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import type { InstagramTile } from "@/lib/instagram";

interface InstagramLightboxProps {
  post: InstagramTile | null;
  instagramHandle: string;
  onClose: () => void;
}

export default function InstagramLightbox({ post, instagramHandle, onClose }: InstagramLightboxProps) {
  const [mediaIndex, setMediaIndex] = useState(0);

  if (!post) return null;

  const mediaArray = Array.isArray(post.media) ? post.media : [post.media];
  const current = mediaArray[mediaIndex];
  const isVideo = post.mediaKinds ? post.mediaKinds[mediaIndex] === "video" : current.endsWith(".mp4");
  const hasMultiple = mediaArray.length > 1;

  const goPrev = () => setMediaIndex((i) => (i === 0 ? mediaArray.length - 1 : i - 1));
  const goNext = () => setMediaIndex((i) => (i === mediaArray.length - 1 ? 0 : i + 1));

  return (
    <Dialog.Root
      open={!!post}
      onOpenChange={(open) => {
        if (!open) {
          setMediaIndex(0);
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col sm:flex-row"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Instagram-Beitrag</Dialog.Title>

          <Dialog.Close className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </Dialog.Close>

          {/* Media */}
          <div className="relative bg-black w-full sm:w-3/5 aspect-square shrink-0">
            {isVideo ? (
              <video className="w-full h-full object-contain" controls autoPlay muted playsInline>
                <source src={current} type="video/mp4" />
              </video>
            ) : (
              <Image src={current} alt={post.caption} fill className="object-contain" sizes="60vw" />
            )}

            {hasMultiple && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Vorheriges Medium"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Naechstes Medium"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {mediaArray.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setMediaIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === mediaIndex ? "bg-white w-4" : "bg-white/50 w-1.5"
                      }`}
                      aria-label={`Medium ${i + 1} anzeigen`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col p-6 sm:w-2/5 min-h-0">
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-900">
              <Instagram className="w-4 h-4 text-[#e1306c]" />
              @{instagramHandle}
            </div>

            <div className="overflow-y-auto flex-1 min-h-0">
              <p className="text-sm text-slate-600 leading-relaxed">
                {post.caption || "Kein Text zu diesem Beitrag."}
              </p>

              {post.topComments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                  {post.topComments.map((c, i) => (
                    <p key={i} className="text-sm leading-relaxed">
                      <span className="font-bold text-slate-900">{c.username}</span>{" "}
                      <span className="text-slate-600">{c.text}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-5 pt-5 border-t border-slate-100 shrink-0">
              <a
                href={`https://www.instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <UserPlus className="w-4 h-4" />
                Folgen
              </a>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Auf Instagram ansehen
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
