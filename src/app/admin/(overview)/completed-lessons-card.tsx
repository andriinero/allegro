"use client";

import Spinner from "@/app/_components/general/spinner";
import EmptyState from "@/app/_components/placeholders/empty-state";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { api } from "@/trpc/react";
import { BookOpenIcon } from "lucide-react";
import CompletedLessonItem from "./completed-lesson-item";

export default function CompletedLessonsCard() {
  const { data: count } = api.lesson.admin.getAnyCount.useQuery({
    status: "COMPLETED",
  });
  const { data: lessons, isPending } = api.lesson.getByCurrentUser.useQuery({
    pagination: { take: 5, page: 0 },
    status: ["COMPLETED"],
  });

  return (
    <Card className="col-span-7 flex flex-col lg:col-span-3">
      <CardHeader>
        <CardTitle>Completed Lessons</CardTitle>
        <CardDescription>
          You&apos;ve taught {count ? count : 0} student(s) this month
        </CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-8">
        {isPending ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : lessons?.length ? (
          lessons?.map((l) => (
            <CompletedLessonItem
              key={l.id}
              avatar={l.student.image ?? ""}
              name={l.student.name ?? ""}
              email={l.student.email ?? ""}
            />
          ))
        ) : (
          <EmptyState
            icon={BookOpenIcon}
            title="No completed lessons for this month"
            description="You haven't taught any students this month yet."
          />
        )}
      </CardContent>
    </Card>
  );
}
