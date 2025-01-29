"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { getNDayMonth, getNDayNMonthNYearAtShortTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import PanelHeader from "./panel-header";

export default function Page() {
  const { data: bookings } = api.booking.getByCurrentUser.useQuery();

  return (
    <div className="flex flex-col gap-4">
      <PanelHeader>Bookings</PanelHeader>

      <Table>
        <TableCaption>Your recent lesson bookings.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Booking</TableHead>
            <TableHead>For</TableHead>
            <TableHead>Placed</TableHead>
            <TableHead>Lesson Presence</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings?.map((b, index) => (
            <TableRow
              key={b.id}
              className={cn("cursor-pointer", {
                "bg-background hover:bg-background": index % 2 === 0,
              })}
            >
              <TableCell className="font-medium">
                {b.id.substring(0, 5)}
              </TableCell>
              <TableCell>{getNDayMonth(b.date)}</TableCell>
              <TableCell>
                {getNDayNMonthNYearAtShortTime(b.createdAt)}
              </TableCell>
              <TableCell>{b.lessonPresence}</TableCell>
              <TableCell className="text-right font-semibold tracking-tight">
                {b.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
