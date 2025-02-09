import { Suspense } from "react";
import { Skeleton } from "../_components/ui/skeleton";
import LessonReviewsMetric from "./(overview)/lesson-reviews-metric";
import LessonsTakenMetric from "./(overview)/lessons-taken-metric";
import TotalBookingsMetric from "./(overview)/total-bookings-metric";
import UserCountMetric from "./(overview)/user-count-metric";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      <div className="flex gap-4">
        <Suspense
          fallback={
            <>
              <Skeleton className="h-[126px] basis-1/4 rounded-xl shadow" />
              <Skeleton className="h-[126px] basis-1/4 rounded-xl shadow" />
              <Skeleton className="h-[126px] basis-1/4 rounded-xl shadow" />
              <Skeleton className="h-[126px] basis-1/4 rounded-xl shadow" />
            </>
          }
        >
          <UserCountMetric />

          <TotalBookingsMetric />

          <LessonsTakenMetric />

          <LessonReviewsMetric />
        </Suspense>
      </div>
    </div>
  );
}
