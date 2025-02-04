"use client";

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
import { Label } from "@/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { CreateBooking } from "@/schemas/booking";
import { createBookingSchema } from "@/schemas/booking";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateBookingForm() {
  const form = useForm<CreateBooking>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: { presence: "ONLINE" },
  });
  const apiUtils = api.useUtils();
  const createBookingMutation = api.booking.create.useMutation({
    onSuccess: async () => {
      await apiUtils.booking.getByCurrentUser.invalidate();
    },
  });

  async function onSubmit(data: CreateBooking) {
    try {
      await createBookingMutation.mutateAsync(data);
      toast.success("Booking has been created");
    } catch (e) {
      toast.error("Error has occurred when booking");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
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
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
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
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Desired lesson date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presence</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ONLINE" id="online-presence" />
                    <Label htmlFor="online-presence">Online</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OFFLINE" id="offline-presence" />
                    <Label htmlFor="offline-presence">Offline</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>Select lesson presence type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={createBookingMutation.isPending}
          className="mt-2 self-start"
        >
          Book Lesson
        </Button>
      </form>
    </Form>
  );
}
