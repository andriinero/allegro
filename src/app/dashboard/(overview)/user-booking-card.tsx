import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { formatTime, formatWeekdayDayMonth } from "@/lib/date";
import { formatShortUppercaseUUID } from "@/lib/utils";
import { api, type RouterOutputs } from "@/trpc/react";
import {
  CalendarIcon,
  CircleDashed,
  ClockIcon,
  PresentationIcon,
} from "lucide-react";
import { toast } from "sonner";

type UserBookingCardProps = {
  booking: RouterOutputs["booking"]["getByCurrentUser"][number];
};

export default function UserBookingCard({ booking }: UserBookingCardProps) {
  const utils = api.useUtils();
  const cancelBooking = api.booking.cancelById.useMutation({
    onSuccess: async () => {
      await utils.booking.getByCurrentUser.invalidate();
    },
    onError: () => {
      toast.error("Failed to cancel booking");
    },
  });

  function handleCancel() {
    cancelBooking.mutate({ id: booking.id });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking</CardTitle>
        <CardDescription>
          {formatShortUppercaseUUID(booking.id)}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <div className="flex items-center gap-2 font-semibold">
          <CircleDashed className="size-4 text-muted-foreground" />
          {booking.status}
        </div>

        <div className="flex items-center gap-2 font-semibold">
          <PresentationIcon className="size-4 text-muted-foreground" />
          {booking.lessonPresence}
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4 text-muted-foreground" />
          {booking.date ? formatWeekdayDayMonth(booking.date) : "No date"}
        </div>

        <div className="flex items-center gap-2">
          <ClockIcon className="size-4 text-muted-foreground" />
          {booking.date ? formatTime(booking.date) : "No time"}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCancel} variant="destructive" className="w-full">
          {cancelBooking.isPending ? "Cancelling..." : "Cancel"}
        </Button>
      </CardFooter>
    </Card>
  );
}
