import BookingStatusBadge from "@/app/_components/general/booking-status-badge";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { formatDuration } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { RouterOutputs } from "@/trpc/react";
import { format } from "date-fns";
import { ClockIcon, MapPinIcon, UserIcon, VideoIcon } from "lucide-react";

type AdminTimeSlot =
  RouterOutputs["timeSlot"]["admin"]["getAllUpcoming"][number];
type TimeSlotData = Omit<AdminTimeSlot, "bookings"> & {
  bookings?: AdminTimeSlot["bookings"];
};

type TimeSlotProps = {
  timeSlot: TimeSlotData;
  className?: string;
};

export function TimeSlot({ timeSlot, className }: TimeSlotProps) {
  const isOnline = timeSlot.presence === "ONLINE";
  const booking = timeSlot.bookings;
  const hasBooking = Boolean(booking);
  const isCancelled = booking?.status === "CANCELLED";
  const bookedByName = booking?.bookedBy.name;

  return (
    <Card
      className={cn(
        "shadow-none",
        hasBooking
          ? "border-foreground/20 bg-card shadow-sm"
          : "border-dashed bg-muted/5",
        isCancelled && "bg-muted/20",
        className
      )}
    >
      <CardContent className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 flex-col items-center justify-center rounded-md border bg-muted/40",
              hasBooking && "bg-background shadow-sm"
            )}
          >
            <span className="text-sm font-semibold tabular-nums leading-none">
              {format(timeSlot.startTime, "d")}
            </span>
            <span className="text-[10px] font-medium uppercase leading-tight text-muted-foreground">
              {format(timeSlot.startTime, "MMM")}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold tabular-nums leading-tight">
              {format(timeSlot.startTime, "HH:mm")} –{" "}
              {format(timeSlot.endTime, "HH:mm")}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ClockIcon className="size-3" />
              {formatDuration(timeSlot.startTime, timeSlot.endTime)}
              {hasBooking && (
                <>
                  <span className="text-muted-foreground/50">·</span>
                  <UserIcon className="size-3" />
                  <span className="truncate">{bookedByName ?? "Booked"}</span>
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {booking ? (
            <BookingStatusBadge status={booking.status} />
          ) : (
            <Badge variant="outline">Available</Badge>
          )}
          <Badge
            variant="secondary"
            className="gap-1 border-none bg-transparent hover:bg-transparent"
          >
            {isOnline ? (
              <VideoIcon className="size-3" />
            ) : (
              <MapPinIcon className="size-3" />
            )}
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
