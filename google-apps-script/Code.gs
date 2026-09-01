// Backend fuer die Google-Sheets-Anbindung der rs-heimbach-Website.
//
// Dieses Script haengt am Google Sheet (Erweiterungen -> Apps Script) und
// liefert dessen Inhalt ueber eine Web-App-URL (`doGet`) als JSON aus. Die
// Website selbst ruft nur diese URL ab -- sie hat nie direkten Zugriff auf
// das Sheet. Das Sheet wird mit niemandem oeffentlich geteilt, nur die
// Lehrkraefte mit Bearbeiter-Zugriff sehen/aendern es.
//
// Tabs im Sheet: "Lehrer", "News", "SV", "Klassenlehrer" und "Downloads"
// (siehe readLehrer_ / readNews_ / readSV_ / readKlassenlehrer_ /
// readDownloads_ fuer die erwarteten Spalten).
//
// Einrichtung: siehe GOOGLE_SHEETS_ANLEITUNG.md im Repo.

function CONFIG_() {
  const props = PropertiesService.getScriptProperties();
  return {
    SPREADSHEET_ID: props.getProperty('SPREADSHEET_ID') || '',
    CACHE_SECONDS: parseInt(props.getProperty('CACHE_SECONDS') || '120', 10),
    GITHUB_TOKEN: props.getProperty('GITHUB_TOKEN') || '',
    GITHUB_REPO: props.getProperty('GITHUB_REPO') || '',
    GITHUB_WORKFLOW_FILE: props.getProperty('GITHUB_WORKFLOW_FILE') || 'sheets-sync.yml',
    // Google-Drive-Ordner, in die Lehrkraefte Dateien (Downloads-Formulare
    // bzw. News-Bilder) einfach hochladen -- Format egal. Im Sheet reicht
    // dann ein ungefaehrer Dateiname statt eines fertigen Links, siehe
    // findBestFileMatch_. Als Fallback fest hinterlegt (Ordner "Download
    // Dateien" / "News-Bilder" in "Meine Ablage > RS Heimbach"); ueber die
    // Skripteigenschaft DOWNLOADS_FOLDER_ID/IMAGES_FOLDER_ID ueberschreibbar,
    // falls die Ordner mal umziehen.
    DOWNLOADS_FOLDER_ID: props.getProperty('DOWNLOADS_FOLDER_ID') || '1IX2A_qxYXkFfhtPoT5xnw5Xg8SAnKf_H',
    IMAGES_FOLDER_ID: props.getProperty('IMAGES_FOLDER_ID') || '1UxWloos0Ka2nRhZt1QngA1uVhDcmgRF2',
  };
}

// Findet zu einem ungefaehren, von einer Lehrkraft eingetippten Dateinamen
// (z. B. "Anmeldeformular" statt "Anmeldeformular_Klasse5_2026_final.pdf")
// die am besten passende Datei in einem Drive-Ordner. Format/Gross-
// Kleinschreibung/Umlaute/Leerzeichen spielen dabei keine Rolle.
function normalizeFileName_(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[äöüß]/g, (m) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }[m]))
    .replace(/\.[a-z0-9]{2,5}$/, '') // Dateiendung abschneiden
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function findBestFileMatch_(folder, rawSearch) {
  const target = normalizeFileName_(rawSearch);
  if (!target || !folder) return null;

  const targetWords = new Set(target.split(' ').filter(Boolean));
  let best = null;
  let bestScore = 0;

  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const name = normalizeFileName_(file.getName());
    if (!name) continue;

    let score = 0;
    if (name === target) {
      score = 100;
    } else if (name.indexOf(target) !== -1) {
      // Der komplette Suchbegriff steckt im Dateinamen (z. B. "anmelde" in
      // "anmeldeformular 5kl 2025 ohnemsu") -- ein sehr sicheres Zeichen,
      // unabhaengig davon, wie viele zusaetzliche Angaben (Klasse, Jahr,
      // Kuerzel) der echte Dateiname noch traegt. Ein Laengen-Verhaeltnis
      // wuerde solche vollstaendigen Treffer faelschlich abwerten, sobald
      // der echte Dateiname deutlich laenger ist als der eingetippte Suchbegriff.
      score = name.indexOf(target) === 0 ? 90 : 75;
    } else if (target.indexOf(name) !== -1) {
      // Umgekehrter Fall: der Dateiname ist eine Abkuerzung des Suchbegriffs
      // (z. B. "hausord" in "hausordnung") -- etwas unsicherer, da kurze
      // Abkuerzungen leichter zufaellig zu mehreren Begriffen passen koennten.
      score = 80 * (name.length / target.length);
    } else {
      const nameWords = new Set(name.split(' ').filter(Boolean));
      let overlap = 0;
      targetWords.forEach((w) => { if (nameWords.has(w)) overlap++; });
      const union = new Set([...targetWords, ...nameWords]).size;
      score = union ? (overlap / union) * 60 : 0;
    }

    // Bei Gleichstand gewinnt die zuletzt bearbeitete Datei -- so findet die
    // Suche automatisch die neueste Version, wenn mehrere aehnlich benannte
    // Dateien im Ordner liegen (z. B. eine alte und eine aktualisierte).
    const isBetter = score > bestScore
      || (score === bestScore && best && file.getLastUpdated() > best.getLastUpdated());
    if (isBetter) {
      bestScore = score;
      best = file;
    }
  }

  // Schwellenwert, damit voellig unpassende Namen nicht als "Treffer" durchgehen.
  return bestScore >= 25 ? best : null;
}

