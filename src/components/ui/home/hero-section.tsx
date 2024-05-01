import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export function HeroSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold">Bienvenid@ a LCC Hub</h1>
          <p className="text-gray-700">
            Un espacio para compartir contenido relevante para la comunidad en
            ciencias de la computación de la Universidad de Sonora, y una
            herramienta complementaria para el avance de los alúmnos en sus
            estudios.
          </p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link href="#">Mi Portal</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link
                className="hover:text-purple-400 transition-colors"
                href="https://cc-unison.github.io/documentation-lcchub/"
                target="_blank" // Links open in new tab
              >
                Documentación
              </Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src={"/LCChome.jpg"}
            height={400}
            width={600}
            alt="Edificio de computación"
            className="rounded-lg aspect-video"
          />
        </div>
      </div>
    </section>
  );
}
