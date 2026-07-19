"use client";

import EmptyState from "@/app/_components/placeholders/empty-state";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { api } from "@/trpc/react";
import { format, isSameDay, isToday, isTomorrow } from "date-fns";
import {
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  PlusCircleIcon,
} from "lucide-react";
import PanelHeading from "../(overview)/panel-heading";
import { CreateTimeSlotsForm } from "./create-time-slots-form";
import { TimeSlot } from "./time-slot";

export default function Page() {
  const { data: timeSlots } = api.timeSlot.admin.getAllUpcoming.useQuery();

  const bookedCount =
    timeSlots?.filter((slot) => slot.bookings !== null).length ?? 0;
  const availableCount = (timeSlots?.length ?? 0) - bookedCount;
  const sortedTimeSlots = [...(timeSlots ?? [])].sort(
    (first, second) => first.startTime.getTime() - second.startTime.getTime()
  );
  const timeSlotsByDay = sortedTimeSlots.reduce<
    { date: Date; slots: typeof sortedTimeSlots }[]
  >((days, slot) => {
    const currentDay = days.at(-1);

    if (currentDay && isSameDay(currentDay.date, slot.startTime)) {
      currentDay.slots.push(slot);
    } else {
      days.push({ date: slot.startTime, slots: [slot] });
    }

    return days;
  }, []);

  function getDayLabel(date: Date) {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "EEEE");
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PanelHeading
        title="Time slots"
        description="Create availability and keep track of upcoming bookings."
      />

      <div className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="lg:sticky lg:top-6">
          <CardHeader className="border-b bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground">
                <PlusCircleIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base">Add availability</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open a new lesson window.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <CreateTimeSlotsForm />
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="gap-4 border-b pb-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">Upcoming schedule</CardTitle>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Your time slots
                </p>
              </div>
              <Badge variant="secondary" className="w-fit font-normal">
                {timeSlots?.length ?? 0} total slots
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
                <Clock3Icon className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-lg font-semibold leading-none">
                    {availableCount}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Available
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-3">
                <CheckCircle2Icon className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-lg font-semibold leading-none">
                    {bookedCount}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Booked</p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            {timeSlots && timeSlots.length > 0 ? (
              <div className="space-y-6">
                {timeSlotsByDay.map(({ date, slots }) => (
                  <section key={format(date, "yyyy-MM-dd")}>
                    <div className="mb-3 flex items-center gap-3">
                      <div>
                        <h3 className="text-sm font-semibold">
                          {getDayLabel(date)}
                        </h3>
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
            ) : (
              <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed bg-muted/10">
                <EmptyState
                  icon={BookOpenIcon}
                  title="No upcoming time slots"
                  description="Use the form to add your first available lesson time."
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
