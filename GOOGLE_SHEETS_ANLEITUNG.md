# 📘 Google-Sheets-Anbindung — rs-heimbach

Diese Anleitung beschreibt, wie die Inhalte für **News**, **Lehrerkollegium** und
**Schulleitung** künftig über ein Google Sheet gepflegt werden — ohne dass
jemand Code anfassen muss. Nur ein Google-Sheet-Tab entscheidet, was auf der
Website steht.

```
   Lehrkraft pflegt Sheet        Du (einmalig)                Besucher
   ─────────────────────         ──────────────                ────────
   Google Sheet bearbeiten  ─►   Apps-Script-Backend   ─►      Statische Website
   (Tabs "Lehrer" & "News")       (liest das Sheet aus,         (zeigt aktuelle
                                   liefert JSON)                 Inhalte an)
```

Das Sheet selbst wird **mit niemandem öffentlich geteilt** — nur 2–3
Lehrkräfte bekommen als benannte Google-Konten Bearbeiter-Zugriff. Die Website
ruft nie das Sheet direkt auf, sondern nur eine Google-Apps-Script-Adresse,
die ausschließlich fertig aufbereitetes JSON liefert (keine Sheet-URL, kein
Link zum Bearbeiten). Wer keinen Zugriff auf das Sheet hat, kann es weder
ansehen, ändern noch die Website-Aktualisierung auslösen.

---

## ⚡ TEIL A — Einmalige technische Einrichtung (machst DU)

### Schritt 1 — Google Sheet anlegen
1. Neues Google Sheet erstellen (z. B. "RS Heimbach – Website-Inhalte").
2. Zwei Tabs anlegen, **genau so benannt**: `Lehrer` und `News`.
3. In Zeile 1 jeweils diese Spaltenüberschriften eintragen:

   **Tab `Lehrer`:**
   | Vorname | Nachname | Geschlecht | Rolle | Fächer | Bio | Bild-URL | Schulleitung | Telefon | Email |
   |---|---|---|---|---|---|---|---|---|---|

   - `Vorname`: der echte Vorname (z. B. `Marcel`) — daraus entsteht auch die
     E-Mail-Adresse, siehe `Email`.
   - `Geschlecht`: die Anrede, `Hr.` oder `Fr.` (`Herr`/`Frau`/`m`/`w` werden
     auch erkannt). Ist noch kein Vorname eingetragen, wird stattdessen die
     Anrede vor den Nachnamen gesetzt (`Hr. Herbst`).
   - `Fächer`: mehrere Fächer durch Komma trennen, z. B. `Deutsch, Geschichte`.
     Die Reihenfolge ist beliebig — auf der Website erscheinen sie immer in
     derselben Sortierung, kleine Tippfehler (`Matematik`) werden korrigiert.
   - `Bio`: zusätzliche Aufgabe(n), z. B. `Sonderpädagoge, SV-Lehrer`. Mehrere
     Einträge werden auf der Website immer gleich sortiert angezeigt.
   - `Bild-URL`: optional — Link zu einem Foto. Leer lassen, dann erscheint ein Platzhalterbild.
   - `Schulleitung`: `Ja` eintragen, wenn die Person zusätzlich auf der
     Schulleitungs-Seite erscheinen soll (sonst leer lassen).
   - `Telefon`: nur für die Schulleitungskarte relevant, sonst leer lassen.
   - `Email`: **kein** Adress-Text, sondern `Ja`/leer. Bei `Ja` wird die
     dienstliche Adresse automatisch als
     `<erster-Buchstabe-Vorname>.<nachname>@rs-heimbach.de` gebildet und
     verlinkt (`Marcel` + `Werner` → `m.werner@rs-heimbach.de`). Ohne
     Vornamen kann keine Adresse gebildet werden.

   **Tab `News`:**
   | Titel | Datum | Kategorie | Teaser | Volltext | Bild-URL | Slug | Hauptbeitrag |
   |---|---|---|---|---|---|---|---|

   - `Datum`: Format `JJJJ-MM-TT`, z. B. `2026-03-19`
   - `Teaser`: kurzer Anrisstext für die Übersichtskarte
   - `Volltext`: optional — ganzer Artikeltext. Absätze durch eine **leere
     Zeile** trennen. Bleibt das Feld leer, zeigt die Website einen
     allgemeinen Platzhaltertext.
   - `Slug`: optional (wird sonst automatisch aus dem Titel erzeugt) — bestimmt
     die Web-Adresse des Artikels, z. B. `/aktuelles/mein-titel`.
   - `Hauptbeitrag`: optional — trag hier irgendetwas ein (z. B. `Ja`), damit
     dieser Beitrag ganz oben/zuerst auf der News-Seite erscheint. Leer
     lassen bei allen anderen Beiträgen — die werden automatisch nach Datum
     sortiert (neuestes zuerst).

