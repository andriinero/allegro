import { formatUUID } from "@/lib/utils";
import type { LessonPresence } from "@prisma/client";
import { differenceInMinutes, format } from "date-fns";
import Link from "next/link";

type TimeSlotScheduleProps = {
  id: string;
  startTime: Date;
  endTime: Date;
  presence?: LessonPresence;
};

export default function TimeSlotSchedule({
  id,
  startTime,
  endTime,
  presence,
}: TimeSlotScheduleProps) {
  const duration = Math.max(differenceInMinutes(endTime, startTime), 0);

  return (
    <Link
      href={`/admin/time-slots?timeSlotId=${formatUUID(id)}`}
      aria-label={`View time slot ${formatUUID(id)}`}
      className="group block min-w-36 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <p className="font-medium underline-offset-4 group-hover:underline">
        {format(startTime, "EEE, d MMM")}
      </p>
      <p className="text-xs text-muted-foreground">
        {format(startTime, "HH:mm")}–{format(endTime, "HH:mm")} · {duration} min
        {presence && ` · ${presence.toLowerCase()}`}
      </p>
    </Link>
  );
}
