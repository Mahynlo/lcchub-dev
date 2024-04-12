import { Calendar } from "@/components/ui/calendar";
import UpcomingEventsTable from "@/components/ui/home/upcoming-events-table";

export type Event = {
  title: string;
  shdesc: string;
  desc: string;
  location: string;
  date: Date;
  approved_by: string;
  from_community: boolean;
};

const all_events: Event[] = [
  {
    title: "Introduction to Machine Learning",
    shdesc: "Learn the basics of machine learning and its applications",
    desc: "This event will cover the fundamentals of machine learning, including supervised and unsupervised learning, and provide an overview of the field's current state and future directions.",
    location: "Engineering Building, Room 101",
    date: new Date("2024-04-16"),
    approved_by: "John Doe",
    from_community: false,
  },
  {
    title: "Community Service Day",
    shdesc:
      "Join us for a day of community service and give back to the local community",
    desc: "This event will involve volunteering at a local soup kitchen or cleaning up a nearby park. Come make a difference and meet new people!",
    location: "Local Park, Near Campus",
    date: new Date("2024-04-11"),
    approved_by: "Jane Smith",
    from_community: true,
  },
  {
    title: "Career Fair",
    shdesc:
      "Meet with representatives from top companies and learn about job opportunities",
    desc: "This event will feature a variety of companies from different industries, all looking to hire talented students like you. Come prepared with your resume and a list of questions!",
    location: "Campus Center, Ballroom A",
    date: new Date("2024-04-12"),
    approved_by: "Bob Johnson",
    from_community: false,
  },
];

export function UpcomingEventsSection() {
  const markedInCalendar = all_events.map((event) => event.date);
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
            selected={markedInCalendar}
            className="rounded-md border"
          />
        </div>
        <div className="md:w-2/3 space-y-4">
          <UpcomingEventsTable events={all_events} />
        </div>
      </div>
    </section>
  );
}
