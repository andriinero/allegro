import { getCurrentMonthRange, getPreviousMonthRange } from "@/lib/date";
import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonReviewsMetric() {
  const total = api.metric.getReviewCount.useQuery();
  const currentMonth = api.metric.getLessonCount.useQuery(
    getCurrentMonthRange(),
  );
  const previousMonth = api.metric.getReviewCount.useQuery(
    getPreviousMonthRange(),
  );

  return (
    <MetricCard
      heading="Lesson Reviews"
      value={total.data}
      previousMonth={previousMonth.data}
      currentMonth={currentMonth.data}
      icon={<BookOpen />}
    />
  );
}
