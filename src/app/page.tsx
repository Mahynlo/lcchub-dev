import { HomeNavbar } from "@/components/ui/home/navbar";
import { HeroSection } from "@/components/ui/home/heroSection";
import { UpcomingEventsSection } from "@/components/ui/home/eventsSection";
import { NewsSection } from "@/components/ui/home/newsSection";
import { GallerySection } from "@/components/ui/home/gallerySection";
import { HomeFooter } from "@/components/ui/home/footer";

export default function HomePage() {
  return (
    <div>
      <HomeNavbar />
      <HeroSection />
      <main>
        <UpcomingEventsSection />
        {/* <NewsSection /> */}
        {/* <GallerySection /> */}
      </main>
      <HomeFooter />
    </div>
  );
}
