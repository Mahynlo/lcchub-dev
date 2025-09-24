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

import { SoyLCCVideo } from "@/lib/types";
import Image from "next/image";

interface SoyLCCSectionProps {
  soyLCCVideos: SoyLCCVideo[];
}
export function SoyLCCSection({ soyLCCVideos }: SoyLCCSectionProps) {
  return (
    <section className="bg-gray-100 py-20" id="news">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div>
            <span className="bg-blue-950 rounded-lg text-3xl font-bold text-slate-50 px-4 py-1">
              SoyLCC
            </span>
          </div>
          <p className="text-gray-700 mt-2">
            Un espacio para compartir consejos y experiencias de parte de
            egresados de nuestra comunidad.
          </p>
        </div>
        <div className="container">
          <Carousel>
            <CarouselContent>
              {soyLCCVideos.map((video, i) => (
                <CarouselItem key={i} className="md:basis-1/3 h-300">
                  <Card className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                    <CardHeader>
                      <a
                        href={video.redirect}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src={
                            video.thumbnail || "/default-video-thumbnail.jpg"
                          }
                          alt={video.title}
                          width={400}
                          height={200}
                        />
                      </a>
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{video.title}</CardTitle>
                      <CardDescription>
                        {video.desc || "egresad@ de LCC"}
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
