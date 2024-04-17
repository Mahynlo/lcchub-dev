import { UpcomingEventsSection } from "@/components/ui/home/eventsSection";
import { getEventsDates, getEventsAfterDate } from "@/lib/api/events";

export default async function EventosPage() {
    const allEventsDates = await getEventsDates();
    const upcomingEvents = await getEventsAfterDate(new Date());
  return (
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="">
            <span className="bg-red-500 rounded-lg text-3xl font-bold text-slate-50">
              Eventos
            </span>
          </div>
          <p className="text-gray-700">
            Enterate de los eventos organizados por la universidad y por la
            comunidad de ciencias de la computación.
          </p>
        </div>
      </div>
  );
}