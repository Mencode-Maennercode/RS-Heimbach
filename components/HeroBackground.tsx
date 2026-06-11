"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { getHeroImage } from "@/lib/heroImages";

/**
 * Durchscheinendes Hintergrundbild für die Hero-Leisten.
 * Wählt automatisch das Bild des jeweiligen Hauptmenü-Bereichs (über den Pfad),
 * kann aber per `image` gezielt überschrieben werden.
 *
 * Einsatz: als erstes Kind einer Hero-Section mit `relative overflow-hidden`
 * und der Klasse `gradient-hero` (liefert den farbigen Hintergrund).
 */
export default function HeroBackground({ image }: { image?: string }) {
  const pathname = usePathname();
  const src = image ?? getHeroImage(pathname);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20"
      />
    </div>
  );
}
