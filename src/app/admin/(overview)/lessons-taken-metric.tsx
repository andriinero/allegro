"use client";

import {
  getCurrentMonthDateRange,
  getPreviousMonthDateRange,
} from "@/lib/date";
import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonsCompletedMetric() {
  const [total] = api.metric.getCompletedLessonCount.useSuspenseQuery();
  const [currentMonth] = api.metric.getCompletedLessonCount.useSuspenseQuery(
    getCurrentMonthDateRange(),
  );
  const [previousMonth] = api.metric.getCompletedLessonCount.useSuspenseQuery(
    getPreviousMonthDateRange(),
  );

  return (
    <MetricCard
      heading="Lessons Completed"
      value={total}
      previousMonth={previousMonth}
      currentMonth={currentMonth}
      icon={<BookOpen />}
    />
  );
}
