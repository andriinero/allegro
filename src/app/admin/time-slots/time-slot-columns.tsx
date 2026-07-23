"use client";

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
import type { RouterOutputs } from "@/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDownIcon, CircleDashedIcon } from "lucide-react";
import TableTimeSlotActions from "./table-time-slot-actions";

export type TimeSlotRow = RouterOutputs["timeSlot"]["admin"]["getAll"][number];

export const timeSlotColumns: ColumnDef<TimeSlotRow>[] = [
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
    accessorFn: (timeSlot) => timeSlot.bookings?.bookedBy.name ?? "",
    header: ({ column }) => (
      <HeaderButton column={column} icon={ChevronsUpDownIcon}>
        Student
      </HeaderButton>
    ),
    cell: ({ row }) => {
      const booking = row.original.bookings;

      if (!booking) {
        return <span className="text-muted-foreground">—</span>;
      }

      const studentName = booking.bookedBy.name ?? "Unknown student";
      const studentInitial = studentName.charAt(0).toUpperCase();

      return (
        <div className="min-w-30 flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage
              src={booking.bookedBy.image ?? ""}
              alt={`${studentName}'s profile picture`}
            />
            <AvatarFallback className="text-xs font-medium">
              {studentInitial}
            </AvatarFallback>
          </Avatar>
          <p className="min-w-0 flex-1 truncate text-sm font-medium">
            {studentName}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <HeaderButton column={column} icon={ChevronsUpDownIcon}>
        Time Slot
      </HeaderButton>
    ),
    cell: ({ row }) => (
      <TimeSlotSchedule
        startTime={row.original.startTime}
        endTime={row.original.endTime}
        presence={row.original.presence}
      />
    ),
  },
  {
    id: "period",
    accessorFn: (timeSlot) =>
      timeSlot.endTime < new Date() ? "PAST" : "UPCOMING",
    header: "Period",
    cell: ({ row }) => {
      const isPast = row.original.endTime < new Date();

      return (
        <Badge variant={isPast ? "secondary" : "outline"}>
          {isPast ? "Past" : "Upcoming"}
        </Badge>
      );
    },
  },
  {
    id: "status",
    accessorFn: (timeSlot) => timeSlot.bookings?.status ?? "AVAILABLE",
    header: ({ column }) => (
      <HeaderButton column={column} icon={ChevronsUpDownIcon}>
        Status
      </HeaderButton>
    ),
    cell: ({ row }) => {
      const booking = row.original.bookings;

      if (!booking) {
        return (
          <Badge variant="outline" className="gap-1.5">
            <CircleDashedIcon className="size-3.5 text-muted-foreground" />
            Available
          </Badge>
        );
      }

      return <BookingStatusBadge status={booking.status} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableTimeSlotActions row={row} />,
  },
];
