import InfoField from "@/app/_components/general/info-field";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { useDashboard } from "@/hooks/use-dashboard";
import { formatTime, formatWeekdayDayMonth } from "@/lib/date";
import { capitalize, formatUUID } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  PresentationIcon,
} from "lucide-react";

type UserBookingCardProps = {
  booking: RouterOutputs["booking"]["getByCurrentUser"][number];
};

export default function UserBookingCard({ booking }: UserBookingCardProps) {
  const { setOpen, setId } = useDashboard();

  function handleOpenCancelBookingDialog() {
    setId(booking.id);
    setOpen("cancelBooking");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking</CardTitle>
        <CardDescription>{formatUUID(booking.id)}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <InfoField icon={CircleDashedIcon}>
          {capitalize(booking.status)}
        </InfoField>

        <InfoField icon={PresentationIcon}>
          {capitalize(booking.lessonPresence)}
        </InfoField>

        <InfoField icon={CalendarIcon}>
          {booking.date ? formatWeekdayDayMonth(booking.date) : "No date"}
        </InfoField>

        <InfoField icon={ClockIcon}>
          {booking.date ? formatTime(booking.date) : "No time"}
        </InfoField>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleOpenCancelBookingDialog}
          variant="destructive"
          className="w-full"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
