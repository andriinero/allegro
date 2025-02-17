"use client";

import { DataTable } from "@/app/_components/table/data-table";
import BookingsProvider from "@/hooks/use-bookings";
import { api } from "@/trpc/react";
import AdminPanelHeading from "../(overview)/admin-panel-heading";
import { bookingColumns } from "./booking-columns";
import BookingDialogs from "./booking-dialogs";

export default function Page() {
  const { data, isLoading, isError, isRefetching } =
    api.booking.getAny.useQuery();

  return (
    <BookingsProvider>
      <AdminPanelHeading
        title="Bookings"
        description="A list of bookings for this month"
      />

      <div className="py-4">
        <DataTable
          columns={bookingColumns}
          data={data}
          isLoading={isLoading || isRefetching}
          isError={isError}
        />
        <BookingDialogs />
      </div>
    </BookingsProvider>
  );
}
