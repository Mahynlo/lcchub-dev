import { HeroSection } from "@/components/ui/home/heroSection";
import { UpcomingEventsSection } from "@/components/ui/home/eventsSection";
import { NewsSection } from "@/components/ui/home/newsSection";
import { GallerySection } from "@/components/ui/home/gallerySection";
import { JobBoardSection } from "@/components/ui/home/job-board-section";
import { getEventsDates, getEventsAfterDate } from "@/lib/api/events";

export default async function HomePage() {
  const allEventsDates = await getEventsDates();
  const upcomingEvents = await getEventsAfterDate(new Date());

  return (
    <div>
      <HeroSection />
      <UpcomingEventsSection
        allEventsDates={allEventsDates}
        upcomingEvents={upcomingEvents}
      />
      <NewsSection />
      {/* <JobBoardSection /> */}
      {/* <GallerySection /> */}
    </div>
  );
}
