export default function Loading() {
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
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#CC2146] mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Cargando blogs...</p>
            <p className="text-gray-500 text-sm mt-2">Obteniendo las publicaciones más recientes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