### Schritt 2 — Nur die richtigen Personen einladen
Im Sheet oben rechts auf **Freigeben** klicken und **nur** die 2–3
E-Mail-Adressen der zuständigen Lehrkräfte mit Rolle **Bearbeiter** eintragen.
**Nicht** auf "Jeder mit dem Link" stellen — das Sheet bleibt privat.

### Schritt 3 — Apps-Script einfügen
Dieses Projekt ist **eigenständig** angelegt (über `script.new`), es hängt
also *nicht* an der Tabelle. Deshalb führt „Erweiterungen → Apps Script" im
Sheet ins Leere ("Datei kann derzeit nicht geöffnet werden") — der Editor
wird immer über die Apps-Script-Startseite geöffnet:

1. **<https://script.google.com/home/projects>** aufrufen (gleiches Google-Konto
   wie beim Sheet) und das Projekt aus der Liste öffnen.
2. Links in der Dateileiste `Code.gs` anklicken, Inhalt komplett markieren
   (`Strg+A`) und löschen.
3. Inhalt von [`google-apps-script/Code.gs`](google-apps-script/Code.gs) aus
   diesem Repo hineinkopieren.
4. **💾 Speichern** (`Strg+S`).

### Schritt 4 — Skripteigenschaften setzen
1. Links auf **⚙️ Projekteinstellungen** → runterscrollen zu
   **Skripteigenschaften → Skripteigenschaft hinzufügen**.
2. Diese Eigenschaften anlegen:

   | Eigenschaft | Wert |
   |---|---|
   | `SPREADSHEET_ID` | die ID aus der Sheet-URL zwischen `/d/` und `/edit` — **zwingend**, weil das Script nicht an der Tabelle hängt |
   | `GITHUB_TOKEN` | Ein GitHub Personal Access Token mit `workflow`-Recht (siehe unten) |
   | `GITHUB_REPO` | z. B. `dein-benutzername/rs-heimbach` |
   | `GITHUB_WORKFLOW_FILE` | `sheets-sync.yml` |
   | `CACHE_SECONDS` | optional, z. B. `120` |

   GitHub-Token erzeugen: GitHub → Profilbild → **Settings → Developer settings
   → Personal access tokens → Fine-grained tokens** → Repo `rs-heimbach`
   auswählen → Berechtigung **Actions: Read and write**.

### Schritt 5 — Test im Editor
1. Oben im Apps-Script-Editor die Funktion **`testPayload`** auswählen → **▶ Ausführen**.
2. Beim ersten Mal nach Berechtigungen fragen lassen → **Zulassen**.
3. Im Ausführungsprotokoll sollte etwas stehen wie
   `Lehrer: 8 | News: 4` — wenn die Zahlen > 0 sind, funktioniert es.

### Schritt 6 — Als Web-App veröffentlichen
1. **Bereitstellen → Neue Bereitstellung** → Zahnrad ⚙ → **Web-App**.
2. **Ausführen als:** Ich · **Zugriff:** Jeder.
3. **Bereitstellen** → Berechtigungen bestätigen.
4. Die Web-App-URL kopieren (endet auf `/exec`).

