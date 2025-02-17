import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import AdminPanelHeading from "./(overview)/admin-panel-heading";
import CompletedLessonsCard from "./(overview)/completed-lessons-card";
import LessonReviewsMetric from "./(overview)/lesson-reviews-metric";
import LessonsCompletedMetric from "./(overview)/lessons-taken-metric";
import MetricsSkeleton from "./(overview)/metrics-skeleton";
import SalesChart from "./(overview)/sales-chart";
import TotalBookingsMetric from "./(overview)/total-bookings-metric";
import UserCountMetric from "./(overview)/user-count-metric";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <AdminPanelHeading title="Dashboard" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Suspense fallback={<MetricsSkeleton />}>
          <UserCountMetric />

          <TotalBookingsMetric />

          <LessonsCompletedMetric />

          <LessonReviewsMetric />
        </Suspense>
      </div>

      <div className="grid grid-cols-7 gap-4">
        <Card className="col-span-7 lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Revenue for the past 12 months</CardDescription>
          </CardHeader>

          <CardContent className="pl-2">
            <SalesChart />
          </CardContent>
        </Card>

        <CompletedLessonsCard />
      </div>
    </div>
  );
}
