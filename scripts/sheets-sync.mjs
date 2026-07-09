// Holt die aktuellen Lehrer- und News-Daten aus dem Google Sheet ueber das
// Apps-Script-Backend (google-apps-script/Code.gs) und schreibt sie nach
// lib/data/school-content.json. Wird per GitHub Action
// (.github/workflows/sheets-sync.yml) periodisch sowie manuell ueber das
// "Jetzt aktualisieren"-Menue im Sheet ausgefuehrt; die Datei landet dann
// durch den naechsten Build (lib/data.ts importiert sie direkt) auf der
// Website.
import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";

const apiUrl = process.env.CONTENT_API_URL;
const outPath = path.join(process.cwd(), "lib", "data", "school-content.json");

if (!apiUrl) {
  console.error("CONTENT_API_URL fehlt.");
  process.exit(1);
}

async function fetchContent() {
  const url = new URL(apiUrl);
  url.searchParams.set("nocache", "1");

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Apps-Script-Backend antwortete mit Status ${res.status}`);
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(`Apps-Script-Backend meldet Fehler: ${data.error}`);
  }
  return data;
}

async function main() {
  console.log("Lade Schul-Inhalte aus Google Sheet...");
  let payload;
  try {
    payload = await fetchContent();
  } catch (err) {
    console.error("Sheets-Sync fehlgeschlagen:", err.message);
    try {
      await readFile(outPath);
      console.log("Bestehende school-content.json bleibt unveraendert.");
      return;
    } catch {
      console.error("Keine bestehende school-content.json vorhanden, breche ab.");
      process.exit(1);
    }
  }

  console.log(`${payload.lehrer?.length ?? 0} Lehrer-Eintraege, ${payload.news?.length ?? 0} News-Eintraege gefunden.`);

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(payload, null, 2) + "\n");
  console.log("lib/data/school-content.json aktualisiert.");
}

main();