> 🔁 **Bei späteren Code-Änderungen** (Speichern allein genügt nicht!):
> **Bereitstellen → Bereitstellungen verwalten → ✎ Bearbeiten →
> Version: Neu → Bereitstellen**. Die URL bleibt dabei gleich.
> Nimm *nicht* „Neue Bereitstellung" — das erzeugt eine neue URL, die dann
> nicht mehr zum GitHub-Secret `CONTENT_API_URL` passt.

### Schritt 7 — GitHub-Secret setzen
Im GitHub-Repo: **Settings → Secrets and variables → Actions → New repository
secret**:
- Name: `CONTENT_API_URL`
- Wert: die `/exec`-URL aus Schritt 6

Fertig — ab jetzt holt der Workflow `.github/workflows/sheets-sync.yml` alle
15 Minuten automatisch die aktuellen Sheet-Daten, committet sie und stößt
damit den bestehenden Deploy-Workflow an.

---

## 👩‍🏫 TEIL B — Anleitung für die Lehrkräfte (kein Technik-Wissen nötig)

### Inhalte ändern
1. Google Sheet öffnen (Link bekommst du von der Schulleitung).
2. Im Tab **Lehrer** oder **News** Zeilen bearbeiten, hinzufügen oder löschen.
3. Speichern passiert automatisch.

### Sofort aktualisieren
Im Sheet oben in der Menüleiste auf **🚀 Website → Jetzt aktualisieren**
klicken. Nach ca. 2–3 Minuten sind die Änderungen live.

Ohne Klick erscheinen Änderungen spätestens nach ~15–20 Minuten von selbst.

### Spalten-Übersicht
- **Lehrer:** `Vorname`, `Nachname`, `Geschlecht` (`Hr.`/`Fr.`), `Rolle`,
  `Fächer`, `Bio`, `Bild-URL` (optional), `Schulleitung` (`Ja`/leer),
  `Telefon` (nur für Schulleitungskarte), `Email` (`Ja`/leer — Adresse wird
  automatisch gebildet).
- **News:** `Titel`, `Datum`, `Kategorie`, `Teaser`, `Volltext` (optional),
  `Bild-URL` (optional), `Slug` (optional), `Hauptbeitrag` (optional, siehe oben).

---

## 🛠️ Fehlerbehebung

| Symptom | Ursache / Lösung |
|---|---|
| „Erweiterungen → Apps Script" zeigt „Datei kann derzeit nicht geöffnet werden" | Normal — das Script hängt nicht an der Tabelle. Editor über <https://script.google.com/home/projects> öffnen. |
| `Kein Spreadsheet gefunden (SPREADSHEET_ID pruefen)` | Skripteigenschaft `SPREADSHEET_ID` fehlt oder ist falsch (Teil A, Schritt 4). |
| Inhalte bleiben leer/veraltet | `CONTENT_API_URL`-Secret in GitHub fehlt/falsch, oder Web-App-Zugriff ≠ "Jeder". Mit `testPayload` (Teil A, Schritt 5) prüfen. |
| "Jetzt aktualisieren" meldet Fehler | `GITHUB_TOKEN` abgelaufen oder ohne `workflow`-Recht — neuen Token erzeugen (Teil A, Schritt 4). |
| Backend direkt testen | Web-App-URL im Browser öffnen → es muss JSON mit `lehrer`, `news` erscheinen. |
| Neue Person erscheint nicht auf der Schulleitungs-Seite | Spalte `Schulleitung` muss genau `Ja` enthalten. |
| In der Email-Spalte steht `Ja` und genau das erscheint auf der Website | Der aktualisierte `Code.gs` ist noch nicht als neue Version bereitgestellt (Teil A, Schritt 6 — **Bereitstellen → Bereitstellungen verwalten → ✎ → Version: Neu**). |
| Persönliche E-Mail fehlt trotz `Ja` | In der Zeile fehlt der `Vorname` — ohne ihn lässt sich `m.werner@…` nicht bilden. |
