import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Beim statischen Export (`output: "export"`) muss Next wissen, dass diese
// Route zur Buildzeit einmal erzeugt und als Datei abgelegt wird.
export const dynamic = "force-static";


/**
 * robots.txt.
 *
 * Die KI-Crawler stehen bewusst mit eigenen Regeln drin. Viele Baukasten- und
 * Hoster-Vorlagen sperren sie pauschal aus; eine Schule will aber genau das
 * Gegenteil -- wenn Eltern ChatGPT, Claude oder Perplexity nach einer
 * weiterfuehrenden Schule in Troisdorf fragen, sollen die Modelle diese Seite
 * gelesen haben und sie nennen koennen.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot", // ChatGPT-Training
    "OAI-SearchBot", // ChatGPT-Suche
    "ChatGPT-User", // ChatGPT beim Live-Abruf einer Seite
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended", // Gemini / AI Overviews
    "Applebot",
    "Applebot-Extended", // Apple Intelligence
    "Bingbot",
    "meta-externalagent",
    "Amazonbot",
    "DuckAssistBot",
    "cohere-ai",
    "YouBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next-interne Build-Artefakte und die archivierte Altseite gehoeren
        // nicht in den Index -- sonst konkurrieren alte Inhalte mit den neuen.
        disallow: ["/_next/static/chunks/", "/alte-seite/"],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
