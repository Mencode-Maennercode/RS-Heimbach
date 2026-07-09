// Zentrale Zuordnung: ein Hero-Bild pro Hauptmenü-Bereich.
// Alle Unterseiten eines Bereichs teilen sich dasselbe Bild.
// Bilder: frei nutzbar (Pexels-Lizenz), moderner deutscher Schulkontext.

export const heroImages = {
  unsereSchule: "/hero/unsere-schule.jpg",
  schulalltag: "/hero/schulalltag.jpg",
  beratungService: "/hero/beratung-service.jpg",
  anmeldung: "/hero/aktuelles.jpg",
  kontakt: "/hero/kontakt.jpg",
} as const;

/**
 * Liefert das passende Hero-Bild zum aktuellen Pfad – ein Bild je Hauptmenüpunkt.
 */
export function getHeroImage(pathname: string): string {
  // Unsere Schule (inkl. Kollegium unter /lehrer)
  if (pathname.startsWith("/unsere-schule") || pathname.startsWith("/lehrer")) {
    return heroImages.unsereSchule;
  }
  // Schulalltag (Unterricht, Ganztag)
  if (pathname.startsWith("/unterricht") || pathname.startsWith("/ganztag")) {
    return heroImages.schulalltag;
  }
  // Beratung & Service (Beratung, Eltern, Förderverein, Termine, Downloads)
  if (
    pathname.startsWith("/beratung") ||
    pathname.startsWith("/eltern") ||
    pathname.startsWith("/foerderverein") ||
    pathname.startsWith("/veranstaltungen") ||
    pathname.startsWith("/service")
  ) {
    return heroImages.beratungService;
  }
  // Eigenständige Seiten
  if (pathname.startsWith("/anmeldung")) return heroImages.anmeldung;
  if (pathname.startsWith("/kontakt")) return heroImages.kontakt;

  // Fallback
  return heroImages.unsereSchule;
}
