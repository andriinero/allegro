"use client";

import BookingsDialogContextProvider from "@/hooks/use-bookings-dialog-context";
import PanelHeading from "../(overview)/panel-heading";
import BookingDialogs from "./booking-dialogs";
import BookingsDataTable from "./bookings-data-table";

export default function Page() {
  return (
    <BookingsDialogContextProvider>
      <BookingDialogs />

      <PanelHeading
        title="Bookings"
        description="Manage and view all bookings"
      />

      <div className="py-4">
        <BookingsDataTable />
      </div>
    </BookingsDialogContextProvider>
  );
}
