import { useBookings } from "@/hooks/use-bookings";
import CreateLessonDrawer from "./create-lesson-drawer";
import EditBookingDrawer from "./edit-booking-drawer";

export default function BookingDialogs() {
  const { open, setOpen, currentRow } = useBookings();

  return (
    <>
      <CreateLessonDrawer
        key="create-lesson"
        open={open === "createLesson"}
        onOpenChange={() => setOpen("createLesson")}
        currentRow={currentRow}
      />

      <EditBookingDrawer
        key="edit-booking"
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
        currentRow={currentRow}
      />
    </>
  );
}
