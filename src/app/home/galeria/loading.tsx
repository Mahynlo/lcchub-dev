export default function Loading() {
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

      {/* Spinner */}
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-[#5121CC]"></div>
        <p className="mt-4 text-gray-500 text-base">Cargando galería...</p>
        <p className="text-gray-400 text-sm mt-1">Obteniendo las imágenes más recientes</p>
      </div>
    </div>
  );
}
