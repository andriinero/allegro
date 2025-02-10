"use client";

import { getNDayMonth, getNDayNMonthNYearAtShortTime } from "@/lib/date";
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

export const booking: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const result = typeof id === "string" ? id.substring(20) : "UKWN";

      return <p className="uppercase">{result}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "For",
    cell: ({ row }) => {
      const date = getNDayMonth(row.getValue("date"));

      return <p className="font-medium">{date}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Placed",
    cell: ({ row }) => {
      const createdAt = getNDayNMonthNYearAtShortTime(
        row.getValue("createdAt"),
      );

      return <p>{createdAt}</p>;
    },
  },
  {
    accessorKey: "lessonPresence",
    header: "Presence",
    cell: ({ row }) => {
      const lessonPresence = row.getValue("lessonPresence");
      const result =
        typeof lessonPresence === "string" ? lessonPresence : "UKWN";

      return <span>{result}</span>;
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
        <div>
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
