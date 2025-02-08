import { getCurrentMonthRange, getPreviousMonthRange } from "@/lib/date";
import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonsTakenMetric() {
  const total = api.metric.getLessonCount.useQuery();
  const currentMonth = api.metric.getLessonCount.useQuery(
    getCurrentMonthRange(),
  );
  const previousMonth = api.metric.getLessonCount.useQuery(
    getPreviousMonthRange(),
  );

  return (
    <MetricCard
      heading="Lessons Taken"
      value={total.data}
      previousMonth={previousMonth.data}
      currentMonth={currentMonth.data}
      icon={<BookOpen />}
    />
  );
}
