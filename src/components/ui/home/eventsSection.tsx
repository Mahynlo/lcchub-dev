import { Calendar } from "@/components/ui/calendar";
import UpcomingEventsTable from "@/components/ui/home/upcoming-events-table";
import { Event } from "@/lib/types";

interface UpcomingEventsSectionProps {
  allEventsDates: Date[];
  upcomingEvents: Event[];
}

export function UpcomingEventsSection({ allEventsDates, upcomingEvents }: UpcomingEventsSectionProps) {
  
  return (
    <section className="py-20" id="events">
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
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="flex md:w-1/3 space-y-4 content-center justify-center">
          <Calendar
            mode="multiple"
            selected={allEventsDates}
            className="rounded-md border"
          />
        </div>
        <div className="md:w-2/3 space-y-4">
          <UpcomingEventsTable events={upcomingEvents} />
        </div>
      </div>
    </section>
  );
}
