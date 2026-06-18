"use client";

import EmptyState from "@/app/_components/placeholders/empty-state";
import { Separator } from "@/app/_components/ui/separator";
import PanelHeaderWrapper from "@/app/dashboard/(overview)/panel-header-wrapper";
import { api } from "@/trpc/react";
import { startOfDay } from "date-fns";
import { BookOpenIcon } from "lucide-react";
import { useMemo } from "react";
import PanelHeading from "../(overview)/panel-heading";
import { CreateTimeSlotsForm } from "./create-time-slots-form";
import { TimeSlot } from "./time-slot";

export default function Page() {
  const date = useMemo(() => startOfDay(new Date()), []);
  const { data: timeSlots } = api.timeSlot.admin.getByDate.useQuery({ date });

  const slots = useMemo(
    () => timeSlots?.map((slot) => <TimeSlot key={slot.id} timeSlot={slot} />),
    [timeSlots]
  );

  return (
    <div className="flex flex-col max-w-7xl mx-auto items-start gap-4 w-full">
      <div className="w-full">
        <PanelHeading
          title="Create Time Slot"
          description="Create a new time slot for a specific date"
        />
        <Separator />
        <CreateTimeSlotsForm />
      </div>

      <div className="w-full">
        <PanelHeaderWrapper>
          <PanelHeading
            title="Time Slots"
            description="Manage and view all time slots"
          />
        </PanelHeaderWrapper>
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots && slots?.length > 0 ? (
            slots
          ) : (
            <EmptyState
              icon={BookOpenIcon}
              title="No time slots found"
              description="No time slots found for this month."
            />
          )}
        </div>
      </div>
    </div>
  );
}
