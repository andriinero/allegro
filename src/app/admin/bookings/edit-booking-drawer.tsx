import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import DateTimePicker24h from "@/app/_components/ui/date-time-picker";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
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
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingStatus, LessonPresence, type Booking } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editBookingFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  status: z.nativeEnum(BookingStatus, {
    required_error: "Please select a booking status",
  }),
  lessonPresence: z.nativeEnum(LessonPresence, {
    required_error: "Please select a lesson presence",
  }),
});
type EditBookingForm = z.infer<typeof editBookingFormSchema>;

type EditBookingDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Booking | null;
};

export default function EditBookingDrawer({
  open,
  onOpenChange,
  currentRow,
}: EditBookingDrawerProps) {
  const form = useForm<EditBookingForm>({
    resolver: zodResolver(editBookingFormSchema),
    defaultValues: {
      date: currentRow?.date,
      status: currentRow?.status,
      lessonPresence: currentRow?.lessonPresence,
    },
  });

  const apiUtils = api.useUtils();
  const editBookingMutation = api.booking.updateAnyById.useMutation({
    onSuccess: async () => {
      await apiUtils.booking.getAny.invalidate();
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
    if (currentRow) form.reset(currentRow);
  }, [form, currentRow]);

  function onSubmit(data: EditBookingForm) {
    if (!currentRow?.id) return;

    editBookingMutation.mutate({
      id: currentRow.id,
      ...data,
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
            <DateTimePicker24h
              form={form}
              name="date"
              label="Date"
              description="The date and time when the lesson will take place"
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              name="lessonPresence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presence</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lesson presence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(LessonPresence).map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    Whether the lesson will be online or in-person
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
