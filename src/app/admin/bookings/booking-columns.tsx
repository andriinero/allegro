"use client";

import { formatWeekdayDayMonthTime } from "@/lib/date";

import InfoField from "@/app/_components/general/info-field";
import HeaderButton from "@/app/_components/table/header-button";
import { formatUUID, getCellValueWithFallback } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";
import { BookingStatus, LessonPresence } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ChevronsUpDownIcon,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleX,
  LaptopIcon,
  MapPinHouseIcon,
  type LucideIcon,
} from "lucide-react";
import TableBookingActions from "./table-booking-actions";
import { format } from "date-fns";

export type BookingRow = RouterOutputs["booking"]["admin"]["getAll"][number];

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

export const bookingColumns: ColumnDef<BookingRow>[] = [
  {
    accessorKey: "id",
    header: "Booking",
    cell: ({ row }) => {
      const id = getCellValueWithFallback(row.getValue("id"));

      return <p className="w-10 uppercase">{formatUUID(id)}</p>;
    },
  },
  {
    accessorKey: "bookedBy",
    header: "Student",
    cell: ({ row }) => {
      const bookedBy = row.original.bookedBy;

      return <p className="w-10">{bookedBy?.name}</p>;
    },
  },
  {
    accessorKey: "timeSlot",
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Time Slot
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const timeSlot = row.original.timeSlot;

      return (
        <p className="w-42">
          {format(timeSlot.startTime, "ccc, d MMM")}{" "}
          {format(timeSlot.startTime, "HH:mm")} -{" "}
          {format(timeSlot.endTime, "HH:mm")}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Placed
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const createdAt = formatWeekdayDayMonthTime(row.getValue("createdAt"));

      return <p className="w-42">{createdAt}</p>;
    },
  },
  {
    id: "presence",
    accessorFn: (row) => row.timeSlot.presence,
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Presence
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const lessonPresence = Object.values(LessonPresence).find(
        (s) => s === row.original.timeSlot.presence
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
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Status
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const status = Object.values(BookingStatus).find(
        (s) => s === row.getValue("status")
      );

      console.log(row.original);

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
