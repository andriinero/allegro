import { getCurrentMonthRange, getPreviousMonthRange } from "@/lib/date";
import { api } from "@/trpc/react";
import { User } from "lucide-react";
import MetricCard from "./metric-card";

export default function UserCountMetric() {
  const total = api.metric.getUserCount.useQuery();
  const currentMonth = api.metric.getUserCount.useQuery(getCurrentMonthRange());
  const previousMonth = api.metric.getUserCount.useQuery(
    getPreviousMonthRange(),
  );

  return (
    <MetricCard
      heading="Total Users"
      value={total.data}
      previousMonth={previousMonth.data}
      currentMonth={currentMonth.data}
      icon={<User />}
    />
  );
}
