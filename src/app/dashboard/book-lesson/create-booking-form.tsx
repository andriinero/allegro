import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import type { CreateBooking } from "@/server/api/schemas/booking";
import { createBookingSchema } from "@/server/api/schemas/booking";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CreateBookingForm() {
  const form = useForm<CreateBooking>({
    resolver: zodResolver(createBookingSchema),
  });
  const createBookingMutation = api.booking.create.useMutation();

  function onSubmit(data: CreateBooking) {
    createBookingMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Select the presence type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="presence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <RadioGroup defaultValue="ONLINE" {...field}>
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
              <FormDescription>Select the presence type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
