import { UpcomingEventsSection } from "@/components/ui/home/eventsSection";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Event } from "@/lib/types";
import { getEventsAfterDate } from "@/lib/api/events";

const longTimeAgo = new Date("2020-01-01");
const mockEvents: Event[] = [
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

describe("upcoming event table",  () => {
    it("renders even if there are no events", async () => {
        const { container } = render(
            <UpcomingEventsSection allEventsDates={[]} upcomingEvents={[]} />
        );
        expect(container).toBeInTheDocument();
        
    });
    it("shows a message when there are no events", async () => {
        const { getByText } = render(
            <UpcomingEventsSection allEventsDates={[]} upcomingEvents={[]} />
        );
        expect(getByText(/no hay eventos/i)).toBeInTheDocument();

        const apiEvents = await getEventsAfterDate(new Date());
        if (apiEvents.length === 0) {
            const { getByText } = render(
                <UpcomingEventsSection allEventsDates={[]} upcomingEvents={[]} />
            );
            expect(getByText(/no hay eventos/i)).toBeInTheDocument();
        }
    });
    it("receives sorted events", async () => {
      
      const apiEvents = await getEventsAfterDate(longTimeAgo);
      if (apiEvents && apiEvents.length > 1) {
        // check that events are sorted
        console.log(apiEvents);
        for (let i = 0; i < apiEvents.length - 1; i++) {
          // say that is not sorted
          expect(apiEvents[i].date.getTime()).toBeLessThanOrEqual(apiEvents[i + 1].date.getTime());
        }
      }
    });
});