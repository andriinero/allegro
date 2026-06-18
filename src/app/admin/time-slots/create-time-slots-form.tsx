"use client";

import { DatePickerTime } from "@/app/_components/general/date-picker-time";
import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/app/_components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LessonPresence } from "@prisma/client";
import { startOfDay } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createTimeSlotSchema = z.object({
  startTime: z.date({
    required_error: "Start time is required",
    invalid_type_error: "Start time must be a valid date",
  }),
  endTime: z.date({
    required_error: "End time is required",
    invalid_type_error: "End time must be a valid date",
  }),
  presence: z.nativeEnum(LessonPresence, {
    required_error: "Presence is required",
    invalid_type_error: "Presence must be a valid value",
  }),
});

type CreateTimeSlot = z.infer<typeof createTimeSlotSchema>;

export function CreateTimeSlotsForm() {
  const form = useForm<CreateTimeSlot>({
    resolver: zodResolver(createTimeSlotSchema),
    defaultValues: {
      startTime: undefined,
      endTime: undefined,
      presence: "ONLINE",
    },
  });
  const apiUtils = api.useUtils();
  const { mutate: createTimeSlot, isPending } =
    api.timeSlot.admin.createForDate.useMutation({
      onSuccess: async () => {
        toast.success("Time slot has been created");
        await apiUtils.timeSlot.admin.getByDate.invalidate();
        form.reset();
      },
      onError: (error) => {
        toast.error("Error creating time slot", {
          description: error.message,
        });
      },
    });

  async function onSubmitCreate(data: CreateTimeSlot) {
    toast.info(JSON.stringify(data, null, 2));
    createTimeSlot(data);
    await apiUtils.timeSlot.admin.getByDate.invalidate();
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmitCreate)}
      className="flex flex-col gap-4"
    >
      <Controller
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <DatePickerTime
            date={field.value}
            setDate={field.onChange}
            disabled={(date) => date < startOfDay(new Date())}
          />
        )}
      />
      <Controller
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <DatePickerTime
            date={field.value}
            setDate={field.onChange}
            disabled={(date) => date < startOfDay(new Date())}
          />
        )}
      />
      <Controller
        control={form.control}
        name="presence"
        render={({ field }) => (
          <FieldSet className="w-full max-w-xs">
            <FieldLegend variant="label">Presence</FieldLegend>
            <RadioGroup value={field.value} onValueChange={field.onChange}>
              <Field orientation="horizontal">
                <RadioGroupItem value="ONLINE" id="time-slot-online" />
                <FieldLabel htmlFor="time-slot-online">Online</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="OFFLINE" id="time-slot-offline" />
                <FieldLabel htmlFor="time-slot-offline">Offline</FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>
        )}
      />
      <Button type="submit" className="self-start" disabled={isPending}>
        Create Time Slot
      </Button>
    </form>
  );
}
