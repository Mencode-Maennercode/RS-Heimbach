"use client";

import { useEffect, useState } from "react";

// News-Bilder im Hochformat sind praktisch immer Flyer/Plakate (z. B. A4-PNG).
// Die werden automatisch erkannt und anders dargestellt: oberer Ausschnitt mit
// der Ueberschrift auf der Karte, im Beitrag dann der komplette Flyer.
const cache = new Map<string, boolean>();

export function useIsFlyer(src: string) {
  const [isFlyer, setIsFlyer] = useState(() => cache.get(src) ?? false);

  useEffect(() => {
    if (cache.has(src)) {
      setIsFlyer(cache.get(src)!);
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      const result = img.naturalHeight > img.naturalWidth * 1.1;
      cache.set(src, result);
      setIsFlyer(result);
    };
    img.src = src;
  }, [src]);

  return isFlyer;
}

// Ausschnitt fuer Flyer auf Karten: oberes Drittel, wo meist die Ueberschrift
// steht (statt der Bildmitte, die nur Fliesstext zeigt).
export const FLYER_POSITION = "center 22%";

// Drive-Bilder werden als Thumbnail eingebunden; fuer den Download-Knopf auf
// den echten Datei-Download umschreiben.
export function downloadUrl(src: string) {
  const id = src.match(/drive\.google\.com\/.*[?&]id=([\w-]+)/)?.[1];
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : src;
}
