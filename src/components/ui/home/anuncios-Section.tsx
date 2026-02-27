import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AnunciosYNoticias, BlogPost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { tagColors, tagLabels } from "@/lib/constants/tags";

// Tipo unificado que acepta tanto anuncios como blogs
type AnuncioOrBlog = AnunciosYNoticias | BlogPost;

interface AnunciosYNoticiasSectionProps {
  anuncios: AnuncioOrBlog[];
}

// Helper para obtener color del icono (convierte bg- a text-)
const getTagIconColor = (tag: string): string => {
  const bgColor = tagColors[tag] || "bg-gray-500";
  return bgColor.replace("bg-", "text-");
};

// Helper para determinar si es un blog o un anuncio
const isBlogPost = (item: AnuncioOrBlog): item is BlogPost => {
  return 'id' in item && 'content' in item;
};

// Helper para obtener el link correcto
const getItemLink = (item: AnuncioOrBlog): string => {
  if (isBlogPost(item)) {
    return `/home/blog/${item.id}`; // Link interno a la página de blog
  }
  return (item as AnunciosYNoticias).redirect; // Link externo del anuncio
};

export function AnunciosYNoticiasSection({
  anuncios,
}: AnunciosYNoticiasSectionProps) {
  const now = new Date();

  const getStatus = (item: AnuncioOrBlog) => {
    // CRÍTICO: Las fechas vienen como strings desde el servidor, debemos convertirlas
    const issuedDate = typeof item.issued === 'string' ? new Date(item.issued) : item.issued;
    const eventEndDate = item.eventEnd
      ? (typeof item.eventEnd === 'string' ? new Date(item.eventEnd) : item.eventEnd)
      : null;

    const start = new Date(issuedDate);
    start.setHours(0, 0, 0, 0); // Inicio del día

    // Si no tiene eventEnd, darle 14 días de vigencia por defecto
    const end = eventEndDate
      ? new Date(eventEndDate)
      : new Date(issuedDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    end.setHours(23, 59, 59, 999); // Fin del día

    if (now < start) return "upcoming"; // aún no empieza
    if (now >= start && now <= end) return "active"; // vigente
    return "expired"; // ya terminó
  };

  // FILTRAR eventos y blogs expirados - Solo mostrar activos y próximos
  const activeAnuncios = anuncios.filter(item => {
    const status = getStatus(item);
    return status === "active" || status === "upcoming";
  });

  const sortedAnuncios = [...activeAnuncios].sort((a, b) => {
    const statusA = getStatus(a);
    const statusB = getStatus(b);

    // Orden por estado
    const statusOrder = { active: 0, upcoming: 1, expired: 2 };
    if (statusA !== statusB) {
      return statusOrder[statusA] - statusOrder[statusB];
    }

    // Dentro del mismo estado: noticias primero
    const isNoticiaA = a.tag === "noticia";
    const isNoticiaB = b.tag === "noticia";
    if (isNoticiaA !== isNoticiaB) return isNoticiaA ? -1 : 1;

    // Si tienen eventEnd, ordenar por fecha de fin del evento
    if (a.eventEnd && b.eventEnd) {
      return a.eventEnd.getTime() - b.eventEnd.getTime();
    }

    // Noticias u otros → ordenar por publicación más reciente
    return b.issued.getTime() - a.issued.getTime();
  });

  return (
    <section className="bg-blue-50 py-20" id="anuncios">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div>
            <span className="bg-[#219CCC] rounded-lg text-3xl font-bold text-slate-50 px-4 py-1">
              Anuncios
            </span>
          </div>
          <p className="text-gray-600 mt-2">
            Mantente al día con los anuncios y noticias importantes de nuestra
            comunidad.
          </p>
        </div>
        <div className="container">
          {sortedAnuncios.length === 0 ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="text-gray-400 text-5xl mb-4">📬</div>
                <p className="text-base text-gray-600 font-medium">
                  No hay anuncios activos en este momento
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Vuelve pronto para ver las últimas novedades
                </p>
              </div>
            </div>
          ) : (
            <Carousel>
              <CarouselContent>
                {sortedAnuncios.map((item, i) => (
                  <CarouselItem key={i} className="md:basis-1/3">
                    <Card className="h-full flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1">

                      {/* Fecha con ícono y tag con color */}
                      <div className="flex items-center gap-2 px-4 pt-4 text-sm">
                        <CalendarDays className={`w-6 h-6 ${getTagIconColor(item.tag)}`} />
                        Publicado:
                        <span className="text-gray-500">
                          {item.issued.toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Imagen con aspect ratio */}
                      <CardHeader className="px-0 pt-2">
                        <Link
                          href={getItemLink(item)}
                          target={isBlogPost(item) ? "_self" : "_blank"}
                          rel={isBlogPost(item) ? undefined : "noreferrer"}
                          className="block w-full"
                        >
                          <div className="relative w-full aspect-[16/9] bg-gray-100">
                            <Image
                              src={item.thumbnail || "/default-thumbnail.jpg"}
                              alt={item.title}
                              fill
                              className="object-contain rounded-t-lg"
                            />
                          </div>
                        </Link>
                      </CardHeader>

                      {/* Título y descripción */}
                      <CardContent>
                        <CardTitle className="text-xl font-bold">
                          {item.title}
                          <span className={`ml-2 px-2 py-0.5 rounded text-white text-xs ${tagColors[item.tag] || "bg-gray-500"}`}>
                            {tagLabels[item.tag] || "General"}
                          </span>
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {item.excerpt || "Sin descripción disponible"}
                        </CardDescription>
                      </CardContent>

                      <CardFooter></CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}

