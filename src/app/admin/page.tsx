import { Suspense } from "react";
import MetricsSkeleton from "../_components/placeholders/metrics-skeleton";
import CompletedLessonsCard from "./(overview)/completed-lessons-card";
import LessonsCompletedMetric from "./(overview)/lessons-taken-metric";
import PanelHeading from "./(overview)/panel-heading";
import TotalBookingsMetric from "./(overview)/total-bookings-metric";
import UserCountMetric from "./(overview)/user-count-metric";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHeading title="Dashboard" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Suspense fallback={<MetricsSkeleton />}>
          <UserCountMetric />

          <TotalBookingsMetric />

          <LessonsCompletedMetric />
        </Suspense>
      </div>

      <div className="gap-4">
        <CompletedLessonsCard />
      </div>
    </div>
  );
}
