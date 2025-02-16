"use client";

import {
  getCurrentMonthDateRange,
  getPreviousMonthDateRange,
} from "@/lib/date";
import { api } from "@/trpc/react";
import { CalendarArrowUp } from "lucide-react";
import MetricCard from "./metric-card";

export default function TotalBookingsMetric() {
  const [total] = api.metric.getBookingCount.useSuspenseQuery();
  const [currentMonth] = api.metric.getBookingCount.useSuspenseQuery(
    getCurrentMonthDateRange(),
  );
  const [previousMonth] = api.metric.getBookingCount.useSuspenseQuery(
    getPreviousMonthDateRange(),
  );

  return (
    <MetricCard
      heading="Total Bookings"
      value={total}
      previousMonth={previousMonth}
      currentMonth={currentMonth}
      icon={<CalendarArrowUp />}
    />
  );
}
