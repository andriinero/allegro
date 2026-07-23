"use client";

import TimeSlotsDialogContextProvider from "@/hooks/use-time-slots-dialog-context";
import PanelHeading from "../(overview)/panel-heading";
import TimeSlotDialogs from "./time-slot-dialogs";
import TimeSlotsDataTable from "./time-slots-data-table";

export default function Page() {
  return (
    <TimeSlotsDialogContextProvider>
      <TimeSlotDialogs />

      <div className="flex flex-col gap-4">
        <PanelHeading
          title="Time Slots"
          description="Manage and review all past and upcoming time slots"
        />

        <TimeSlotsDataTable />
      </div>
    </TimeSlotsDialogContextProvider>
  );
}
