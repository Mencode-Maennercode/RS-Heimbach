// Holt die aktuellen Instagram-Posts ueber die Instagram Graph API
// (graph.instagram.com, "Instagram API with Instagram Login"), laedt die
// Bilder einmalig herunter, verkleinert sie (WebP) und legt sie lokal unter
// public/data/instagram/ ab. Die geschriebene public/data/instagram.json
// referenziert dann diese lokalen Dateien statt der ablaufenden Instagram-CDN-
// URLs. Videos (Reels) bleiben extern verlinkt, nur ihr Vorschaubild wird lokal
// gespeichert.
//
// Warum lokal? Instagrams Bild-URLs sind signiert und laufen nach 1-2 Tagen ab
// (oe=/oh=-Tokens) -> auf einer statischen Seite waeren die Kacheln dann tot.
// Ausserdem sind die Originale full-res (~300 KB) fuer eine 144px-Kachel viel
// zu gross. Lokale WebP-Thumbs sind ~20 KB und kommen vom eigenen Server.
//
// Wird laufend per GitHub Action (.github/workflows/instagram-sync.yml)
// ausgefuehrt; die Dateien landen durch den naechsten Build im statischen
// Export. Die Token-Erneuerung uebernimmt instagram-token-refresh.mjs.
import { writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

const KEEP = 12; // so viele Posts speichern (Grid zeigt 10, kleiner Puffer)
const THUMB_SIZE = 400; // Grid-Kachel, quadratisch, scharf auf Retina
const MEDIUM_SIZE = 1080; // Lightbox/Karussell
const THUMB_QUALITY = 80;
const MEDIUM_QUALITY = 78;

const outDir = path.join(process.cwd(), "public", "data");
const imgDir = path.join(outDir, "instagram");
const PUBLIC_PREFIX = "/data/instagram";

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

  return data.data ?? [];
}

function classify(post) {
  return post.media_type === "VIDEO"
    ? "reel"
    : post.media_type === "CAROUSEL_ALBUM"
      ? "carousel"
      : "photo";
}

