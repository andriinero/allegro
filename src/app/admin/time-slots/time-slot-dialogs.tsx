import { useTimeSlotsDialogContext } from "@/hooks/use-time-slots-dialog-context";
import EditTimeSlotDrawer from "./edit-time-slot-drawer";

export default function TimeSlotDialogs() {
  const { open, setOpen, currentRow } = useTimeSlotsDialogContext();

  return (
    <EditTimeSlotDrawer
      open={open === "edit"}
      onOpenChange={(nextOpen) => setOpen(nextOpen ? "edit" : null)}
      currentRow={currentRow}
    />
  );
}
