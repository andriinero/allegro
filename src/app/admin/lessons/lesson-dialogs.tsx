import { useLessonsDialogContext } from "@/hooks/use-lessons-dialog-context";
import DeleteLessonDialog from "./delete-lesson-dialog";
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

      <DeleteLessonDialog
        key="delete-lesson"
        open={open === "delete"}
        onOpenChange={(open) => setOpen(open ? "delete" : null)}
        currentRow={currentRow}
      />
    </>
  );
}
