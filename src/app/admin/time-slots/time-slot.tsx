import { type LessonTimeSlot } from "@prisma/client";
import { differenceInMinutes, format } from "date-fns";
import { ClockIcon } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";

type TimeSlotProps = {
  timeSlot: LessonTimeSlot;
};

function formatDuration(start: Date, end: Date) {
  const totalMinutes = Math.max(differenceInMinutes(end, start), 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function TimeSlot({ timeSlot }: TimeSlotProps) {
  const isOnline = timeSlot.presence === "ONLINE";

  return (
    <Card className="transition-colors hover:bg-accent/40">
      <CardContent className="flex items-center justify-between gap-8 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-md border bg-muted/40">
            <span className="text-sm font-semibold leading-none tabular-nums">
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
            </span>
          </div>
        </div>

        <Badge variant={isOnline ? "default" : "secondary"}>
          {isOnline ? "Online" : "Offline"}
        </Badge>
      </CardContent>
    </Card>
  );
}
