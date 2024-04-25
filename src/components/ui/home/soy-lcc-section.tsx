import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function SoyLCCSection() {
  return (
    <section className="bg-gray-100 py-20" id="news">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Soy LCC</h2>
          <p className="text-gray-700">
            Un espacio para compartir consejos y experiencias de parte de
            egresados de nuestra comunidad.
          </p>
        </div>
        <div className="container">
          <Carousel>
            <CarouselContent className="-ml-2">
              <CarouselItem className="basis-1/2 lg:basis-1/3">
                Hola
              </CarouselItem>
              <CarouselItem className="basis-1/2 lg:basis-1/3">
                Hola
              </CarouselItem>
              <CarouselItem className="basis-1/2 lg:basis-1/3">
                Hola
              </CarouselItem>
              <CarouselItem className="basis-1/2 lg:basis-1/3">
                Hola
              </CarouselItem>
              <CarouselItem className="basis-1/2 lg:basis-1/3">
                Hola
              </CarouselItem>
              <CarouselItem className="basis-1/2 lg:basis-1/3">
                Hola
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
