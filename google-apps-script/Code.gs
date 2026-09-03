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

// Zeichenbasierte Levenshtein-Distanz -- faengt echte Tippfehler in einem
// einzelnen Wort ab (z. B. "Stecknr" statt "Stecker"), bei denen der
// wortbasierte Vergleich in findBestFileMatch_ (kompletter Ueberlapp oder
// gemeinsame Woerter) keinen Treffer liefert.
function levenshtein_(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const row = [i];
    for (let j = 1; j <= n; j++) {
      row[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1]
        : 1 + Math.min(prev[j - 1], prev[j], row[j - 1]);
    }
    prev = row;
  }
  return prev[n];
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

      // Kein gemeinsames Wort gefunden (z. B. Tippfehler in einem einzelnen
      // Wort wie "Stecknr" statt "Stecker") -- als letzten Versuch die
      // Zeichen-Aehnlichkeit pruefen. Schwelle bewusst hoch (>= 72%), damit
      // grundverschiedene Namen nicht faelschlich als Treffer durchgehen.
      const maxLen = Math.max(target.length, name.length);
      if (maxLen) {
        const similarity = 1 - levenshtein_(target, name) / maxLen;
        if (similarity >= 0.72) score = Math.max(score, similarity * 70);
      }
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
  // "uc?export=view" ist fuer eingebettete Bilder auf fremden Websites
  // unzuverlaessig geworden (Google zeigt haeufig eine Warnseite statt des
  // Bilds oder blockiert die Einbettung ganz). Der Thumbnail-Endpunkt ist
  // fuer genau diesen Zweck gedacht und liefert das Bild direkt.
  return mode === 'view'
    ? 'https://drive.google.com/thumbnail?sz=w1600&id=' + id
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

// Trennt die Zusatzstoff-/Allergen-Kuerzel ab, die der Caterer direkt hinter
// den Gerichtnamen schreibt ("Nudelsalat 2, A, A1, J" -> Name "Nudelsalat",
// Kuerzel ["2","A","A1","J"]). Nur Kuerzel am ZEILENENDE werden erkannt,
// damit Zahlen im Namen ("2 St Fleischkloesschen") unangetastet bleiben.
function splitZusatzCodes_(text) {
  const s = String(text || '').trim();
  const m = s.match(/^(.*?)[\s,]+((?:\d{1,2}|[A-N]\d?)(?:\s*,\s*(?:\d{1,2}|[A-N]\d?))*)$/);
  if (!m || !m[1]) return { text: s, codes: [] };
  return {
    text: m[1].trim(),
    codes: m[2].split(/\s*,\s*/).map((c) => c.trim()).filter(Boolean),
  };
}

// Der Caterer hebt die DGE-konformen Hauptkomponenten farblich (gruen) hervor
// -- genau darauf verweist der Hinweistext unter dem Plan. getValues() liefert
// nur den Text, darum werden die Farben separat aus den Rich-Text-Runs gelesen.
function istGruen_(hex) {
  const m = String(hex || '').match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return false;
  const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
  // Grau/Schwarz/Blau fallen bereits ueber das Verhaeltnis heraus, darum darf
  // die Helligkeitsschwelle niedrig bleiben und auch dunkle Gruentoene fangen.
  return g > 70 && g > r * 1.3 && g > b * 1.3;
}

