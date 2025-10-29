import AllEventsTable from "@/components/ui/home/Eventos/all-events-table";
import { getAllEvents } from "@/lib/api/events";
import { GallerySection } from "@/components/ui/home/gallery-section";
export default async function GaleriaPage() {
  const all_events = await getAllEvents();
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
       <GallerySection />
     </div>
       
      
    </div>
  );
}