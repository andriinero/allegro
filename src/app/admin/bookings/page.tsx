"use client";

import BookingsDialogContextProvider from "@/hooks/use-bookings-dialog-context";
import PanelHeading from "../(overview)/panel-heading";
import PanelWrapper from "../(overview)/panel-wrapper";
import BookingDialogs from "./booking-dialogs";
import BookingsDataTable from "./bookings-data-table";

export default function Page() {
  return (
    <BookingsDialogContextProvider>
      <BookingDialogs />

      <PanelWrapper>
        <PanelHeading
          title="Bookings"
          description="Manage and view all bookings"
        />

        <BookingsDataTable />
      </PanelWrapper>
    </BookingsDialogContextProvider>
  );
}
