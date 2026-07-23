import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useTimeSlotsDialogContext } from "@/hooks/use-time-slots-dialog-context";
import { formatUUID } from "@/lib/utils";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import type { TimeSlotRow } from "./time-slot-columns";

type TableTimeSlotActionsProps = {
  row: Row<TimeSlotRow>;
};

export default function TableTimeSlotActions({
  row,
}: TableTimeSlotActionsProps) {
  const { setCurrentRow, setOpen } = useTimeSlotsDialogContext();
  const bookingId = row.original.bookings?.id;

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original);
              setOpen("edit");
            }}
          >
            Edit
          </DropdownMenuItem>

          {bookingId && (
            <DropdownMenuItem asChild>
              <Link href={`/admin/bookings?bookingId=${formatUUID(bookingId)}`}>
                Go to Booking
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
