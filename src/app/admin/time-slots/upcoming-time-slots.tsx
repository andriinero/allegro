import EmptyState from "@/app/_components/placeholders/empty-state";
import { Badge } from "@/app/_components/ui/badge";
import { type RouterOutputs } from "@/trpc/react";
import { format, isSameDay, isToday, isTomorrow } from "date-fns";
import { BookOpenIcon } from "lucide-react";
import { TimeSlot } from "./time-slot";

type UpcomingTimeSlot =
  RouterOutputs["timeSlot"]["admin"]["getAllUpcoming"][number];

type UpcomingTimeSlotsProps = {
  timeSlots: UpcomingTimeSlot[];
};

type TimeSlotDay = {
  date: Date;
  slots: UpcomingTimeSlot[];
};

function groupTimeSlotsByDay(timeSlots: UpcomingTimeSlot[]) {
  const sortedTimeSlots = [...timeSlots].sort(
    (first, second) => first.startTime.getTime() - second.startTime.getTime()
  );

  return sortedTimeSlots.reduce<TimeSlotDay[]>((days, slot) => {
    const currentDay = days.at(-1);

    if (currentDay && isSameDay(currentDay.date, slot.startTime)) {
      currentDay.slots.push(slot);
    } else {
      days.push({ date: slot.startTime, slots: [slot] });
    }

    return days;
  }, []);
}

function getDayLabel(date: Date) {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEEE");
}

export default function UpcomingTimeSlots({
  timeSlots,
}: UpcomingTimeSlotsProps) {
  if (timeSlots.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed bg-muted/10">
        <EmptyState
          icon={BookOpenIcon}
          title="No upcoming time slots"
          description="Use the form to add your first available lesson time."
        />
      </div>
    );
  }

  const timeSlotsByDay = groupTimeSlotsByDay(timeSlots);

  return (
    <div className="space-y-6">
      {timeSlotsByDay.map(({ date, slots }) => (
        <section key={format(date, "yyyy-MM-dd")}>
          <div className="mb-3 flex items-center gap-3">
            <div>
              <h3 className="text-sm font-semibold">{getDayLabel(date)}</h3>
              <p className="text-xs text-muted-foreground">
                {format(date, "MMMM d, yyyy")}
              </p>
            </div>
            <div className="h-px flex-1 bg-border" />
            <Badge variant="outline" className="font-normal">
              {slots.length} {slots.length === 1 ? "slot" : "slots"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {slots.map((slot) => (
              <TimeSlot key={slot.id} timeSlot={slot} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
