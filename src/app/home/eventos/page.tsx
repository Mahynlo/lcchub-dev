import type { Metadata } from "next";
import AllEventsTable from "@/components/ui/home/Eventos/all-events-table";
import { getAllEvents } from "@/lib/api/events";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Todos los eventos de la comunidad LCC",
};

export default async function EventosPage() {
  const all_events = await getAllEvents();
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

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        <AllEventsTable events={all_events} />
      </div>
    </div>
  );
}
