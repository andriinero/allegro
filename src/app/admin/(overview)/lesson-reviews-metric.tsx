import { getCurrentDateNoTime, getPreviousMonthDateNoTime } from "@/lib/date";
import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonReviewsMetric() {
  const total = api.metric.getReviewCount.useQuery();
  const previousMonth = api.metric.getReviewCount.useQuery({
    dateStart: getPreviousMonthDateNoTime(),
    dateEnd: getCurrentDateNoTime(),
  });

  return (
    <MetricCard
      heading="Lesson Reviews"
      value={total?.data}
      previousMonth={previousMonth?.data}
      currentMonth={total?.data}
      icon={<BookOpen />}
    />
  );
}
