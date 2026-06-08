import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import NewsSection from "@/components/home/NewsSection";
import EventsSection from "@/components/home/EventsSection";
import GanztagTeaser from "@/components/home/GanztagTeaser";
import InstagramSection from "@/components/home/InstagramSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <NewsSection />
      <EventsSection />
      <GanztagTeaser />
      <InstagramSection />
      <ContactSection />
    </>
  );
}
