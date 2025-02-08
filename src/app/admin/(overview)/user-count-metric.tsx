import { getCurrentDateNoTime, getPreviousMonthDateNoTime } from "@/lib/date";
import { api } from "@/trpc/react";
import { User } from "lucide-react";
import MetricCard from "./metric-card";

export default function UserCountMetric() {
  const total = api.metric.getUserCount.useQuery();
  const currentMonth = api.metric.getUserCount.useQuery({
    dateStart: getPreviousMonthDateNoTime(),
    dateEnd: getCurrentDateNoTime(),
  });
  const previousMonth = api.metric.getUserCount.useQuery({
    dateStart: getPreviousMonthDateNoTime(),
    dateEnd: getCurrentDateNoTime(),
  });

  return (
    <MetricCard
      heading="Total Users"
      value={total?.data}
      previousMonth={previousMonth?.data}
      currentMonth={total?.data}
      icon={<User />}
    />
  );
}
