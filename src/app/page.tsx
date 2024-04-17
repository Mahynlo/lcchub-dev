import { HomeNavbar } from "@/components/ui/home/navbar";
import { HeroSection } from "@/components/ui/home/heroSection";
import { UpcomingEventsSection } from "@/components/ui/home/eventsSection";
import { NewsSection } from "@/components/ui/home/newsSection";
import { GallerySection } from "@/components/ui/home/gallerySection";
import { HomeFooter } from "@/components/ui/home/footer";
import { getEventsDates, getEventsAfterDate } from "@/lib/api/events";

export default async function HomePage() {

  const allEventsDates = await getEventsDates();
  const upcomingEvents = await getEventsAfterDate(new Date());

  return (
    <div>
      <HomeNavbar />
      <HeroSection />
      <main>
        <UpcomingEventsSection allEventsDates={allEventsDates} upcomingEvents={upcomingEvents} />
        {/* <NewsSection /> */}
        {/* <GallerySection /> */}
      </main>
      <HomeFooter />
    </div>
  );
}
