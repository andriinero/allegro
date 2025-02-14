import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingStatus, LessonPresence, type Booking } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type EditBookingDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Booking | null;
};

const editBookingFormSchema = z.object({
  date: z.date(),
  bookingStatus: z.nativeEnum(BookingStatus),
  lessonPresence: z.nativeEnum(LessonPresence),
});
type EditBookingForm = z.infer<typeof editBookingFormSchema>;

export default function EditBookingDrawer({
  open,
  onOpenChange,
  currentRow,
}: EditBookingDrawerProps) {
  const form = useForm<EditBookingForm>({
    resolver: zodResolver(editBookingFormSchema),
    defaultValues: {
      bookingStatus: currentRow?.status,
      lessonPresence: currentRow?.lessonPresence,
    },
  });

  async function onSubmit(data: EditBookingForm) {
    toast.success("The lesson has been created");
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
          <SheetDescription>Edit booking</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="edit-booking-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Lesson Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : format(currentRow?.date ?? "", "PPP")}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          onMonthChange={() => console.log("ping")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Desired lesson date</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="bookingStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking Status</FormLabel>
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lessonPresence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Presence</FormLabel>
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
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button form="create-lesson-form" type="submit">
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
