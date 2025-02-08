import { getCurrentDateNoTime, getPreviousMonthDateNoTime } from "@/lib/date";
import { api } from "@/trpc/react";
import { BookOpen } from "lucide-react";
import MetricCard from "./metric-card";

export default function LessonsTakenMetric() {
  const total = api.metric.getLessonCount.useQuery();
  const previousMonth = api.metric.getLessonCount.useQuery({
    dateStart: getPreviousMonthDateNoTime(),
    dateEnd: getCurrentDateNoTime(),
  });

  return (
    <MetricCard
      heading="Lessons Taken"
      value={total?.data}
      previousMonth={previousMonth?.data}
      currentMonth={total?.data}
      icon={<BookOpen />}
    />
  );
}
