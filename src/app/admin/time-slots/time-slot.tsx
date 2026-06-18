import { differenceInMinutes, format } from "date-fns";
import { CheckCircle2Icon, ClockIcon, UserIcon } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";

type TimeSlot = RouterOutputs["timeSlot"]["admin"]["getByDate"][number];

type TimeSlotProps = {
  timeSlot: TimeSlot;
  className?: string;
};

function formatDuration(start: Date, end: Date) {
  const totalMinutes = Math.max(differenceInMinutes(end, start), 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function TimeSlot({ timeSlot, className }: TimeSlotProps) {
  const isOnline = timeSlot.presence === "ONLINE";
  const isBooked = timeSlot.bookings !== null;
  const bookedByName = timeSlot.bookings?.bookedBy.name;

  return (
    <Card
      className={cn(
        "transition-colors hover:bg-accent/40",
        isBooked && "border-primary/30 bg-primary/5",
        className
      )}
    >
      <CardContent className="flex items-center justify-between gap-8 p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 flex-col items-center justify-center rounded-md border bg-muted/40",
              isBooked && "border-primary/40 bg-primary/10 text-primary"
            )}
          >
            <span className="text-sm font-semibold leading-none tabular-nums">
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

        <div className="flex shrink-0 items-center gap-2">
          {isBooked ? (
            <Badge className="gap-1">
              <CheckCircle2Icon className="size-3" />
              Booked
            </Badge>
          ) : (
            <Badge variant="outline">Available</Badge>
          )}
          <Badge variant={isOnline ? "secondary" : "outline"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
