import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import NewsSection from "@/components/home/NewsSection";
import EventsSection from "@/components/home/EventsSection";
import InstagramSection from "@/components/home/InstagramSection";
import ArtBlogPreview from "@/components/home/ArtBlogPreview";
import GanztagTeaser from "@/components/home/GanztagTeaser";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <NewsSection />
      <GanztagTeaser />
      <EventsSection />
      <ArtBlogPreview />
      <InstagramSection />
    </>
  );
}
