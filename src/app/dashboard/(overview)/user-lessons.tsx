import { api } from "@/trpc/react";
import UserLessonCard from "./user-lesson-card";

export default function UserLessons() {
  const { data: lessons } = api.lesson.getAll.useQuery({
    pagination: { take: 10, page: 0 },
    where: { booking: { status: ["CONFIRMED"] } },
  });

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {lessons?.map((lesson) => (
        <UserLessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
