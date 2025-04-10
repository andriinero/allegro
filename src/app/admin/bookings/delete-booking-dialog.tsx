import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { formatUUID } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { Booking } from "@prisma/client";
import { toast } from "sonner";

type DeleteBookingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Booking | null;
};

export default function DeleteBookingDialog({
  open,
  onOpenChange,
  currentRow,
}: DeleteBookingDialogProps) {
  const utils = api.useUtils();
  const { mutate: deleteBooking, isPending } =
    api.booking.admin.cancelById.useMutation({
      onSuccess: async () => {
        toast.success("Booking deleted successfully");
        await utils.booking.admin.getAll.invalidate();
      },
      onError: () => {
        toast.error("Failed to delete booking");
      },
    });

  function handleDelete() {
    if (!currentRow?.id) return;

    deleteBooking({ id: currentRow.id });
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete booking</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to{" "}
            <span className="font-bold text-destructive">delete</span> a booking
            with the ID{" "}
            <span className="font-bold">
              {formatUUID(currentRow?.id ?? "")}
            </span>
            .
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
