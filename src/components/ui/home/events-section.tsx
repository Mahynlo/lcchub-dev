import { Calendar } from "@/components/ui/calendar";
import UpcomingEventsTable from "@/components/ui/home/upcoming-events-table";
import { Event } from "@/lib/types";
import Link from "next/link";
interface UpcomingEventsSectionProps {
  allEventsDates: Date[];
  upcomingEvents: Event[];
}

export function UpcomingEventsSection({
  allEventsDates,
  upcomingEvents,
}: UpcomingEventsSectionProps) {
  return (
    <section className="py-20" id="events">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <Link href={"/eventos"}>
            <span className="bg-red-500 rounded-lg text-3xl font-bold text-slate-50 px-4 py-1">
              Eventos
            </span>
          </Link>
          <p className="text-gray-700 mt-2">
            Enterate de los eventos organizados por la universidad y por la
            comunidad de ciencias de la computación.
          </p>
        </div>
      </div>

      <div className="container grid md:grid-cols-4 gap-4 mx-auto py-5">
        <Calendar
          mode="multiple"
          selected={allEventsDates}
          className="md:col-span-1 h-85 justify-self-center"
        />
        <div className="md:col-span-3 h-85">
          <UpcomingEventsTable events={upcomingEvents} />
        </div>
      </div>
    </section>
  );
}