// Liefert fuer eine Zelle die Menge der Zeilennummern, deren Text gruen
// eingefaerbt ist. Ohne Rich-Text-Info (z. B. wenn nur Werte eingefuegt
// wurden) kommt eine leere Menge zurueck -- der Plan wird dann eben ohne
// DGE-Hervorhebung angezeigt.
function gruenMarkierteZeilen_(richText) {
  const treffer = {};
  if (!richText || typeof richText.getRuns !== 'function') return treffer;
  let runs;
  try {
    runs = richText.getRuns();
  } catch (err) {
    return treffer;
  }
  if (!runs || !runs.length) return treffer;

  const zeilen = String(richText.getText() || '').split('\n');
  let pos = 0;
  zeilen.forEach((zeile, i) => {
    const start = pos;
    const ende = pos + zeile.length;
    pos = ende + 1;
    if (!zeile.trim()) return;
    for (let k = 0; k < runs.length; k++) {
      const rs = runs[k].getStartIndex();
      const re = rs + String(runs[k].getText() || '').length;
      // Erster Run, der sich mit dieser Zeile ueberschneidet, bestimmt die
      // Farbe -- die nachgestellten Kuerzel sind oft anders eingefaerbt.
      if (rs < ende && re > start) {
        if (istGruen_(runs[k].getTextStyle().getForegroundColor())) treffer[i] = true;
        break;
      }
    }
  });
  return treffer;
}

// Ist eine Kopfzeilen-Zelle im Sheet als Datum formatiert, liefert getValues()
// dafuer ein echtes JS-Date-Objekt statt des angezeigten Texts ("Montag,
// 22.06.26") -- String(date) wuerde daraus "Mon Jun 22 2026 00:00:00 GMT..."
// machen. Darum Wochentag/Datum hier ueber die Zeitzone der Tabelle sauber
// ausrechnen, statt sich auf die Zellformatierung zu verlassen. Ist die Zelle
// stattdessen (wie in aelteren Sheet-Kopien) reiner Text, greift der
// Komma-Fallback wie bisher.
const WOCHENTAGE_DE = ['', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

function formatTagZelle_(value, tz) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    // Format 'u' liefert den ISO-Wochentag (1=Montag..7=Sonntag) unabhaengig
    // von der Spracheinstellung des Scripts -- 'EEEE' wuerde je nach
    // Script-Gebietsschema auch englische Wochentagsnamen liefern koennen.
    const isoTag = Number(Utilities.formatDate(value, tz, 'u'));
    return {
      tag: WOCHENTAGE_DE[isoTag] || '',
      datum: Utilities.formatDate(value, tz, 'dd.MM.yyyy'),
    };
  }
  const label = String(value || '').replace(/\s+/g, ' ').trim();
  const parts = label.split(',');
  return {
    tag: parts[0].trim(),
    datum: parts.length > 1 ? normalizeDatum_(parts.slice(1).join(',').trim()) : '',
  };
}

// Der Caterer schreibt das Jahr zweistellig ("22.06.26") -- ausgeschrieben
// ist es auf der Website und im Ausdruck eindeutiger.
function normalizeDatum_(datum) {
  const m = String(datum || '').trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{2}|\d{4})$/);
  if (!m) return String(datum || '').trim();
  const jahr = m[3].length === 2 ? '20' + m[3] : m[3];
  return m[1].padStart(2, '0') + '.' + m[2].padStart(2, '0') + '.' + jahr;
}

// Zerlegt die Legende des Caterers ("1 mit Farbstoff / 2 mit
// Konservierungsstoff / ... " bzw. "A enthaelt Gluten - A1 aus Weizen / ...")
// in einzelne Eintraege, damit die Website sie als saubere Liste statt als
// einen langen Fliesstext anzeigen kann.
function parseLegendePart_(text) {
  return String(text || '')
    .split('/')
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((part) => {
      const m = part.match(/^(\d{1,2}|[A-N]\d?)\s+(.*)$/);
      return m ? { code: m[1], text: m[2] } : { code: '', text: part };
    })
    .filter((e) => e.text);
}

