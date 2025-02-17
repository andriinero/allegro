"use client";

import { api } from "@/trpc/react";
import { Star } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonReviewsMetric() {
  const [metrics] = api.metric.reviews.useSuspenseQuery();

  return (
    <MetricCard
      heading="Lesson Reviews"
      value={metrics.total}
      previousMonth={metrics.previousMonth}
      currentMonth={metrics.currentMonth}
      icon={<Star />}
    />
  );
}
