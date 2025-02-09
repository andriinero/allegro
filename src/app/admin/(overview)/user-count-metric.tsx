"use client";

import {
  getCurrentMonthDateRangeange,
  getPreviousMonthDateRange,
} from "@/lib/date";
import { api } from "@/trpc/react";
import { User } from "lucide-react";
import MetricCard from "./metric-card";

export default function UserCountMetric() {
  const [total] = api.metric.getUserCount.useSuspenseQuery();
  const [currentMonth] = api.metric.getUserCount.useSuspenseQuery(
    getCurrentMonthDateRangeange(),
  );
  const [previousMonth] = api.metric.getUserCount.useSuspenseQuery(
    getPreviousMonthDateRange(),
  );

  return (
    <MetricCard
      heading="Total Users"
      value={total}
      previousMonth={previousMonth}
      currentMonth={currentMonth}
      icon={<User />}
    />
  );
}
