"use client";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { getNDayMonth, getNDayNMonthNYearAtShortTime } from "@/lib/date";
import { type Booking, BookingStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Circle,
  CircleCheck,
  CircleX,
  MoreHorizontal,
  Timer,
  Trash,
} from "lucide-react";
import type { ReactNode } from "react";

const statusIconMap: Record<BookingStatus, ReactNode> = {
  PENDING: <Timer />,
  CONFIRMED: <Circle />,
  COMPLETED: <CircleCheck />,
  CANCELLED: <CircleX />,
};

export const booking: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking",
    cell: ({ row }) => {
      const id = row.getValue("id");
      const result = typeof id === "string" ? id.substring(20) : "UKWN";

      return <p className="uppercase">{result}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "For",
    cell: ({ row }) => {
      const date = getNDayMonth(row.getValue("date"));

      return <p className="font-medium">{date}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Placed",
    cell: ({ row }) => {
      const createdAt = getNDayNMonthNYearAtShortTime(
        row.getValue("createdAt"),
      );

      return <p>{createdAt}</p>;
    },
  },
  {
    accessorKey: "lessonPresence",
    header: "Presence",
    cell: ({ row }) => {
      const lessonPresence = row.getValue("lessonPresence");
      const result =
        typeof lessonPresence === "string" ? lessonPresence : "UKWN";

      return <span>{result}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = Object.values(BookingStatus).find(
        (s) => s === row.getValue("status"),
      );

      return (
        <div>
          {status && (
            <div className="flex items-center gap-2">
              <div className="[&_svg]:size-4">{statusIconMap[status]}</div>
              <span>{status}</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="sizw-10 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value="PENDING">
                    {Object.values(BookingStatus).map((b) => (
                      <DropdownMenuRadioItem key={b} value={b}>
                        {b.toLowerCase()}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
