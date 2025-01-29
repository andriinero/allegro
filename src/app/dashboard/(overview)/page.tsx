"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  getNDayMonth,
  getNDayNMonthNYearAtShortTime,
  getNDayNMonthTime,
} from "@/lib/date";
import { api } from "@/trpc/react";

export default function Page() {
  const { data, isPending } = api.booking.getByCurrentUser.useQuery();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>

      <Table>
        <TableCaption>Your recent bookings.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Booking</TableHead>
            <TableHead>For</TableHead>
            <TableHead>Placed</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        {isPending ? (
          <p>Loading...</p>
        ) : data ? (
          <TableBody>
            {data.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">
                  {b.id.substring(0, 5)}
                </TableCell>
                <TableCell>{getNDayMonth(b.date)}</TableCell>
                <TableCell>
                  {getNDayNMonthNYearAtShortTime(b.createdAt)}
                </TableCell>
                <TableCell className="text-right font-semibold tracking-tight">
                  {b.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <p>Error</p>
        )}
      </Table>
    </div>
  );
}
