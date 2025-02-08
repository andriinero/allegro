import { getCurrentDateNoTime, getPreviousMonthDateNoTime } from "@/lib/date";
import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function TotalBookingsMetric() {
  const total = api.metric.getBookingCount.useQuery();
  const previousMonth = api.metric.getBookingCount.useQuery({
    dateStart: getPreviousMonthDateNoTime(),
    dateEnd: getCurrentDateNoTime(),
  });

  return (
    <MetricCard
      heading="Total Bookings"
      value={total?.data}
      previousMonth={previousMonth?.data}
      currentMonth={total?.data}
      icon={<BookOpen />}
    />
  );
}