// Macht eine gefundene Datei automatisch "Jeder mit Link kann ansehen"
// (Lehrkraefte muessen selbst nichts freigeben) und liefert eine direkt
// nutzbare URL -- zum Herunterladen (Downloads) oder zum Einbetten als Bild
// (News).
function driveFileUrl_(file, mode) {
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) {
    // Falls die Freigabe durch Domain-Richtlinien blockiert ist, trotzdem
    // die Datei-ID zurueckgeben -- besser ein Link, der ggf. manuell
    // freigegeben werden muss, als gar keiner.
  }
  const id = file.getId();
  return mode === 'view'
    ? 'https://drive.google.com/uc?export=view&id=' + id
    : 'https://drive.google.com/uc?export=download&id=' + id;
}

function getDriveFolder_(folderId) {
  try {
    return folderId ? DriveApp.getFolderById(folderId) : null;
  } catch (err) {
    return null;
  }
}

// Loest einen Sheet-Zellwert zu einer URL auf: Steht dort bereits ein
// fertiger Link (http/https), wird er unveraendert benutzt (abwaertskompatibel
// zur alten manuellen Link-Pflege). Steht dort nur ein Name/Stichwort, wird
// im uebergebenen Drive-Ordner die am besten passende Datei gesucht.
function resolveFileRef_(rawValue, folder, mode) {
  const value = String(rawValue || '').trim();
  if (!value) return { url: '', matchedFile: null };
  if (/^https?:\/\//i.test(value)) return { url: value, matchedFile: null };
  const file = findBestFileMatch_(folder, value);
  if (!file) return { url: '', matchedFile: null };
  return { url: driveFileUrl_(file, mode), matchedFile: file };
}

function getSpreadsheet_(cfg) {
  return SpreadsheetApp.getActiveSpreadsheet()
    || (cfg.SPREADSHEET_ID ? SpreadsheetApp.openById(cfg.SPREADSHEET_ID) : null);
}

// Liest einen Tab generisch ein: erste Zeile = Spaltenueberschriften
// (kleingeschrieben als Keys), jede weitere nicht-leere Zeile wird zu einem
// Objekt { spalte1: wert1, spalte2: wert2, ... }.
function readSheetRows_(sheetName, cfg) {
  const ss = getSpreadsheet_(cfg);
  if (!ss) throw new Error('Kein Spreadsheet gefunden (SPREADSHEET_ID pruefen).');
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) throw new Error('Tab "' + sheetName + '" nicht gefunden');

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map((h) => String(h).toLowerCase().trim());

  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const obj = {};
    let hasContent = false;
    for (let c = 0; c < headers.length; c++) {
      const str = values[i][c] == null ? '' : String(values[i][c]).trim();
      obj[headers[c]] = str;
      if (str !== '') hasContent = true;
    }
    if (hasContent) rows.push(obj);
  }
  return rows;
}

