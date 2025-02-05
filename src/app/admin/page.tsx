"use client";

import { api } from "@/trpc/react";
import { BookOpenIcon, CalendarArrowUp, Star, User } from "lucide-react";
import { Card, CardContent } from "../_components/ui/card";

export default function Page() {
  const { data: usersCount } = api.metric.getUserCount.useQuery({
    dateStart: new Date("2024-01-01"),
    dateEnd: new Date(),
  });
  const { data: bookingsCount } = api.metric.getBookingCount.useQuery();
  const { data: lessonsCount } = api.metric.getLessonCount.useQuery();
  const { data: reviewsCount } = api.metric.getReviewCount.useQuery();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      <div className="flex gap-4">
        <Card className="basis-1/4">
          <div className="flex items-center justify-between p-6 pb-2">
            <h4 className="text-sm font-medium tracking-tight">Total users</h4>
            <User className="size-4 opacity-60" />
          </div>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount ?? "-"}</div>
            <p className="text-xs text-foreground/80">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="basis-1/4">
          <div className="flex items-center justify-between p-6 pb-2">
            <h4 className="text-sm font-medium tracking-tight">
              Total bookings
            </h4>
            <CalendarArrowUp className="size-4 opacity-60" />
          </div>
          <CardContent>
            <div className="text-2xl font-bold">{bookingsCount ?? "-"}</div>
            <p className="text-xs text-foreground/80">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="basis-1/4">
          <div className="flex items-center justify-between p-6 pb-2">
            <h4 className="text-sm font-medium tracking-tight">
              Lessons Taken
            </h4>
            <BookOpenIcon className="size-4 opacity-60" />
          </div>
          <CardContent>
            <div className="text-2xl font-bold">{lessonsCount ?? "-"}</div>
            <p className="text-xs text-foreground/80">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="basis-1/4">
          <div className="flex items-center justify-between p-6 pb-2">
            <h4 className="text-sm font-medium tracking-tight">
              Lesson Reviews
            </h4>
            <Star className="size-4 opacity-60" />
          </div>
          <CardContent>
            <div className="text-2xl font-bold">{reviewsCount ?? "-"}</div>
            <p className="text-xs text-foreground/80">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
