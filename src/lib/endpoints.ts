import { Event } from "@/lib/types";

export async function getEventsAfterDate(date: Date) {
    const res: Event[] = [
      {
        title: "Evento 1",
        shdesc: "Evento 1",
        desc: "Evento 1",
        location: "Evento 1",
        date: new Date("2024-04-01"),
        approved_by: "Evento 1",
        from_community: false,
      },
      {
        title: "Evento 2",
        shdesc: "Evento 2",
        desc: "Evento 2",
        location: "Evento 2",
        date: new Date("2024-04-02"),
        approved_by: "Evento 2",
        from_community: true,
      },
      {
        title: "Evento 3",
        shdesc: "Evento 3",
        desc: "Evento 3",
        location: "Evento 3",
        date: new Date("2024-04-03"),
        approved_by: "Evento 3",
        from_community: false,
      },
      {
        title: "Evento 4",
        shdesc: "Evento 4",
        desc: "Evento 4",
        location: "Evento 4",
        date: new Date("2024-04-23"),
        approved_by: "Evento 4",
        from_community: true,
      },
    ];
  
    return res.filter((event) => event.date > date);
  }

export async function getEventsDates() {
  const res: Date[] = [
    new Date("2024-04-01"),
    new Date("2024-04-02"),
    new Date("2024-04-03"),
    new Date("2024-04-23"),
  ];

  return res;
}