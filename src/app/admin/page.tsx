import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../_components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { Skeleton } from "../_components/ui/skeleton";
import LessonReviewsMetric from "./(overview)/lesson-reviews-metric";
import LessonsTakenMetric from "./(overview)/lessons-taken-metric";
import SalesChart from "./(overview)/sales-chart";
import TotalBookingsMetric from "./(overview)/total-bookings-metric";
import UserCountMetric from "./(overview)/user-count-metric";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Suspense
          fallback={
            <>
              <Skeleton className="col-span-1 h-[126px] rounded-xl shadow" />
              <Skeleton className="col-span-1 h-[126px] rounded-xl shadow" />
              <Skeleton className="col-span-1 h-[126px] rounded-xl shadow" />
              <Skeleton className="col-span-1 h-[126px] rounded-xl shadow" />
            </>
          }
        >
          <UserCountMetric />

          <TotalBookingsMetric />

          <LessonsTakenMetric />

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

        <Card className="col-span-7 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Lessons</CardTitle>
            <CardDescription>
              You've taught 1 student(s) this month
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/andriinero.png" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">Andrii Nero</p>
                    <p className="text-sm text-muted-foreground">
                      andrii.nero@gmail.com
                    </p>
                  </div>
                </div>

                <div className="font-medium">45 minutes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
