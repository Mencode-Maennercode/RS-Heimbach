// Scannt die Foto-Ordner unter public/images/ und schreibt ein Manifest nach
// lib/data/teacher-photos.json. Damit ordnet die Website Fotos automatisch
// ueber den Nachnamen zu -- das Google Sheet braucht keine "Bild-URL"-Spalte.
//
// Regel: Der Dateiname (ohne Endung) ist der Nachname als Slug, also
// kleingeschrieben, Umlaute ausgeschrieben, Leerzeichen als Bindestrich:
//   Etschenberg          -> etschenberg.jpg
//   Köylüoglu            -> koeyluoglu.jpg
//   van Oost             -> van-oost.jpg
//   Gümüs-Gerichhausen   -> guemues-gerichhausen.jpg
//
// Laeuft automatisch vor `npm run build` und `npm run dev` (siehe package.json),
// neu abgelegte Fotos sind also ohne weiteres Zutun sofort dabei.
import { readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outPath = path.join(root, "lib", "data", "teacher-photos.json");

// Spaetere Ordner ueberschreiben fruehere bei gleichem Dateinamen.
const SOURCE_DIRS = ["public/images/lehrer", "public/images/schulleitung"];
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function collect(dir) {
  let entries;
  try {
    entries = await readdir(path.join(root, dir), { withFileTypes: true });
  } catch {
    console.warn(`  (Ordner ${dir} nicht vorhanden - uebersprungen)`);
    return {};
  }

  const found = {};
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) continue;
    const slug = path.basename(entry.name, path.extname(entry.name)).toLowerCase();
    // "/public" gehoert nicht in die oeffentliche URL.
    found[slug] = `/${dir.replace(/^public\//, "")}/${entry.name}`;
  }
  return found;
}

async function main() {
  console.log("Suche Lehrkraefte-Fotos...");
  let photos = {};
  for (const dir of SOURCE_DIRS) {
    const found = await collect(dir);
    console.log(`  ${dir}: ${Object.keys(found).length} Bild(er)`);
    photos = { ...photos, ...found };
  }

  // Sortiert schreiben, damit die Datei bei gleichem Inhalt identisch bleibt
  // und nicht bei jedem Build als geaendert im Git auftaucht.
  const sorted = Object.fromEntries(
    Object.keys(photos).sort().map((key) => [key, photos[key]])
  );

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`lib/data/teacher-photos.json aktualisiert (${Object.keys(sorted).length} Fotos).`);
}

main();
