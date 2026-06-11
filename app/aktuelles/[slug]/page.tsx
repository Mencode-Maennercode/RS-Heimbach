import { newsItems } from "@/lib/data";
import NewsArticleView from "./NewsArticleView";

// Beim statischen Export wird fuer jeden bekannten News-Slug eine eigene
// HTML-Seite erzeugt. Ohne diese Liste kann Next.js die dynamische Route nicht
// statisch ausgeben.
export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsArticleView slug={slug} />;
}
