"use client";

import { Event } from "./eventsSection";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "event",
    header: () => <div className="text-left">Eventos próximos</div>,
    cell: ({ row }) => {
      const { title, shdesc, date, location, from_community } = row.original;
      return (
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-1 col-end-2">
            {date.toLocaleString("es-MX")}
          </div>
          <div className="text-left col-start-2 col-end-6">
            <div className="text-lg font-bold">{title}</div>
            <div>{shdesc}</div>
          </div>
          <div className="col-start-6 col-end-7">{location}</div>
        </div>
      );
    },
  },
];

type UpcomingEventsProps = {
  events: Event[];
};
export default function UpcomingEventsTable(props: UpcomingEventsProps) {
  const { events } = props;
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={events} />
    </div>
  );
}
