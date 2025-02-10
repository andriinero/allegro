"use client";

import { api } from "@/trpc/react";
import { booking } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const { data } = api.booking.getAny.useQuery({ take: 100, page: 0 });

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">
          Here's a list of your Bookings for this month!
        </p>
      </div>

      <div className="py-4">
        {data && <DataTable columns={booking} data={data} />}
      </div>
    </>
  );
}
