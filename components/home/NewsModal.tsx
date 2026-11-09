"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";
import { X, Calendar, Tag, ZoomIn, Download } from "lucide-react";
import { useIsFlyer, downloadUrl } from "./flyer";

export interface NewsArticleData {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  fullText: string;
  image: string;
}

interface NewsModalProps {
  article: NewsArticleData | null;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  "SV-News": "bg-blue-100 text-blue-700",
  Projekte: "bg-purple-100 text-purple-700",
  Ausflüge: "bg-green-100 text-green-700",
  Kunst: "bg-pink-100 text-pink-700",
  Musik: "bg-indigo-100 text-indigo-700",
  Schulleben: "bg-orange-100 text-orange-700",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const GENERIC_PARAGRAPHS = [
  "An der Realschule Am Heimbach passiert immer etwas! Unsere Schülerinnen und Schüler engagieren sich täglich für ihre Schulgemeinschaft und nehmen an spannenden Projekten teil.",
  "Wir sind stolz auf das Engagement unserer Schüler*innen und möchten ihre Leistungen und Erlebnisse mit Ihnen teilen. Gemeinsam gestalten wir eine lebendige und inspirierende Schulgemeinschaft.",
  "Möchten Sie mehr über unsere Schulprojekte erfahren? Besuchen Sie uns beim nächsten Tag der offenen Tür oder kontaktieren Sie uns direkt. Wir freuen uns auf Ihren Besuch!",
];

export default function NewsModal({ article, onClose }: NewsModalProps) {
  if (!article) return null;
  return <NewsModalContent article={article} onClose={onClose} />;
}

function NewsModalContent({ article, onClose }: { article: NewsArticleData; onClose: () => void }) {
  const isFlyer = useIsFlyer(article.image);
  const [fullscreen, setFullscreen] = useState(false);

  const paragraphs = article.fullText
    ? article.fullText.split(/\n\s*\n/)
    : GENERIC_PARAGRAPHS;

  return (
    <Dialog.Root open={!!article} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-2xl max-h-[88vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{article.title}</Dialog.Title>

          <Dialog.Close className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </Dialog.Close>

          {!isFlyer && (
            <div className="relative h-56 sm:h-72 shrink-0">
              <Image src={article.image} alt={article.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${categoryColors[article.category] || "bg-slate-100 text-slate-700"}`}>
                  <Tag className="w-3 h-3" />
                  {article.category}
                </span>
              </div>
            </div>
          )}

          <div className="overflow-y-auto p-6 sm:p-8">
            {isFlyer && (
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-3 ${categoryColors[article.category] || "bg-slate-100 text-slate-700"}`}>
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.date)}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a3a6b] mb-4 leading-tight">
              {article.title}
            </h2>
            <p className="text-slate-700 font-medium leading-relaxed mb-4">{article.excerpt}</p>
            <div className="space-y-3">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-slate-600 text-sm leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            {isFlyer && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setFullscreen(true)}
                  className="group relative block w-full rounded-2xl overflow-hidden border border-slate-200 cursor-zoom-in"
                  aria-label="Flyer in voller Größe ansehen"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={article.image} alt={article.title} className="w-full h-auto" />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-bold group-hover:bg-black/85 transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Vollbild
                  </span>
                </button>
                <a
                  href={downloadUrl(article.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DA499] hover:bg-[#178a80] text-white text-sm font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Flyer herunterladen
                </a>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      {/* Vollbild: eigener Dialog ueber dem Beitrag; Escape/Klick schliesst nur ihn. */}
      <Dialog.Root open={fullscreen} onOpenChange={setFullscreen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/90 z-[60]" />
          <Dialog.Content
            className="fixed inset-0 z-[60] overflow-auto flex items-start sm:items-center justify-center p-4"
            aria-describedby={undefined}
            onClick={() => setFullscreen(false)}
          >
            <Dialog.Title className="sr-only">{article.title} – Vollbild</Dialog.Title>
            <Dialog.Close className="fixed top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
              <X className="w-5 h-5" />
            </Dialog.Close>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              className="w-full max-w-3xl h-auto sm:max-h-[calc(100vh-2rem)] sm:w-auto rounded-lg"
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Dialog.Root>
  );
}