// Tab "Essensplan": bewusst KEIN Zeile-pro-Eintrag-Format wie die anderen
// Tabs, sondern die woechentliche Speiseplan-Datei des Caterers wird 1:1 (als
// Werte, nicht als Formel) in den Tab hineinkopiert -- die Kopfzeile mit
// "KW <Nummer>" in Spalte A und den Wochentagen in den Spalten daneben
// erkennt der Caterer-Export automatisch immer gleich wieder.
//
// Aufbau eines Kategorie-Blocks im Caterer-Export (bleibt Woche fuer Woche
// gleich, ist aber bewusst nicht hartkodiert, damit der Caterer Kategorien
// umbenennen/ergaenzen kann, ohne dass hier Code angepasst werden muss):
//   Zeile mit Kategorie in Spalte A  -> Name des Gerichts
//   Folgezeile(n) mit leerer Spalte A -> Einzelkomponenten inkl. Kuerzel
//   Zeile "Naehrwerte" in Spalte A    -> Naehrwertangaben des Gerichts
// Zwischenzeilen "oder wahlweise" sind reine Excel-Optik und werden
// uebersprungen; ab "Hinweis"/"Legende" folgen die Fusstexte, die als
// hinweise/legende mit ausgeliefert werden (Allergen-Kennzeichnung ist
// Pflichtangabe und darf auf der Website nicht fehlen).
//
// Wie SV/Klassenlehrer/Downloads optional behandelt, damit ein fehlender oder
// leerer Tab nicht den gesamten Payload scheitern laesst.
function readMensa_(cfg) {
  const leer = { woche: '', kw: '', tage: [], hinweise: [], legende: { zusatzstoffe: [], allergene: [] } };
  try {
    const ss = getSpreadsheet_(cfg);
    if (!ss) return leer;
    const sheet = ss.getSheetByName('Essensplan');
    if (!sheet) return leer;
    const range = sheet.getDataRange();
    const rows = range.getValues();
    // Farbinfos sind optional -- schlaegt der Aufruf fehl (aeltere Tabellen,
    // reine Werte-Kopie), laeuft der Rest unveraendert weiter.
    let richTexts = null;
    try {
      richTexts = range.getRichTextValues();
    } catch (err) {
      richTexts = null;
    }

    let headerRow = -1;
    for (let i = 0; i < rows.length; i++) {
      if (/^kw\s*\d+/i.test(String(rows[i][0] || '').trim())) { headerRow = i; break; }
    }
    if (headerRow === -1) return leer;

    const kw = String(rows[headerRow][0] || '').trim();
    const tz = ss.getSpreadsheetTimeZone();
    const dayCols = [];
    for (let c = 1; c < rows[headerRow].length; c++) {
      const roh = rows[headerRow][c];
      if (roh === '' || roh === null) continue;
      const { tag, datum } = formatTagZelle_(roh, tz);
      if (!tag) continue;
      dayCols.push({ col: c, tag: tag, datum: datum });
    }
    if (!dayCols.length) return leer;

    const tage = dayCols.map((d) => ({ tag: d.tag, datum: d.datum, gerichte: [] }));
    const hinweise = [];
    let legendeText = '';
    let inFooter = false;
    // Merkt sich pro Tag das zuletzt begonnene Gericht, damit die Folgezeilen
    // (Komponenten, Naehrwerte) dem richtigen Eintrag zugeordnet werden.
    let offen = null;

    for (let r = headerRow + 1; r < rows.length; r++) {
      const label = String(rows[r][0] || '').replace(/\s+/g, ' ').trim();
      const norm = label.toLowerCase();

      if (norm === 'hinweis' || norm === 'legende') inFooter = true;

      if (inFooter) {
        // Fusstexte stehen je nach Export mal in Spalte A, mal irgendwo
        // rechts daneben -- darum die ganze Zeile absuchen.
        for (let c = 0; c < rows[r].length; c++) {
          const val = String(rows[r][c] || '').replace(/[ \t]+/g, ' ').trim();
          if (!val || val.toLowerCase() === 'hinweis' || val.toLowerCase() === 'legende') continue;
          if (/allergene|enthält gluten|mit farbstoff/i.test(val)) legendeText += (legendeText ? '\n' : '') + val;
          else hinweise.push(val.replace(/\s*\n\s*/g, ' '));
        }
        continue;
      }

      if (norm === 'nährwerte' || norm === 'naehrwerte') {
        if (offen) {
          dayCols.forEach((d, idx) => {
            const val = String(rows[r][d.col] || '').replace(/\s*\n\s*/g, ' ').trim();
            if (val && offen[idx]) offen[idx].naehrwerte = val;
          });
        }
        continue;
      }

      if (!label) {
        // Folgezeile ohne Kategorie: entweder Einzelkomponenten des zuletzt
        // begonnenen Gerichts oder die reine Optik-Zeile "oder wahlweise".
        if (!offen) continue;
        dayCols.forEach((d, idx) => {
          const raw = String(rows[r][d.col] || '').trim();
          if (!raw || !offen[idx]) return;
          if (/^oder wahlweise$/i.test(raw)) return;
          const gruen = richTexts && richTexts[r]
            ? gruenMarkierteZeilen_(richTexts[r][d.col])
            : {};
          // Zeilenindex aus der ROHEN Zelle bestimmen, damit er zu den
          // Farb-Infos passt (raw ist bereits getrimmt).
          String(rows[r][d.col] || '').split('\n').forEach((line, li) => {
            const clean = line.replace(/\s+/g, ' ').trim();
            if (!clean) return;
            const eintrag = splitZusatzCodes_(clean);
            eintrag.dge = !!gruen[li];
            offen[idx].komponenten.push(eintrag);
          });
        });
        continue;
      }

      // Neue Kategorie-Zeile: pro Tag ein neues Gericht anlegen.
      offen = [];
      dayCols.forEach((d, idx) => {
        const raw = String(rows[r][d.col] || '').replace(/\s*\n\s*/g, ' ').trim();
        if (!raw) { offen[idx] = null; return; }
        const parsed = splitZusatzCodes_(raw);
        const gericht = {
          kategorie: label,
          name: parsed.text,
          codes: parsed.codes,
          komponenten: [],
          naehrwerte: '',
        };
        tage[idx].gerichte.push(gericht);
        offen[idx] = gericht;
      });
    }

    // Zeitraum der Woche aus dem ersten und letzten Tag mit Datum ableiten --
    // die Kalenderwoche selbst sagt Eltern/Schuelern wenig. Das Jahr steht nur
    // einmal am Ende ("22.06. – 26.06.2026").
    const mitDatum = dayCols.filter((d) => d.datum);
    let woche = '';
    if (mitDatum.length) {
      const letztes = normalizeDatum_(mitDatum[mitDatum.length - 1].datum);
      woche = mitDatum.length > 1
        ? normalizeDatum_(mitDatum[0].datum).replace(/\.\d{4}$/, '.') + ' – ' + letztes
        : letztes;
    }

    // Die Allergen-Aufzaehlung laeuft im Export ueber mehrere Zeilen einer
    // Zelle (A..H, dann H3..N) -- alles nach der Ueberschrift "Allergene ..."
    // gehoert zusammen, alles davor sind die Zusatzstoff-Nummern.
    const legendeZeilen = legendeText.split('\n').map((l) => l.trim()).filter(Boolean);
    const markerIdx = legendeZeilen.findIndex((l) => /^allergene/i.test(l));
    const zusatzZeilen = markerIdx === -1 ? legendeZeilen : legendeZeilen.slice(0, markerIdx);
    const allergenZeilen = markerIdx === -1 ? [] : legendeZeilen.slice(markerIdx + 1);

    return {
      woche: woche,
      kw: kw,
      tage: tage,
      hinweise: hinweise,
      legende: {
        zusatzstoffe: parseLegendePart_(zusatzZeilen.join(' / ')),
        allergene: parseLegendePart_(allergenZeilen.join(' ')),
      },
    };
  } catch (err) {
    return leer;
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
    mensa: readMensa_(cfg),
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
    payload = { error: String(err), lehrer: [], news: [], sv: [], klassenlehrer: [], downloads: [], mensa: { kw: '', tage: [] }, generatedAt: new Date().toISOString() };
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
    'Lehrer: %s | News: %s | SV: %s | Klassen: %s | Downloads: %s | Essensplan-Tage: %s',
    payload.lehrer.length, payload.news.length, payload.sv.length, payload.klassenlehrer.length,
    payload.downloads.length, payload.mensa.tage.length
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
