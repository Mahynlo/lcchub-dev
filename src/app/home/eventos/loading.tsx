export default function Loading() {
  return (
    <div>
      {/* Header de la página */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-10 text-center">
          <span className="bg-[#CC2146] rounded-lg text-3xl font-bold text-slate-50 px-4 py-1">
            Todos los eventos
          </span>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Entérate de todos los eventos que publicamos, organizados
            por la universidad y por la comunidad de ciencias de la computación.
          </p>
        </div>
      </div>

      {/* Spinner */}
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-[#CC2146]"></div>
        <p className="mt-4 text-gray-500 text-base">Cargando eventos...</p>
      </div>
    </div>
  );
}
