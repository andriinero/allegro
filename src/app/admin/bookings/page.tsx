"use client";

import BookingsDialogContextProvider from "@/hooks/use-bookings-dialog-context";
import AdminPanelHeading from "../(overview)/admin-panel-heading";
import BookingDialogs from "./booking-dialogs";
import BookingsDataTable from "./bookings-data-table";

export default function Page() {
  return (
    <BookingsDialogContextProvider>
      <BookingDialogs />

      <AdminPanelHeading
        title="Bookings"
        description="A list of bookings for this month"
      />

      <div className="py-4">
        <BookingsDataTable />
      </div>
    </BookingsDialogContextProvider>
  );
}
