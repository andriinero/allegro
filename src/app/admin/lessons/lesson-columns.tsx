"use client";

import HeaderButton from "@/app/_components/table/header-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { formatUUID, getCellValueWithFallback } from "@/lib/utils";
import { type Booking, type Lesson, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDownIcon, UserRoundIcon } from "lucide-react";
import { format } from "date-fns";
import TableLessonActions from "./table-lesson-actions";

export const lessonColumns: ColumnDef<Lesson>[] = [
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
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const booking = row.getValue("booking") as Booking;

      return (
        <code className="text-xs uppercase text-muted-foreground">
          {formatUUID(booking?.id)}
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
      const student = row.getValue("student");

      const { name: studentName, image } = student as User;
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
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <HeaderButton column={column} icon={ChevronsUpDownIcon}>
          Duration
        </HeaderButton>
      );
    },
    cell: ({ row }) => {
      const duration = getCellValueWithFallback(row.getValue("duration"));

      return <p className="whitespace-nowrap">{duration} min</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableLessonActions row={row} />,
  },
];
