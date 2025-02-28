"use client";

import HeaderButton from "@/app/_components/table/header-button";
import { formatDayMonthYearTime } from "@/lib/date";
import { formatUUID, getCellValueWithFallback } from "@/lib/utils";
import { type Lesson, type User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDownIcon } from "lucide-react";
import TableLessonActions from "./table-lesson-actions";

export const lessonColumns: ColumnDef<Lesson>[] = [
  {
    accessorKey: "id",
    header: "Lesson",
    cell: ({ row }) => {
      const id = getCellValueWithFallback(row.getValue("id"), "N/A");

      return <p className="w-10 uppercase">{formatUUID(id)}</p>;
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

      return <p className="w-16 font-medium">{(student as User).name}</p>;
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
      const title = getCellValueWithFallback(row.getValue("title"), "N/A");

      return <p className="w-42">{title}</p>;
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
      const createdAt = formatDayMonthYearTime(row.getValue("createdAt"));

      return <p className="w-42">{createdAt}</p>;
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
      const duration = getCellValueWithFallback(
        row.getValue("duration"),
        "N/A",
      );

      return <p className="w-32">{duration} minutes</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableLessonActions row={row} />,
  },
];
