"use client";

import { DatePicker } from "@/app/_components/general/date-picker";
import EmptyState from "@/app/_components/placeholders/empty-state";
import { Separator } from "@/app/_components/ui/separator";
import { TimeSlot } from "@/app/admin/time-slots/time-slot";
import { api } from "@/trpc/react";
import type { LessonTimeSlot } from "@prisma/client";
import { BookOpenIcon } from "lucide-react";
import { useMemo, useState } from "react";
import PanelHeaderWrapper from "../(overview)/panel-header-wrapper";
import PanelHeading from "../(overview)/panel-heading";
import ConfirmBookingForm from "./confirm-booking-form";
import { cn } from "@/lib/utils";
import { startOfDay } from "date-fns";
import { CancelAllBookingsButton } from "./cancel-all-bookings-button";

export default function Page() {
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string | null>(
    null
  );
  const [date, setDate] = useState<Date>(new Date());
  const { data: availableTimeSlots } = api.timeSlot.getAvailableByDate.useQuery(
    { date }
  );

  const timeSlots = useMemo(() => {
    return availableTimeSlots?.map((timeSlot: LessonTimeSlot) => (
      <div key={timeSlot.id} onClick={() => setSelectedTimeSlotId(timeSlot.id)}>
        <TimeSlot
          timeSlot={timeSlot}
          className={cn(
            "cursor-pointer",
            selectedTimeSlotId === timeSlot.id &&
              "rounded-md border-2 border-primary shadow-sm"
          )}
        />
      </div>
    ));
  }, [availableTimeSlots, selectedTimeSlotId]);

  function handleDateChange(date: Date) {
    setDate(date);
    setSelectedTimeSlotId(null);
  }

  return (
    <div className="flex flex-col">
      <PanelHeaderWrapper className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PanelHeading title="Book Lesson" description="Book your next lesson" />
        <CancelAllBookingsButton />
      </PanelHeaderWrapper>

      <Separator className="my-6" />

      <div>
        {selectedTimeSlotId && (
          <div>
            <p>Selected Time Slot: {selectedTimeSlotId}</p>
          </div>
        )}
        <DatePicker
          date={date}
          setDate={handleDateChange}
          disabled={(date) => date < startOfDay(new Date())}
        />
        <ConfirmBookingForm timeSlotId={selectedTimeSlotId} />
        <div>
          {timeSlots && timeSlots?.length > 0 ? (
            timeSlots
          ) : (
            <EmptyState
              icon={BookOpenIcon}
              title="No time slots found"
              description="No time slots found for this date."
            />
          )}
        </div>
      </div>
    </div>
  );
}
