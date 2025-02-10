"use client";

import BookingsProvider from "@/hooks/use-bookings";
import { api } from "@/trpc/react";
import BookingDialogs from "./booking-dialogs";
import { booking } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const { data } = api.booking.getAny.useQuery({ take: 100, page: 0 });

  return (
    <BookingsProvider>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your Bookings for this month!
        </p>
      </div>

      <div className="py-4">
        {/* NOTE: add loader and placeholder */}
        {data && <DataTable columns={booking} data={data} />}
        <BookingDialogs />
      </div>
    </BookingsProvider>
  );
}
