import type { Metadata } from "next";
import { GallerySection } from "@/components/ui/home/gallery-section";
import { getGalleryImages } from "@/lib/api/gallery_images";

export const metadata: Metadata = {
  title: "Galería",
  description: "Galería de imágenes de la comunidad LCC",
};

export default async function GaleriaPage() {
  const galleryImages = await getGalleryImages();

  return (
    <div>
      {/* Header de la página */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-10 text-center">
          <span className="bg-[#5121CC] rounded-lg text-3xl font-bold text-slate-50 px-4 py-1">
            Galería LCC Hub
          </span>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Explora las imágenes destacadas de nuestra comunidad.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        <GallerySection galleryImages={galleryImages} />
      </div>
    </div>
  );
}