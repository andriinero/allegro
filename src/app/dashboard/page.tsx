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
import Spinner from "../_components/general/spinner";
import { Separator } from "../_components/ui/separator";
import PanelDescription from "./(overview)/panel-description";
import PanelHeaderWrapper from "./(overview)/panel-header-wrapper";
import PanelHeading from "./(overview)/panel-heading";

export default function Page() {
  const { data: bookings, isPending } = api.booking.getByCurrentUser.useQuery();

  return (
    <>
      <PanelHeaderWrapper>
        <PanelHeading>Dashboard</PanelHeading>
        <PanelDescription>Your personalized dashboard</PanelDescription>
      </PanelHeaderWrapper>

      <Separator />

      {isPending ? (
        <Spinner />
      ) : (
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
                className={cn(
                  "bg-accent hover:bg-accent",
                  index % 2 === 0 && "bg-background hover:bg-background",
                )}
              >
                <TableCell className="font-medium">
                  {b.id.substring(20)}
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
      )}
    </>
  );
}
