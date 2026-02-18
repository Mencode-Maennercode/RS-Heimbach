import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Realschule Am Heimbach – Troisdorf",
    template: "%s | Realschule Am Heimbach",
  },
  description:
    "Die Realschule Am Heimbach in Troisdorf – moderne Ganztagsschule mit ca. 590 Schülerinnen und Schülern. Individuelle Förderung, kreative Projekte und ein herzliches Miteinander.",
  keywords: ["Realschule", "Troisdorf", "Heimbach", "Ganztagsschule", "NRW"],
  openGraph: {
    siteName: "Realschule Am Heimbach",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="antialiased bg-white text-slate-900">
        <Navigation />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
