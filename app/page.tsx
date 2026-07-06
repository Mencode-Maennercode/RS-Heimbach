import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import LeitbildSection from "@/components/home/LeitbildSection";
import NewsSection from "@/components/home/NewsSection";
import EventsSection from "@/components/home/EventsSection";
import GanztagTeaser from "@/components/home/GanztagTeaser";
import InstagramSection from "@/components/home/InstagramSection";
import ContactSection from "@/components/home/ContactSection";
import { getCalendarEvents } from "@/lib/calendar";

export default async function Home() {
  const events = await getCalendarEvents();
  return (
    <>
      <HeroSection />
      <StatsSection />
      <LeitbildSection />
      <NewsSection />
      <InstagramSection />
      <EventsSection events={events.slice(0, 6)} />
      <GanztagTeaser />
      <ContactSection />
    </>
  );
}
