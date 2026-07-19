"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { api } from "@/trpc/react";
import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  PlusCircleIcon,
  RefreshCwIcon,
} from "lucide-react";
import PanelHeading from "../(overview)/panel-heading";
import { CreateTimeSlotsForm } from "./create-time-slots-form";
import UpcomingTimeSlots from "./upcoming-time-slots";

export default function Page() {
  const {
    data: timeSlots,
    isFetching,
    refetch,
  } = api.timeSlot.admin.getAllUpcoming.useQuery();

  const bookedCount =
    timeSlots?.filter((slot) => slot.bookings !== null).length ?? 0;
  const availableCount = (timeSlots?.length ?? 0) - bookedCount;
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
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="w-fit font-normal">
                  {timeSlots?.length ?? 0} total slots
                </Badge>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Refresh upcoming time slots"
                  title="Refresh upcoming time slots"
                  disabled={isFetching}
                  onClick={() => void refetch()}
                >
                  <RefreshCwIcon className={isFetching ? "animate-spin" : ""} />
                </Button>
              </div>
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
            <UpcomingTimeSlots timeSlots={timeSlots ?? []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
