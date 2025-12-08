import type { Metadata } from "next";
import { HeroSection } from "@/components/ui/home/hero-section";
import { UpcomingEventsSection } from "@/components/ui/home/events-section";
import { SoyLCCSection } from "@/components/ui/home/soy-lcc-section";
import { JobBoardSection } from "@/components/ui/home/job-board-section";
import { getEventsDates, getEventsAfterDate } from "@/lib/api/events";
import { getAllSoyLCCVideos } from "@/lib/api/soy-lcc-videos";
import { getAllProyectOfferings } from "@/lib/api/proyect-offerings";
import { ProyectOffering } from "@/lib/types";
import { getAllAnuncios} from "@/lib/api/anuncios-y-noticias";
import { getAllBlogs } from "@/lib/api/blog";
import { AnunciosYNoticiasSection } from "@/components/ui/home/anuncios-Section";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Portal de la comunidad de Ciencias de la Computación de la Universidad de Sonora",
};

export default async function HomePage() {
  const allEventsDates = await getEventsDates();
  const upcomingEvents = await getEventsAfterDate(new Date());
  const soyLCCVideos = await getAllSoyLCCVideos();
  //const proyectOfferings: ProyectOffering[] = await getAllProyectOfferings();
  const anuncios = await getAllAnuncios();
  const blogs = await getAllBlogs();

  // Combinar anuncios y blogs en una sola lista
  const allAnunciosYBlogs = [...anuncios, ...blogs];

  return (
    <div>
      <HeroSection />
      <UpcomingEventsSection
        allEventsDates={allEventsDates}
        upcomingEvents={upcomingEvents}
      />
      <AnunciosYNoticiasSection anuncios={allAnunciosYBlogs} />
      <SoyLCCSection soyLCCVideos={soyLCCVideos} />
      {/*Desactivado la seccion de bolsa de proyectos*/}
      {/*<JobBoardSection proyectOfferings={proyectOfferings} /> */}
    </div>
  );
}
