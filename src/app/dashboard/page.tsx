import { Suspense } from "react";
import MetricsSkeleton from "../_components/placeholders/metrics-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import PanelHeading from "../admin/(overview)/panel-heading";
import CompletedLessonsCard from "../admin/(overview)/completed-lessons-card";
import LessonReviewsMetric from "../admin/(overview)/lesson-reviews-metric";
import LessonsCompletedMetric from "../admin/(overview)/lessons-taken-metric";
import SalesChart from "../admin/(overview)/sales-chart";
import TotalBookingsMetric from "../admin/(overview)/total-bookings-metric";
import UserCountMetric from "../admin/(overview)/user-count-metric";


export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PanelHeading title="Dashboard" />

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