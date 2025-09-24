import { HeroSection } from "@/components/ui/home/hero-section";
import { UpcomingEventsSection } from "@/components/ui/home/events-section";
import { SoyLCCSection } from "@/components/ui/home/soy-lcc-section";
import { JobBoardSection } from "@/components/ui/home/job-board-section";
import { getEventsDates, getEventsAfterDate } from "@/lib/api/events";
import { getAllSoyLCCVideos } from "@/lib/api/soy-lcc-videos";
import { getAllProyectOfferings } from "@/lib/api/proyect-offerings";
import { ProyectOffering } from "@/lib/types";
import { getAllAnuncios} from "@/lib/api/anuncios-y-noticias";
import { AnunciosYNoticiasSection } from "@/components/ui/home/anuncios-Section";

export default async function HomePage() {
  const allEventsDates = await getEventsDates();
  const upcomingEvents = await getEventsAfterDate(new Date());
  const soyLCCVideos = await getAllSoyLCCVideos();
  //des
  //const proyectOfferings: ProyectOffering[] = await getAllProyectOfferings();
  const anuncios = await getAllAnuncios();

  return (
    <div>
      <HeroSection />
      <UpcomingEventsSection
        allEventsDates={allEventsDates}
        upcomingEvents={upcomingEvents}
      />
      <AnunciosYNoticiasSection anuncios={anuncios} />
      <SoyLCCSection soyLCCVideos={soyLCCVideos} />
      {/*Desactivado la seccion de bolsa de proyectos*/}
      {/*<JobBoardSection proyectOfferings={proyectOfferings} /> */}
    </div>
  );
}
