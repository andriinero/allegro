import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useBookingsDialogContext } from "@/hooks/use-bookings-dialog-context";
import { formatUUID } from "@/lib/utils";
import { api } from "@/trpc/react";
import { BookingStatus } from "@prisma/client";
import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { type BookingRow } from "./booking-columns";

type TableBookingActionsProps = { row: Row<BookingRow> };

export default function TableBookingActions({ row }: TableBookingActionsProps) {
  const { setOpen, setCurrentRow } = useBookingsDialogContext();
  const lessonId = row.original.lessonId;
  const apiUtils = api.useUtils();
  const updateBookingStatus = api.booking.admin.updateById.useMutation({
    onSuccess: async () => {
      await apiUtils.booking.admin.getAll.invalidate();
      toast.success("Booking status has been updated");
    },
    onError: (error) => {
      toast.error("Error updating booking status", {
        description: error.message,
      });
    },
  });

  function handleStatusChange(status: string) {
    if (status === row.original.status) return;

    updateBookingStatus.mutate({
      id: row.original.id,
      status: status as BookingStatus,
    });
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
          <DropdownMenuItem
            onClick={() => {
              setOpen("edit");
              setCurrentRow(row.original);
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={row.original.status}
                  onValueChange={handleStatusChange}
                >
                  {Object.values(BookingStatus).map((status) => (
                    <DropdownMenuRadioItem
                      key={status}
                      value={status}
                      disabled={updateBookingStatus.isPending}
                      className="capitalize"
                    >
                      {status.toLowerCase()}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          {row.original.status === "PENDING" &&
            row.original.timeSlotId &&
            !lessonId && (
              <DropdownMenuItem
                onClick={() => {
                  setOpen("createLesson");
                  setCurrentRow(row.original);
                }}
              >
                Create Lesson
              </DropdownMenuItem>
            )}

          {lessonId && (
            <DropdownMenuItem asChild>
              <Link href={`/admin/lessons?lessonId=${formatUUID(lessonId)}`}>
                Go to Lesson
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
