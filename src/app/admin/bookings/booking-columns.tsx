"use client";

import { formatDayMonthYearTime, formatWeekdayDayMonthTime } from "@/lib/date";

import InfoField from "@/app/_components/general/info-field";
import { formatUUID } from "@/lib/utils";
import { type Booking, BookingStatus, LessonPresence } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleX,
  LaptopIcon,
  type LucideIcon,
  MapPinHouseIcon,
} from "lucide-react";
import TableBookingActions from "./table-booking-actions";

const statusIconMap: Record<BookingStatus, LucideIcon> = {
  PENDING: CircleDashed,
  CONFIRMED: Circle,
  COMPLETED: CircleCheck,
  CANCELLED: CircleX,
};

const lessonPresenceIconMap: Record<LessonPresence, LucideIcon> = {
  OFFLINE: MapPinHouseIcon,
  ONLINE: LaptopIcon,
};

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const result = typeof id === "string" ? formatUUID(id) : "UKWN";

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
      const lessonPresence = Object.values(LessonPresence).find(
        (s) => s === row.getValue("lessonPresence"),
      );

      return (
        <div className="w-24">
          {lessonPresence && (
            <InfoField icon={lessonPresenceIconMap[lessonPresence]}>
              {lessonPresence}
            </InfoField>
          )}
        </div>
      );
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
        <div className="w-28">
          {status && (
            <InfoField icon={statusIconMap[status]}>{status}</InfoField>
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
