"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X, Calendar, Tag } from "lucide-react";

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

          <div className="overflow-y-auto p-6 sm:p-8">
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
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
