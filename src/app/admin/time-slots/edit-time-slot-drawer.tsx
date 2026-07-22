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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import type { TimeSlotRow } from "@/hooks/use-time-slots-dialog-context";
import { type UpdateTimeSlot, updateTimeSlotSchema } from "@/schemas/time-slot";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfDay } from "date-fns";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type EditTimeSlotDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: TimeSlotRow | null;
};

export default function EditTimeSlotDrawer({
  open,
  onOpenChange,
  currentRow,
}: EditTimeSlotDrawerProps) {
  const form = useForm<UpdateTimeSlot>({
    resolver: zodResolver(updateTimeSlotSchema),
  });
  const apiUtils = api.useUtils();
  const updateTimeSlot = api.timeSlot.admin.updateById.useMutation({
    onSuccess: async () => {
      await Promise.all([
        apiUtils.timeSlot.admin.getAllUpcoming.invalidate(),
        apiUtils.booking.admin.getAll.invalidate(),
        apiUtils.lesson.admin.getAll.invalidate(),
      ]);
      toast.success("Time slot has been updated");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Error updating time slot", {
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (!open || !currentRow) return;

    form.reset({
      id: currentRow.id,
      startTime: currentRow.startTime,
      endTime: currentRow.endTime,
      presence: currentRow.presence,
    });
  }, [currentRow, form, open]);

  function onSubmit(data: UpdateTimeSlot) {
    updateTimeSlot.mutate(data);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        if (!nextOpen) form.reset();
      }}
    >
      <SheetContent className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Time Slot</SheetTitle>
          <SheetDescription>
            Update the schedule and presence for this time slot.
          </SheetDescription>
        </SheetHeader>

        <form
          id="edit-time-slot-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-6"
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
                    idPrefix="edit-slot-start"
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
                    idPrefix="edit-slot-end"
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
                    <RadioGroupItem value="ONLINE" id="edit-slot-online" />
                    <FieldLabel
                      htmlFor="edit-slot-online"
                      className="cursor-pointer"
                    >
                      Online
                    </FieldLabel>
                  </Field>
                  <Field
                    orientation="horizontal"
                    className="rounded-lg border p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                  >
                    <RadioGroupItem value="OFFLINE" id="edit-slot-offline" />
                    <FieldLabel
                      htmlFor="edit-slot-offline"
                      className="cursor-pointer"
                    >
                      Offline
                    </FieldLabel>
                  </Field>
                </RadioGroup>
              </FieldSet>
            )}
          />
        </form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button
            form="edit-time-slot-form"
            type="submit"
            disabled={updateTimeSlot.isPending}
          >
            {updateTimeSlot.isPending && (
              <Loader2Icon className="animate-spin" />
            )}
            {updateTimeSlot.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
