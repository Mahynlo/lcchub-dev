export default function Loading() {
  return (
    <div className="container mx-auto px-2 md:px-6 py-6 md:py-10">
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#CC2146] mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Cargando anuncio y noticias...</p>
          <p className="text-gray-500 text-sm mt-2">Un momento por favor</p>
        </div>
      </div>
    </div>
  );
}
