"use client";

import {
  getCurrentMonthDateRangeange,
  getPreviousMonthDateRange,
} from "@/lib/date";
import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonsTakenMetric() {
  const [total] = api.metric.getLessonCount.useSuspenseQuery();
  const [currentMonth] = api.metric.getLessonCount.useSuspenseQuery(
    getCurrentMonthDateRangeange(),
  );
  const [previousMonth] = api.metric.getLessonCount.useSuspenseQuery(
    getPreviousMonthDateRange(),
  );

  return (
    <MetricCard
      heading="Lessons Taken"
      value={total}
      previousMonth={previousMonth}
      currentMonth={currentMonth}
      icon={<BookOpen />}
    />
  );
}
