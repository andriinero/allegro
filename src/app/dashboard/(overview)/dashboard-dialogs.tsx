"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import CancelLessonDialog from "./cancel-lesson-dialog";
import CancelBookingDialog from "./cancel-booking-dialog";

export default function DashboardDialogs() {
  const { open, id, setOpen } = useDashboard();

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
