"use client";

import { formatWeekdayDayMonthTime } from "@/lib/date";

import HeaderButton from "@/app/_components/table/header-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { formatUUID, getCellValueWithFallback } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";
import { BookingStatus, LessonPresence } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ChevronsUpDownIcon,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleX,
  LaptopIcon,
  MapPinHouseIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";
import TableBookingActions from "./table-booking-actions";

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

const statusClassNameMap: Record<BookingStatus, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  CONFIRMED: "border-blue-200 bg-blue-50 text-blue-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
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
        <div className="min-w-36">
          <p className="font-medium">
            {format(timeSlot.startTime, "EEE, d MMM")}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(timeSlot.startTime, "HH:mm")}–
            {format(timeSlot.endTime, "HH:mm")}
          </p>
        </div>
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
      const status = Object.values(BookingStatus).find(
        (s) => s === row.getValue("status")
      );

      return (
        <div className="min-w-28">
          {status && (
            <Badge
              variant="outline"
              className={`gap-1.5 font-medium capitalize ${statusClassNameMap[status]}`}
            >
              {(() => {
                const Icon = statusIconMap[status];
                return <Icon className="size-3.5" />;
              })()}
              {status.toLowerCase()}
            </Badge>
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
