"use client";

import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonsCompletedMetric() {
  const [metrics] = api.metric.completedLessons.useSuspenseQuery();

  return (
    <MetricCard
      heading="Lessons Completed"
      value={metrics.total}
      previousMonth={metrics.previousMonth}
      currentMonth={metrics.currentMonth}
      icon={<BookOpen />}
    />
  );
}
