"use client";

import EmptyState from "@/app/_components/placeholders/empty-state";
import { api } from "@/trpc/react";
import { BookOpenIcon } from "lucide-react";
import UserLessonCard from "./user-lesson-card";

export default function UserUpcomingLessons() {
  const [lessons] = api.lesson.getByCurrentUser.useSuspenseQuery({
    pagination: { take: 10, page: 0 },
    status: ["CONFIRMED"],
    orderBy: { booking: { date: "desc" } },
  });

  return lessons ? (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {lessons.map((lesson) => (
        <UserLessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  ) : (
    <EmptyState
      icon={BookOpenIcon}
      title="No upcoming lessons"
      description="You don't have any upcoming lessons."
    />
  );
}
