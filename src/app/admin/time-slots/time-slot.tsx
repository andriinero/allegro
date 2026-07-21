import { format } from "date-fns";
import {
  CheckCircle2Icon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { formatDuration } from "@/lib/date";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";

type AdminTimeSlot = RouterOutputs["timeSlot"]["admin"]["getByDate"][number];
type TimeSlot = Omit<AdminTimeSlot, "bookings"> & {
  bookings?: AdminTimeSlot["bookings"];
};

type TimeSlotProps = {
  timeSlot: TimeSlot;
  className?: string;
};

export function TimeSlot({ timeSlot, className }: TimeSlotProps) {
  const isOnline = timeSlot.presence === "ONLINE";
  const bookingId = timeSlot.bookings?.id;
  const isBooked = Boolean(bookingId);
  const bookedByName = timeSlot.bookings?.bookedBy.name;

  const card = (
    <Card
      className={cn(
        "shadow-none transition-colors hover:bg-accent/40",
        isBooked && "cursor-pointer border-primary/30 bg-primary/5",
        className
      )}
    >
      <CardContent className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 flex-col items-center justify-center rounded-md border bg-muted/40",
              isBooked && "border-primary/40 bg-primary/10 text-primary"
            )}
          >
            <span className="text-sm font-semibold tabular-nums leading-none">
              {format(timeSlot.startTime, "d")}
            </span>
            <span
              className={cn(
                "text-[10px] font-medium uppercase leading-tight",
                isBooked ? "text-primary/80" : "text-muted-foreground"
              )}
            >
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
              {isBooked && (
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
          {isBooked ? (
            <Badge className="gap-1">
              <CheckCircle2Icon className="size-3" />
              Booked
            </Badge>
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

  if (!bookingId) return card;

  return (
    <Link
      href={`/admin/bookings?bookingId=${bookingId}`}
      aria-label={`View booking for ${bookedByName ?? "this time slot"}`}
      className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  );
}
