import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useLessonsDialogContext } from "@/hooks/use-lessons-dialog-context";
import type { RouterOutputs } from "@/trpc/react";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";

type LessonRow = RouterOutputs["lesson"]["admin"]["getAll"][number];

type TableLessonActionsProps = { row: Row<LessonRow> };

export default function TableLessonActions({ row }: TableLessonActionsProps) {
  const { setOpen, setCurrentRow } = useLessonsDialogContext();
  const bookingId = row.original.booking?.id;

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

          {bookingId && (
            <DropdownMenuItem asChild>
              <Link href={`/admin/bookings?bookingId=${bookingId}`}>
                Go to Booking
              </Link>
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
