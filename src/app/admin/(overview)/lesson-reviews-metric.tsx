"use client";

import {
  getCurrentMonthDateRangeange,
  getPreviousMonthDateRange,
} from "@/lib/date";
import { api } from "@/trpc/react";
import { Star } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonReviewsMetric() {
  const [total] = api.metric.getReviewCount.useSuspenseQuery();
  const [currentMonth] = api.metric.getLessonCount.useSuspenseQuery(
    getCurrentMonthDateRangeange(),
  );
  const [previousMonth] = api.metric.getReviewCount.useSuspenseQuery(
    getPreviousMonthDateRange(),
  );

  return (
    <MetricCard
      heading="Lesson Reviews"
      value={total}
      previousMonth={previousMonth}
      currentMonth={currentMonth}
      icon={<Star />}
    />
  );
}
