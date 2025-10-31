export default function Loading() {
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
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#5121CC] mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Cargando galería...</p>
            <p className="text-gray-500 text-sm mt-2">Obteniendo las imágenes más recientes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