// Liest den ersten vorhandenen Wert aus mehreren moeglichen Spaltennamen
// (tolerant gegenueber Schreibvarianten).
function pick_(row, keys) {
  for (let i = 0; i < keys.length; i++) {
    const v = row[keys[i]];
    if (v) return v;
  }
  return '';
}

function isJa_(value) {
  const v = String(value || '').trim().toLowerCase();
  return v === 'ja' || v === 'yes' || v === 'true' || v === 'x';
}

function slugify_(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[äöüß]/g, (m) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }[m]))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Liefert die Tabellenzeilen bewusst als ROHWERTE aus. Alles Weitere --
// Anrede statt Vorname anzeigen, Rollen gendern ("Lehrer*in" -> "Lehrerin"),
// Faecher/Bio einheitlich sortieren, "Ja" in der Email-Spalte zur Adresse
// ausbauen, Fotos zuordnen -- passiert auf der Website in lib/teachers.ts.
// Dadurch wirken Aenderungen an diesen Regeln sofort beim naechsten Build,
// ohne dass hier eine neue Version bereitgestellt werden muss.
function readLehrer_(cfg) {
  const rows = readSheetRows_('Lehrer', cfg);
  return rows
    .map((row, i) => {
      const vorname = pick_(row, ['vorname', 'first name']);
      const nachname = pick_(row, ['nachname', 'last name']);
      const faecherRaw = pick_(row, ['fächer', 'faecher', 'fach', 'subjects']);
      return {
        id: i + 1,
        // Der Vorname wird auf der Website nie angezeigt, sondern nur fuer die
        // Bildung der dienstlichen E-Mail-Adresse gebraucht.
        vorname: vorname,
        nachname: nachname,
        // Spalte "Geschlecht": "Hr." / "Fr." (leer, wenn nicht eingetragen).
        anrede: pick_(row, ['geschlecht', 'anrede', 'gender']),
        rolle: pick_(row, ['rolle', 'role']) || 'Lehrer*in',
        faecher: faecherRaw ? faecherRaw.split(',').map((s) => s.trim()).filter(Boolean) : [],
        bio: pick_(row, ['bio', 'beschreibung']),
        schulleitung: isJa_(pick_(row, ['schulleitung'])),
        telefon: pick_(row, ['telefon', 'phone']),
        // "Ja" heisst "persoenliche Adresse anzeigen" -- die Adresse selbst
        // baut die Website aus Vor- und Nachnamen.
        email: pick_(row, ['email', 'e-mail']),
      };
    })
    .filter((t) => t.nachname);
}

// Eigenstaendiger, optionaler Tab: die Mitglieder der Schuelervertretung
// aendern sich jaehrlich, darum wie Lehrer/News per Sheet gepflegt statt im
// Code hartkodiert. Der Tab ist bewusst als optional behandelt (eigenes
// try/catch) -- fehlt er noch (z. B. direkt nach diesem Code.gs-Update, bevor
// der Tab angelegt wurde), liefert die Funktion einfach eine leere Liste,
// statt den gesamten Payload (inkl. Lehrer & News) scheitern zu lassen.
function readSV_(cfg) {
  try {
    const rows = readSheetRows_('SV', cfg);
    return rows
      .map((row, i) => ({ id: i + 1, name: pick_(row, ['name']) }))
      .filter((m) => m.name);
  } catch (err) {
    return [];
  }
}

// Tab "Klassenlehrer": eine Zeile pro Klasse mit Nachname der Klassenleitung
// und ggf. Co-Klassenleitung. Wie readSV_ optional behandelt, damit ein noch
// fehlender Tab nicht den gesamten Payload scheitern laesst.
//
// Die Zuordnung Nachname -> Lehrkraft und die Beschriftung der Badges
// ("Klassenlehrerin 5A") passiert bewusst erst auf der Website
// (lib/data.ts), damit Aenderungen daran ohne neue Apps-Script-Version
// wirken -- gleiche Aufteilung wie bei readLehrer_.
function readKlassenlehrer_(cfg) {
  try {
    const rows = readSheetRows_('Klassenlehrer', cfg);
    return rows
      .map((row, i) => {
        const coRaw = pick_(row, [
          'co-klassenlehrerinnen', 'co-klassenlehrerin', 'co-klassenlehrer',
          'co-klassenleitung', 'co',
        ]);
        return {
          id: i + 1,
          klasse: pick_(row, ['klasse', 'class']),
          lehrer: pick_(row, ['klassenlehrerin', 'klassenlehrer', 'klassenleitung', 'lehrer']),
          // Mehrere Co-Namen duerfen per Komma in einer Zelle stehen.
          co: coRaw ? coRaw.split(',').map((s) => s.trim()).filter(Boolean) : [],
        };
      })
      .filter((k) => k.klasse && (k.lehrer || k.co.length));
  } catch (err) {
    return [];
  }
}

