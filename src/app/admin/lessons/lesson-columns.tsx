"use client";

import HeaderButton from "@/app/_components/table/header-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { formatUUID, getCellValueWithFallback } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ChevronsUpDownIcon,
  ExternalLinkIcon,
  UserRoundIcon,
} from "lucide-react";
import { differenceInMinutes, format } from "date-fns";
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
    accessorKey: "booking",
    header: "Booking",
    cell: ({ row }) => {
      const booking = row.original.booking;

      return (
        <code className="text-xs uppercase text-muted-foreground">
          {formatUUID(getCellValueWithFallback(booking?.id))}
        </code>
      );
    },
  },
  {
    accessorKey: "student",
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Student
        </HeaderButton>
      );
    },
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
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Title
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const title = getCellValueWithFallback(row.getValue("title"));

      return <p className="min-w-44 max-w-72 font-medium">{title}</p>;
    },
  },
  {
    accessorKey: "lessonLink",
    header: "Lesson link",
    cell: ({ row }) => {
      const lessonLink = row.getValue<string | null>("lessonLink");

      if (!lessonLink) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      return (
        <a
          href={lessonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-primary underline-offset-4 hover:underline"
        >
          Open link
          <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
        </a>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Created
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;

      return (
        <div className="min-w-28">
          <p className="font-medium">{format(createdAt, "d MMM yyyy")}</p>
          <p className="text-xs text-muted-foreground">
            {format(createdAt, "HH:mm")}
          </p>
        </div>
      );
    },
  },
  {
    id: "duration",
    accessorFn: (lesson) => {
      const timeSlot = lesson.booking?.timeSlot;

      return timeSlot
        ? differenceInMinutes(timeSlot.endTime, timeSlot.startTime)
        : null;
    },
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Duration
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const duration = row.getValue<number | null>("duration");

      return (
        <p className="whitespace-nowrap">
          {duration === null ? "N/A" : `${duration} min`}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableLessonActions row={row} />,
  },
];
