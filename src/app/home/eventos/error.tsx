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
          <span className="bg-[#CC2146] rounded-lg text-3xl font-bold text-slate-50 px-4 py-1">
            Todos los eventos
          </span>
        </div>
        <p className="text-gray-700 mt-2">
          Enterate de todos los eventos que publicamos que fueron organizados
          por la universidad y por la comunidad de ciencias de la computación.
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Error al cargar eventos
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Hubo un problema al obtener los eventos. Por favor, intenta nuevamente.
        </p>
        <button
          onClick={reset}
          className="bg-[#CC2146] hover:bg-[#A01838] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
