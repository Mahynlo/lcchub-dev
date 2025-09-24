"use client";

import { Event } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Months } from "@/lib/utils";
import { cx } from "class-variance-authority";

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "event",
    header: () => {
      return (
        <div className="flex flex-row justify-between items-center">
          <div> 🗓️ Eventos próximos</div>
          <div className="flex flex-row space-x-2 items-center">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <div>evento oficial</div>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div>evento comunitario</div>
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const { title, shdesc, desc, date, location, from_community } =
        row.original;
      const day: number = date.getDate();
      const month: string = Months[date.getMonth()].toUpperCase();
      const start: string = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div
          className={cx`grid grid-cols-6 gap-4 border-l-0 md:border-l-2 
                        ${from_community ? "border-l-green-400" : "border-l-blue-400"}`}
        >
          <div className="col-start-1 col-end-2">
            <div className="font-mono grid grid-rows-2 gap-0 items-center justify-center">
              <span className="row-span-1">{month}</span>
              <span
                className={cx`text-2xl font-bold content-center justify-center text-center border-b-2 md:border-b-0
                          ${from_community ? "border-b-green-400" : "border-b-blue-400"}`}
              >
                {day}
              </span>
            </div>
          </div>
          <div className="text-left text-xs font-mono col-start-2 col-end-6">
            <div className="text-red-500 font-bold">
              {start == "12:00 AM" ? "horario no específico" : start}
            </div>
            <div className="text-lg font-semibold">{title}</div>
            <div>{shdesc || desc.substring(0, 64) + "..."}</div>
          </div>
          <div className="col-start-6 col-end-7 items-center justify-center">
            📍 {location}
          </div>
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
    <div id="upcoming-events-table" className="container mx-auto">
      <DataTable columns={columns} data={events} />
    </div>
  );
}
