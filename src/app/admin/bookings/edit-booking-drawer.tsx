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
import { type UpdateBooking, updateBookingSchema } from "@/schemas/booking";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingStatus } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import type { BookingRow } from "./booking-columns";

const updateBookingFormSchema = updateBookingSchema.omit({ id: true });
type UpdateBookingForm = z.infer<typeof updateBookingSchema>;

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

  const apiUtils = api.useUtils();
  const updateBookingMutation = api.booking.admin.updateById.useMutation({
    onSuccess: async () => {
      await apiUtils.booking.admin.getAll.invalidate();
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
      });
  }, [form, currentRow]);

  function onSubmit(data: UpdateBookingForm) {
    console.log(data);
    if (!currentRow?.id) return;

    updateBookingMutation.mutate({
      id: currentRow.id,
      status: data.status ?? currentRow.status,
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
