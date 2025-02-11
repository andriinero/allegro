import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useBookings } from "@/hooks/use-bookings";
import { type Booking } from "@prisma/client";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";

type TableBookingActionsProps = { row: Row<Booking> };

export default function TableBookingActions({ row }: TableBookingActionsProps) {
  const { setOpen, setCurrentRow } = useBookings();

  return (
    <div className="sizw-10 flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {row.original.status === "PENDING" && (
            <DropdownMenuItem
              onClick={() => {
                setOpen("createLesson");
                setCurrentRow(row.original);
              }}
            >
              Create Lesson
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>Edit</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-destructive">
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
