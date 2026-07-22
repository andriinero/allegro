import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useLessonsDialogContext } from "@/hooks/use-lessons-dialog-context";
import { formatUUID } from "@/lib/utils";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { LessonRow } from "./lessons-data-table";

type TableLessonActionsProps = { row: Row<LessonRow> };

export default function TableLessonActions({ row }: TableLessonActionsProps) {
  const { setOpen, setCurrentRow } = useLessonsDialogContext();
  const bookingId = row.original.booking?.id;

  function handleEdit() {
    setOpen("edit");
    setCurrentRow(row.original);
  }

  function handleDelete() {
    setOpen("delete");
    setCurrentRow(row.original);
  }

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
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>

          {bookingId && (
            <DropdownMenuItem asChild>
              <Link href={`/admin/bookings?bookingId=${formatUUID(bookingId)}`}>
                Go to Booking
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
