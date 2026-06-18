import { Button } from "@/app/_components/ui/button";
import { FieldError } from "@/app/_components/ui/field";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const confirmBookingFormSchema = z.object({
  timeSlotId: z.string().min(1, "Please select a time slot"),
});
type ConfirmBookingFormValues = z.infer<typeof confirmBookingFormSchema>;

type ConfirmBookingFormProps = {
  timeSlotId: string | null;
};

export default function ConfirmBookingForm({
  timeSlotId,
}: ConfirmBookingFormProps) {
  const form = useForm<ConfirmBookingFormValues>({
    resolver: zodResolver(confirmBookingFormSchema),
    values: { timeSlotId: timeSlotId ?? "" },
  });

  const apiUtils = api.useUtils();
  const { mutate: createBooking, isPending } = api.booking.create.useMutation({
    onSuccess: async () => {
      await apiUtils.booking.getByCurrentUser.invalidate();
      await apiUtils.timeSlot.getAvailableByDate.invalidate();
      toast.success("Booking has been created");
    },
    onError: (error) => {
      toast.error("Error creating booking", {
        description: error.message,
      });
    },
  });

  function onSubmit(data: ConfirmBookingFormValues) {
    toast.info(JSON.stringify(data, null, 2));
    createBooking(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {form.formState.errors.timeSlotId && (
        <FieldError
          errors={[{ message: form.formState.errors.timeSlotId.message }]}
        />
      )}
      <Button type="submit" disabled={isPending}>
        Confirm Booking
      </Button>
    </form>
  );
}
