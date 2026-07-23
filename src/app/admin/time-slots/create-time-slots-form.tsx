"use client";

import { DatePickerTime } from "@/app/_components/general/date-picker-time";
import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/app/_components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LessonPresence } from "@prisma/client";
import { startOfDay } from "date-fns";
import { ArrowRightIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createTimeSlotSchema = z
  .object({
    startTime: z.date({ required_error: "Choose a start date and time" }),
    endTime: z.date({ required_error: "Choose an end date and time" }),
    presence: z.nativeEnum(LessonPresence),
  })
  .refine(({ startTime, endTime }) => endTime > startTime, {
    message: "End time must be after the start time",
    path: ["endTime"],
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
        await Promise.all([
          apiUtils.timeSlot.admin.getAll.invalidate(),
          apiUtils.timeSlot.admin.getAllUpcoming.invalidate(),
        ]);
        form.reset();
      },
      onError: (error) => {
        toast.error("Error creating time slot", {
          description: error.message,
        });
      },
    });

  async function onSubmitCreate(data: CreateTimeSlot) {
    createTimeSlot(data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmitCreate)}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <Controller
          control={form.control}
          name="startTime"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <DatePickerTime
                date={field.value}
                setDate={field.onChange}
                disabled={(date) => date < startOfDay(new Date())}
                label="Starts"
                idPrefix="slot-start"
              />
              <FieldError errors={[fieldState.error]} />
            </div>
          )}
        />

        <div className="hidden items-center gap-3 text-xs text-muted-foreground sm:flex">
          <div className="h-px flex-1 bg-border" />
          <ArrowRightIcon className="size-3.5" />
          <span>until</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Controller
          control={form.control}
          name="endTime"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <DatePickerTime
                date={field.value}
                setDate={field.onChange}
                disabled={(date) => date < startOfDay(new Date())}
                label="Ends"
                idPrefix="slot-end"
              />
              <FieldError errors={[fieldState.error]} />
            </div>
          )}
        />
      </div>
      <Controller
        control={form.control}
        name="presence"
        render={({ field }) => (
          <FieldSet className="w-full gap-0">
            <FieldLegend variant="label" className="mb-3">
              Presence
            </FieldLegend>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-2 gap-3"
            >
              <Field
                orientation="horizontal"
                className="rounded-lg border p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
              >
                <RadioGroupItem value="ONLINE" id="time-slot-online" />
                <FieldLabel
                  htmlFor="time-slot-online"
                  className="cursor-pointer"
                >
                  Online
                </FieldLabel>
              </Field>
              <Field
                orientation="horizontal"
                className="rounded-lg border p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
              >
                <RadioGroupItem value="OFFLINE" id="time-slot-offline" />
                <FieldLabel
                  htmlFor="time-slot-offline"
                  className="cursor-pointer"
                >
                  Offline
                </FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>
        )}
      />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
        {isPending ? "Creating slot…" : "Create time slot"}
      </Button>
    </form>
  );
}
