import { Button } from "@/app/_components/ui/button";
import { type CreateBooking } from "@/schemas/booking";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const confirmBookingFormSchema = z.object({
  timeSlotId: z.string(),
});
type ConfirmBookingForm = z.infer<typeof confirmBookingFormSchema>;

type ConfirmBookingFormProps = {
  timeSlotId: string | null;
};

export default function ConfirmBookingForm({
  timeSlotId,
}: ConfirmBookingFormProps) {
  const form = useForm<ConfirmBookingForm>({
    resolver: zodResolver(confirmBookingFormSchema),
    defaultValues: {
      timeSlotId: timeSlotId ?? undefined,
    },
  });

  const apiUtils = api.useUtils();
  const { mutate: createBooking, isPending } = api.booking.create.useMutation({
    onSuccess: async () => {
      await apiUtils.booking.getByCurrentUser.invalidate();
      toast.success("Booking has been created");
    },
    onError: (error) => {
      toast.error("Error creating booking", {
        description: error.message,
      });
    },
  });

  function onSubmit(data: CreateBooking) {
    createBooking(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Button type="submit" disabled={isPending}>
        Confirm Booking
      </Button>
    </form>
  );
}