function readNews_(cfg) {
  const rows = readSheetRows_('News', cfg);
  const imagesFolder = getDriveFolder_(cfg.IMAGES_FOLDER_ID);
  return rows
    .map((row, i) => {
      const titel = pick_(row, ['titel', 'title']);
      const slugSpalte = pick_(row, ['slug']);
      // "Bild-URL" darf entweder ein fertiger Link sein oder -- einfacher fuer
      // Lehrkraefte -- nur der ungefaehre Dateiname eines Bildes, das in den
      // Drive-Bilderordner (IMAGES_FOLDER_ID) hochgeladen wurde.
      const bildRef = resolveFileRef_(
        pick_(row, ['bild-url', 'bild', 'image', 'image-url']),
        imagesFolder,
        'view'
      );
      return {
        id: i + 1,
        titel: titel,
        datum: pick_(row, ['datum', 'date']),
        kategorie: pick_(row, ['kategorie', 'category']),
        teaser: pick_(row, ['teaser', 'excerpt', 'kurztext']),
        volltext: pick_(row, ['volltext', 'text', 'inhalt']),
        bildUrl: bildRef.url,
        slug: slugSpalte || slugify_(titel),
        // Jeder nicht-leere Wert in der Spalte "Hauptbeitrag" (nicht nur "Ja")
        // zaehlt als "diesen Beitrag zuerst zeigen".
        hauptbeitrag: !!pick_(row, ['hauptbeitrag', 'hauptartikel', 'featured']),
      };
    })
    .filter((n) => n.titel);
}

// Tab "Downloads": eine Zeile pro Dokument. Lehrkraefte laden die Datei
// (egal welches Format) einfach in den Drive-Ordner DOWNLOADS_FOLDER_ID hoch
// und tragen im Sheet nur Kategorie, Titel und einen ungefaehren Dateinamen
// ein -- findBestFileMatch_ sucht die passende Datei automatisch. Wie
// readSV_/readKlassenlehrer_ optional behandelt (eigenes try/catch), damit
// ein fehlender Tab nicht den gesamten Payload scheitern laesst.
function readDownloads_(cfg) {
  try {
    const rows = readSheetRows_('Downloads', cfg);
    const folder = getDriveFolder_(cfg.DOWNLOADS_FOLDER_ID);
    return rows
      .map((row, i) => {
        const titel = pick_(row, ['titel', 'title', 'name']);
        const dateiSuche = pick_(row, ['datei-url', 'dateiname', 'datei', 'suchbegriff', 'file']);
        const ref = resolveFileRef_(dateiSuche, folder, 'download');
        let typ = pick_(row, ['typ', 'type']).toUpperCase();
        if (!typ && ref.matchedFile) {
          const ext = ref.matchedFile.getName().split('.').pop();
          typ = ext ? ext.toUpperCase() : '';
        }
        const reihenfolgeRaw = pick_(row, ['reihenfolge', 'order']);
        return {
          id: i + 1,
          kategorie: pick_(row, ['kategorie', 'category']),
          titel: titel,
          typ: typ || 'DATEI',
          url: ref.url,
          // Damit die Website Zeilen ohne (noch) gefundene Datei ausblenden
          // kann, statt einen toten Link anzuzeigen.
          gefunden: !!ref.url,
          reihenfolge: reihenfolgeRaw ? Number(reihenfolgeRaw) : i + 1,
        };
      })
      .filter((d) => d.titel);
  } catch (err) {
    return [];
  }
}

