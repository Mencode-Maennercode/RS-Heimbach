// Holt die aktuellen Instagram-Posts ueber die Instagram Graph API
// (graph.instagram.com, "Instagram API with Instagram Login") und schreibt
// sie nach public/data/instagram.json. Wird laufend per GitHub Action
// (.github/workflows/instagram-sync.yml) ausgefuehrt; die Datei landet dann
// durch den naechsten Build im statischen Export unter /data/instagram.json.
// Die Token-Erneuerung selbst uebernimmt instagram-token-refresh.mjs.
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

if (!accessToken) {
  console.error("INSTAGRAM_ACCESS_TOKEN fehlt.");
  process.exit(1);
}

async function fetchComments(mediaId) {
  const url = new URL(`https://graph.instagram.com/${mediaId}/comments`);
  url.searchParams.set("fields", "username,text");
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("limit", "5");

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    console.error(`Kommentare fuer ${mediaId} nicht ladbar:`, data.error?.message || res.status);
    return [];
  }
  return (data.data ?? []).map((c) => ({ username: c.username, text: c.text }));
}

async function fetchMedia() {
  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,timestamp,thumbnail_url,like_count,comments_count,children{media_url,media_type,thumbnail_url}",
  );
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("limit", "20");

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || `Instagram API Fehler (${res.status})`);
  }

  const media = data.data ?? [];

  return Promise.all(
    media.map(async (item) => ({
      ...item,
      comments_data: item.comments_count > 0 ? await fetchComments(item.id) : [],
    })),
  );
}

async function main() {
  console.log("Lade Instagram-Posts...");
  const media = await fetchMedia();
  console.log(`${media.length} Posts gefunden.`);

  const outDir = path.join(process.cwd(), "public", "data");
  await mkdir(outDir, { recursive: true });

  const payload = {
    last_updated: new Date().toISOString(),
    total_count: media.length,
    media,
  };

  await writeFile(path.join(outDir, "instagram.json"), JSON.stringify(payload, null, 2));
  console.log("public/data/instagram.json aktualisiert.");
}

main().catch((err) => {
  console.error("Instagram-Sync fehlgeschlagen:", err.message);
  process.exit(1);
});
