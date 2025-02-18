import Spinner from "@/app/_components/general/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatDayMonthYearTime, formatWeekdayDayMonthTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { Booking } from "@prisma/client";

type UserBookingsTableProps = {
  data: Booking[];
  isLoading: boolean;
  isError: boolean;
};

export default function UserBookingsTable({
  data,
  isLoading,
  isError,
}: UserBookingsTableProps) {
  return (
    <Table>
      <TableCaption>Your recent lesson bookings.</TableCaption>

      <TableHeader className="bg-background">
        <TableRow>
          <TableHead className="w-[100px]">Booking</TableHead>
          <TableHead>For</TableHead>
          <TableHead>Placed</TableHead>
          <TableHead>Lesson Presence</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              <Spinner />
            </TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              <p className="text-destructive">Error loading bookings</p>
            </TableCell>
          </TableRow>
        ) : (
          data?.map((b, index) => (
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
              <TableCell>{formatWeekdayDayMonthTime(b.date)}</TableCell>
              <TableCell>{formatDayMonthYearTime(b.createdAt)}</TableCell>
              <TableCell>{b.lessonPresence}</TableCell>
              <TableCell className="text-right font-semibold tracking-tight">
                {b.status}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
