import { useBookings } from "@/hooks/use-bookings";
import CreateLessonDrawer from "./create-lesson-drawer";
import EditBookingDrawer from "./edit-booking-drawer";
import DeleteBookingDialog from "./delete-booking-dialog";

export default function BookingDialogs() {
  const { open, setOpen, currentRow } = useBookings();

  return (
    <>
      <CreateLessonDrawer
        key="create-lesson"
        open={open === "createLesson"}
        onOpenChange={(open) => setOpen(open ? "createLesson" : null)}
        currentRow={currentRow}
      />

      <EditBookingDrawer
        key="edit-booking"
        open={open === "edit"}
        onOpenChange={(open) => setOpen(open ? "edit" : null)}
        currentRow={currentRow}
      />

      <DeleteBookingDialog
        key="delete-booking"
        open={open === "delete"}
        onOpenChange={(open) => setOpen(open ? "delete" : null)}
        currentRow={currentRow}
      />
    </>
  );
}
