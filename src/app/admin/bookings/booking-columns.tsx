"use client";

import { formatDayMonthYearTime, formatWeekdayDayMonthTime } from "@/lib/date";

import { getShortUppercaseUUID } from "@/lib/utils";
import { type Booking, BookingStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Circle, CircleCheck, CircleX, Timer } from "lucide-react";
import type { ReactNode } from "react";
import TableBookingActions from "./table-booking-actions";

const statusIconMap: Record<BookingStatus, ReactNode> = {
  PENDING: <Timer />,
  CONFIRMED: <Circle />,
  COMPLETED: <CircleCheck />,
  CANCELLED: <CircleX />,
};

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const result =
        typeof id === "string" ? getShortUppercaseUUID(id) : "UKWN";

      return <p className="w-10 uppercase">{result}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "For",
    cell: ({ row }) => {
      const date = formatWeekdayDayMonthTime(row.getValue("date"));

      return <p className="w-42 font-medium">{date}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Placed",
    cell: ({ row }) => {
      const createdAt = formatDayMonthYearTime(row.getValue("createdAt"));

      return <p className="w-42">{createdAt}</p>;
    },
  },
  {
    accessorKey: "lessonPresence",
    header: "Presence",
    cell: ({ row }) => {
      const lessonPresence = row.getValue("lessonPresence");
      const result =
        typeof lessonPresence === "string" ? lessonPresence : "UKWN";

      return <p className="w-16">{result}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = Object.values(BookingStatus).find(
        (s) => s === row.getValue("status"),
      );

      return (
        <div className="w-16">
          {status && (
            <div className="flex items-center gap-2">
              <div className="[&_svg]:size-4">{statusIconMap[status]}</div>
              <span>{status}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableBookingActions row={row} />,
  },
];
