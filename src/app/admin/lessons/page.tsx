"use client";

import LessonsDialogContextProvider from "@/hooks/use-lessons-dialog-context";
import PanelHeading from "../(overview)/panel-heading";
import PanelWrapper from "../(overview)/panel-wrapper";
import LessonDialogs from "./lesson-dialogs";
import LessonsDataTable from "./lessons-data-table";

export default function Page() {
  return (
    <LessonsDialogContextProvider>
      <LessonDialogs />

      <PanelWrapper>
        <PanelHeading
          title="Lessons"
          description="Manage and view all lessons"
        />

        <LessonsDataTable />
      </PanelWrapper>
    </LessonsDialogContextProvider>
  );
}
