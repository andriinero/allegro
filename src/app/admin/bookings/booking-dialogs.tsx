import { useBookings } from "@/hooks/use-bookings";
import CreateLessonDrawer from "./create-lesson-drawer";

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
    </>
  );
}
