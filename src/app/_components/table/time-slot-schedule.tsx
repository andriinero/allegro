import { differenceInMinutes, format } from "date-fns";

type TimeSlotScheduleProps = {
  startTime: Date;
  endTime: Date;
};

export default function TimeSlotSchedule({
  startTime,
  endTime,
}: TimeSlotScheduleProps) {
  const duration = Math.max(differenceInMinutes(endTime, startTime), 0);

  return (
    <div className="min-w-36">
      <p className="font-medium">{format(startTime, "EEE, d MMM")}</p>
      <p className="text-xs text-muted-foreground">
        {format(startTime, "HH:mm")}–{format(endTime, "HH:mm")} · {duration} min
      </p>
    </div>
  );
}
