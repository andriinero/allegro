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
import { useBookings } from "@/hooks/use-bookings";
import { type Booking, BookingStatus } from "@prisma/client";
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
          <DropdownMenuItem
            onClick={() => {
              setOpen("createLesson");
              setCurrentRow(row.original);
            }}
          >
            Create Lesson
          </DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={row.getValue("status")}>
                {Object.values(BookingStatus)
                  .filter((i) => i !== "COMPLETED")
                  .map((j) => (
                    <DropdownMenuRadioItem key={j} value={j}>
                      {j.toLowerCase()}
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
}
