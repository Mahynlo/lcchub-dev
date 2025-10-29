"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/LCChome.jpg",
  "/LCCHOME_2.jpeg",
  "/LCCHOME_3.jpeg",
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // ⏱ Cambia la imagen automáticamente cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-100 py-20 sm:py-10 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 space-y-4  md:text-left">
          <h1 className="text-4xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Bienvenid@ a</h1>
          <h1 className="text-4xl font-bold  text-[#2145CC] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            LCC Hub
          </h1>
          <p className="text-gray-700 sm:text-balance">
            Un espacio para compartir contenido relevante para la comunidad 
            en ciencias de la computación de la Universidad de Sonora, y una
            herramienta complementaria para el avance de los alúmnos en sus
            estudios.
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-start items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
  <Button asChild className="bg-[#2145CC] hover:bg-purple-700 text-white">
    <Link href="/dashboard/auth">Mi Portal</Link>
  </Button>
  <Button variant="secondary" asChild>
    <Link
      className="hover:text-purple-400 transition-colors"
      href="https://cc-unison.github.io/documentation-lcchub/"
      target="_blank"
    >
      Documentación
    </Link>
  </Button>
</div>

        </div>

        {/* Imagen con transición suave */}
        <div className="md:w-1/2 relative h-[400px] w-full mt-8 md:mt-0">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Imagen ${index + 1}`}
              fill
              className={`object-cover rounded-lg transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Fondo degradado sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/30 pointer-events-none"></div>
    </section>
  );
}
