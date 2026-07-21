"use client";

import { formatWeekdayDayMonthTime } from "@/lib/date";

import BookingStatusBadge from "@/app/_components/general/booking-status-badge";
import HeaderButton from "@/app/_components/table/header-button";
import TimeSlotSchedule from "@/app/_components/table/time-slot-schedule";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { formatUUID, getCellValueWithFallback } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";
import { LessonPresence, type BookingStatus } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ChevronsUpDownIcon,
  LaptopIcon,
  MapPinHouseIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";
import TableBookingActions from "./table-booking-actions";

export type BookingRow = RouterOutputs["booking"]["admin"]["getAll"][number];

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

      return (
        <code className="rounded bg-muted px-2 py-1 text-xs font-medium uppercase text-muted-foreground">
          {formatUUID(id)}
        </code>
      );
    },
  },
  {
    accessorKey: "bookedBy",
    header: "Student",
    cell: ({ row }) => {
      const bookedBy = row.original.bookedBy;

      const name = bookedBy?.name ?? "Unknown student";

      return (
        <div className="flex min-w-40 items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage
              src={bookedBy?.image ?? ""}
              alt={`${name}'s profile picture`}
            />
            <AvatarFallback className="bg-primary/10 text-primary">
              <UserRoundIcon className="size-4" aria-hidden="true" />
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{name}</span>
        </div>
      );
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
        <TimeSlotSchedule
          startTime={timeSlot.startTime}
          endTime={timeSlot.endTime}
        />
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

      return <p className="min-w-36 text-muted-foreground">{createdAt}</p>;
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
        <div className="min-w-24">
          {lessonPresence && (
            <Badge variant="outline" className="gap-1.5 font-medium capitalize">
              {(() => {
                const Icon = lessonPresenceIconMap[lessonPresence];
                return <Icon className="size-3.5 text-muted-foreground" />;
              })()}
              {lessonPresence.toLowerCase()}
            </Badge>
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
      const status = row.getValue<BookingStatus>("status");

      return (
        <div className="min-w-28">
          <BookingStatusBadge status={status} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableBookingActions row={row} />,
  },
];
