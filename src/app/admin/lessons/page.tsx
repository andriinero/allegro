"use client";

import LessonDialogContextProvider from "@/hooks/use-lesson-dialog-context";
import AdminPanelHeading from "../(overview)/admin-panel-heading";
import LessonDialogs from "./lesson-dialogs";
import LessonsDataTable from "./lessons-data-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <LessonDialogContextProvider>
        <LessonDialogs />

        <AdminPanelHeading
          title="Lessons"
          description="Manage and view all lessons"
        />

        <div className="py-4">
          <LessonsDataTable />
        </div>
      </LessonDialogContextProvider>
    </div>
  );
}
