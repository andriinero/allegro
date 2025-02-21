"use client";

import { api } from "@/trpc/react";
import { User } from "lucide-react";
import MetricCard from "./metric-card";

export default function UserCountMetric() {
  const [metrics] = api.metric.admin.users.useSuspenseQuery();

  return (
    <MetricCard
      heading="Total Users"
      value={metrics.total}
      previousMonth={metrics.previousMonth}
      currentMonth={metrics.currentMonth}
      icon={<User />}
    />
  );
}
