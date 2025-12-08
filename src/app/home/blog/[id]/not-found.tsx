import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-2 md:px-6 py-6 md:py-10">
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center max-w-md">
          <div className="text-gray-400 text-6xl mb-6">📝</div>
          <h2 className="text-gray-800 font-bold text-2xl mb-3">
            Anuncios y noticias no encontrado
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            El anuncio o noticia que buscas no existe.
          </p>
          <Link
            href="/home/blog"
            className="inline-flex items-center gap-2 bg-[#CC2146] hover:bg-[#A01838] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a anuncios y noticias
          </Link>
        </div>
      </div>
    </div>
  );
}
