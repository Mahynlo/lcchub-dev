import { Event } from "@/lib/types";

export async function getEventsAfterDate(date: Date) {
    const res: Event[] = [
      {
        title: "Evento 1",
        shdesc: "Evento en la universidad de la computación evento evento evento evento evento",
        desc: "Evento 1",
        location: "Perimetral NOrte 1334 avenida avenida avenida",
        date: new Date("2024-04-18"),
        approved_by: "Evento 1",
        from_community: false,
      },
      {
        title: "Evento 2",
        shdesc: "Evento 2",
        desc: "Evento 2",
        location: "Evento 2",
        date: new Date("2024-04-23"),
        approved_by: "Evento 2",
        from_community: true,
      },
      {
        title: "Evento 3",
        shdesc: "Evento 3",
        desc: "Evento 3",
        location: "Evento 3",
        date: new Date("2024-04-28"),
        approved_by: "Evento 3",
        from_community: false,
      },
      {
        title: "Evento 4",
        shdesc: "Evento 4",
        desc: "Evento 4",
        location: "Evento 4",
        date: new Date("2024-05-10"),
        approved_by: "Evento 4",
        from_community: true,
      },
    ];

    const events = res.filter((event) => event.date >= date);
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

export async function getEventsDates() {
  const res: Date[] = (await getEventsAfterDate(new Date())).map((e) => e.date);
  return res;
}