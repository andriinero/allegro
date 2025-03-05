import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useBookingsDialogContext } from "@/hooks/use-bookings-dialog-context";
import { type Booking } from "@prisma/client";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";

type TableBookingActionsProps = { row: Row<Booking> };

export default function TableBookingActions({ row }: TableBookingActionsProps) {
  const { setOpen, setCurrentRow } = useBookingsDialogContext();

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setOpen("edit");
              setCurrentRow(row.original);
            }}
          >
            Edit
          </DropdownMenuItem>

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

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive"
            onClick={() => {
              setOpen("delete");
              setCurrentRow(row.original);
            }}
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
