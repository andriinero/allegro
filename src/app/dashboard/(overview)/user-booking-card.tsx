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
  CircleDashed,
  ClockIcon,
  PresentationIcon,
} from "lucide-react";

type UserBookingCardProps = {
  booking: RouterOutputs["booking"]["getByCurrentUser"][number];
};

export default function UserBookingCard({ booking }: UserBookingCardProps) {
  const { setOpen, setId } = useDashboard();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking</CardTitle>
        <CardDescription>{formatUUID(booking.id)}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <CircleDashed className="size-4 text-muted-foreground" />
          <span className="font-semibold">{capitalize(booking.status)}</span>
        </div>

        <div className="flex items-center gap-2">
          <PresentationIcon className="size-4 text-muted-foreground" />
          {capitalize(booking.lessonPresence)}
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
        <Button
          onClick={() => {
            setOpen("cancelBooking");
            setId(booking.id);
          }}
          variant="destructive"
          className="w-full"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
