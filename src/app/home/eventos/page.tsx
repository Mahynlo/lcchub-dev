import AllEventsTable from "@/components/ui/home/Eventos/all-events-table";
import { getAllEvents } from "@/lib/api/events";

export default async function EventosPage() {
  const all_events = await getAllEvents();
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
      <div className="container">
        <AllEventsTable events={all_events} />
      </div>
    </div>
  );
}
