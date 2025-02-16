import {
  Table,
  TableHead,
  TableRow,
  TableCaption,
  TableHeader,
  TableBody,
  TableCell,
} from "@/app/_components/ui/table";
import { getNDayNMonthNYearAtShortTime } from "@/lib/date";
import { getNDayMonth } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { Booking } from "@prisma/client";

type UserBookingsTableProps = {
  bookings: Booking[];
};

export default function UserBookingsTable({
  bookings,
}: UserBookingsTableProps) {
  return (
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
            <TableCell className="font-medium">{b.id.substring(20)}</TableCell>
            <TableCell>{getNDayMonth(b.date)}</TableCell>
            <TableCell>{getNDayNMonthNYearAtShortTime(b.createdAt)}</TableCell>
            <TableCell>{b.lessonPresence}</TableCell>
            <TableCell className="text-right font-semibold tracking-tight">
              {b.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
