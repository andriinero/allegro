import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { getShortUppercaseUUID } from "@/lib/utils";
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
    api.booking.deleteAnyById.useMutation({
      onSuccess: async () => {
        toast.success("Booking deleted successfully");
        await utils.booking.getAny.invalidate();
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete booking</DialogTitle>
          <DialogDescription>
            You are about to{" "}
            <span className="font-bold text-destructive">delete</span> a booking
            with the ID{" "}
            <span className="font-bold">
              {getShortUppercaseUUID(currentRow?.id ?? "")}
            </span>
            .
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
