"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-2 md:px-6 py-6 md:py-10">
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-6">⚠️</div>
          <h2 className="text-gray-800 font-bold text-xl mb-3">
            Error al cargar el anuncio y noticias
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            No se pudo cargar el contenido del anuncio y noticias. Por favor, intenta nuevamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="bg-[#CC2146] hover:bg-[#A01838] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Reintentar
            </button>
            <Link
              href="/home/blog"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al anuncios y noticias
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