// Die einzelnen Medien eines Posts (Karussell: mehrere Kinder, sonst der Post
// selbst als ein Slot).
function mediaSlots(post) {
  if (classify(post) === "carousel" && post.children?.data?.length) {
    return post.children.data;
  }
  return [
    {
      media_type: post.media_type,
      media_url: post.media_url,
      thumbnail_url: post.thumbnail_url,
    },
  ];
}

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bild-Download fehlgeschlagen (${res.status})`);
  return Buffer.from(await res.arrayBuffer());
}

// Ein Post-Bild ist unveraenderlich -> wenn die Datei schon existiert, sparen
// wir uns Download und Neuberechnung (macht die 10-Minuten-Laeufe fast gratis).
async function resizeToFile(url, file, size, quality, fit) {
  if (existsSync(file)) return;
  const buf = await fetchBuffer(url);
  await sharp(buf)
    .resize(size, size, {
      fit,
      position: "attention",
      withoutEnlargement: fit === "inside",
    })
    .webp({ quality })
    .toFile(file);
}

async function processPost(post) {
  const type = classify(post);
  const id = post.id;
  const kept = new Set();

  // --- Grid-Thumbnail (quadratisch, klein) ---
  const slots = mediaSlots(post);
  const first = slots[0];
  const thumbSource =
    type === "photo"
      ? post.media_url
      : type === "reel"
        ? post.thumbnail_url || post.media_url
        : first.media_type === "VIDEO"
          ? first.thumbnail_url || first.media_url
          : first.media_url;

  const thumbName = `${id}_thumb.webp`;
  await resizeToFile(
    thumbSource,
    path.join(imgDir, thumbName),
    THUMB_SIZE,
    THUMB_QUALITY,
    "cover",
  );
  kept.add(thumbName);

  // --- Medien fuer die Lightbox ---
  const media = [];
  const mediaKinds = [];
  const posters = [];

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const isVideo = slot.media_type === "VIDEO";
    const name = `${id}_${i}.webp`;
    kept.add(name);

    if (isVideo) {
      // Video bleibt extern (mp4), nur das Vorschaubild lokal.
      await resizeToFile(
        slot.thumbnail_url || slot.media_url,
        path.join(imgDir, name),
        MEDIUM_SIZE,
        MEDIUM_QUALITY,
        "inside",
      );
      media.push(slot.media_url);
      mediaKinds.push("video");
      posters.push(`${PUBLIC_PREFIX}/${name}`);
    } else {
      await resizeToFile(
        slot.media_url,
        path.join(imgDir, name),
        MEDIUM_SIZE,
        MEDIUM_QUALITY,
        "inside",
      );
      media.push(`${PUBLIC_PREFIX}/${name}`);
      mediaKinds.push("image");
      posters.push(null);
    }
  }

  return {
    item: {
      id,
      type,
      thumbnail: `${PUBLIC_PREFIX}/${thumbName}`,
      media,
      mediaKinds,
      posters,
      caption: post.caption || "",
      likes: post.like_count ?? 0,
      commentsCount: post.comments_count ?? 0,
      timestamp: post.timestamp,
      url: post.permalink,
    },
    kept,
  };
}

// Notfall: schlaegt der Bild-Download fehl (z. B. Netz), zeigen wir den Post
// mit den Original-URLs an, statt ihn ganz zu verlieren.
function fallbackItem(post) {
  const type = classify(post);
  const slots = mediaSlots(post);
  const first = slots[0];
  return {
    id: post.id,
    type,
    thumbnail:
      type === "photo"
        ? post.media_url
        : type === "reel"
          ? post.thumbnail_url || post.media_url
          : first.media_type === "VIDEO"
            ? first.thumbnail_url || first.media_url
            : first.media_url,
    media: slots.map((s) => s.media_url),
    mediaKinds: slots.map((s) => (s.media_type === "VIDEO" ? "video" : "image")),
    posters: slots.map((s) => (s.media_type === "VIDEO" ? s.thumbnail_url || null : null)),
    caption: post.caption || "",
    likes: post.like_count ?? 0,
    commentsCount: post.comments_count ?? 0,
    timestamp: post.timestamp,
    url: post.permalink,
  };
}

// Verarbeitet eine Liste roher API-Posts zu lokalen Bildern + JSON. Ausgelagert,
// damit die Logik auch ohne API-Aufruf getestet werden kann.
export async function buildFeed(media) {
  await mkdir(imgDir, { recursive: true });

  const items = [];
  const keptFiles = new Set();

  for (const post of media) {
    try {
      const { item, kept } = await processPost(post);
      items.push(item);
      kept.forEach((f) => keptFiles.add(f));
    } catch (err) {
      console.warn(
        `Post ${post.id}: Bildverarbeitung fehlgeschlagen (${err.message}) - nutze Original-URLs.`,
      );
      items.push(fallbackItem(post));
    }
  }

  // Aufraeumen: lokale Bilder loeschen, die zu keinem aktuellen Post mehr
  // gehoeren (aus dem Fenster gefallen oder auf Instagram geloescht).
  const existing = existsSync(imgDir) ? await readdir(imgDir) : [];
  let removed = 0;
  for (const file of existing) {
    if (!keptFiles.has(file)) {
      await unlink(path.join(imgDir, file));
      removed++;
    }
  }

  const payload = {
    last_updated: new Date().toISOString(),
    total_count: items.length,
    media: items,
  };

  await writeFile(path.join(outDir, "instagram.json"), JSON.stringify(payload, null, 2));
  console.log(
    `public/data/instagram.json aktualisiert (${keptFiles.size} Bilder, ${removed} entfernt).`,
  );
}

async function main() {
  if (!accessToken) {
    console.error("INSTAGRAM_ACCESS_TOKEN fehlt.");
    process.exit(1);
  }
  console.log("Lade Instagram-Posts...");
  const all = await fetchMedia();
  const media = all.slice(0, KEEP);
  console.log(`${all.length} Posts gefunden, verarbeite ${media.length}.`);
  await buildFeed(media);
}

// Nur ausfuehren, wenn direkt gestartet (nicht beim Import aus Tests).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error("Instagram-Sync fehlgeschlagen:", err.message);
    process.exit(1);
  });
}
