"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-2 md:px-6 py-6 md:py-10">
      <div className="mb-6 md:mb-8 text-center">
        <div className="">
          <span className="bg-[#CC2146] rounded-lg text-2xl md:text-3xl font-bold text-slate-50 px-4 py-1">
          Anuncios y noticias LCC
          </span>
        </div>
        <p className="text-gray-700 mt-2 text-sm md:text-base">
          Noticias, eventos, talleres y más de la comunidad LCC
        </p>
      </div>

      <div className="container">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center max-w-md">
            <div className="text-red-600 text-6xl mb-6">⚠️</div>
            <h2 className="text-gray-800 font-bold text-xl mb-3">
              Error al cargar los anuncios y noticias
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              No se pudieron cargar las publicaciones de anuncios y noticias. Por favor, intenta nuevamente.
            </p>
            <button
              onClick={reset}
              className="bg-[#CC2146] hover:bg-[#A01838] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
