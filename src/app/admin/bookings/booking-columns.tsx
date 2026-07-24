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
import { formatUUID, getCellValueWithFallback } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";
import type { BookingStatus } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDownIcon, UserRoundIcon } from "lucide-react";
import TableBookingActions from "./table-booking-actions";

export type BookingRow = RouterOutputs["booking"]["admin"]["getAll"][number];

export const bookingColumns: ColumnDef<BookingRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    id: "student",
    accessorFn: (booking) => booking.bookedBy?.name ?? "",
    header: ({ column }) => (
      <HeaderButton column={column} icon={ChevronsUpDownIcon}>
        Student
      </HeaderButton>
    ),
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
    id: "timeSlot",
    accessorFn: (booking) => booking.timeSlot?.startTime ?? null,
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Time Slot
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const timeSlot = row.original.timeSlot;

      if (!timeSlot) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      return (
        <TimeSlotSchedule
          id={timeSlot.id}
          startTime={timeSlot.startTime}
          endTime={timeSlot.endTime}
          presence={timeSlot.presence}
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
