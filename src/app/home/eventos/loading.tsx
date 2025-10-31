export default function Loading() {
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
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#CC2146]"></div>
        <p className="mt-4 text-gray-600 text-lg">Cargando eventos...</p>
      </div>
    </div>
  );
}
