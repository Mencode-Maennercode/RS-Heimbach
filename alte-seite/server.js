const http = require('http');
const fs = require('fs');
const path = require('path');

const SEITEN_DIR = path.join(__dirname, 'seiten');

const NAVIGATION = `
<nav style="background:#2d5a27;padding:12px 20px;position:sticky;top:0;z-index:100">
  <a href="/" style="color:white;text-decoration:none;font-weight:bold;font-size:18px;margin-right:30px">🏫 RS Am Heimbach</a>
  <a href="/personen-und-gruppen" style="color:#ccc;text-decoration:none;margin-right:15px">Personen & Gruppen</a>
  <a href="/organisation" style="color:#ccc;text-decoration:none;margin-right:15px">Organisation</a>
  <a href="/beratung" style="color:#ccc;text-decoration:none;margin-right:15px">Beratung</a>
  <a href="/schulleben" style="color:#ccc;text-decoration:none;margin-right:15px">Schulleben</a>
  <a href="/service" style="color:#ccc;text-decoration:none;margin-right:15px">Service</a>
  <a href="/_alle-seiten" style="color:#8eff8e;text-decoration:none;font-weight:bold">📄 Alle Seiten</a>
</nav>`;

function renderPage(title, content) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>${title} – RS Am Heimbach (Offline)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f5f5f5; color: #333; }
    .container { max-width: 900px; margin: 30px auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #2d5a27; margin-bottom: 20px; font-size: 28px; }
    pre { white-space: pre-wrap; line-height: 1.7; font-family: Arial, sans-serif; font-size: 15px; }
    .badge { display:inline-block; background:#e8f5e9; color:#2d5a27; padding:3px 10px; border-radius:20px; font-size:12px; margin-bottom:20px; }
  </style>
</head>
<body>
${NAVIGATION}
<div class="container">
  <span class="badge">Offline-Archiv</span>
  <h1>${title}</h1>
  <pre>${content}</pre>
</div>
</body>
</html>`;
}

function getSeiteList() {
  const files = fs.readdirSync(SEITEN_DIR).filter(f => f.endsWith('.txt'));
  const links = files.map(f => {
    const name = f.replace('.txt', '');
    const content = fs.readFileSync(path.join(SEITEN_DIR, f), 'utf8');
    const zeichen = content.length;
    const hatInhalt = zeichen > 200;
    return `<li style="margin:8px 0">
      <a href="/${name}" style="color:#2d5a27;font-weight:bold">${name}</a>
      <span style="color:${hatInhalt ? 'green' : 'orange'};font-size:12px;margin-left:10px">
        ${hatInhalt ? '✅' : '⚠️ leer'} (${zeichen} Zeichen)
      </span>
    </li>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Alle Seiten – RS Am Heimbach (Offline)</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; }
    .container { max-width: 900px; margin: 30px auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #2d5a27; margin-bottom: 20px; }
    ul { list-style: none; padding: 0; }
    a { text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
${NAVIGATION}
<div class="container">
  <h1>📄 Alle gespeicherten Seiten (${files.length})</h1>
  <ul>${links}</ul>
  <br><hr><br>
  <p><a href="/vergleich" style="color:#2d5a27;font-weight:bold">📊 Vergleich: Alte vs. Neue Website anzeigen</a></p>
</div>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  const url = req.url.replace(/^\//, '') || 'startseite';

  if (url === '_alle-seiten') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(getSeiteList());
  }

  if (url === 'vergleich') {
    const md = fs.readFileSync(path.join(__dirname, 'vergleich.md'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(renderPage('Vergleich: Alte vs. Neue Website', md));
  }

  // Suche passende .txt Datei
  const files = fs.readdirSync(SEITEN_DIR);
  const match = files.find(f => f.replace('.txt', '').toLowerCase() === url.toLowerCase());

  if (match) {
    const content = fs.readFileSync(path.join(SEITEN_DIR, match), 'utf8');
    const lines = content.split('\n');
    const text = lines.slice(2).join('\n').trim();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(renderPage(match.replace('.txt', ''), text));
  }

  // Startseite
  if (url === '' || url === 'startseite') {
    const content = fs.readFileSync(path.join(SEITEN_DIR, 'startseite.txt'), 'utf8');
    const text = content.split('\n').slice(2).join('\n').trim();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(renderPage('Startseite', text));
  }

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderPage('404 – Nicht gefunden', `Seite "${url}" nicht gefunden.\n\nZurück zur <a href="/_alle-seiten">Übersicht</a>.`));
});

server.listen(3333, () => {
  console.log('');
  console.log('✅ Offline-Server läuft!');
  console.log('');
  console.log('   👉 http://localhost:3333');
  console.log('   👉 http://localhost:3333/_alle-seiten  (alle Seiten)');
  console.log('   👉 http://localhost:3333/vergleich     (Vergleich)');
  console.log('');
  console.log('   Strg+C zum Beenden');
  console.log('');
});
