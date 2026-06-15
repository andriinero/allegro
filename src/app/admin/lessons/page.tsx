"use client";

import LessonsDialogContextProvider from "@/hooks/use-lessons-dialog-context";
import PanelHeading from "../(overview)/panel-heading";
import LessonDialogs from "./lesson-dialogs";
import LessonsDataTable from "./lessons-data-table";

export default function Page() {
  return (
    <LessonsDialogContextProvider>
      <LessonDialogs />

      <PanelHeading
        title="Lessons"
        description="Manage and view all lessons"
      />

      <div className="py-4">
        <LessonsDataTable />
      </div>
    </LessonsDialogContextProvider>
  );
}
