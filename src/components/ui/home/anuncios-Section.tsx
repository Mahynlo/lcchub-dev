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

import { AnunciosYNoticias } from "@/lib/types";
import Image from "next/image";
import { CalendarDays } from "lucide-react";

interface AnunciosYNoticiasSectionProps {
  anuncios: AnunciosYNoticias[];
}


export function AnunciosYNoticiasSection({
  anuncios,
}: AnunciosYNoticiasSectionProps) {
  return (
    <section className="bg-gray-100 py-20" id="anuncios">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div>
            <span className="bg-green-700 rounded-lg text-3xl font-bold text-slate-50 px-4 py-1">
              Anuncios
            </span>
          </div>
          <p className="text-gray-700 mt-2">
            Mantente al día con los anuncios y noticias importantes de nuestra
            comunidad.
          </p>
        </div>
        <div className="container">
          <Carousel>
            <CarouselContent>
              {anuncios.map((item, i) => (
                <CarouselItem key={i} className="md:basis-1/3">
                  <Card className="h-full flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">

                    {/* Fecha con ícono */}
                    <div className="flex items-center gap-2 px-4 pt-4 text-sm text-gray-500">
                      <CalendarDays className="w-6 h-6 text-green-700" />
                      <span>
                        
                        {item.issued.toLocaleDateString("es-ES", {
                          day: "2-digit",    // 06
                          month: "long",     // octubre
                          year: "numeric",   // 2025
                        })}
                      </span>
                    </div>

                    {/* Imagen con aspect ratio */}
                    <CardHeader className="px-0 pt-2">
                      <a
                        href={item.redirect}
                        target="_blank"
                        rel="noreferrer"
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
                      </a>
                    </CardHeader>

                    {/* Título y descripción */}
                    <CardContent>
                      <CardTitle className="text-xl font-bold">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {item.desc || "Sin descripción disponible"}
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
        </div>
      </div>
    </section>
  );
}
