const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

// Alle bekannten Seiten von der Navigation
const SEITEN = [
  { name: 'startseite', url: 'https://n1584246.websitebuilder.online/' },
  { name: 'personen-und-gruppen', url: 'https://n1584246.websitebuilder.online/personen-und-gruppen' },
  { name: 'schulleitung', url: 'https://n1584246.websitebuilder.online/personen-und-gruppen/schulleitung' },
  { name: 'kollegium', url: 'https://n1584246.websitebuilder.online/personen-und-gruppen/kollegium' },
  { name: 'sekretariat-und-hausmeister', url: 'https://n1584246.websitebuilder.online/personen-und-gruppen/sekretariat-und-hausmeister' },
  { name: 'schülervertretung', url: 'https://n1584246.websitebuilder.online/personen-und-gruppen/schuelervertretung' },
  { name: 'elternvertretung', url: 'https://n1584246.websitebuilder.online/personen-und-gruppen/elternvertretung' },
  { name: 'foerderverein', url: 'https://n1584246.websitebuilder.online/personen-und-gruppen/foerderverein' },
  { name: 'organisation', url: 'https://n1584246.websitebuilder.online/organisation' },
  { name: 'mensa', url: 'https://n1584246.websitebuilder.online/organisation/mensa' },
  { name: 'unterrichtsorganisation', url: 'https://n1584246.websitebuilder.online/organisation/unterrichtsorganisation' },
  { name: 'lehrerausbildung', url: 'https://n1584246.websitebuilder.online/organisation/lehrerausbildung' },
  { name: 'differenzierungsfaecher', url: 'https://n1584246.websitebuilder.online/organisation/differenzierungsfaecher' },
  { name: 'wahlunterricht-im-ganztag', url: 'https://n1584246.websitebuilder.online/organisation/wahlunterricht-im-ganztag' },
  { name: 'uebersicht-projekte', url: 'https://n1584246.websitebuilder.online/organisation/uebersicht-ueber-projekte' },
  { name: 'beratung', url: 'https://n1584246.websitebuilder.online/beratung' },
  { name: 'berufsorientierung', url: 'https://n1584246.websitebuilder.online/beratung/berufsorientierung' },
  { name: 'agentur-fuer-arbeit', url: 'https://n1584246.websitebuilder.online/beratung/agentur-fuer-arbeit' },
  { name: 'uebersicht-berufsfelder', url: 'https://n1584246.websitebuilder.online/beratung/uebersicht-ueber-berufsfelder' },
  { name: 'ausserschulische-kooperation', url: 'https://n1584246.websitebuilder.online/beratung/ausserschulische-kooperation' },
  { name: 'sprechstunden', url: 'https://n1584246.websitebuilder.online/beratung/sprechstunden' },
  { name: 'praevention', url: 'https://n1584246.websitebuilder.online/beratung/praevention-sucht-und-gewalt' },
  { name: 'schulleben', url: 'https://n1584246.websitebuilder.online/schulleben' },
  { name: 'bildergalerie', url: 'https://n1584246.websitebuilder.online/schulleben/bildergalerie' },
  { name: 'schuelérzeitung', url: 'https://n1584246.websitebuilder.online/schulleben/schülerzeitung' },
  { name: 'weihnachtsbriefe', url: 'https://n1584246.websitebuilder.online/schulleben/weihnachtsbriefe' },
  { name: 'theater-zu-gast', url: 'https://n1584246.websitebuilder.online/schulleben/theater-zu-gast' },
  { name: 'tutenchamun', url: 'https://n1584246.websitebuilder.online/schulleben/tutenchamun-ausstellung' },
  { name: 'tag-der-offenen-tuer', url: 'https://n1584246.websitebuilder.online/schulleben/tag-der-offenen-tuer' },
  { name: 'kaenguru-wettbewerb', url: 'https://n1584246.websitebuilder.online/schulleben/kaenguru-wettbewerb' },
  { name: 'anmeldung-5-klasse', url: 'https://n1584246.websitebuilder.online/schulleben/anmeldung-5-klasse' },
  { name: 'service', url: 'https://n1584246.websitebuilder.online/service' },
  { name: 'organigramm', url: 'https://n1584246.websitebuilder.online/organigramm' },
];

const OUTPUT_DIR = path.join(__dirname, 'seiten');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

async function scrapeAll() {
  console.log('Verbinde mit Chrome auf Port 9222...');

  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
    defaultViewport: null,
  });

  console.log('Verbunden!\n');
  const ergebnisse = {};

  for (const seite of SEITEN) {
    try {
      console.log(`Lade: ${seite.name} (${seite.url})`);
      const page = await browser.newPage();
      await page.goto(seite.url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1000));

      const inhalt = await page.evaluate(() => {
        // Entferne Navigation, Footer, Scripts
        const entfernen = document.querySelectorAll('nav, script, style, header, footer, .nav, .navigation, .menu');
        entfernen.forEach(el => el.remove());

        // Hole den Hauptinhalt
        const main = document.querySelector('main, .main, #main, article, .content, #content, body');
        return main ? main.innerText.trim() : document.body.innerText.trim();
      });

      const aktuelleUrl = page.url();
      ergebnisse[seite.name] = { url: aktuelleUrl, inhalt };

      // Speichere als einzelne Datei
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${seite.name}.txt`),
        `URL: ${aktuelleUrl}\n${'='.repeat(60)}\n\n${inhalt}`
      );

      console.log(`  ✓ ${inhalt.length} Zeichen gespeichert`);
      await page.close();
    } catch (err) {
      console.log(`  ✗ Fehler: ${err.message}`);
      ergebnisse[seite.name] = { url: seite.url, fehler: err.message };
    }
  }

  // Gesamtübersicht speichern
  let gesamt = '# Alle Seiteninhalte - Städtische Realschule Am Heimbach\n\n';
  for (const [name, data] of Object.entries(ergebnisse)) {
    gesamt += `\n${'#'.repeat(60)}\n## ${name}\nURL: ${data.url}\n${'#'.repeat(60)}\n\n`;
    gesamt += data.inhalt || `FEHLER: ${data.fehler}`;
    gesamt += '\n\n';
  }
  fs.writeFileSync(path.join(__dirname, 'alle-inhalte.txt'), gesamt);

  console.log('\n✓ Fertig! Gespeichert in:');
  console.log('  - alte-seite/seiten/*.txt (einzelne Seiten)');
  console.log('  - alte-seite/alle-inhalte.txt (Gesamtdatei)');

  await browser.disconnect();
}

scrapeAll().catch(console.error);
