import { Event } from "@/lib/types";

const baseUrl = "http://localhost:1337";
export async function getEventsAfterDate(date: Date) {
  try {
    const all_events = await getAllEvents();
    const upcoming_events = all_events.filter(
      (event: Event) => event.date >= date
    );
    const sorted_events = upcoming_events.sort(
      (a: Event, b: Event) => a.date.getTime() - b.date.getTime()
    );
    return sorted_events;
  } catch (error) {
    return [];
  }
}

export async function getEventsDates() {
  const all_events = await getAllEvents();
  const res = all_events.map((event: Event) => event.date);
  return res;
}

export async function getAllEvents() {
  try {
    const response = await fetch(baseUrl + "/api/events");
    const strapiData = await response.json();
    const data = strapiData.data.map((event: any) => ({
      title: event.attributes.title,
      shdesc: event.attributes.shdesc,
      desc: event.attributes.desc,
      location: event.attributes.location,
      date: new Date(event.attributes.date),
      approved_by: event.attributes.approved_by,
      from_community: event.attributes.from_community,
    }));
    const events = data.sort(
      (a: Event, b: Event) => b.date.getTime() - a.date.getTime()
    );
    return events;
  } catch (error) {
    return [];
  }
}
