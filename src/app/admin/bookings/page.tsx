"use client";

import BookingsProvider from "@/hooks/use-bookings";
import { api } from "@/trpc/react";
import BookingDialogs from "./booking-dialogs";
import { booking } from "./columns";
import { DataTable } from "./data-table";
import DataTableSkeleton from "./data-table-skeleton";
import AdminPanelHeading from "../(overview)/admin-panel-heading";

export default function Page() {
  const { data, isLoading, isSuccess, isError, error, isRefetching } =
    api.booking.getAny.useQuery({ take: 100, page: 0 });

  if (isError) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive">
            Error loading bookings
          </h3>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <BookingsProvider>
      <AdminPanelHeading
        title="Bookings"
        description="A list of bookings for this month"
      />

      <div className="py-4">
        {isLoading || isRefetching ? (
          <DataTableSkeleton />
        ) : isSuccess ? (
          <DataTable columns={booking} data={data} />
        ) : (
          <></>
        )}
        <BookingDialogs />
      </div>
    </BookingsProvider>
  );
}
