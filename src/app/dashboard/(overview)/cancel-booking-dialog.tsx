"use client";

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
import { formatShortUppercaseUUID } from "@/lib/utils";
import { api } from "@/trpc/react";
import { toast } from "sonner";

type CancelBookingDialogProps = {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean | null) => void;
};

export default function CancelBookingDialog({
  id,
  open,
  onOpenChange,
}: CancelBookingDialogProps) {
  const utils = api.useUtils();
  const { mutate: cancelBooking } = api.booking.cancelById.useMutation({
    onSuccess: async () => {
      toast.success("Booking cancelled");
      await utils.booking.getByCurrentUser.invalidate();
      onOpenChange(null);
    },
    onError: () => {
      toast.error("Failed to cancel booking");
    },
  });

  function handleCancel() {
    if (id) cancelBooking({ id });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to{" "}
            <span className="font-bold text-destructive">cancel</span> booking
            with ID{" "}
            <span className="font-bold">
              {formatShortUppercaseUUID(id ?? "")}
            </span>
            ? <br /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleCancel} variant="destructive">
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
