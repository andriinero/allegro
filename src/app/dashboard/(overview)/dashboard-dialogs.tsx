"use client";

import { useDashboardDialogContext } from "@/hooks/use-dashboard-dialog-context";
import CancelBookingDialog from "./cancel-booking-dialog";
import CancelLessonDialog from "./cancel-lesson-dialog";

export default function DashboardDialogs() {
  const { open, id, setOpen } = useDashboardDialogContext();

  return (
    <>
      <CancelLessonDialog
        id={id}
        open={open === "cancelLesson"}
        onOpenChange={(open) => setOpen(open ? "cancelLesson" : null)}
      />

      <CancelBookingDialog
        id={id}
        open={open === "cancelBooking"}
        onOpenChange={(open) => setOpen(open ? "cancelBooking" : null)}
      />
    </>
  );
}
