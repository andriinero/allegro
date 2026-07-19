"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { api } from "@/trpc/react";
import { Loader2Icon, XCircleIcon } from "lucide-react";
import { toast } from "sonner";

export function CancelAllBookingsButton() {
  const apiUtils = api.useUtils();
  const { mutate: cancelAll, isPending } = api.booking.cancelAll.useMutation({
    onSuccess: async () => {
      await Promise.all([
        apiUtils.booking.getByCurrentUser.invalidate(),
        apiUtils.booking.getCountByCurrentUser.invalidate(),
      ]);
      toast.success("All bookings have been cancelled");
    },
    onError: (error) => {
      toast.error("Failed to cancel bookings", {
        description: error.message,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-destructive">
          <XCircleIcon />
          Cancel all bookings
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel all bookings?</AlertDialogTitle>
          <AlertDialogDescription>
            This will cancel every time slot you have booked. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Keep bookings
          </AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={isPending}
            onClick={() => cancelAll()}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            {isPending ? "Cancelling…" : "Cancel all"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
