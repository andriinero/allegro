"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { api } from "@/trpc/react";
import RecentlyTaughtStudent from "./recently-taught-student";

export default function RecentLessonsCard() {
  const { data: count } = api.lesson.getAnyCount.useQuery({
    status: "COMPLETED",
  });
  const { data: lessons } = api.lesson.getAll.useQuery({
    pagination: { take: 5, page: 0 },
    lesson: { status: "COMPLETED" },
  });

  return (
    <Card className="col-span-7 flex flex-col lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Lessons</CardTitle>
        <CardDescription>
          You&apos;ve taught {count ? count : 0} student(s) this month
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-col justify-between gap-8">
          {lessons?.map((l) => (
            <RecentlyTaughtStudent
              key={l.id}
              avatar={l.student.image ?? ""}
              name={l.student.name ?? ""}
              email={l.student.email ?? ""}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