function buildPayload_() {
  const cfg = CONFIG_();
  return {
    lehrer: readLehrer_(cfg),
    news: readNews_(cfg),
    sv: readSV_(cfg),
    klassenlehrer: readKlassenlehrer_(cfg),
    downloads: readDownloads_(cfg),
    generatedAt: new Date().toISOString(),
  };
}

function doGet(e) {
  const cfg = CONFIG_();
  const noCache = e && e.parameter && e.parameter.nocache;
  const cache = CacheService.getScriptCache();
  const cacheKey = 'school-content-payload';

  if (!noCache) {
    const cached = cache.get(cacheKey);
    if (cached) {
      return ContentService.createTextOutput(cached).setMimeType(ContentService.MimeType.JSON);
    }
  }

  let payload;
  try {
    payload = buildPayload_();
  } catch (err) {
    payload = { error: String(err), lehrer: [], news: [], sv: [], klassenlehrer: [], downloads: [], generatedAt: new Date().toISOString() };
  }

  const json = JSON.stringify(payload);
  try {
    cache.put(cacheKey, json, cfg.CACHE_SECONDS);
  } catch (err) {
    // Cache-Fehler sind nicht kritisch, Antwort trotzdem ausliefern.
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

// Manueller Test im Apps-Script-Editor: Funktion auswaehlen -> Ausfuehren.
// Ergebnis steht danach im Ausfuehrungsprotokoll.
function testPayload() {
  const payload = buildPayload_();
  Logger.log(
    'Lehrer: %s | News: %s | SV: %s | Klassen: %s | Downloads: %s',
    payload.lehrer.length, payload.news.length, payload.sv.length, payload.klassenlehrer.length,
    payload.downloads.length
  );
  Logger.log(JSON.stringify(payload, null, 2));
}

// Loest den GitHub-Actions-Workflow aus, der die Website mit den aktuellen
// Sheet-Daten neu baut und deployt. Nur nutzbar von Personen, die dieses
// Sheet bearbeiten koennen (das Menue ist nur fuer sie sichtbar).
function triggerDeploy_() {
  const cfg = CONFIG_();
  if (!cfg.GITHUB_TOKEN || !cfg.GITHUB_REPO) {
    SpreadsheetApp.getUi().alert('GITHUB_TOKEN oder GITHUB_REPO fehlt in den Skripteigenschaften.');
    return;
  }
  const url = 'https://api.github.com/repos/' + cfg.GITHUB_REPO
    + '/actions/workflows/' + cfg.GITHUB_WORKFLOW_FILE + '/dispatches';

  const res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + cfg.GITHUB_TOKEN,
      Accept: 'application/vnd.github+json',
    },
    payload: JSON.stringify({ ref: 'master' }),
    muteHttpExceptions: true,
  });

  if (res.getResponseCode() === 204) {
    SpreadsheetApp.getUi().alert('Website-Update gestartet! In ca. 2-3 Minuten sind die Aenderungen live.');
  } else {
    SpreadsheetApp.getUi().alert('Fehler beim Auslösen (Code ' + res.getResponseCode() + '): ' + res.getContentText());
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🚀 Website')
    .addItem('Jetzt aktualisieren', 'triggerDeploy_')
    .addToUi();
}

// Nur einmalig noetig, wenn dieses Script NICHT direkt an der Tabelle haengt
// (Erweiterungen -> Apps Script), sondern als eigenstaendiges Projekt ueber
// script.new angelegt wurde: der obige onOpen()-Trigger laeuft dann nicht
// automatisch beim Oeffnen der Tabelle. Diese Funktion einmal im Editor
// auswaehlen und ausfuehren (Dropdown -> installTrigger -> Ausfuehren) --
// danach erscheint das "🚀 Website"-Menue automatisch, sobald die Tabelle
// (neu) geoeffnet wird.
function installTrigger() {
  const cfg = CONFIG_();
  if (!cfg.SPREADSHEET_ID) {
    Logger.log('FEHLER: SPREADSHEET_ID fehlt in den Skripteigenschaften.');
    return;
  }
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === 'onOpen') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onOpen')
    .forSpreadsheet(cfg.SPREADSHEET_ID)
    .onOpen()
    .create();
  Logger.log('Trigger installiert. Tabelle einmal neu laden (F5) -- danach erscheint das Menue "🚀 Website".');
}
