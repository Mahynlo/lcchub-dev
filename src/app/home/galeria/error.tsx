"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-5">
      <div className="mb-8 text-center">
        <div className="">
          <span className="bg-[#5121CC] rounded-lg text-3xl font-bold text-slate-50 px-4 py-1">
            Galería Lcc Hub
          </span>
        </div>
        <p className="text-gray-700 mt-2">
          Explora las imágenes destacadas de nuestra comunidad.
        </p>
      </div>

      <div className="container">
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center max-w-md">
            <div className="text-red-600 text-6xl mb-6">⚠️</div>
            <h2 className="text-gray-800 font-bold text-xl mb-3">
              Error al cargar la galería
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              No se pudieron cargar las imágenes. Por favor, intenta nuevamente.
            </p>
            <button
              onClick={reset}
              className="bg-[#5121CC] hover:bg-[#4018A8] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
