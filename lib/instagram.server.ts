// Server-seitiger Loader: liest public/data/instagram.json beim Build direkt vom
// Dateisystem. Dadurch stecken die Posts (inkl. lokaler Bildpfade) schon im
// statischen HTML - kein Client-Fetch-Wasserfall mehr, die Bilder starten
// sofort mit dem Seitenaufbau zu laden.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { toTile, type InstagramStoredItem, type InstagramTile } from "./instagram";

export async function getInstagramPosts(limit = 10): Promise<InstagramTile[]> {
  try {
    const file = path.join(process.cwd(), "public", "data", "instagram.json");
    const raw = await readFile(file, "utf8");
    const data = JSON.parse(raw) as { media: InstagramStoredItem[] };
    return (data.media ?? []).slice(0, limit).map(toTile);
  } catch {
    return [];
  }
}
