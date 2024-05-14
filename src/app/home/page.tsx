import { HeroSection } from "@/components/ui/home/hero-section";
import { UpcomingEventsSection } from "@/components/ui/home/events-section";
import { SoyLCCSection } from "@/components/ui/home/soy-lcc-section";
import { JobBoardSection } from "@/components/ui/home/job-board-section";
import { getEventsDates, getEventsAfterDate } from "@/lib/api/events";
import { getAllSoyLCCVideos } from "@/lib/api/soy-lcc-videos";
import { getAllProyectOfferings } from "@/lib/api/proyect-offerings";
import { ProyectOffering } from "@/lib/types";

export default async function HomePage() {
  const allEventsDates = await getEventsDates();
  const upcomingEvents = await getEventsAfterDate(new Date());
  const soyLCCVideos = await getAllSoyLCCVideos();
  const proyectOfferings: ProyectOffering[] = await getAllProyectOfferings();

  return (
    <div>
      <HeroSection />
      <UpcomingEventsSection
        allEventsDates={allEventsDates}
        upcomingEvents={upcomingEvents}
      />
      <SoyLCCSection soyLCCVideos={soyLCCVideos} />
      <JobBoardSection proyectOfferings={proyectOfferings} />
    </div>
  );
}
