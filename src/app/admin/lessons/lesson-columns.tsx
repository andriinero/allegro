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
import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ChevronsUpDownIcon,
  ExternalLinkIcon,
  LaptopIcon,
  MapPinHouseIcon,
  UserRoundIcon,
} from "lucide-react";
import TableLessonActions from "./table-lesson-actions";

type LessonRow = RouterOutputs["lesson"]["admin"]["getAll"][number];

export const lessonColumns: ColumnDef<LessonRow>[] = [
  {
    accessorKey: "id",
    header: "Lesson",
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
    accessorFn: (lesson) => lesson.student.name,
    header: ({ column }) => (
      <HeaderButton column={column} icon={ChevronsUpDownIcon}>
        Student
      </HeaderButton>
    ),
    cell: ({ row }) => {
      const { name: studentName, image } = row.original.student;
      const name = studentName ?? "Unknown student";

      return (
        <div className="flex min-w-40 items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={image ?? ""} alt={`${name}'s profile picture`} />
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
    accessorKey: "title",
    header: ({ column }) => (
      <HeaderButton column={column} icon={ChevronsUpDownIcon}>
        Title
      </HeaderButton>
    ),
    cell: ({ row }) => (
      <p className="min-w-44 max-w-72 font-medium">{row.original.title}</p>
    ),
  },
  {
    id: "timeSlot",
    accessorFn: (lesson) => lesson.booking?.timeSlot?.startTime ?? null,
    header: ({ column }) => (
      <HeaderButton column={column} icon={ChevronsUpDownIcon}>
        Time Slot
      </HeaderButton>
    ),
    cell: ({ row }) => {
      const timeSlot = row.original.booking?.timeSlot;

      if (!timeSlot) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      return (
        <TimeSlotSchedule
          startTime={timeSlot.startTime}
          endTime={timeSlot.endTime}
        />
      );
    },
  },
  {
    id: "presence",
    accessorFn: (lesson) => lesson.booking?.timeSlot?.presence ?? null,
    header: "Presence",
    cell: ({ row }) => {
      const presence = row.original.booking?.timeSlot?.presence;

      if (!presence) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      const Icon = presence === "ONLINE" ? LaptopIcon : MapPinHouseIcon;

      return (
        <Badge variant="outline" className="gap-1.5 font-medium capitalize">
          <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
          {presence.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    id: "status",
    accessorFn: (lesson) => lesson.booking?.status ?? null,
    header: ({ column }) => (
      <HeaderButton column={column} icon={ChevronsUpDownIcon}>
        Status
      </HeaderButton>
    ),
    cell: ({ row }) => {
      const status = row.original.booking?.status;

      if (!status) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      return (
        <div className="min-w-28">
          <BookingStatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "lessonLink",
    header: "Lesson link",
    cell: ({ row }) => {
      const lessonLink = row.original.lessonLink;

      if (!lessonLink) {
        return <span className="text-muted-foreground">—</span>;
      }

      return (
        <a
          href={lessonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-primary underline-offset-4 hover:underline"
        >
          Join lesson
          <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
        </a>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableLessonActions row={row} />,
  },
];
