import { HeroSection } from "@/components/ui/home/heroSection";
import { UpcomingEventsSection } from "@/components/ui/home/eventsSection";
import { SoyLCCSection } from "@/components/ui/home/soy-lcc-section";
import { GallerySection } from "@/components/ui/home/gallerySection";
import { JobBoardSection } from "@/components/ui/home/job-board-section";
import { getEventsDates, getEventsAfterDate } from "@/lib/api/events";
import { getAllSoyLCCVideos } from "@/lib/api/soy-lcc-videos";

export default async function HomePage() {
  const allEventsDates = await getEventsDates();
  const upcomingEvents = await getEventsAfterDate(new Date());
  const soyLCCVideos = await getAllSoyLCCVideos();

  return (
    <div>
      <HeroSection />
      <UpcomingEventsSection
        allEventsDates={allEventsDates}
        upcomingEvents={upcomingEvents}
      />
      <SoyLCCSection soyLCCVideos={soyLCCVideos}/>
      {/* <JobBoardSection /> */}
      {/* <GallerySection /> */}
    </div>
  );
}
