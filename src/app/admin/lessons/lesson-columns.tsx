"use client";

import { formatUUID } from "@/lib/utils";
import { type Lesson } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import TableLessonActions from "./table-lesson-actions";

export const lessonColumns: ColumnDef<Lesson>[] = [
  {
    accessorKey: "id",
    header: "Lesson",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const result = typeof id === "string" ? formatUUID(id) : "UKWN";

      return <p className="w-10 uppercase">{result}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableLessonActions row={row} />,
  },
];
