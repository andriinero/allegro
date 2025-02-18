"use client";

import { api } from "@/trpc/react";
import UserLessonCard from "./user-lesson-card";

export default function UserUpcomingLessons() {
  const [lessons] = api.lesson.getAll.useSuspenseQuery({
    pagination: { take: 10, page: 0 },
    where: { booking: { status: ["CONFIRMED"] } },
    orderBy: { booking: { date: "desc" } },
  });

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {lessons.map((lesson) => (
        <UserLessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
