"use client";

import { api } from "@/trpc/react";
import AdminPanelHeading from "../(overview)/admin-panel-heading";

export default function Page() {
  const { data: lessons } = api.lesson.getAny.useQuery({
    pagination: { take: 10, page: 0 },
    lesson: { status: "CONFIRMED" },
  });

  return (
    <div>
      <AdminPanelHeading
        title="Lessons"
        description="Manage and view all lessons"
      />
      <div className="flex flex-col gap-4">
        {lessons?.map((lesson) => <div key={lesson.id}>{lesson.title}</div>)}
      </div>
    </div>
  );
}
