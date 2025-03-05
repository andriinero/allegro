import { useLessonsDialogContext } from "@/hooks/use-lessons-dialog-context";
import EditLessonDrawer from "./edit-lesson-drawer";

export default function LessonDialogs() {
  const { open, setOpen, currentRow } = useLessonsDialogContext();

  return (
    <>
      <EditLessonDrawer
        key="edit-lesson"
        open={open === "edit"}
        onOpenChange={(open) => setOpen(open ? "edit" : null)}
        currentRow={currentRow}
      />
    </>
  );
}
