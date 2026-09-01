import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Statischer Export: erzeugt beim `next build` den Ordner `out/` mit reinen
  // HTML/JS/CSS-Dateien, die per FTP auf jeden Webspace passen (kein Server).
  output: "export",
  // Klassisches Webspace-Hosting (Apache/nginx ohne Rewrites): mit Trailing-Slash
  // wird je Route ein `ordner/index.html` erzeugt, das direkt ausgeliefert wird.
  trailingSlash: true,
  // reactCompiler laeuft als Babel-Pass ueber JEDE Datei und schaltet damit den
  // schnellen Rust-Pfad von Turbopack ab -> Dev-Kompilierung pro Route ~25 s.
  // Fuer diese ueberwiegend statische Seite bringt der Compiler kaum Laufzeit-
  // Vorteil, kostet aber massiv Dev-Zeit. Daher aus.
  reactCompiler: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Der Next-Bildoptimierer braucht einen Server – beim statischen Export
    // gibt es keinen, daher Bilder unveraendert ausliefern.
    unoptimized: true,
    // Alle Bilder (auch Instagram-Fotos, siehe scripts/instagram-sync.mjs) werden
    // vor dem Build lokal abgelegt -- kein Hotlinking zu Drittanbietern mehr,
    // relevant fuer die Datenschutzerklaerung (keine Bildaufrufe bei Dritten).
    remotePatterns: [
      { protocol: "https", hostname: "www.rs-heimbach.de" },
    ],
  },
};

export default nextConfig;
