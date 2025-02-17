"use client";

import { api } from "@/trpc/react";
import { CalendarArrowUp } from "lucide-react";
import MetricCard from "./metric-card";

export default function TotalBookingsMetric() {
  const [metrics] = api.metric.bookings.useSuspenseQuery();

  return (
    <MetricCard
      heading="Total Bookings"
      value={metrics.total}
      previousMonth={metrics.previousMonth}
      currentMonth={metrics.currentMonth}
      icon={<CalendarArrowUp />}
    />
  );
}
