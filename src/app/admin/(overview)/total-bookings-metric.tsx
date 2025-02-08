import { getCurrentMonthRange, getPreviousMonthRange } from "@/lib/date";
import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function TotalBookingsMetric() {
  const total = api.metric.getBookingCount.useQuery();
  const currentMonth = api.metric.getBookingCount.useQuery(
    getCurrentMonthRange(),
  );
  const previousMonth = api.metric.getBookingCount.useQuery(
    getPreviousMonthRange(),
  );

  return (
    <MetricCard
      heading="Total Bookings"
      value={total.data}
      previousMonth={previousMonth.data}
      currentMonth={currentMonth.data}
      icon={<BookOpen />}
    />
  );
}
