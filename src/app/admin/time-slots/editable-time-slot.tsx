"use client";

import {
  type TimeSlotRow,
  useTimeSlotsDialogContext,
} from "@/hooks/use-time-slots-dialog-context";
import { format } from "date-fns";
import { TimeSlot } from "./time-slot";

type EditableTimeSlotProps = {
  timeSlot: TimeSlotRow;
};

export function EditableTimeSlot({ timeSlot }: EditableTimeSlotProps) {
  const { setCurrentRow, setOpen } = useTimeSlotsDialogContext();

  return (
    <button
      type="button"
      className="group block w-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Edit time slot starting ${format(timeSlot.startTime, "PPp")}`}
      onClick={() => {
        setCurrentRow(timeSlot);
        setOpen("edit");
      }}
    >
      <TimeSlot
        timeSlot={timeSlot}
        className="transition-[border-color,background-color,box-shadow] group-hover:border-foreground/30 group-hover:bg-muted/30 group-hover:shadow-md"
      />
    </button>
  );
}
