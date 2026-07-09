// Typen + reine Mapping-Helfer fuer den Instagram-Feed. KEINE Node-Importe hier,
// damit diese Datei auch von Client-Komponenten importiert werden kann. Das
// Lesen der JSON (Node fs) passiert in lib/instagram.server.ts.

export interface InstagramTile {
  id: string;
  type: "photo" | "reel" | "carousel";
  /** Kleines, quadratisches WebP fuer die Kachel (lokal). */
  thumbnail: string;
  /** Pro Medium: lokales WebP (Bild) oder externe mp4-URL (Video). */
  media: string[];
  mediaKinds: Array<"image" | "video">;
  /** Pro Medium: lokales Poster-WebP fuer Videos, sonst null. */
  posters: Array<string | null>;
  caption: string;
  likes: number;
  commentsCount: number;
  /** Relativer Text ("vor 3 Tagen"), aus dem ISO-Timestamp berechnet. */
  timestamp: string;
  url: string;
}

// So liegen die Eintraege in public/data/instagram.json (vom Sync geschrieben):
// wie InstagramTile, aber timestamp ist noch ISO.
export interface InstagramStoredItem extends Omit<InstagramTile, "timestamp"> {
  timestamp: string;
}

export function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "heute";
  if (days === 1) return "vor 1 Tag";
  if (days < 30) return `vor ${days} Tagen`;
  const months = Math.floor(days / 30);
  if (months < 12) return `vor ${months} Monat${months > 1 ? "en" : ""}`;
  const years = Math.floor(months / 12);
  return `vor ${years} Jahr${years > 1 ? "en" : ""}`;
}

export function toTile(item: InstagramStoredItem): InstagramTile {
  return { ...item, timestamp: relativeTime(item.timestamp) };
}
