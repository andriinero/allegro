import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { updateBookingSchema } from "@/schemas/booking";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingStatus } from "@prisma/client";
import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import type { BookingRow } from "./booking-columns";

const CLEAR_TIME_SLOT_VALUE = "clear-time-slot";

const updateBookingFormSchema = updateBookingSchema.omit({ id: true });
type UpdateBookingForm = z.infer<typeof updateBookingFormSchema>;

type EditBookingDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: BookingRow | null;
};

export default function EditBookingDrawer({
  open,
  onOpenChange,
  currentRow,
}: EditBookingDrawerProps) {
  const form = useForm<UpdateBookingForm>({
    resolver: zodResolver(updateBookingFormSchema),
  });
  const { data: availableTimeSlots, isLoading: isLoadingTimeSlots } =
    api.timeSlot.admin.getAvailableForBooking.useQuery(
      { bookingId: currentRow?.id ?? "" },
      { enabled: open && currentRow !== null }
    );

  const apiUtils = api.useUtils();
  const updateBookingMutation = api.booking.admin.updateById.useMutation({
    onSuccess: async () => {
      await Promise.all([
        apiUtils.booking.admin.getAll.invalidate(),
        apiUtils.lesson.admin.getAll.invalidate(),
        apiUtils.timeSlot.admin.getAllUpcoming.invalidate(),
      ]);
      toast.success("Booking has been updated");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Error updating booking", {
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (currentRow)
      form.reset({
        status: currentRow.status,
        timeSlotId: currentRow.timeSlotId,
      });
  }, [form, currentRow]);

  function onSubmit(data: UpdateBookingForm) {
    if (!currentRow?.id) return;

    updateBookingMutation.mutate({
      id: currentRow.id,
      status: data.status ?? currentRow.status,
      timeSlotId: data.timeSlotId,
    });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        form.reset();
      }}
    >
      <SheetContent className="flex flex-col overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Booking</SheetTitle>
          <SheetDescription>
            Make changes to the booking details. Click save when you&apos;re
            done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="edit-booking-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select booking status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(BookingStatus).map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    Current status of the booking
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeSlotId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time slot</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const timeSlotId =
                        value === CLEAR_TIME_SLOT_VALUE ? null : value;
                      field.onChange(timeSlotId);
                    }}
                    value={field.value ?? CLEAR_TIME_SLOT_VALUE}
                    disabled={isLoadingTimeSlots}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingTimeSlots
                              ? "Loading time slots…"
                              : "Select a time slot"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={CLEAR_TIME_SLOT_VALUE}>
                        No time slot
                      </SelectItem>
                      {availableTimeSlots?.map((timeSlot) => (
                        <SelectItem key={timeSlot.id} value={timeSlot.id}>
                          {format(timeSlot.startTime, "EEE, d MMM · HH:mm")}–
                          {format(timeSlot.endTime, "HH:mm")} ·{" "}
                          {timeSlot.presence.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    Reassign this booking or leave it without a time slot.
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button form="edit-booking-form" type="submit">
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
